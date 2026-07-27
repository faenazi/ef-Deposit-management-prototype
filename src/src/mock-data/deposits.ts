import type { Deposit, DepositStatus, MaturityAction } from '@/domain/deposit'
import type { IsoDateString } from '@/domain/common'
import { calculateExpectedReturn, getTenorDays } from '@/domain/business-rules'
import { formatSequentialId } from '@/lib/ids'
import { addDays } from '@/lib/dates'
import { PROTOTYPE_REFERENCE_DAY, PROTOTYPE_YEAR } from '@/mock-data/reference-date'

/**
 * Deposit seed table (plan §11.4): 25 deposits mapped 1:1 to converted
 * requests `IR-2026-0031`…`IR-2026-0055` (PD-05). Persisted statuses:
 * 18 ACTIVE (4 inside the 14-day warning window — derived, incl. the
 * scenario-pinned `DEP-2026-0012`), 2 MATURED_ACTION_REQUIRED, 3 CLOSED,
 * 1 REINVESTED, 1 BROKEN_EARLY. `DEP-2026-0008` stays safely outside the
 * window for the early-break scenario. Concentration is visible on
 * `BNK-001` and `BNK-003` (the two high-exposure banks).
 */

export type DepositCategory = 'ACTIVE' | 'NEAR' | 'MATURED' | 'CLOSED' | 'REINVESTED' | 'BROKEN'

export interface DepositSeedSpec {
  readonly sequence: number
  readonly bankId: string
  readonly category: DepositCategory
  /** Maturity date offset from the reference date, in calendar days. */
  readonly maturityOffsetDays: number
  readonly tenorMonths: number
  readonly amount: number
  readonly annualRate: number
  /** Break date offset (BROKEN only). */
  readonly brokenOffsetDays?: number
  /** Reinvestment request sequence when a reinvestment request exists. */
  readonly reinvestmentRequestSequence?: number
}

const M = 1_000_000

export const depositSeedSpecs: readonly DepositSeedSpec[] = [
  { sequence: 1, bankId: 'BNK-001', category: 'ACTIVE', maturityOffsetDays: 45, tenorMonths: 3, amount: 120 * M, annualRate: 4.85 },
  { sequence: 2, bankId: 'BNK-002', category: 'MATURED', maturityOffsetDays: -6, tenorMonths: 6, amount: 60 * M, annualRate: 5.1, reinvestmentRequestSequence: 14 },
  { sequence: 3, bankId: 'BNK-001', category: 'ACTIVE', maturityOffsetDays: 90, tenorMonths: 6, amount: 200 * M, annualRate: 5.2 },
  { sequence: 4, bankId: 'BNK-004', category: 'CLOSED', maturityOffsetDays: -40, tenorMonths: 3, amount: 45 * M, annualRate: 4.6 },
  { sequence: 5, bankId: 'BNK-003', category: 'NEAR', maturityOffsetDays: 5, tenorMonths: 2, amount: 75 * M, annualRate: 4.55 },
  { sequence: 6, bankId: 'BNK-005', category: 'REINVESTED', maturityOffsetDays: -20, tenorMonths: 6, amount: 90 * M, annualRate: 5.05, reinvestmentRequestSequence: 22 },
  { sequence: 7, bankId: 'BNK-001', category: 'ACTIVE', maturityOffsetDays: 160, tenorMonths: 9, amount: 150 * M, annualRate: 5.45 },
  { sequence: 8, bankId: 'BNK-006', category: 'ACTIVE', maturityOffsetDays: 150, tenorMonths: 6, amount: 50 * M, annualRate: 5.0 },
  { sequence: 9, bankId: 'BNK-003', category: 'ACTIVE', maturityOffsetDays: 75, tenorMonths: 6, amount: 110 * M, annualRate: 5.15 },
  { sequence: 10, bankId: 'BNK-007', category: 'CLOSED', maturityOffsetDays: -75, tenorMonths: 3, amount: 35 * M, annualRate: 4.5 },
  { sequence: 11, bankId: 'BNK-002', category: 'ACTIVE', maturityOffsetDays: 210, tenorMonths: 12, amount: 250 * M, annualRate: 5.7 },
  { sequence: 12, bankId: 'BNK-002', category: 'NEAR', maturityOffsetDays: 9, tenorMonths: 3, amount: 85 * M, annualRate: 4.75 },
  { sequence: 13, bankId: 'BNK-004', category: 'ACTIVE', maturityOffsetDays: 120, tenorMonths: 9, amount: 95 * M, annualRate: 5.35 },
  { sequence: 14, bankId: 'BNK-005', category: 'BROKEN', maturityOffsetDays: 60, tenorMonths: 6, amount: 70 * M, annualRate: 5.0, brokenOffsetDays: -30 },
  { sequence: 15, bankId: 'BNK-003', category: 'ACTIVE', maturityOffsetDays: 185, tenorMonths: 12, amount: 180 * M, annualRate: 5.6 },
  { sequence: 16, bankId: 'BNK-006', category: 'ACTIVE', maturityOffsetDays: 30, tenorMonths: 3, amount: 40 * M, annualRate: 4.65 },
  { sequence: 17, bankId: 'BNK-001', category: 'NEAR', maturityOffsetDays: 12, tenorMonths: 6, amount: 130 * M, annualRate: 5.25 },
  { sequence: 18, bankId: 'BNK-007', category: 'ACTIVE', maturityOffsetDays: 240, tenorMonths: 12, amount: 65 * M, annualRate: 5.55 },
  { sequence: 19, bankId: 'BNK-002', category: 'MATURED', maturityOffsetDays: -2, tenorMonths: 3, amount: 55 * M, annualRate: 4.7 },
  { sequence: 20, bankId: 'BNK-004', category: 'ACTIVE', maturityOffsetDays: 100, tenorMonths: 6, amount: 145 * M, annualRate: 5.3 },
  { sequence: 21, bankId: 'BNK-003', category: 'NEAR', maturityOffsetDays: 14, tenorMonths: 3, amount: 100 * M, annualRate: 4.8, reinvestmentRequestSequence: 27 },
  { sequence: 22, bankId: 'BNK-008', category: 'ACTIVE', maturityOffsetDays: 200, tenorMonths: 12, amount: 30 * M, annualRate: 5.5 },
  { sequence: 23, bankId: 'BNK-005', category: 'CLOSED', maturityOffsetDays: -15, tenorMonths: 2, amount: 25 * M, annualRate: 4.4 },
  { sequence: 24, bankId: 'BNK-009', category: 'ACTIVE', maturityOffsetDays: 140, tenorMonths: 9, amount: 80 * M, annualRate: 5.4 },
  { sequence: 25, bankId: 'BNK-005', category: 'ACTIVE', maturityOffsetDays: 260, tenorMonths: 12, amount: 220 * M, annualRate: 5.75 },
]

const statusByCategory: Record<DepositCategory, DepositStatus> = {
  ACTIVE: 'ACTIVE',
  NEAR: 'ACTIVE',
  MATURED: 'MATURED_ACTION_REQUIRED',
  CLOSED: 'CLOSED',
  REINVESTED: 'REINVESTED',
  BROKEN: 'BROKEN_EARLY',
}

export function depositId(sequence: number): string {
  return formatSequentialId('DEP', PROTOTYPE_YEAR, sequence)
}

/** Maturity date of a seed spec, relative to the reference day. */
export function depositMaturityDate(spec: DepositSeedSpec): IsoDateString {
  return addDays(PROTOTYPE_REFERENCE_DAY, spec.maturityOffsetDays)
}

/** Value date = maturity − tenor days (months × 30 convention, PD-07). */
export function depositValueDate(spec: DepositSeedSpec): IsoDateString {
  return addDays(depositMaturityDate(spec), -getTenorDays(spec.tenorMonths, 'MONTHS'))
}

export interface BuildDepositInput {
  readonly spec: DepositSeedSpec
  readonly sourceInvestmentRequestId: string
  readonly reinvestmentRequestId: string | null
  readonly certificateAttachmentId: string | null
  readonly bankConfirmationAttachmentId: string | null
  readonly activityIds: readonly string[]
  readonly attachmentIds: readonly string[]
  readonly createdAt: IsoDateString
}

/** Builds the persisted Deposit record for one seed row. */
export function buildDeposit(input: BuildDepositInput): Deposit {
  const { spec } = input
  const maturityDate = depositMaturityDate(spec)
  const valueDate = depositValueDate(spec)
  const tenorDays = getTenorDays(spec.tenorMonths, 'MONTHS')
  const expectedReturnAmount = calculateExpectedReturn(spec.amount, spec.annualRate, tenorDays)
  const status = statusByCategory[spec.category]

  const brokenAt =
    spec.category === 'BROKEN' && spec.brokenOffsetDays !== undefined
      ? addDays(PROTOTYPE_REFERENCE_DAY, spec.brokenOffsetDays)
      : null
  // Broken deposits realize the accrued return to the break date minus a
  // fixed penalty margin (fixture arithmetic via the central formula, R-10).
  const realizedDays =
    brokenAt === null ? tenorDays : tenorDays - Math.max(0, spec.maturityOffsetDays - (spec.brokenOffsetDays ?? 0))
  const breakPenaltyAmount =
    brokenAt === null ? null : calculateExpectedReturn(spec.amount, 0.5, realizedDays)
  const actualReturnAmount =
    spec.category === 'CLOSED' || spec.category === 'REINVESTED'
      ? expectedReturnAmount
      : brokenAt !== null
        ? Math.max(
            0,
            calculateExpectedReturn(spec.amount, spec.annualRate, realizedDays) -
              (breakPenaltyAmount ?? 0),
          )
        : null

  return {
    id: depositId(spec.sequence),
    depositNumber: depositId(spec.sequence),
    sourceInvestmentRequestId: input.sourceInvestmentRequestId,
    bankId: spec.bankId,
    status,
    principalAmount: spec.amount,
    currency: 'SAR',
    annualRate: spec.annualRate,
    expectedReturnAmount,
    actualReturnAmount,
    valueDate,
    maturityDate,
    tenorValue: spec.tenorMonths,
    tenorUnit: 'MONTHS',
    depositReference: `TD-${spec.bankId.slice(-3)}-${String(2600 + spec.sequence)}`,
    certificateAttachmentId: input.certificateAttachmentId,
    closedAt: spec.category === 'CLOSED' || spec.category === 'REINVESTED' ? maturityDate : null,
    brokenAt,
    breakReason:
      brokenAt === null
        ? null
        : 'احتياج تشغيلي طارئ للسيولة تطلب كسر الوديعة قبل الاستحقاق بعد موافقة مدير عام الخزينة.',
    breakPenaltyAmount,
    bankConfirmationAttachmentId: input.bankConfirmationAttachmentId,
    reinvestmentRequestId: input.reinvestmentRequestId,
    activityIds: input.activityIds,
    attachmentIds: input.attachmentIds,
    createdAt: input.createdAt,
  }
}

export interface BuildMaturityActionInput {
  readonly id: string
  readonly spec: DepositSeedSpec
  readonly actionType: MaturityAction['actionType']
  readonly decisionByUserId: string
  readonly resultingRequestId: string | null
  readonly decisionAt: IsoDateString
  readonly notes: string | null
}

export function buildMaturityAction(input: BuildMaturityActionInput): MaturityAction {
  return {
    id: input.id,
    depositId: depositId(input.spec.sequence),
    actionType: input.actionType,
    decisionByUserId: input.decisionByUserId,
    decisionAt: input.decisionAt,
    notes: input.notes,
    resultingRequestId: input.resultingRequestId,
  }
}
