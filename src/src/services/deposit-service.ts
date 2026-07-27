import type { Deposit, DepositStatus, MaturityAction, MaturityActionType } from '@/domain/deposit'
import type { InvestmentRequest } from '@/domain/investment-request'
import type { AuditEntry, Note } from '@/domain/audit'
import type { Task } from '@/domain/task'
import {
  calculateExpectedReturn,
  getDaysToMaturity,
  getTenorDays,
  isApproachingMaturity,
} from '@/domain/business-rules'
import { matchesSearch, sortBy } from '@/lib/collections'
import { MockServiceError, serviceDelay } from '@/services/service-config'
import { getIds, getState } from '@/services/store'
import { appendActivity, nowIso, requireBusinessActor } from '@/services/workflow-engine'
import { createDraftRequest } from '@/services/investment-request-service'
import { isoDatePart } from '@/lib/dates'

/**
 * Deposit portfolio mock service (deposit-lifecycle.md): read access,
 * derived maturity indicators, maturity decisions, reinvestment, and the
 * exceptional early break — always with mandatory reasons and audit trail.
 */

export interface DepositListFilter {
  readonly status?: DepositStatus
  readonly bankId?: string
  readonly approachingMaturityOnly?: boolean
  readonly search?: string
}

/** Deposit plus its derived display indicators (never persisted). */
export interface DepositListItem {
  readonly deposit: Deposit
  readonly daysToMaturity: number
  readonly isApproachingMaturity: boolean
}

export async function listDeposits(filter: DepositListFilter = {}): Promise<DepositListItem[]> {
  await serviceDelay()
  const state = getState()
  let results = [...state.deposits]
  if (filter.status !== undefined) {
    results = results.filter((deposit) => deposit.status === filter.status)
  }
  if (filter.bankId !== undefined) {
    results = results.filter((deposit) => deposit.bankId === filter.bankId)
  }
  if (filter.approachingMaturityOnly === true) {
    results = results.filter((deposit) => isApproachingMaturity(deposit, state.settings))
  }
  if (filter.search !== undefined && filter.search.trim() !== '') {
    const query = filter.search
    results = results.filter((deposit) => matchesSearch(deposit.depositNumber, query))
  }
  return sortBy(results, (deposit) => deposit.maturityDate).map((deposit) => ({
    deposit,
    daysToMaturity: getDaysToMaturity(deposit, state.settings.referenceDate),
    isApproachingMaturity: isApproachingMaturity(deposit, state.settings),
  }))
}

export interface DepositFile {
  readonly deposit: Deposit
  readonly daysToMaturity: number
  readonly isApproachingMaturity: boolean
  readonly sourceRequest: InvestmentRequest | null
  readonly reinvestmentRequest: InvestmentRequest | null
  readonly maturityActions: readonly MaturityAction[]
  readonly tasks: readonly Task[]
  readonly notes: readonly Note[]
  readonly activities: readonly AuditEntry[]
}

export async function getDepositFile(depositId: string): Promise<DepositFile> {
  await serviceDelay()
  const state = getState()
  const deposit = state.deposits.find((candidate) => candidate.id === depositId)
  if (deposit === undefined) {
    throw new MockServiceError('الوديعة المطلوبة غير موجودة.')
  }
  return {
    deposit,
    daysToMaturity: getDaysToMaturity(deposit, state.settings.referenceDate),
    isApproachingMaturity: isApproachingMaturity(deposit, state.settings),
    sourceRequest:
      state.requests.find((request) => request.id === deposit.sourceInvestmentRequestId) ?? null,
    reinvestmentRequest:
      deposit.reinvestmentRequestId === null
        ? null
        : (state.requests.find((request) => request.id === deposit.reinvestmentRequestId) ?? null),
    maturityActions: state.maturityActions.filter((action) => action.depositId === depositId),
    tasks: state.tasks.filter(
      (task) => task.entityType === 'DEPOSIT' && task.entityId === depositId,
    ),
    notes: state.notes.filter(
      (note) => note.entityType === 'DEPOSIT' && note.entityId === depositId,
    ),
    activities: sortBy(
      state.activities.filter(
        (activity) => activity.entityType === 'DEPOSIT' && activity.entityId === depositId,
      ),
      (activity) => activity.occurredAt,
    ),
  }
}

function replaceDeposit(depositId: string, next: Deposit): void {
  const state = getState()
  const index = state.deposits.findIndex((candidate) => candidate.id === depositId)
  if (index >= 0) {
    state.deposits[index] = next
  }
}

/**
 * Records a maturity decision. `REINVEST` creates a prefilled draft request
 * linked to the source deposit (R-17) — the deposit itself stays unchanged
 * until maturity processing completes; `CLOSE` closes a matured deposit.
 */
export async function recordMaturityAction(
  actorUserId: string,
  depositId: string,
  actionType: MaturityActionType,
  notes?: string,
): Promise<{ action: MaturityAction; resultingRequest: InvestmentRequest | null }> {
  await serviceDelay()
  const state = getState()
  const ids = getIds()
  const actor = requireBusinessActor(state, actorUserId)
  if (actor.roleId !== 'deposit-specialist') {
    throw new MockServiceError('قرارات الاستحقاق متاحة لأخصائي الودائع فقط.')
  }
  const deposit = state.deposits.find((candidate) => candidate.id === depositId)
  if (deposit === undefined) {
    throw new MockServiceError('الوديعة المطلوبة غير موجودة.')
  }
  if (deposit.status !== 'ACTIVE' && deposit.status !== 'MATURED_ACTION_REQUIRED') {
    throw new MockServiceError('لا يمكن تسجيل قرار استحقاق لوديعة غير نشطة أو غير مستحقة.')
  }
  if (actionType === 'BREAK_EARLY') {
    throw new MockServiceError('الكسر المبكر إجراء مستقل — استخدم «كسر الوديعة» مع سبب إلزامي.')
  }

  let resultingRequest: InvestmentRequest | null = null
  if (actionType === 'REINVEST') {
    resultingRequest = await createDraftRequest(actorUserId, {
      title: `إعادة استثمار الوديعة ${deposit.depositNumber}`,
      amount: deposit.principalAmount,
      tenorValue: deposit.tenorValue,
      purpose: `إعادة استثمار أصل الوديعة ${deposit.depositNumber} المستحقة وفق سياسة الاستثمار المعتمدة.`,
      sourceDepositId: deposit.id,
    })
    replaceDeposit(depositId, { ...deposit, reinvestmentRequestId: resultingRequest.id })
  }
  if (actionType === 'CLOSE') {
    if (deposit.status !== 'MATURED_ACTION_REQUIRED') {
      throw new MockServiceError('الإغلاق متاح للودائع المستحقة فقط.')
    }
    replaceDeposit(depositId, {
      ...deposit,
      status: 'CLOSED',
      closedAt: nowIso(state),
      actualReturnAmount: deposit.expectedReturnAmount,
    })
  }

  const action: MaturityAction = {
    id: ids.maturityAction(),
    depositId,
    actionType,
    decisionByUserId: actor.id,
    decisionAt: nowIso(state),
    notes: notes ?? null,
    resultingRequestId: resultingRequest?.id ?? null,
  }
  state.maturityActions.push(action)
  appendActivity(state, {
    entityType: 'DEPOSIT',
    entityId: depositId,
    activityType: actionType === 'CLOSE' ? 'DEPOSIT_CLOSED' : 'MATURITY_DECISION_RECORDED',
    actor,
    comment: notes ?? null,
  })
  return { action, resultingRequest }
}

/**
 * Exceptional early break (deposit-lifecycle.md Early Break Principle):
 * mandatory reason, confirmation handled by the UI, realized return and
 * penalty derived from the central formula.
 */
export async function breakDepositEarly(
  actorUserId: string,
  depositId: string,
  reason: string,
): Promise<Deposit> {
  await serviceDelay()
  const state = getState()
  const ids = getIds()
  const actor = requireBusinessActor(state, actorUserId)
  if (actor.roleId !== 'deposit-specialist') {
    throw new MockServiceError('كسر الوديعة متاح لأخصائي الودائع فقط.')
  }
  if (reason.trim() === '') {
    throw new MockServiceError('سبب الكسر المبكر إلزامي.')
  }
  const deposit = state.deposits.find((candidate) => candidate.id === depositId)
  if (deposit === undefined) {
    throw new MockServiceError('الوديعة المطلوبة غير موجودة.')
  }
  if (deposit.status !== 'ACTIVE') {
    throw new MockServiceError('الكسر المبكر متاح للودائع النشطة فقط.')
  }
  const today = isoDatePart(nowIso(state))
  const elapsedDays = Math.max(
    0,
    getTenorDays(deposit.tenorValue, deposit.tenorUnit) -
      Math.max(0, getDaysToMaturity(deposit, state.settings.referenceDate)),
  )
  const accrued = calculateExpectedReturn(
    deposit.principalAmount,
    deposit.annualRate,
    elapsedDays,
    state.settings.dayCountBasis,
  )
  const penalty = calculateExpectedReturn(
    deposit.principalAmount,
    0.5,
    elapsedDays,
    state.settings.dayCountBasis,
  )
  const updated: Deposit = {
    ...deposit,
    status: 'BROKEN_EARLY',
    brokenAt: today,
    breakReason: reason,
    breakPenaltyAmount: penalty,
    actualReturnAmount: Math.max(0, Math.round((accrued - penalty) * 100) / 100),
  }
  replaceDeposit(depositId, updated)
  appendActivity(state, {
    entityType: 'DEPOSIT',
    entityId: depositId,
    activityType: 'DEPOSIT_BROKEN',
    actor,
    comment: reason,
  })
  state.maturityActions.push({
    id: ids.maturityAction(),
    depositId,
    actionType: 'BREAK_EARLY',
    decisionByUserId: actor.id,
    decisionAt: nowIso(state),
    notes: reason,
    resultingRequestId: null,
  })
  return updated
}
