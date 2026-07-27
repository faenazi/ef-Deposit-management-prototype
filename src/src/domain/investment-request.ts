import type { RoleCode } from '@/domain/roles'
import type { Currency, IsoDateString, TenorUnit, ValueLabels } from '@/domain/common'
import type { ApprovalStage } from '@/domain/approval'
import type { TaskPriority } from '@/domain/task'

/**
 * Investment request statuses — the single source of truth is
 * docs/02-business/statuses-and-transitions.md (DEC-012). No other status
 * may exist; list views such as «طلبات تتجاوز 100 مليون ريال» are filters,
 * never new statuses.
 */
export const investmentRequestStatuses = [
  'DRAFT',
  'RETURNED_FOR_COMPLETION',
  'PENDING_TREASURY_GM_APPROVAL',
  'PENDING_EXECUTIVE_APPROVAL',
  'PENDING_WINNING_BANK_COMPLETION',
  'PENDING_INVESTMENT_SUPPORT_REVIEW',
  'PENDING_FINANCE_REVIEW',
  'PENDING_ACCOUNTING_EXECUTION',
  'PENDING_DEPOSIT_ACTIVATION',
  'CONVERTED_TO_ACTIVE_DEPOSIT',
  'REJECTED',
  'CANCELLED',
] as const

export type InvestmentRequestStatus = (typeof investmentRequestStatuses)[number]

export const investmentRequestStatusLabels: Record<InvestmentRequestStatus, ValueLabels> = {
  DRAFT: { ar: 'مسودة', en: 'Draft' },
  RETURNED_FOR_COMPLETION: { ar: 'معاد للاستكمال', en: 'Returned for Completion' },
  PENDING_TREASURY_GM_APPROVAL: {
    ar: 'بانتظار اعتماد مدير عام الخزينة',
    en: 'Pending Treasury GM Approval',
  },
  PENDING_EXECUTIVE_APPROVAL: {
    ar: 'بانتظار اعتماد المدير التنفيذي لقطاع الاستثمار والخزينة',
    en: 'Pending Executive Approval',
  },
  PENDING_WINNING_BANK_COMPLETION: {
    ar: 'بانتظار استكمال بيانات البنك الفائز',
    en: 'Pending Winning Bank Completion',
  },
  PENDING_INVESTMENT_SUPPORT_REVIEW: {
    ar: 'بانتظار مراجعة دعم الاستثمار',
    en: 'Pending Investment Support Review',
  },
  PENDING_FINANCE_REVIEW: { ar: 'بانتظار مراجعة المالية', en: 'Pending Finance Review' },
  PENDING_ACCOUNTING_EXECUTION: {
    ar: 'بانتظار تنفيذ المحاسبة',
    en: 'Pending Accounting Execution',
  },
  PENDING_DEPOSIT_ACTIVATION: {
    ar: 'بانتظار تفعيل الوديعة',
    en: 'Pending Deposit Activation',
  },
  CONVERTED_TO_ACTIVE_DEPOSIT: {
    ar: 'تم التحويل إلى وديعة نشطة',
    en: 'Converted to Active Deposit',
  },
  REJECTED: { ar: 'مرفوض', en: 'Rejected' },
  CANCELLED: { ar: 'ملغي', en: 'Cancelled' },
}

/**
 * Draft section completion states (statuses-and-transitions.md).
 * These never change the overall request status (CLAUDE.md §11).
 */
export const sectionCompletionStatuses = [
  'NOT_STARTED',
  'IN_PROGRESS',
  'COMPLETE',
  'MISSING_REQUIREMENTS',
] as const

export type SectionCompletionStatus = (typeof sectionCompletionStatuses)[number]

export const sectionCompletionStatusLabels: Record<SectionCompletionStatus, ValueLabels> = {
  NOT_STARTED: { ar: 'لم يبدأ', en: 'Not Started' },
  IN_PROGRESS: { ar: 'قيد الاستكمال', en: 'In Progress' },
  COMPLETE: { ar: 'مكتمل', en: 'Complete' },
  MISSING_REQUIREMENTS: { ar: 'توجد نواقص', en: 'Missing Requirements' },
}

/** The canonical 15 workspace sections (DEC-016, information-architecture.md). */
export const sectionKeys = [
  'overview',
  'request-information',
  'liquidity',
  'bank-rfq',
  'bank-offers',
  'evaluation-recommendation',
  'approval-history',
  'winning-bank',
  'investment-support-review',
  'finance-review',
  'accounting-execution',
  'deposit-activation',
  'attachments',
  'notes',
  'activity-history',
] as const

export type SectionKey = (typeof sectionKeys)[number]

export const sectionLabels: Record<SectionKey, ValueLabels> = {
  overview: { ar: 'نظرة عامة', en: 'Overview' },
  'request-information': { ar: 'بيانات الطلب', en: 'Request information' },
  liquidity: { ar: 'بيانات السيولة', en: 'Liquidity information' },
  'bank-rfq': { ar: 'مخاطبات البنوك', en: 'Bank communications' },
  'bank-offers': { ar: 'العروض المستلمة', en: 'Received offers' },
  'evaluation-recommendation': { ar: 'التقييم والتوصية', en: 'Evaluation and recommendation' },
  'approval-history': { ar: 'سجل الاعتمادات', en: 'Approval history' },
  'winning-bank': { ar: 'بيانات البنك الفائز', en: 'Winning-bank details' },
  'investment-support-review': { ar: 'مراجعة دعم الاستثمار', en: 'Investment Support review' },
  'finance-review': { ar: 'مراجعة الإدارة المالية', en: 'Finance review' },
  'accounting-execution': { ar: 'تنفيذ التحويل المحاسبي', en: 'Accounting execution' },
  'deposit-activation': { ar: 'تفعيل الوديعة', en: 'Deposit activation' },
  attachments: { ar: 'المرفقات', en: 'Attachments' },
  notes: { ar: 'الملاحظات', en: 'Notes' },
  'activity-history': { ar: 'سجل النشاط', en: 'Activity history' },
}

/**
 * The draft preparation sections tracked by section-completion indicators
 * (CLAUDE.md §11). The remaining workspace sections are records or
 * post-approval stages and are not part of draft readiness.
 */
export const preparationSectionKeys = [
  'request-information',
  'liquidity',
  'bank-rfq',
  'bank-offers',
  'evaluation-recommendation',
  'attachments',
] as const

export type PreparationSectionKey = (typeof preparationSectionKeys)[number]

/** Per-section draft progress map (plan §4.5 — gap G-01 addition). */
export type SectionCompletionMap = Record<PreparationSectionKey, SectionCompletionStatus>

/**
 * Structured liquidity information (plan §4.6 — gap G-01 addition;
 * fields per docs/08-design-specifications/04-transaction-workspace.md §9).
 */
export interface LiquidityInformation {
  readonly availableLiquidityAmount: number
  readonly requiredOperatingReserve: number
  /** Must equal available − reserve (integrity-checked). */
  readonly amountAvailableForInvestment: number
  readonly forecastPeriod: string
  readonly sourceDate: IsoDateString
  readonly preparedByUserId: string
  readonly summaryNotes: string
  readonly attachmentIds: readonly string[]
}

/**
 * Treasury recommendation record (evaluation-and-recommendation.md —
 * Recommendation Record). Embedded on the request; exactly one recommended
 * offer per request at submission time.
 */
export interface TreasuryRecommendation {
  readonly recommendedOfferId: string
  readonly recommendedBankId: string
  readonly recommendedAmount: number
  readonly recommendedTenorValue: number
  readonly recommendedTenorUnit: TenorUnit
  readonly recommendedRate: number
  readonly expectedReturnAmount: number
  /** Mandatory written business justification. */
  readonly rationale: string
  readonly keyRisks: string
  readonly alternativesConsidered: string
  readonly recommendedByUserId: string
  readonly recommendedAt: IsoDateString
}

/**
 * Winning-bank and IBAN details completed after final investment approval
 * (domain-model.md — WinningBankDetails; execution-and-activation.md Stage 1).
 */
export interface WinningBankDetails {
  readonly bankId: string
  readonly winningOfferId: string
  readonly beneficiaryName: string
  readonly iban: string
  readonly bankAccountNumber: string
  readonly bankSwiftCode: string
  readonly transferAmount: number
  /** تاريخ بدء الوديعة (DEC-020). */
  readonly valueDate: IsoDateString
  readonly depositReference: string
  readonly ibanCertificateAttachmentId: string | null
  readonly relationshipManagerDetails: string
  readonly finalRate: number
  /** Mandatory when the winning offer differs from the approved recommendation. */
  readonly controlledChangeJustification: string | null
  readonly notes: string
  readonly verifiedByUserId: string | null
  readonly verifiedAt: IsoDateString | null
}

/**
 * The primary business object — one investment decision case
 * (domain-model.md — InvestmentRequest, plan §4.4).
 */
export interface InvestmentRequest {
  readonly id: string
  /** `IR-2026-####` (DEC-020) — display identifier, stable across resets. */
  readonly requestNumber: string
  readonly title: string
  readonly status: InvestmentRequestStatus
  readonly currentStage: ApprovalStage
  readonly currentOwnerRoleId: RoleCode | null
  /** Null for group-owned stages until a user acts. */
  readonly currentOwnerUserId: string | null
  readonly createdByUserId: string
  readonly createdAt: IsoDateString
  readonly updatedAt: IsoDateString
  readonly submittedAt: IsoDateString | null
  /** The stage the current status was entered — SLA aging input. */
  readonly stageEnteredAt: IsoDateString
  readonly amount: number
  /**
   * Amount captured at last submission — the routing threshold input
   * (DEC-017 #5). Null until first submission.
   */
  readonly submittedAmount: number | null
  readonly currency: Currency
  readonly tenorValue: number
  readonly tenorUnit: TenorUnit
  /** Target placement date. */
  readonly investmentDate: IsoDateString | null
  readonly expectedMaturityDate: IsoDateString | null
  readonly purpose: string
  /** Short display summary; the structured block is `liquidity`. */
  readonly liquiditySummary: string
  readonly liquidity: LiquidityInformation | null
  readonly sectionCompletion: SectionCompletionMap
  readonly priority: TaskPriority
  readonly invitedBankIds: readonly string[]
  readonly offerIds: readonly string[]
  readonly recommendation: TreasuryRecommendation | null
  /** Documented exception when fewer than the minimum banks were contacted. */
  readonly minimumBanksExceptionReason: string | null
  /** Specialist completeness confirmation — readiness check `COMPLETENESS_CONFIRMED`. */
  readonly completenessConfirmed: boolean
  /**
   * Derived via business rules and recomputed after every edit; stored for
   * display stability and verified by the integrity checker.
   */
  readonly readinessPercentage: number
  readonly missingRequirementCodes: readonly string[]
  /** Mandatory when status is RETURNED_FOR_COMPLETION (R-13). */
  readonly returnReason: string | null
  /** The stage that returned the request — resume target (R-08). */
  readonly returnedFromStage: ApprovalStage | null
  /** Mandatory when status is REJECTED (R-13). */
  readonly rejectionReason: string | null
  /** Mandatory when status is CANCELLED (R-13). */
  readonly cancellationReason: string | null
  readonly winningBankDetails: WinningBankDetails | null
  readonly approvalIds: readonly string[]
  readonly taskIds: readonly string[]
  readonly attachmentIds: readonly string[]
  readonly activityIds: readonly string[]
  /** Set only for reinvestment-originated requests (R-17). */
  readonly sourceDepositId: string | null
  /** Set only when CONVERTED_TO_ACTIVE_DEPOSIT (R-16). */
  readonly createdDepositId: string | null
}
