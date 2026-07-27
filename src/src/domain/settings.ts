import type { Currency, IsoDateString } from '@/domain/common'
import type { ApprovalStage } from '@/domain/approval'

/**
 * Centralized configurable prototype values (plan §4.29 — gap G-01;
 * docs/03-functional/settings.md; DEC-017). Consumed by the business rules —
 * never hardcoded in components. System Administrator edits only; reset
 * restores these defaults.
 */
export interface SystemSettings {
  /** SAR 100,000,000 — inclusive lower path (R-01). */
  readonly approvalThresholdSar: number
  /** Minimum contacted banks before submission (R-09). */
  readonly minContactedBanks: number
  /** Maturity warning window in calendar days (R-11). */
  readonly maturityWarningDays: number
  /** Stage SLAs in business days (R-12). */
  readonly slaByStage: Readonly<Partial<Record<ApprovalStage, number>>>
  readonly allowedCurrencies: readonly Currency[]
  /** Standard tenors in months (glossary). */
  readonly standardTenors: readonly number[]
  /** The prototype reference "today" — the only date source (DEC-019). */
  readonly referenceDate: IsoDateString
  /** Banking day-count basis for the expected-return formula (R-10). */
  readonly dayCountBasis: number
}
