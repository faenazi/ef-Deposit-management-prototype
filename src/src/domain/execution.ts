import type { IsoDateString, ValueLabels } from '@/domain/common'

/** Investment Support decision (execution-and-activation.md Stage 2). */
export const investmentSupportDecisions = ['PENDING', 'APPROVED', 'RETURNED', 'REJECTED'] as const

export type InvestmentSupportDecision = (typeof investmentSupportDecisions)[number]

export const investmentSupportDecisionLabels: Record<InvestmentSupportDecision, ValueLabels> = {
  PENDING: { ar: 'بانتظار القرار', en: 'Pending' },
  APPROVED: { ar: 'معتمد', en: 'Approved' },
  RETURNED: { ar: 'معاد', en: 'Returned' },
  REJECTED: { ar: 'مرفوض', en: 'Rejected' },
}

/** The five verifications of execution-and-activation.md Stage 2. */
export interface InvestmentSupportChecklist {
  readonly approvalRouteComplete: boolean
  readonly winningOfferMatchesRecommendation: boolean
  readonly beneficiaryAndIbanComplete: boolean
  readonly mandatoryDocumentsPresent: boolean
  readonly noUnresolvedReturnReason: boolean
}

/**
 * Completeness and control review after winning-bank completion
 * (plan §4.17 — gap G-01 addition).
 */
export interface InvestmentSupportReview {
  readonly id: string
  readonly investmentRequestId: string
  readonly reviewerUserId: string | null
  readonly decision: InvestmentSupportDecision
  readonly checklist: InvestmentSupportChecklist
  readonly comments: string | null
  /** Mandatory when the decision is RETURNED (R-13). */
  readonly returnReason: string | null
  readonly evidenceAttachmentIds: readonly string[]
  readonly reviewedAt: IsoDateString | null
  /** Decision cycle number — a return creates a new record on resubmission. */
  readonly sequence: number
}

/** Finance review decision (execution-and-activation.md Stage 3). */
export const financeReviewDecisions = ['PENDING', 'APPROVED', 'RETURNED', 'REJECTED'] as const

export type FinanceReviewDecision = (typeof financeReviewDecisions)[number]

export const financeReviewDecisionLabels: Record<FinanceReviewDecision, ValueLabels> = {
  PENDING: { ar: 'بانتظار القرار', en: 'Pending' },
  APPROVED: { ar: 'معتمد', en: 'Approved' },
  RETURNED: { ar: 'معاد', en: 'Returned' },
  REJECTED: { ar: 'مرفوض', en: 'Rejected' },
}

/**
 * Finance review — only the information required for financial approval is
 * visible to Finance (domain-model.md — FinanceReview; plan §4.18).
 */
export interface FinanceReview {
  readonly id: string
  readonly investmentRequestId: string
  readonly reviewerUserId: string | null
  readonly reviewStatus: FinanceReviewDecision
  readonly budgetAvailabilityConfirmed: boolean
  readonly cashAvailabilityConfirmed: boolean
  readonly beneficiaryVerified: boolean
  readonly comments: string | null
  /** Mandatory when the decision is RETURNED (R-13). */
  readonly returnReason: string | null
  readonly evidenceAttachmentIds: readonly string[]
  readonly reviewedAt: IsoDateString | null
  readonly sequence: number
}

/** Accounting execution status (execution-and-activation.md Stage 4). */
export const accountingExecutionStatuses = ['PENDING', 'CONFIRMED', 'RETURNED_TO_FINANCE'] as const

export type AccountingExecutionStatus = (typeof accountingExecutionStatuses)[number]

export const accountingExecutionStatusLabels: Record<AccountingExecutionStatus, ValueLabels> = {
  PENDING: { ar: 'بانتظار التنفيذ', en: 'Pending execution' },
  CONFIRMED: { ar: 'تم تنفيذ التحويل', en: 'Transfer executed and confirmed' },
  RETURNED_TO_FINANCE: { ar: 'معاد إلى المالية', en: 'Returned to Finance' },
}

/**
 * Accounting transfer execution (domain-model.md — AccountingExecution).
 * Cannot execute before Finance approval (R-18); transfer amount must match
 * the approved amount unless a documented variance exists (R-19).
 */
export interface AccountingExecution {
  readonly id: string
  readonly investmentRequestId: string
  readonly executorUserId: string | null
  readonly executionStatus: AccountingExecutionStatus
  readonly journalReference: string | null
  readonly paymentReference: string | null
  readonly debitAccount: string | null
  readonly beneficiaryAccount: string | null
  readonly transferDate: IsoDateString | null
  readonly transferAmount: number | null
  /** Mandatory when the transfer amount differs from the approved amount (R-19). */
  readonly varianceJustification: string | null
  readonly transferAttachmentId: string | null
  readonly comments: string | null
  /** Mandatory when returned to Finance (R-13). */
  readonly returnReason: string | null
  readonly executedAt: IsoDateString | null
  readonly sequence: number
}

/**
 * Deposit activation confirmation — the conversion trigger
 * (plan §4.20 — gap G-01 addition; execution-and-activation.md Stage 5).
 * Confirming creates exactly one Deposit and moves the request to
 * CONVERTED_TO_ACTIVE_DEPOSIT (R-16, R-18).
 */
export interface DepositActivation {
  readonly id: string
  readonly investmentRequestId: string
  readonly bankDepositReference: string
  readonly actualValueDate: IsoDateString
  readonly actualMaturityDate: IsoDateString
  readonly confirmedRate: number
  readonly confirmedAmount: number
  readonly certificateAttachmentId: string | null
  readonly activationConfirmationDate: IsoDateString
  readonly confirmedByUserId: string
  readonly notes: string | null
}
