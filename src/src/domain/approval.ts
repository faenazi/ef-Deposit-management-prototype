import type { RoleCode } from '@/domain/roles'
import type { IsoDateString, ValueLabels } from '@/domain/common'

/**
 * Workflow stages (plan §3.5; statuses-and-transitions.md transitions;
 * Arabic labels per transaction-workspace.md and DEC-020).
 * `EXECUTIVE_APPROVAL` joins a request's route only when the submitted
 * amount exceeds the SAR 100M threshold; the workflow rail shows it as
 * skipped (متجاوز) otherwise — a display state, never a persisted value.
 */
export const approvalStages = [
  'DRAFT_PREPARATION',
  'TREASURY_GM_APPROVAL',
  'EXECUTIVE_APPROVAL',
  'WINNING_BANK_COMPLETION',
  'INVESTMENT_SUPPORT_REVIEW',
  'FINANCE_REVIEW',
  'ACCOUNTING_EXECUTION',
  'DEPOSIT_ACTIVATION',
] as const

export type ApprovalStage = (typeof approvalStages)[number]

export const approvalStageLabels: Record<ApprovalStage, ValueLabels> = {
  DRAFT_PREPARATION: { ar: 'إعداد الطلب', en: 'Draft preparation' },
  TREASURY_GM_APPROVAL: { ar: 'اعتماد مدير عام الخزينة', en: 'Treasury GM approval' },
  EXECUTIVE_APPROVAL: {
    ar: 'اعتماد المدير التنفيذي لقطاع الاستثمار والخزينة',
    en: 'Executive approval',
  },
  WINNING_BANK_COMPLETION: {
    ar: 'استكمال بيانات البنك الفائز',
    en: 'Winning bank completion',
  },
  INVESTMENT_SUPPORT_REVIEW: { ar: 'مراجعة دعم الاستثمار', en: 'Investment Support review' },
  FINANCE_REVIEW: { ar: 'مراجعة الإدارة المالية', en: 'Finance review' },
  ACCOUNTING_EXECUTION: { ar: 'تنفيذ التحويل المحاسبي', en: 'Accounting execution' },
  DEPOSIT_ACTIVATION: { ar: 'تفعيل الوديعة', en: 'Deposit activation' },
}

/** Approval decisions (domain-model.md — Approval approved decisions). */
export const approvalDecisions = [
  'PENDING',
  'APPROVED',
  'RETURNED',
  'REJECTED',
  'CANCELLED',
] as const

export type ApprovalDecision = (typeof approvalDecisions)[number]

export const approvalDecisionLabels: Record<ApprovalDecision, ValueLabels> = {
  PENDING: { ar: 'بانتظار القرار', en: 'Pending' },
  APPROVED: { ar: 'معتمد', en: 'Approved' },
  RETURNED: { ar: 'معاد', en: 'Returned' },
  REJECTED: { ar: 'مرفوض', en: 'Rejected' },
  CANCELLED: { ar: 'ملغي', en: 'Cancelled' },
}

/**
 * One record per decision step in the request lifecycle — the append-only
 * approval history (domain-model.md — Approval, plan §4.12–4.14).
 * A `RETURNED` decision keeps its record; resubmission opens a new decision
 * cycle (`sequence` increments) while earlier cycles remain visible.
 */
export interface Approval {
  readonly id: string
  readonly investmentRequestId: string
  readonly stage: ApprovalStage
  readonly approverRoleId: RoleCode
  /** Null while the decision is PENDING and unclaimed. */
  readonly approverUserId: string | null
  readonly decision: ApprovalDecision
  readonly decisionAt: IsoDateString | null
  readonly comments: string | null
  /** Target role of a RETURNED decision (R-13: return identifies the target). */
  readonly returnToRoleId: RoleCode | null
  /** Decision cycle number — increments on each resubmission. */
  readonly sequence: number
  readonly createdAt: IsoDateString
}
