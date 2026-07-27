import type { BankInvitation, BankOffer, OfferStatus } from '@/domain/offer'
import type { SeededRandom } from '@/mock-data/seed'
import { calculateExpectedReturn, getTenorDays } from '@/domain/business-rules'
import { addDays } from '@/lib/dates'
import type { CuratedOfferSpec, RequestSeedSpec } from '@/mock-data/investment-requests'
import { earlyBreakTermsPool, productTypes, specialConditionsPool } from '@/mock-data/phrases'

/**
 * Bank-offer builder (mock-data-requirements.md — Bank Offers): offers are
 * internally consistent with their requests, expected returns come from the
 * central formula (R-10), maturity follows value date + tenor, and expired
 * offers have `validUntil` before the reference date.
 */

/** Plausible fictional base rates per tenor in months. */
const baseRateByTenor: Record<number, number> = {
  2: 4.45,
  3: 4.7,
  6: 5.1,
  9: 5.35,
  12: 5.6,
}

export interface BuildOffersArgs {
  readonly spec: RequestSeedSpec
  readonly requestId: string
  readonly rng: SeededRandom
  readonly nextId: () => string
  readonly invitations: readonly BankInvitation[]
  /** Deposit value date (historical) or target investment date (in-flight). */
  readonly valueDate: string
  /** Day the offers were received. */
  readonly receivedDay: string
  readonly receivedByUserId: string
  /** Whether offers must stay valid past the reference date (in-flight). */
  readonly keepValid: boolean
  readonly referenceDay: string
  /** Forces the recommended bank's offer rate (converted requests carry the deposit rate). */
  readonly recommendedRateOverride?: number
  readonly ts: (day: string, hour: number) => string
}

function buildOffer(
  args: BuildOffersArgs,
  invitation: BankInvitation,
  index: number,
  curated: CuratedOfferSpec | undefined,
): BankOffer {
  const { spec, rng } = args
  const tenorDays = getTenorDays(spec.tenorMonths, 'MONTHS')
  const base = baseRateByTenor[spec.tenorMonths] ?? 5.0
  const generatedRate = rng.step(base - 0.25, base + 0.3, 0.05)
  const annualRate =
    curated?.annualRate ??
    (invitation.bankId === spec.recommendedBankId && args.recommendedRateOverride !== undefined
      ? args.recommendedRateOverride
      : generatedRate)
  const maturityDate = addDays(args.valueDate, tenorDays)
  const missingValidity = curated?.missingValidity === true
  // Offers stay valid ~3 weeks past receipt; in-flight recommended offers
  // must remain valid past the reference date for the approval cycle.
  const validUntil = missingValidity
    ? null
    : args.keepValid
      ? addDays(args.referenceDay, 15 + rng.int(0, 15))
      : addDays(args.receivedDay, 21)
  const restrictive = curated?.restrictiveConditions === true
  const specialConditions = restrictive
    ? 'شروط مقيدة: لا يسمح بالكسر المبكر إلا بموافقة خطية مسبقة مع خصم كامل للعائد.'
    : rng.chance(0.3)
      ? rng.pick(specialConditionsPool)
      : null

  return {
    id: args.nextId(),
    investmentRequestId: args.requestId,
    bankId: invitation.bankId,
    invitationId: invitation.id,
    offerReference: `${invitation.bankId.replace('BNK-', 'REF-')}-${args.receivedDay.replaceAll('-', '')}-${index + 1}`,
    receivedAt: args.ts(args.receivedDay, 11),
    receivedByUserId: args.receivedByUserId,
    amount: spec.amount,
    currency: 'SAR',
    tenorValue: spec.tenorMonths,
    tenorUnit: 'MONTHS',
    annualRate,
    expectedReturnAmount: calculateExpectedReturn(spec.amount, annualRate, tenorDays),
    valueDate: args.valueDate,
    maturityDate,
    validUntil,
    isShariaCompliant: rng.chance(0.5),
    productType: rng.pick(productTypes),
    specialConditions,
    earlyBreakTerms: rng.chance(0.6) ? rng.pick(earlyBreakTermsPool) : null,
    partialBreakAvailable: rng.chance(0.35),
    status: missingValidity ? 'INCOMPLETE' : 'VALID',
    // Recommendation flag and score are finalized by the evaluation builder.
    isRecommended: false,
    evaluationScore: null,
    attachmentIds: [],
  }
}

/**
 * Builds the offer set for one request: one offer per responding bank
 * (curated overrides for scenario-critical requests), plus — on a
 * deterministic subset of non-curated requests — an alternative-tenor
 * offer from an already-responding bank that demonstrates the expired and
 * withdrawn statuses (mock-data-requirements.md — Bank Offers).
 *
 * Variety offers are never recommended and never evaluated, so they add
 * realistic comparison noise without affecting readiness or scenarios.
 */
export function buildOffers(args: BuildOffersArgs): BankOffer[] {
  const responded = args.invitations.filter((inv) => inv.status === 'RESPONSE_RECEIVED')
  const offers: BankOffer[] = []
  responded.forEach((invitation, index) => {
    const curated = args.spec.curatedOffers?.find((c) => c.bankId === invitation.bankId)
    offers.push(buildOffer(args, invitation, index, curated))
  })

  const eligibleForVariety = args.spec.curatedOffers === undefined && responded.length > 0
  if (!eligibleForVariety) {
    return offers
  }
  const host = responded[responded.length - 1]
  if (host === undefined) {
    return offers
  }
  // Deterministic selection keyed to the request sequence — no randomness.
  if (args.spec.sequence % 3 === 0) {
    offers.push(withStatus(buildOffer(args, host, responded.length, undefined), 'EXPIRED', args))
  }
  if (args.spec.sequence % 5 === 0) {
    offers.push(withStatus(buildOffer(args, host, responded.length + 1, undefined), 'WITHDRAWN', args))
  }
  return offers
}

/**
 * Re-stamps a generated offer as an alternative-tenor variant in a
 * non-selectable status. Expired variants carry a `validUntil` before the
 * reference date so the stored status and the derived expiry agree.
 */
function withStatus(
  offer: BankOffer,
  status: Extract<OfferStatus, 'EXPIRED' | 'WITHDRAWN'>,
  args: BuildOffersArgs,
): BankOffer {
  return {
    ...offer,
    status,
    validUntil:
      status === 'EXPIRED' ? addDays(args.referenceDay, -args.rng.int(3, 20)) : offer.validUntil,
  }
}
