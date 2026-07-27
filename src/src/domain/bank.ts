import type { BankRiskCategory } from '@/domain/common'

/**
 * Bank reference data (docs/05-data/domain-model.md — Bank).
 * Fictional Saudi-market banks; monogram placeholders only, never real
 * bank branding.
 *
 * Derived override (plan PD-06): current exposure amount/percentage are
 * NOT stored here — they are computed centrally from active deposits by
 * the analytics selectors so exposure always reconciles with the
 * portfolio. See `services/analytics.ts` `getBankExposures`.
 */
export interface Bank {
  readonly id: string
  readonly code: string
  readonly nameAr: string
  readonly nameEn: string
  readonly shortName: string
  /** Local placeholder asset path, or null when the monogram is used. */
  readonly logoUrl: string | null
  /** Short Arabic monogram rendered locally — no real bank branding. */
  readonly monogram: string
  readonly relationshipManagerName: string
  readonly relationshipManagerEmail: string
  readonly relationshipManagerPhone: string
  readonly isActive: boolean
  readonly riskCategory: BankRiskCategory
}

/** Bank exposure figures — always derived, never persisted (PD-06). */
export interface BankExposure {
  readonly bankId: string
  readonly activeDepositCount: number
  readonly exposureAmount: number
  readonly exposurePercentage: number
}
