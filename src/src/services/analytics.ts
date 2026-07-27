import type {
  ApprovalTurnaroundEntry,
  BankParticipationEntry,
  DashboardSummary,
  MaturityBucket,
  PipelineStageSummary,
  PortfolioSummary,
  TaskSummary,
  TenorDistributionEntry,
} from '@/domain/analytics'
import type { BankExposure } from '@/domain/bank'
import type { RoleCode } from '@/domain/roles'
import type { StoreState } from '@/services/store'
import {
  getDaysToMaturity,
  getMaturityBucketKey,
  getTaskDueBucket,
  isApproachingMaturity,
  isSlaBreached,
} from '@/domain/business-rules'
import { investmentRequestStatuses } from '@/domain/investment-request'
import { taskPriorities } from '@/domain/task'
import { approvalStages } from '@/domain/approval'
import { diffBusinessDays, isoDatePart } from '@/lib/dates'
import { sumBy } from '@/lib/collections'

/**
 * Central derived-analytics selectors (plan §4.28): every metric is
 * computed from the entity stores and never persisted, so dashboards and
 * reports always reconcile with list views.
 */

export function getPortfolioSummary(state: StoreState): PortfolioSummary {
  const active = state.deposits.filter((deposit) => deposit.status === 'ACTIVE')
  const approaching = active.filter((deposit) => isApproachingMaturity(deposit, state.settings))
  const totalActivePrincipal = sumBy(active, (deposit) => deposit.principalAmount)
  const weightedAverageRate =
    totalActivePrincipal === 0
      ? 0
      : Math.round(
          (sumBy(active, (deposit) => deposit.principalAmount * deposit.annualRate) /
            totalActivePrincipal) *
            100,
        ) / 100
  return {
    activeDepositCount: active.length,
    totalActivePrincipal,
    weightedAverageRate,
    totalExpectedReturn: Math.round(sumBy(active, (d) => d.expectedReturnAmount) * 100) / 100,
    approachingMaturityCount: approaching.length,
    approachingMaturityPrincipal: sumBy(approaching, (deposit) => deposit.principalAmount),
    maturedActionRequiredCount: state.deposits.filter(
      (deposit) => deposit.status === 'MATURED_ACTION_REQUIRED',
    ).length,
  }
}

/** PD-06: bank exposure always derives from active deposits. */
export function getBankExposures(state: StoreState): BankExposure[] {
  const active = state.deposits.filter((deposit) => deposit.status === 'ACTIVE')
  const total = sumBy(active, (deposit) => deposit.principalAmount)
  return state.banks
    .map((bank) => {
      const bankDeposits = active.filter((deposit) => deposit.bankId === bank.id)
      const exposureAmount = sumBy(bankDeposits, (deposit) => deposit.principalAmount)
      return {
        bankId: bank.id,
        activeDepositCount: bankDeposits.length,
        exposureAmount,
        exposurePercentage:
          total === 0 ? 0 : Math.round((exposureAmount / total) * 1000) / 10,
      }
    })
    .sort((a, b) => b.exposureAmount - a.exposureAmount)
}

const bucketLabels: Record<MaturityBucket['key'], string> = {
  '0-30': 'خلال 30 يومًا',
  '31-60': '31–60 يومًا',
  '61-90': '61–90 يومًا',
  '91-180': '91–180 يومًا',
  '180+': 'أكثر من 180 يومًا',
}

export function getMaturityLadder(state: StoreState): MaturityBucket[] {
  const keys: MaturityBucket['key'][] = ['0-30', '31-60', '61-90', '91-180', '180+']
  const active = state.deposits.filter((deposit) => deposit.status === 'ACTIVE')
  return keys.map((key) => {
    const deposits = active.filter(
      (deposit) =>
        getMaturityBucketKey(getDaysToMaturity(deposit, state.settings.referenceDate)) === key,
    )
    return {
      key,
      labelAr: bucketLabels[key],
      depositCount: deposits.length,
      principalAmount: sumBy(deposits, (deposit) => deposit.principalAmount),
    }
  })
}

export function getPipeline(state: StoreState): PipelineStageSummary[] {
  return investmentRequestStatuses
    .map((status) => {
      const requests = state.requests.filter((request) => request.status === status)
      return {
        status,
        count: requests.length,
        totalAmount: sumBy(requests, (request) => request.amount),
      }
    })
    .filter((entry) => entry.count > 0)
}

export function getTenorDistribution(state: StoreState): TenorDistributionEntry[] {
  const active = state.deposits.filter((deposit) => deposit.status === 'ACTIVE')
  const tenors = [...new Set(active.map((deposit) => deposit.tenorValue))].sort((a, b) => a - b)
  return tenors.map((tenorMonths) => {
    const deposits = active.filter((deposit) => deposit.tenorValue === tenorMonths)
    return {
      tenorMonths,
      depositCount: deposits.length,
      principalAmount: sumBy(deposits, (deposit) => deposit.principalAmount),
    }
  })
}

export function getApprovalTurnaround(state: StoreState): ApprovalTurnaroundEntry[] {
  return approvalStages
    .filter((stage) => state.settings.slaByStage[stage] !== undefined)
    .map((stage) => {
      const decided = state.approvals.filter(
        (approval) => approval.stage === stage && approval.decisionAt !== null,
      )
      const durations = decided.map((approval) =>
        diffBusinessDays(isoDatePart(approval.createdAt), isoDatePart(approval.decisionAt ?? approval.createdAt)),
      )
      const sla = state.settings.slaByStage[stage] ?? 0
      return {
        stage,
        decidedCount: decided.length,
        averageBusinessDays:
          durations.length === 0
            ? 0
            : Math.round((durations.reduce((a, b) => a + b, 0) / durations.length) * 10) / 10,
        slaBusinessDays: sla,
        breachedCount: durations.filter((days) => days > sla).length,
      }
    })
}

export function getBankParticipation(state: StoreState): BankParticipationEntry[] {
  return state.banks.map((bank) => {
    const invitations = state.invitations.filter((invitation) => invitation.bankId === bank.id)
    const responded = invitations.filter((invitation) => invitation.status === 'RESPONSE_RECEIVED')
    const declined = invitations.filter((invitation) => invitation.status === 'DECLINED')
    const noResponse = invitations.filter((invitation) => invitation.status === 'NO_RESPONSE')
    const offers = state.offers.filter((offer) => offer.bankId === bank.id)
    const won = state.requests.filter(
      (request) => request.winningBankDetails?.bankId === bank.id,
    )
    return {
      bankId: bank.id,
      invitationCount: invitations.length,
      respondedCount: responded.length,
      declinedCount: declined.length,
      noResponseCount: noResponse.length,
      offerCount: offers.length,
      wonCount: won.length,
      responseRatePercentage:
        invitations.length === 0
          ? 0
          : Math.round((responded.length / invitations.length) * 1000) / 10,
    }
  })
}

export function getTaskSummary(state: StoreState, roleId?: RoleCode): TaskSummary {
  const tasks =
    roleId === undefined
      ? state.tasks
      : state.tasks.filter((task) => task.assignedRoleId === roleId)
  const open = tasks.filter((task) => task.status === 'OPEN')
  const byBucket = (bucket: 'OVERDUE' | 'DUE_TODAY' | 'UPCOMING') =>
    open.filter((task) => getTaskDueBucket(task, state.settings.referenceDate) === bucket).length
  const byPriority = Object.fromEntries(
    taskPriorities.map((priority) => [
      priority,
      open.filter((task) => task.priority === priority).length,
    ]),
  ) as Record<(typeof taskPriorities)[number], number>
  return {
    openCount: open.length,
    overdueCount: byBucket('OVERDUE'),
    dueTodayCount: byBucket('DUE_TODAY'),
    upcomingCount: byBucket('UPCOMING'),
    completedCount: tasks.filter((task) => task.status === 'COMPLETED').length,
    byPriority,
  }
}

export function getDashboardSummary(state: StoreState, roleId: RoleCode): DashboardSummary {
  return {
    roleId,
    referenceDate: state.settings.referenceDate,
    portfolio: getPortfolioSummary(state),
    pipeline: getPipeline(state),
    maturityLadder: getMaturityLadder(state),
    bankExposures: getBankExposures(state),
    tasks: getTaskSummary(state, roleId),
    returnedRequestCount: state.requests.filter(
      (request) => request.status === 'RETURNED_FOR_COMPLETION',
    ).length,
    rejectedRequestCount: state.requests.filter((request) => request.status === 'REJECTED')
      .length,
    slaBreachedRequestCount: state.requests.filter((request) =>
      isSlaBreached(request, state.settings),
    ).length,
  }
}
