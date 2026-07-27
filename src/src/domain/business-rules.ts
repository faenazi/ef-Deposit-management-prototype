import type { RoleCode } from '@/domain/roles'
import type { ValueLabels } from '@/domain/common'
import type {
  InvestmentRequest,
  InvestmentRequestStatus,
} from '@/domain/investment-request'
import type { ApprovalStage } from '@/domain/approval'
import type { BankInvitation, BankOffer, OfferEvaluation, OfferStatus } from '@/domain/offer'
import type { Attachment } from '@/domain/audit'
import type { Deposit } from '@/domain/deposit'
import type { Task, TaskDueBucket } from '@/domain/task'
import type { SystemSettings } from '@/domain/settings'
import type { TenorUnit } from '@/domain/common'
import {
  addBusinessDays,
  diffBusinessDays,
  diffCalendarDays,
  isSameCalendarDay,
} from '@/lib/dates'

/**
 * Centralized business rules R-01…R-20 (plan §6; canonical values:
 * docs/02-business/business-rules.md, DEC-017). Every rule lives exactly
 * once in this module; services, fixtures, generators, and UI must call
 * these helpers — no page or component may re-implement them.
 *
 * Configurable values are read from `SystemSettings` (never hardcoded in
 * components); the deterministic defaults are seeded in
 * `mock-data/system-settings.ts`.
 */

// ---------------------------------------------------------------------------
// Threshold and approval routing (R-01…R-06)
// ---------------------------------------------------------------------------

/** R-01/R-05: strict comparison against the submitted amount; ≤ threshold → short path. */
export function requiresExecutiveApproval(amount: number, settings: SystemSettings): boolean {
  return amount > settings.approvalThresholdSar
}

export type ThresholdCategory = 'AT_OR_BELOW_THRESHOLD' | 'ABOVE_THRESHOLD'

export function getThresholdCategory(
  amount: number,
  settings: SystemSettings,
): ThresholdCategory {
  return requiresExecutiveApproval(amount, settings)
    ? 'ABOVE_THRESHOLD'
    : 'AT_OR_BELOW_THRESHOLD'
}

/** The fixed execution stages appended to both routes (R-04). */
export const executionStages: readonly ApprovalStage[] = [
  'WINNING_BANK_COMPLETION',
  'INVESTMENT_SUPPORT_REVIEW',
  'FINANCE_REVIEW',
  'ACCOUNTING_EXECUTION',
  'DEPOSIT_ACTIVATION',
]

/**
 * R-02/R-03: the approval route derived from the submitted amount — never
 * stored as a hand-written list. Recalculated whenever the amount changes
 * before resubmission (R-06).
 */
export function getApprovalRoute(
  amount: number,
  settings: SystemSettings,
): readonly ApprovalStage[] {
  const decisionStages: ApprovalStage[] = requiresExecutiveApproval(amount, settings)
    ? ['TREASURY_GM_APPROVAL', 'EXECUTIVE_APPROVAL']
    : ['TREASURY_GM_APPROVAL']
  return ['DRAFT_PREPARATION', ...decisionStages, ...executionStages]
}

// ---------------------------------------------------------------------------
// Financial calculations (R-10, PD-07)
// ---------------------------------------------------------------------------

/** PD-07: months × 30 for the 360-day basis; explicit day tenors pass through. */
export function getTenorDays(tenorValue: number, tenorUnit: TenorUnit): number {
  return tenorUnit === 'MONTHS' ? tenorValue * 30 : tenorValue
}

/**
 * R-10: expected return = principal × annualRate × tenorDays ÷ dayCountBasis,
 * with the rate given in percent. Rounded to the nearest halala (2 decimals).
 */
export function calculateExpectedReturn(
  principal: number,
  annualRatePercent: number,
  tenorDays: number,
  dayCountBasis = 360,
): number {
  const raw = (principal * (annualRatePercent / 100) * tenorDays) / dayCountBasis
  return Math.round(raw * 100) / 100
}

// ---------------------------------------------------------------------------
// Maturity (R-11)
// ---------------------------------------------------------------------------

/** Calendar days from the reference date to maturity (negative when past). */
export function getDaysToMaturity(deposit: Deposit, referenceDate: string): number {
  return diffCalendarDays(referenceDate, deposit.maturityDate)
}

/** R-11: ACTIVE and maturing within the warning window — display condition only. */
export function isApproachingMaturity(deposit: Deposit, settings: SystemSettings): boolean {
  if (deposit.status !== 'ACTIVE') {
    return false
  }
  const days = getDaysToMaturity(deposit, settings.referenceDate)
  return days >= 0 && days <= settings.maturityWarningDays
}

export type MaturityBucketKey = '0-30' | '31-60' | '61-90' | '91-180' | '180+'

/** Maturity ladder bucketing (05-deposit-portfolio.md §8). */
export function getMaturityBucketKey(daysToMaturity: number): MaturityBucketKey {
  if (daysToMaturity <= 30) return '0-30'
  if (daysToMaturity <= 60) return '31-60'
  if (daysToMaturity <= 90) return '61-90'
  if (daysToMaturity <= 180) return '91-180'
  return '180+'
}

// ---------------------------------------------------------------------------
// Status ↔ stage ↔ responsible role mapping
// ---------------------------------------------------------------------------

export const stageForStatus: Record<InvestmentRequestStatus, ApprovalStage> = {
  DRAFT: 'DRAFT_PREPARATION',
  RETURNED_FOR_COMPLETION: 'DRAFT_PREPARATION',
  PENDING_TREASURY_GM_APPROVAL: 'TREASURY_GM_APPROVAL',
  PENDING_EXECUTIVE_APPROVAL: 'EXECUTIVE_APPROVAL',
  PENDING_WINNING_BANK_COMPLETION: 'WINNING_BANK_COMPLETION',
  PENDING_INVESTMENT_SUPPORT_REVIEW: 'INVESTMENT_SUPPORT_REVIEW',
  PENDING_FINANCE_REVIEW: 'FINANCE_REVIEW',
  PENDING_ACCOUNTING_EXECUTION: 'ACCOUNTING_EXECUTION',
  PENDING_DEPOSIT_ACTIVATION: 'DEPOSIT_ACTIVATION',
  CONVERTED_TO_ACTIVE_DEPOSIT: 'DEPOSIT_ACTIVATION',
  REJECTED: 'DRAFT_PREPARATION',
  CANCELLED: 'DRAFT_PREPARATION',
}

/** The role responsible for acting at each status; null for terminal states. */
export const responsibleRoleForStatus: Record<InvestmentRequestStatus, RoleCode | null> = {
  DRAFT: 'deposit-specialist',
  RETURNED_FOR_COMPLETION: 'deposit-specialist',
  PENDING_TREASURY_GM_APPROVAL: 'treasury-general-manager',
  PENDING_EXECUTIVE_APPROVAL: 'investment-treasury-executive',
  PENDING_WINNING_BANK_COMPLETION: 'deposit-specialist',
  PENDING_INVESTMENT_SUPPORT_REVIEW: 'investment-support',
  PENDING_FINANCE_REVIEW: 'finance-reviewer',
  PENDING_ACCOUNTING_EXECUTION: 'accounting-executor',
  PENDING_DEPOSIT_ACTIVATION: 'deposit-specialist',
  CONVERTED_TO_ACTIVE_DEPOSIT: null,
  REJECTED: null,
  CANCELLED: null,
}

/** The pending status that re-enters a given decision/execution stage. */
export const pendingStatusForStage: Partial<Record<ApprovalStage, InvestmentRequestStatus>> = {
  TREASURY_GM_APPROVAL: 'PENDING_TREASURY_GM_APPROVAL',
  EXECUTIVE_APPROVAL: 'PENDING_EXECUTIVE_APPROVAL',
  WINNING_BANK_COMPLETION: 'PENDING_WINNING_BANK_COMPLETION',
  INVESTMENT_SUPPORT_REVIEW: 'PENDING_INVESTMENT_SUPPORT_REVIEW',
  FINANCE_REVIEW: 'PENDING_FINANCE_REVIEW',
  ACCOUNTING_EXECUTION: 'PENDING_ACCOUNTING_EXECUTION',
  DEPOSIT_ACTIVATION: 'PENDING_DEPOSIT_ACTIVATION',
}

export const terminalStatuses: readonly InvestmentRequestStatus[] = [
  'CONVERTED_TO_ACTIVE_DEPOSIT',
  'REJECTED',
  'CANCELLED',
]

/** R-14: terminal states are read-only. */
export function isTerminalStatus(status: InvestmentRequestStatus): boolean {
  return terminalStatuses.includes(status)
}

/** Preparation statuses editable by the creating specialist. */
export function isPreparationStatus(status: InvestmentRequestStatus): boolean {
  return status === 'DRAFT' || status === 'RETURNED_FOR_COMPLETION'
}

// ---------------------------------------------------------------------------
// Workflow actions and transitions (statuses-and-transitions.md table)
// ---------------------------------------------------------------------------

export const workflowActions = [
  'SUBMIT',
  'RESUBMIT',
  'APPROVE',
  'RETURN',
  'REJECT',
  'CANCEL',
  'SUBMIT_WINNING_BANK',
  'CONFIRM_EXECUTION',
  'CONFIRM_ACTIVATION',
] as const

export type WorkflowAction = (typeof workflowActions)[number]

/** Actions available from each status — the central transition table. */
const actionsByStatus: Record<InvestmentRequestStatus, readonly WorkflowAction[]> = {
  DRAFT: ['SUBMIT', 'CANCEL'],
  RETURNED_FOR_COMPLETION: ['RESUBMIT', 'CANCEL'],
  PENDING_TREASURY_GM_APPROVAL: ['APPROVE', 'RETURN', 'REJECT'],
  PENDING_EXECUTIVE_APPROVAL: ['APPROVE', 'RETURN', 'REJECT'],
  PENDING_WINNING_BANK_COMPLETION: ['SUBMIT_WINNING_BANK'],
  PENDING_INVESTMENT_SUPPORT_REVIEW: ['APPROVE', 'RETURN', 'REJECT'],
  PENDING_FINANCE_REVIEW: ['APPROVE', 'RETURN', 'REJECT'],
  PENDING_ACCOUNTING_EXECUTION: ['CONFIRM_EXECUTION', 'RETURN'],
  PENDING_DEPOSIT_ACTIVATION: ['CONFIRM_ACTIVATION'],
  CONVERTED_TO_ACTIVE_DEPOSIT: [],
  REJECTED: [],
  CANCELLED: [],
}

export function getAvailableActions(
  status: InvestmentRequestStatus,
): readonly WorkflowAction[] {
  return actionsByStatus[status]
}

/**
 * R-08: a returned request resumes at the stage that returned it.
 * Executive returns route through the Treasury approval path — the GM
 * reviews the executive feedback (CLAUDE.md §13, plan §4.12).
 */
export function getResumeStage(request: InvestmentRequest): ApprovalStage {
  if (request.returnedFromStage === null || request.returnedFromStage === 'EXECUTIVE_APPROVAL') {
    return 'TREASURY_GM_APPROVAL'
  }
  return request.returnedFromStage
}

/**
 * Return targets per stage (CLAUDE.md §13; statuses-and-transitions.md):
 * treasury/executive returns produce «معاد للاستكمال»; execution-stage
 * returns move the case back to the previous responsible stage.
 */
export function getReturnTargetStatus(
  stage: ApprovalStage,
): InvestmentRequestStatus | null {
  switch (stage) {
    case 'TREASURY_GM_APPROVAL':
    case 'EXECUTIVE_APPROVAL':
      return 'RETURNED_FOR_COMPLETION'
    case 'INVESTMENT_SUPPORT_REVIEW':
      return 'PENDING_WINNING_BANK_COMPLETION'
    case 'FINANCE_REVIEW':
      return 'PENDING_INVESTMENT_SUPPORT_REVIEW'
    case 'ACCOUNTING_EXECUTION':
      return 'PENDING_FINANCE_REVIEW'
    default:
      return null
  }
}

/**
 * Computes the next status for an action, or null when the transition is
 * invalid. The threshold is evaluated from the amount being submitted
 * (R-05); the caller passes the effective submitted amount.
 */
export function getNextStatus(
  request: InvestmentRequest,
  action: WorkflowAction,
  settings: SystemSettings,
  submittedAmount?: number,
): InvestmentRequestStatus | null {
  if (!actionsByStatus[request.status].includes(action)) {
    return null
  }
  const amount = submittedAmount ?? request.submittedAmount ?? request.amount
  switch (action) {
    case 'SUBMIT':
      return 'PENDING_TREASURY_GM_APPROVAL'
    case 'RESUBMIT': {
      const resumeStage = getResumeStage(request)
      return pendingStatusForStage[resumeStage] ?? 'PENDING_TREASURY_GM_APPROVAL'
    }
    case 'APPROVE':
      if (request.status === 'PENDING_TREASURY_GM_APPROVAL') {
        return requiresExecutiveApproval(amount, settings)
          ? 'PENDING_EXECUTIVE_APPROVAL'
          : 'PENDING_WINNING_BANK_COMPLETION'
      }
      if (request.status === 'PENDING_EXECUTIVE_APPROVAL') {
        return 'PENDING_WINNING_BANK_COMPLETION'
      }
      if (request.status === 'PENDING_INVESTMENT_SUPPORT_REVIEW') {
        return 'PENDING_FINANCE_REVIEW'
      }
      return 'PENDING_ACCOUNTING_EXECUTION'
    case 'RETURN':
      return getReturnTargetStatus(stageForStatus[request.status])
    case 'REJECT':
      return 'REJECTED'
    case 'CANCEL':
      return 'CANCELLED'
    case 'SUBMIT_WINNING_BANK':
      return 'PENDING_INVESTMENT_SUPPORT_REVIEW'
    case 'CONFIRM_EXECUTION':
      return 'PENDING_DEPOSIT_ACTIVATION'
    case 'CONFIRM_ACTIVATION':
      return 'CONVERTED_TO_ACTIVE_DEPOSIT'
  }
}

/**
 * Central transition guard: the action must exist in the transition table
 * for the current status AND the actor's role must be the responsible role
 * (a user cannot act on a task assigned to another role).
 */
export function canTransition(
  request: InvestmentRequest,
  action: WorkflowAction,
  role: RoleCode,
): boolean {
  if (!actionsByStatus[request.status].includes(action)) {
    return false
  }
  return responsibleRoleForStatus[request.status] === role
}

/** R-13: every return, rejection, and cancellation requires a reason. */
export function actionRequiresReason(action: WorkflowAction): boolean {
  return action === 'RETURN' || action === 'REJECT' || action === 'CANCEL'
}

/** R-15: a draft is deletable by its creator before first submission only. */
export function canDeleteRequest(request: InvestmentRequest, actorUserId: string): boolean {
  return (
    request.status === 'DRAFT' &&
    request.submittedAt === null &&
    request.createdByUserId === actorUserId
  )
}

// ---------------------------------------------------------------------------
// SLAs (R-12)
// ---------------------------------------------------------------------------

/** Stage SLA due date: stage entry + configured business days (Fri/Sat weekend). */
export function getStageSlaDueDate(
  stage: ApprovalStage,
  enteredAt: string,
  settings: SystemSettings,
): string | null {
  const sla = settings.slaByStage[stage]
  if (sla === undefined) {
    return null
  }
  return addBusinessDays(enteredAt, sla)
}

/** Whether the request has exceeded its current stage SLA («متأخر»). */
export function isSlaBreached(request: InvestmentRequest, settings: SystemSettings): boolean {
  if (isTerminalStatus(request.status) || isPreparationStatus(request.status)) {
    return false
  }
  const sla = settings.slaByStage[stageForStatus[request.status]]
  if (sla === undefined) {
    return false
  }
  return diffBusinessDays(request.stageEnteredAt, settings.referenceDate) > sla
}

// ---------------------------------------------------------------------------
// Offers — derived expiry (plan §3.10)
// ---------------------------------------------------------------------------

/**
 * Effective offer status at read time: a stored-VALID offer whose
 * `validUntil` has passed is treated as EXPIRED so fixtures and derived
 * evaluation never disagree.
 */
export function getEffectiveOfferStatus(offer: BankOffer, referenceDate: string): OfferStatus {
  if (
    offer.status === 'VALID' &&
    offer.validUntil !== null &&
    diffCalendarDays(referenceDate, offer.validUntil) < 0
  ) {
    return 'EXPIRED'
  }
  return offer.status
}

/** Only effectively-VALID offers can be recommended or win (Bank Offer Rules #3). */
export function isOfferEligible(offer: BankOffer, referenceDate: string): boolean {
  return getEffectiveOfferStatus(offer, referenceDate) === 'VALID'
}

// ---------------------------------------------------------------------------
// Tasks — derived urgency (PD-02)
// ---------------------------------------------------------------------------

/** Derived bucket for an OPEN task; completed/cancelled tasks have none. */
export function getTaskDueBucket(task: Task, referenceDate: string): TaskDueBucket | null {
  if (task.status !== 'OPEN') {
    return null
  }
  if (isSameCalendarDay(task.dueAt, referenceDate)) {
    return 'DUE_TODAY'
  }
  return diffCalendarDays(referenceDate, task.dueAt) < 0 ? 'OVERDUE' : 'UPCOMING'
}

// ---------------------------------------------------------------------------
// Submission readiness (plan §8.1) — blocks Submit
// ---------------------------------------------------------------------------

export const readinessRequirementCodes = [
  'REQ_INFO_COMPLETE',
  'AMOUNT_POSITIVE',
  'CURRENCY_SELECTED',
  'TENOR_SELECTED',
  'LIQUIDITY_COMPLETE',
  'LIQUIDITY_EVIDENCE',
  'MIN_BANKS_CONTACTED',
  'VALID_OFFER_EXISTS',
  'EVALUATION_COMPLETE',
  'RECOMMENDED_OFFER_SET',
  'RECOMMENDATION_RATIONALE',
  'MANDATORY_ATTACHMENTS',
  'COMPLETENESS_CONFIRMED',
] as const

export type ReadinessRequirementCode = (typeof readinessRequirementCodes)[number]

export const readinessRequirementLabels: Record<ReadinessRequirementCode, ValueLabels> = {
  REQ_INFO_COMPLETE: { ar: 'استكمال بيانات الطلب الأساسية', en: 'Request information complete' },
  AMOUNT_POSITIVE: { ar: 'إدخال مبلغ استثمار أكبر من صفر', en: 'Amount greater than zero' },
  CURRENCY_SELECTED: { ar: 'اختيار العملة', en: 'Currency selected' },
  TENOR_SELECTED: { ar: 'اختيار مدة الاستثمار', en: 'Tenor selected' },
  LIQUIDITY_COMPLETE: { ar: 'استكمال بيانات السيولة', en: 'Liquidity information complete' },
  LIQUIDITY_EVIDENCE: { ar: 'إرفاق تحليل السيولة', en: 'Liquidity evidence attached' },
  MIN_BANKS_CONTACTED: {
    ar: 'مخاطبة الحد الأدنى من البنوك (3) أو توثيق الاستثناء',
    en: 'Minimum banks contacted or exception documented',
  },
  VALID_OFFER_EXISTS: { ar: 'وجود عرض بنكي ساري واحد على الأقل', en: 'At least one valid offer' },
  EVALUATION_COMPLETE: { ar: 'استكمال تقييم العروض', en: 'Evaluation complete' },
  RECOMMENDED_OFFER_SET: {
    ar: 'تحديد عرض واحد موصى به ساري',
    en: 'Exactly one recommended valid offer',
  },
  RECOMMENDATION_RATIONALE: {
    ar: 'توثيق مبررات التوصية',
    en: 'Recommendation rationale documented',
  },
  MANDATORY_ATTACHMENTS: {
    ar: 'اكتمال المرفقات الإلزامية',
    en: 'Mandatory attachments present',
  },
  COMPLETENESS_CONFIRMED: {
    ar: 'تأكيد الأخصائي اكتمال الطلب',
    en: 'Specialist completeness confirmation',
  },
}

/** Context records needed to evaluate readiness for one request. */
export interface ReadinessContext {
  readonly invitations: readonly BankInvitation[]
  readonly offers: readonly BankOffer[]
  readonly evaluations: readonly OfferEvaluation[]
  readonly attachments: readonly Attachment[]
}

/** Attachment categories mandatory before submission (plan §8.1 #11). */
const submissionMandatoryCategories = ['LIQUIDITY_ANALYSIS', 'BANK_OFFER'] as const

/** Failed readiness checks, in checklist order (plan §8.1). */
export function getMissingRequirements(
  request: InvestmentRequest,
  context: ReadinessContext,
  settings: SystemSettings,
): readonly ReadinessRequirementCode[] {
  const missing: ReadinessRequirementCode[] = []
  const { invitations, offers, evaluations, attachments } = context

  const infoComplete =
    request.title.trim() !== '' &&
    request.purpose.trim() !== '' &&
    request.investmentDate !== null &&
    request.expectedMaturityDate !== null
  if (!infoComplete) missing.push('REQ_INFO_COMPLETE')
  if (!(request.amount > 0)) missing.push('AMOUNT_POSITIVE')
  if (!settings.allowedCurrencies.includes(request.currency)) missing.push('CURRENCY_SELECTED')
  if (!(request.tenorValue > 0)) missing.push('TENOR_SELECTED')

  const liquidity = request.liquidity
  const liquidityComplete =
    liquidity !== null &&
    liquidity.availableLiquidityAmount > 0 &&
    liquidity.amountAvailableForInvestment ===
      liquidity.availableLiquidityAmount - liquidity.requiredOperatingReserve
  if (!liquidityComplete) missing.push('LIQUIDITY_COMPLETE')
  if (!attachments.some((a) => a.category === 'LIQUIDITY_ANALYSIS')) {
    missing.push('LIQUIDITY_EVIDENCE')
  }

  const contactedCount = invitations.filter((inv) => inv.status !== 'NOT_SENT').length
  if (
    contactedCount < settings.minContactedBanks &&
    (request.minimumBanksExceptionReason === null ||
      request.minimumBanksExceptionReason.trim() === '')
  ) {
    missing.push('MIN_BANKS_CONTACTED')
  }

  const eligibleOffers = offers.filter((offer) =>
    isOfferEligible(offer, settings.referenceDate),
  )
  if (eligibleOffers.length === 0) missing.push('VALID_OFFER_EXISTS')

  const evaluatedOfferIds = new Set(evaluations.map((e) => e.offerId))
  const evaluationComplete =
    eligibleOffers.length > 0 && eligibleOffers.every((offer) => evaluatedOfferIds.has(offer.id))
  if (!evaluationComplete) missing.push('EVALUATION_COMPLETE')

  const recommendedEligible = eligibleOffers.filter((offer) => offer.isRecommended)
  const recommendationMatches =
    recommendedEligible.length === 1 &&
    request.recommendation !== null &&
    request.recommendation.recommendedOfferId === recommendedEligible[0]?.id
  if (!recommendationMatches) missing.push('RECOMMENDED_OFFER_SET')
  if (request.recommendation === null || request.recommendation.rationale.trim() === '') {
    missing.push('RECOMMENDATION_RATIONALE')
  }

  const presentCategories = new Set(attachments.map((a) => a.category))
  if (!submissionMandatoryCategories.every((category) => presentCategories.has(category))) {
    missing.push('MANDATORY_ATTACHMENTS')
  }
  if (!request.completenessConfirmed) missing.push('COMPLETENESS_CONFIRMED')

  return missing
}

export interface ReadinessResult {
  readonly percentage: number
  readonly missingCodes: readonly ReadinessRequirementCode[]
}

/** Readiness = completed checks ÷ total checks, as a whole percentage. */
export function getReadiness(
  request: InvestmentRequest,
  context: ReadinessContext,
  settings: SystemSettings,
): ReadinessResult {
  const missingCodes = getMissingRequirements(request, context, settings)
  const total = readinessRequirementCodes.length
  const percentage = Math.round(((total - missingCodes.length) / total) * 100)
  return { percentage, missingCodes }
}

/** Submission gate: every readiness check must pass (Submission Rules). */
export function canSubmit(
  request: InvestmentRequest,
  context: ReadinessContext,
  settings: SystemSettings,
): boolean {
  return getMissingRequirements(request, context, settings).length === 0
}
