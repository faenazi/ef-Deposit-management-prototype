import type { Currency, IsoDateString, TenorUnit, ValueLabels } from '@/domain/common'

/**
 * Deposit statuses (statuses-and-transitions.md — single source, DEC-012).
 * «تقترب من الاستحقاق» (Approaching Maturity) is derived from the 14-day
 * warning window and must never appear in this union.
 */
export const depositStatuses = [
  'ACTIVE',
  'MATURED_ACTION_REQUIRED',
  'REINVESTED',
  'CLOSED',
  'BROKEN_EARLY',
] as const

export type DepositStatus = (typeof depositStatuses)[number]

export const depositStatusLabels: Record<DepositStatus, ValueLabels> = {
  ACTIVE: { ar: 'نشطة', en: 'Active' },
  MATURED_ACTION_REQUIRED: { ar: 'مستحقة وتتطلب إجراء', en: 'Matured – Action Required' },
  REINVESTED: { ar: 'معاد استثمارها', en: 'Reinvested' },
  CLOSED: { ar: 'مغلقة', en: 'Closed' },
  BROKEN_EARLY: { ar: 'مكسورة قبل الاستحقاق', en: 'Broken Early' },
}

/**
 * Active or historical deposit (domain-model.md — Deposit, plan §4.21).
 * `daysToMaturity` is derived centrally from the reference date (PD-06),
 * never seeded. Historical terms are immutable.
 */
export interface Deposit {
  readonly id: string
  /** `DEP-2026-####` (DEC-020). */
  readonly depositNumber: string
  /** Exactly one completed source request (R-16). */
  readonly sourceInvestmentRequestId: string
  readonly bankId: string
  readonly status: DepositStatus
  readonly principalAmount: number
  readonly currency: Currency
  /** Annual rate in percent. */
  readonly annualRate: number
  /** Must equal the central formula output (R-10) — integrity-checked. */
  readonly expectedReturnAmount: number
  /** Populated only for closed or broken deposits — expected vs realized stay distinguishable. */
  readonly actualReturnAmount: number | null
  /** تاريخ بدء الوديعة (DEC-020). */
  readonly valueDate: IsoDateString
  readonly maturityDate: IsoDateString
  readonly tenorValue: number
  readonly tenorUnit: TenorUnit
  readonly depositReference: string
  readonly certificateAttachmentId: string | null
  readonly closedAt: IsoDateString | null
  readonly brokenAt: IsoDateString | null
  /** Mandatory for BROKEN_EARLY (deposit-lifecycle.md Early Break Principle). */
  readonly breakReason: string | null
  readonly breakPenaltyAmount: number | null
  readonly bankConfirmationAttachmentId: string | null
  /** Set when a reinvestment request was created from this deposit (R-17). */
  readonly reinvestmentRequestId: string | null
  readonly activityIds: readonly string[]
  readonly attachmentIds: readonly string[]
  readonly createdAt: IsoDateString
}

/** Maturity decision types (domain-model.md — MaturityAction approved types). */
export const maturityActionTypes = ['CLOSE', 'REINVEST', 'EXTEND_REVIEW', 'BREAK_EARLY'] as const

export type MaturityActionType = (typeof maturityActionTypes)[number]

export const maturityActionTypeLabels: Record<MaturityActionType, ValueLabels> = {
  CLOSE: { ar: 'إغلاق عند الاستحقاق', en: 'Close' },
  REINVEST: { ar: 'إعادة استثمار', en: 'Reinvest' },
  EXTEND_REVIEW: { ar: 'تمديد المراجعة', en: 'Extend review' },
  BREAK_EARLY: { ar: 'كسر مبكر', en: 'Break early' },
}

/** One recorded maturity decision (domain-model.md — MaturityAction). */
export interface MaturityAction {
  readonly id: string
  readonly depositId: string
  readonly actionType: MaturityActionType
  readonly decisionByUserId: string
  readonly decisionAt: IsoDateString
  readonly notes: string | null
  /** Set for REINVEST — the created reinvestment request. */
  readonly resultingRequestId: string | null
}
