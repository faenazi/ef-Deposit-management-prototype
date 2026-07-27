import type { SystemSettings } from '@/domain/settings'
import { PROTOTYPE_REFERENCE_DATE } from '@/mock-data/reference-date'

/**
 * Deterministic default configuration (DEC-017; plan §4.29). The demo reset
 * restores exactly these values. Business rules read the live copy from the
 * in-memory store — never these constants directly.
 */
export const defaultSystemSettings: SystemSettings = {
  approvalThresholdSar: 100_000_000,
  minContactedBanks: 3,
  maturityWarningDays: 14,
  slaByStage: {
    TREASURY_GM_APPROVAL: 2,
    EXECUTIVE_APPROVAL: 2,
    INVESTMENT_SUPPORT_REVIEW: 1,
    FINANCE_REVIEW: 1,
    ACCOUNTING_EXECUTION: 1,
    DEPOSIT_ACTIVATION: 1,
  },
  allowedCurrencies: ['SAR'],
  standardTenors: [2, 3, 6, 9, 12],
  referenceDate: PROTOTYPE_REFERENCE_DATE,
  dayCountBasis: 360,
}
