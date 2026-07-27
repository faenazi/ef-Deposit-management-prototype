import type {
  InvestmentRequest,
  InvestmentRequestStatus,
  WinningBankDetails,
} from '@/domain/investment-request'
import type { Approval } from '@/domain/approval'
import type { BankInvitation, BankOffer, OfferEvaluation } from '@/domain/offer'
import type {
  AccountingExecution,
  FinanceReview,
  InvestmentSupportChecklist,
  InvestmentSupportReview,
} from '@/domain/execution'
import type { Deposit } from '@/domain/deposit'
import type { Task } from '@/domain/task'
import type { Attachment, AuditEntry, Note } from '@/domain/audit'
import type { RoleCode } from '@/domain/roles'
import type { Currency, TenorUnit } from '@/domain/common'
import {
  calculateExpectedReturn,
  canDeleteRequest,
  getTenorDays,
  getThresholdCategory,
  responsibleRoleForStatus,
  stageForStatus,
  type ThresholdCategory,
} from '@/domain/business-rules'
import { canViewRequest } from '@/domain/section-access'
import { matchesSearch, sortBy } from '@/lib/collections'
import { addDays, isoDatePart } from '@/lib/dates'
import { MockServiceError, serviceDelay } from '@/services/service-config'
import { getIds, getState } from '@/services/store'
import {
  appendActivity,
  executeTransition,
  nowIso,
  refreshReadiness,
  replaceRequest,
  requireBusinessActor,
  requireRequest,
  type TransitionOptions,
} from '@/services/workflow-engine'

/**
 * Investment request mock service: async CRUD, search, and the full
 * documented workflow — every transition passes through the central
 * engine and the domain guards. No fetch, no backend (DEC-002).
 */

export interface RequestListFilter {
  readonly status?: InvestmentRequestStatus
  readonly statuses?: readonly InvestmentRequestStatus[]
  readonly search?: string
  readonly thresholdCategory?: ThresholdCategory
  readonly createdByUserId?: string
  readonly ownerRoleId?: RoleCode
  /** Restricts results to requests the viewing role may see (drafts rule). */
  readonly viewerRoleId?: RoleCode
}

/** The full case bundle backing the transaction workspace. */
export interface InvestmentRequestFile {
  readonly request: InvestmentRequest
  readonly invitations: readonly BankInvitation[]
  readonly offers: readonly BankOffer[]
  readonly evaluations: readonly OfferEvaluation[]
  readonly approvals: readonly Approval[]
  readonly supportReviews: readonly InvestmentSupportReview[]
  readonly financeReviews: readonly FinanceReview[]
  readonly accountingExecutions: readonly AccountingExecution[]
  readonly tasks: readonly Task[]
  readonly attachments: readonly Attachment[]
  readonly notes: readonly Note[]
  readonly activities: readonly AuditEntry[]
  readonly createdDeposit: Deposit | null
  readonly sourceDeposit: Deposit | null
}

export async function listInvestmentRequests(
  filter: RequestListFilter = {},
): Promise<InvestmentRequest[]> {
  await serviceDelay()
  const state = getState()
  let results = [...state.requests]
  if (filter.viewerRoleId !== undefined) {
    const role = filter.viewerRoleId
    results = results.filter((request) => canViewRequest(role, request))
  }
  if (filter.status !== undefined) {
    results = results.filter((request) => request.status === filter.status)
  }
  if (filter.statuses !== undefined) {
    const allowed = filter.statuses
    results = results.filter((request) => allowed.includes(request.status))
  }
  if (filter.thresholdCategory !== undefined) {
    results = results.filter(
      (request) =>
        getThresholdCategory(request.submittedAmount ?? request.amount, state.settings) ===
        filter.thresholdCategory,
    )
  }
  if (filter.createdByUserId !== undefined) {
    results = results.filter((request) => request.createdByUserId === filter.createdByUserId)
  }
  if (filter.ownerRoleId !== undefined) {
    results = results.filter((request) => request.currentOwnerRoleId === filter.ownerRoleId)
  }
  if (filter.search !== undefined && filter.search.trim() !== '') {
    const query = filter.search
    results = results.filter(
      (request) =>
        matchesSearch(request.title, query) || matchesSearch(request.requestNumber, query),
    )
  }
  return sortBy(results, (request) => request.updatedAt, 'desc')
}

export async function getInvestmentRequestFile(
  requestId: string,
  viewerRoleId?: RoleCode,
): Promise<InvestmentRequestFile> {
  await serviceDelay()
  const state = getState()
  const request = requireRequest(state, requestId)
  if (viewerRoleId !== undefined && !canViewRequest(viewerRoleId, request)) {
    throw new MockServiceError('لا يملك هذا الدور صلاحية الاطلاع على المسودة قبل إرسالها.')
  }
  return {
    request,
    invitations: state.invitations.filter((i) => i.investmentRequestId === requestId),
    offers: state.offers.filter((o) => o.investmentRequestId === requestId),
    evaluations: state.evaluations.filter((e) => e.investmentRequestId === requestId),
    approvals: sortBy(
      state.approvals.filter((a) => a.investmentRequestId === requestId),
      (a) => a.createdAt,
    ),
    supportReviews: state.supportReviews.filter((r) => r.investmentRequestId === requestId),
    financeReviews: state.financeReviews.filter((r) => r.investmentRequestId === requestId),
    accountingExecutions: state.accountingExecutions.filter(
      (r) => r.investmentRequestId === requestId,
    ),
    tasks: state.tasks.filter(
      (t) => t.entityType === 'INVESTMENT_REQUEST' && t.entityId === requestId,
    ),
    attachments: state.attachments.filter(
      (a) => a.entityType === 'INVESTMENT_REQUEST' && a.entityId === requestId,
    ),
    notes: state.notes.filter(
      (n) => n.entityType === 'INVESTMENT_REQUEST' && n.entityId === requestId,
    ),
    activities: sortBy(
      state.activities.filter(
        (a) => a.entityType === 'INVESTMENT_REQUEST' && a.entityId === requestId,
      ),
      (a) => a.occurredAt,
    ),
    createdDeposit:
      request.createdDepositId === null
        ? null
        : (state.deposits.find((d) => d.id === request.createdDepositId) ?? null),
    sourceDeposit:
      request.sourceDepositId === null
        ? null
        : (state.deposits.find((d) => d.id === request.sourceDepositId) ?? null),
  }
}

export interface CreateDraftInput {
  readonly title: string
  readonly amount: number
  readonly currency?: Currency
  readonly tenorValue: number
  readonly tenorUnit?: TenorUnit
  readonly purpose: string
  /** Reinvestment origin (R-17). */
  readonly sourceDepositId?: string
}

export async function createDraftRequest(
  actorUserId: string,
  input: CreateDraftInput,
): Promise<InvestmentRequest> {
  await serviceDelay()
  const state = getState()
  const ids = getIds()
  const actor = requireBusinessActor(state, actorUserId)
  if (actor.roleId !== 'deposit-specialist') {
    throw new MockServiceError('إنشاء طلبات الاستثمار متاح لأخصائي الودائع فقط.')
  }
  if (!(input.amount > 0)) {
    throw new MockServiceError('يجب أن يكون مبلغ الاستثمار أكبر من صفر.')
  }
  const now = nowIso(state)
  const id = ids.request()
  const request: InvestmentRequest = {
    id,
    requestNumber: id,
    title: input.title,
    status: 'DRAFT',
    currentStage: 'DRAFT_PREPARATION',
    currentOwnerRoleId: 'deposit-specialist',
    currentOwnerUserId: actor.id,
    createdByUserId: actor.id,
    createdAt: now,
    updatedAt: now,
    submittedAt: null,
    stageEnteredAt: now,
    amount: input.amount,
    submittedAmount: null,
    currency: input.currency ?? 'SAR',
    tenorValue: input.tenorValue,
    tenorUnit: input.tenorUnit ?? 'MONTHS',
    investmentDate: null,
    expectedMaturityDate: null,
    purpose: input.purpose,
    liquiditySummary: '',
    liquidity: null,
    sectionCompletion: {
      'request-information': 'IN_PROGRESS',
      liquidity: 'NOT_STARTED',
      'bank-rfq': 'NOT_STARTED',
      'bank-offers': 'NOT_STARTED',
      'evaluation-recommendation': 'NOT_STARTED',
      attachments: 'NOT_STARTED',
    },
    priority: 'MEDIUM',
    invitedBankIds: [],
    offerIds: [],
    recommendation: null,
    minimumBanksExceptionReason: null,
    completenessConfirmed: false,
    readinessPercentage: 0,
    missingRequirementCodes: [],
    returnReason: null,
    returnedFromStage: null,
    rejectionReason: null,
    cancellationReason: null,
    winningBankDetails: null,
    approvalIds: [],
    taskIds: [],
    attachmentIds: [],
    activityIds: [],
    sourceDepositId: input.sourceDepositId ?? null,
    createdDepositId: null,
  }
  state.requests.push(request)
  appendActivity(state, {
    entityType: 'INVESTMENT_REQUEST',
    entityId: id,
    activityType:
      input.sourceDepositId === undefined ? 'REQUEST_CREATED' : 'REINVESTMENT_REQUEST_CREATED',
    actor,
  })
  return refreshReadiness(state, request)
}

export interface UpdateDraftInput {
  readonly title?: string
  readonly amount?: number
  readonly tenorValue?: number
  readonly purpose?: string
  readonly investmentDate?: string | null
  readonly liquidity?: InvestmentRequest['liquidity']
  readonly liquiditySummary?: string
  readonly minimumBanksExceptionReason?: string | null
  readonly completenessConfirmed?: boolean
  readonly recommendation?: InvestmentRequest['recommendation']
}

export async function updateDraftRequest(
  actorUserId: string,
  requestId: string,
  patch: UpdateDraftInput,
): Promise<InvestmentRequest> {
  await serviceDelay()
  const state = getState()
  const actor = requireBusinessActor(state, actorUserId)
  const request = requireRequest(state, requestId)
  if (request.status !== 'DRAFT' && request.status !== 'RETURNED_FOR_COMPLETION') {
    throw new MockServiceError('لا يمكن تعديل الطلب خارج مرحلتي المسودة والمعاد للاستكمال.')
  }
  if (actor.roleId !== 'deposit-specialist') {
    throw new MockServiceError('تعديل بيانات الإعداد متاح لأخصائي الودائع فقط.')
  }
  const amount = patch.amount ?? request.amount
  const tenorValue = patch.tenorValue ?? request.tenorValue
  const investmentDate =
    patch.investmentDate === undefined ? request.investmentDate : patch.investmentDate
  const updated: InvestmentRequest = {
    ...request,
    title: patch.title ?? request.title,
    amount,
    tenorValue,
    purpose: patch.purpose ?? request.purpose,
    investmentDate,
    expectedMaturityDate:
      investmentDate === null
        ? null
        : addDays(investmentDate, getTenorDays(tenorValue, request.tenorUnit)),
    liquidity: patch.liquidity === undefined ? request.liquidity : patch.liquidity,
    liquiditySummary: patch.liquiditySummary ?? request.liquiditySummary,
    minimumBanksExceptionReason:
      patch.minimumBanksExceptionReason === undefined
        ? request.minimumBanksExceptionReason
        : patch.minimumBanksExceptionReason,
    completenessConfirmed: patch.completenessConfirmed ?? request.completenessConfirmed,
    recommendation:
      patch.recommendation === undefined ? request.recommendation : patch.recommendation,
  }
  replaceRequest(state, updated)
  return refreshReadiness(state, updated)
}

/** R-15: drafts are deletable by their creator before first submission only. */
export async function deleteDraftRequest(actorUserId: string, requestId: string): Promise<void> {
  await serviceDelay()
  const state = getState()
  requireBusinessActor(state, actorUserId)
  const request = requireRequest(state, requestId)
  if (!canDeleteRequest(request, actorUserId)) {
    throw new MockServiceError('يمكن حذف المسودة فقط بواسطة منشئها وقبل أول إرسال.')
  }
  state.requests = state.requests.filter((candidate) => candidate.id !== requestId)
  state.tasks = state.tasks.filter(
    (task) => !(task.entityType === 'INVESTMENT_REQUEST' && task.entityId === requestId),
  )
}

// --- Workflow actions (all through the central engine) ---

export async function submitRequest(actorUserId: string, requestId: string) {
  await serviceDelay()
  const state = getState()
  const request = requireRequest(state, requestId)
  return executeTransition(
    state,
    requestId,
    request.status === 'RETURNED_FOR_COMPLETION' ? 'RESUBMIT' : 'SUBMIT',
    actorUserId,
  )
}

export async function approveRequest(
  actorUserId: string,
  requestId: string,
  options: TransitionOptions = {},
) {
  await serviceDelay()
  return executeTransition(getState(), requestId, 'APPROVE', actorUserId, options)
}

export async function returnRequest(actorUserId: string, requestId: string, reason: string) {
  await serviceDelay()
  return executeTransition(getState(), requestId, 'RETURN', actorUserId, { reason })
}

export async function rejectRequest(actorUserId: string, requestId: string, reason: string) {
  await serviceDelay()
  return executeTransition(getState(), requestId, 'REJECT', actorUserId, { reason })
}

export async function cancelRequest(actorUserId: string, requestId: string, reason: string) {
  await serviceDelay()
  return executeTransition(getState(), requestId, 'CANCEL', actorUserId, { reason })
}

/** Stage 1: saves the winning-bank details and submits to Investment Support. */
export async function submitWinningBank(
  actorUserId: string,
  requestId: string,
  details: WinningBankDetails,
) {
  await serviceDelay()
  const state = getState()
  const actor = requireBusinessActor(state, actorUserId)
  const request = requireRequest(state, requestId)
  if (request.status !== 'PENDING_WINNING_BANK_COMPLETION') {
    throw new MockServiceError('استكمال بيانات البنك الفائز غير متاح في الحالة الحالية.')
  }
  const offer = state.offers.find((candidate) => candidate.id === details.winningOfferId)
  if (offer === undefined || offer.investmentRequestId !== requestId) {
    throw new MockServiceError('العرض الفائز يجب أن يكون أحد عروض الطلب نفسه.')
  }
  if (offer.status !== 'VALID') {
    throw new MockServiceError('لا يمكن اختيار عرض غير ساري كعرض فائز.')
  }
  const matchesRecommendation = request.recommendation?.recommendedOfferId === offer.id
  if (!matchesRecommendation && (details.controlledChangeJustification ?? '').trim() === '') {
    throw new MockServiceError(
      'العرض الفائز يخالف التوصية المعتمدة؛ يجب توثيق مبرر التغيير المضبوط.',
    )
  }
  if (details.ibanCertificateAttachmentId === null) {
    throw new MockServiceError('شهادة الآيبان إلزامية قبل الإحالة إلى دعم الاستثمار.')
  }
  replaceRequest(state, {
    ...request,
    winningBankDetails: { ...details, verifiedByUserId: actor.id, verifiedAt: nowIso(state) },
  })
  return executeTransition(state, requestId, 'SUBMIT_WINNING_BANK', actorUserId)
}

/** Stage 2: Investment Support decision (approve / return / reject). */
export async function submitSupportReview(
  actorUserId: string,
  requestId: string,
  input: {
    readonly decision: 'APPROVED' | 'RETURNED' | 'REJECTED'
    readonly checklist: InvestmentSupportChecklist
    readonly comments?: string
    readonly returnReason?: string
  },
) {
  await serviceDelay()
  const state = getState()
  const actor = requireBusinessActor(state, actorUserId)
  const request = requireRequest(state, requestId)
  if (request.status !== 'PENDING_INVESTMENT_SUPPORT_REVIEW') {
    throw new MockServiceError('مراجعة دعم الاستثمار غير متاحة في الحالة الحالية.')
  }
  if (
    input.decision === 'APPROVED' &&
    !Object.values(input.checklist).every((confirmed) => confirmed)
  ) {
    throw new MockServiceError('يجب استكمال جميع بنود قائمة التحقق قبل الاعتماد.')
  }
  const pendingIndex = state.supportReviews.findIndex(
    (review) => review.investmentRequestId === requestId && review.decision === 'PENDING',
  )
  const pending = pendingIndex >= 0 ? state.supportReviews[pendingIndex] : undefined
  const record: InvestmentSupportReview = {
    id: pending?.id ?? getIds().supportReview(),
    investmentRequestId: requestId,
    reviewerUserId: actor.id,
    decision: input.decision,
    checklist: input.checklist,
    comments: input.comments ?? null,
    returnReason: input.decision === 'RETURNED' ? (input.returnReason ?? null) : null,
    evidenceAttachmentIds: pending?.evidenceAttachmentIds ?? [],
    reviewedAt: nowIso(state),
    sequence: pending?.sequence ?? 1,
  }
  if (pending !== undefined) {
    state.supportReviews[pendingIndex] = record
  } else {
    state.supportReviews.push(record)
  }
  const action =
    input.decision === 'APPROVED' ? 'APPROVE' : input.decision === 'RETURNED' ? 'RETURN' : 'REJECT'
  return executeTransition(state, requestId, action, actorUserId, {
    reason: input.returnReason ?? '',
    comment: input.comments ?? '',
  })
}

/** Stage 3: Finance decision — only financial confirmations are recorded. */
export async function submitFinanceReview(
  actorUserId: string,
  requestId: string,
  input: {
    readonly decision: 'APPROVED' | 'RETURNED' | 'REJECTED'
    readonly budgetAvailabilityConfirmed: boolean
    readonly cashAvailabilityConfirmed: boolean
    readonly beneficiaryVerified: boolean
    readonly comments?: string
    readonly returnReason?: string
  },
) {
  await serviceDelay()
  const state = getState()
  const actor = requireBusinessActor(state, actorUserId)
  const request = requireRequest(state, requestId)
  if (request.status !== 'PENDING_FINANCE_REVIEW') {
    throw new MockServiceError('المراجعة المالية غير متاحة في الحالة الحالية.')
  }
  if (
    input.decision === 'APPROVED' &&
    !(input.budgetAvailabilityConfirmed && input.cashAvailabilityConfirmed && input.beneficiaryVerified)
  ) {
    throw new MockServiceError('يجب تأكيد توفر الموازنة والسيولة وبيانات المستفيد قبل الاعتماد.')
  }
  const pendingIndex = state.financeReviews.findIndex(
    (review) => review.investmentRequestId === requestId && review.reviewStatus === 'PENDING',
  )
  const pending = pendingIndex >= 0 ? state.financeReviews[pendingIndex] : undefined
  const record: FinanceReview = {
    id: pending?.id ?? getIds().financeReview(),
    investmentRequestId: requestId,
    reviewerUserId: actor.id,
    reviewStatus: input.decision,
    budgetAvailabilityConfirmed: input.budgetAvailabilityConfirmed,
    cashAvailabilityConfirmed: input.cashAvailabilityConfirmed,
    beneficiaryVerified: input.beneficiaryVerified,
    comments: input.comments ?? null,
    returnReason: input.decision === 'RETURNED' ? (input.returnReason ?? null) : null,
    evidenceAttachmentIds: pending?.evidenceAttachmentIds ?? [],
    reviewedAt: nowIso(state),
    sequence: pending?.sequence ?? 1,
  }
  if (pending !== undefined) {
    state.financeReviews[pendingIndex] = record
  } else {
    state.financeReviews.push(record)
  }
  const action =
    input.decision === 'APPROVED' ? 'APPROVE' : input.decision === 'RETURNED' ? 'RETURN' : 'REJECT'
  return executeTransition(state, requestId, action, actorUserId, {
    reason: input.returnReason ?? '',
    comment: input.comments ?? '',
  })
}

/** Stage 4: records the transfer execution and confirms it (R-18/R-19). */
export async function recordAccountingExecution(
  actorUserId: string,
  requestId: string,
  input: {
    readonly journalReference: string
    readonly paymentReference: string
    readonly transferDate: string
    readonly transferAmount: number
    readonly transferAttachmentId: string | null
    readonly varianceJustification?: string
    readonly comments?: string
  },
) {
  await serviceDelay()
  const state = getState()
  const actor = requireBusinessActor(state, actorUserId)
  const request = requireRequest(state, requestId)
  if (request.status !== 'PENDING_ACCOUNTING_EXECUTION') {
    throw new MockServiceError('تنفيذ التحويل غير متاح في الحالة الحالية (R-18).')
  }
  const approvedAmount = request.submittedAmount ?? request.amount
  if (
    input.transferAmount !== approvedAmount &&
    (input.varianceJustification ?? '').trim() === ''
  ) {
    throw new MockServiceError(
      'مبلغ التحويل يخالف المبلغ المعتمد؛ يجب توثيق مبرر الفرق المعتمد (R-19).',
    )
  }
  if (input.transferAttachmentId === null) {
    throw new MockServiceError('إثبات التحويل إلزامي قبل تأكيد التنفيذ.')
  }
  const pendingIndex = state.accountingExecutions.findIndex(
    (execution) =>
      execution.investmentRequestId === requestId && execution.executionStatus === 'PENDING',
  )
  const pending = pendingIndex >= 0 ? state.accountingExecutions[pendingIndex] : undefined
  const record: AccountingExecution = {
    id: pending?.id ?? getIds().accountingExecution(),
    investmentRequestId: requestId,
    executorUserId: actor.id,
    executionStatus: 'CONFIRMED',
    journalReference: input.journalReference,
    paymentReference: input.paymentReference,
    debitAccount: pending?.debitAccount ?? 'حساب الصندوق التشغيلي الرئيسي',
    beneficiaryAccount: request.winningBankDetails?.iban ?? null,
    transferDate: input.transferDate,
    transferAmount: input.transferAmount,
    varianceJustification: input.varianceJustification ?? null,
    transferAttachmentId: input.transferAttachmentId,
    comments: input.comments ?? null,
    returnReason: null,
    executedAt: nowIso(state),
    sequence: pending?.sequence ?? 1,
  }
  if (pending !== undefined) {
    state.accountingExecutions[pendingIndex] = record
  } else {
    state.accountingExecutions.push(record)
  }
  return executeTransition(state, requestId, 'CONFIRM_EXECUTION', actorUserId, {
    comment: input.comments ?? '',
  })
}

/** Stage 5: confirms bank activation and creates exactly one deposit (R-16). */
export async function confirmDepositActivation(
  actorUserId: string,
  requestId: string,
  input: {
    readonly bankDepositReference: string
    readonly actualValueDate: string
    readonly actualMaturityDate: string
    readonly confirmedRate: number
    readonly confirmedAmount: number
    readonly certificateAttachmentId: string | null
    readonly notes?: string
  },
): Promise<{ request: InvestmentRequest; deposit: Deposit }> {
  await serviceDelay()
  const state = getState()
  const ids = getIds()
  const actor = requireBusinessActor(state, actorUserId)
  const request = requireRequest(state, requestId)
  if (request.status !== 'PENDING_DEPOSIT_ACTIVATION') {
    throw new MockServiceError('تفعيل الوديعة غير متاح قبل تأكيد تنفيذ التحويل (R-18).')
  }
  if (request.createdDepositId !== null) {
    throw new MockServiceError('تم إنشاء وديعة لهذا الطلب من قبل؛ لا يسمح بالتكرار (R-16).')
  }
  const executed = state.accountingExecutions.some(
    (execution) =>
      execution.investmentRequestId === requestId && execution.executionStatus === 'CONFIRMED',
  )
  if (!executed) {
    throw new MockServiceError('لا يمكن التفعيل قبل تأكيد التنفيذ المحاسبي (R-18).')
  }
  const winning = request.winningBankDetails
  if (winning === null) {
    throw new MockServiceError('بيانات البنك الفائز غير مكتملة.')
  }

  const depositIdValue = ids.deposit()
  state.activations.push({
    id: ids.activation(),
    investmentRequestId: requestId,
    bankDepositReference: input.bankDepositReference,
    actualValueDate: input.actualValueDate,
    actualMaturityDate: input.actualMaturityDate,
    confirmedRate: input.confirmedRate,
    confirmedAmount: input.confirmedAmount,
    certificateAttachmentId: input.certificateAttachmentId,
    activationConfirmationDate: nowIso(state),
    confirmedByUserId: actor.id,
    notes: input.notes ?? null,
  })

  const tenorDays = getTenorDays(request.tenorValue, request.tenorUnit)
  const deposit: Deposit = {
    id: depositIdValue,
    depositNumber: depositIdValue,
    sourceInvestmentRequestId: requestId,
    bankId: winning.bankId,
    status: 'ACTIVE',
    principalAmount: input.confirmedAmount,
    currency: request.currency,
    annualRate: input.confirmedRate,
    expectedReturnAmount: calculateExpectedReturn(
      input.confirmedAmount,
      input.confirmedRate,
      tenorDays,
      state.settings.dayCountBasis,
    ),
    actualReturnAmount: null,
    valueDate: input.actualValueDate,
    maturityDate: input.actualMaturityDate,
    tenorValue: request.tenorValue,
    tenorUnit: request.tenorUnit,
    depositReference: input.bankDepositReference,
    certificateAttachmentId: input.certificateAttachmentId,
    closedAt: null,
    brokenAt: null,
    breakReason: null,
    breakPenaltyAmount: null,
    bankConfirmationAttachmentId: null,
    reinvestmentRequestId: null,
    activityIds: [],
    attachmentIds: [],
    createdAt: nowIso(state),
  }
  state.deposits.push(deposit)

  const updated = executeTransition(state, requestId, 'CONFIRM_ACTIVATION', actorUserId, {
    comment: input.notes ?? '',
  })
  const withDeposit: InvestmentRequest = { ...updated, createdDepositId: depositIdValue }
  replaceRequest(state, withDeposit)
  appendActivity(state, {
    entityType: 'DEPOSIT',
    entityId: depositIdValue,
    activityType: 'DEPOSIT_ACTIVATED',
    actor,
    description: `تفعيل الوديعة ${depositIdValue} من الطلب ${requestId}.`,
  })
  return { request: withDeposit, deposit }
}

// --- Offer management during preparation ---

export interface OfferInput {
  readonly bankId: string
  readonly amount: number
  readonly annualRate: number
  readonly tenorValue: number
  readonly valueDate: string
  readonly validUntil: string | null
  readonly isShariaCompliant: boolean
  readonly productType: string
  readonly specialConditions?: string
  readonly earlyBreakTerms?: string
  readonly partialBreakAvailable?: boolean
}

export async function addBankOffer(
  actorUserId: string,
  requestId: string,
  input: OfferInput,
): Promise<BankOffer> {
  await serviceDelay()
  const state = getState()
  const ids = getIds()
  const actor = requireBusinessActor(state, actorUserId)
  const request = requireRequest(state, requestId)
  if (request.status !== 'DRAFT' && request.status !== 'RETURNED_FOR_COMPLETION') {
    throw new MockServiceError('إضافة العروض متاحة أثناء إعداد الطلب فقط.')
  }
  const invitation = state.invitations.find(
    (candidate) =>
      candidate.investmentRequestId === requestId && candidate.bankId === input.bankId,
  )
  if (invitation === undefined) {
    throw new MockServiceError('لا يمكن تسجيل عرض من بنك لم تتم دعوته لهذا الطلب.')
  }
  const bank = state.banks.find((candidate) => candidate.id === input.bankId)
  if (bank === undefined || !bank.isActive) {
    throw new MockServiceError('البنك غير نشط ولا يمكن قبول عروض منه.')
  }
  const tenorDays = getTenorDays(input.tenorValue, 'MONTHS')
  const now = nowIso(state)
  const offer: BankOffer = {
    id: ids.offer(),
    investmentRequestId: requestId,
    bankId: input.bankId,
    invitationId: invitation.id,
    offerReference: `${input.bankId.replace('BNK-', 'REF-')}-${isoDatePart(now).replaceAll('-', '')}`,
    receivedAt: now,
    receivedByUserId: actor.id,
    amount: input.amount,
    currency: request.currency,
    tenorValue: input.tenorValue,
    tenorUnit: 'MONTHS',
    annualRate: input.annualRate,
    expectedReturnAmount: calculateExpectedReturn(
      input.amount,
      input.annualRate,
      tenorDays,
      state.settings.dayCountBasis,
    ),
    valueDate: input.valueDate,
    maturityDate: addDays(input.valueDate, tenorDays),
    validUntil: input.validUntil,
    isShariaCompliant: input.isShariaCompliant,
    productType: input.productType,
    specialConditions: input.specialConditions ?? null,
    earlyBreakTerms: input.earlyBreakTerms ?? null,
    partialBreakAvailable: input.partialBreakAvailable ?? false,
    status: input.validUntil === null ? 'INCOMPLETE' : 'VALID',
    isRecommended: false,
    evaluationScore: null,
    attachmentIds: [],
  }
  state.offers.push(offer)
  const requestRecord = requireRequest(state, requestId)
  replaceRequest(state, { ...requestRecord, offerIds: [...requestRecord.offerIds, offer.id] })
  appendActivity(state, {
    entityType: 'INVESTMENT_REQUEST',
    entityId: requestId,
    activityType: 'OFFER_RECEIVED',
    actor,
    description: `استلام عرض من ${bank.nameAr} بمعدل ${input.annualRate.toFixed(2)}%.`,
  })
  refreshReadiness(state, requireRequest(state, requestId))
  return offer
}

export async function updateBankOffer(
  actorUserId: string,
  offerId: string,
  patch: Partial<Pick<BankOffer, 'annualRate' | 'validUntil' | 'specialConditions' | 'status' | 'isRecommended'>>,
): Promise<BankOffer> {
  await serviceDelay()
  const state = getState()
  const actor = requireBusinessActor(state, actorUserId)
  const index = state.offers.findIndex((candidate) => candidate.id === offerId)
  const offer = index >= 0 ? state.offers[index] : undefined
  if (offer === undefined) {
    throw new MockServiceError('العرض البنكي غير موجود.')
  }
  const request = requireRequest(state, offer.investmentRequestId)
  if (request.status !== 'DRAFT' && request.status !== 'RETURNED_FOR_COMPLETION') {
    throw new MockServiceError('تعديل العروض متاح أثناء إعداد الطلب فقط.')
  }
  const annualRate = patch.annualRate ?? offer.annualRate
  const validUntil = patch.validUntil === undefined ? offer.validUntil : patch.validUntil
  const updated: BankOffer = {
    ...offer,
    ...patch,
    annualRate,
    validUntil,
    status:
      patch.status ?? (validUntil === null ? 'INCOMPLETE' : offer.status === 'INCOMPLETE' ? 'VALID' : offer.status),
    expectedReturnAmount: calculateExpectedReturn(
      offer.amount,
      annualRate,
      getTenorDays(offer.tenorValue, offer.tenorUnit),
      state.settings.dayCountBasis,
    ),
  }
  // Exactly one recommended offer per request (plan §3.11).
  if (patch.isRecommended === true) {
    for (let i = 0; i < state.offers.length; i += 1) {
      const other = state.offers[i]
      if (
        other !== undefined &&
        other.investmentRequestId === offer.investmentRequestId &&
        other.id !== offerId &&
        other.isRecommended
      ) {
        state.offers[i] = { ...other, isRecommended: false }
      }
    }
  }
  state.offers[index] = updated
  appendActivity(state, {
    entityType: 'INVESTMENT_REQUEST',
    entityId: offer.investmentRequestId,
    activityType: 'OFFER_UPDATED',
    actor,
    description: `تحديث العرض ${offer.offerReference}.`,
  })
  refreshReadiness(state, requireRequest(state, offer.investmentRequestId))
  return updated
}

/** Responsible-role check used by list pages to badge actionable rows. */
export function isActionableBy(request: InvestmentRequest, roleId: RoleCode): boolean {
  return responsibleRoleForStatus[request.status] === roleId
}

/** Current stage label helper for list views (no page-side duplication). */
export function currentStageOf(request: InvestmentRequest) {
  return stageForStatus[request.status]
}
