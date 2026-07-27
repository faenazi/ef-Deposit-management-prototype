import type { BankOffer, EvaluationCriterion, OfferEvaluation } from '@/domain/offer'
import type { SeededRandom } from '@/mock-data/seed'

/**
 * Offer-evaluation builder (evaluation-and-recommendation.md): weighted
 * scores over the seven criteria; the recommended offer ranks first so the
 * recommendation is always supported by the evaluation — even when a
 * competitor quotes a higher rate (concentration/operational trade-offs).
 */

export interface BuildEvaluationsArgs {
  readonly requestId: string
  readonly rng: SeededRandom
  readonly nextId: () => string
  readonly offers: readonly BankOffer[]
  readonly criteria: readonly EvaluationCriterion[]
  /** Bank whose offer must rank first, or null when no recommendation yet. */
  readonly recommendedBankId: string | null
  /** Banks with visible concentration pressure (scored lower). */
  readonly highExposureBankIds: readonly string[]
  readonly evaluatedByUserId: string
  readonly evaluatedAt: string
}

export interface BuildEvaluationsResult {
  readonly evaluations: readonly OfferEvaluation[]
  /** Offers with `evaluationScore`, `isRecommended`, and rank applied. */
  readonly scoredOffers: readonly BankOffer[]
}

export function buildEvaluations(args: BuildEvaluationsArgs): BuildEvaluationsResult {
  const evaluatable = args.offers.filter((offer) => offer.status === 'VALID')
  const maxRate = Math.max(...evaluatable.map((offer) => offer.annualRate), 0)

  interface ScoredDraft {
    readonly offer: BankOffer
    readonly criterionScores: Record<string, number>
    weightedScore: number
  }

  const drafts: ScoredDraft[] = evaluatable.map((offer) => {
    const criterionScores: Record<string, number> = {}
    for (const criterion of args.criteria) {
      let score: number
      switch (criterion.code) {
        case 'ANNUAL_RATE':
        case 'EXPECTED_RETURN':
          score = maxRate === 0 ? 70 : Math.round(70 + (offer.annualRate / maxRate) * 25)
          break
        case 'CONCENTRATION_IMPACT':
          score = args.highExposureBankIds.includes(offer.bankId)
            ? args.rng.int(45, 60)
            : args.rng.int(80, 95)
          break
        case 'SPECIAL_CONDITIONS':
          score = offer.specialConditions === null ? args.rng.int(85, 95) : args.rng.int(50, 70)
          break
        default:
          score = args.rng.int(65, 95)
      }
      criterionScores[criterion.code] = score
    }
    const weightedScore =
      Math.round(
        args.criteria.reduce(
          (total, criterion) =>
            total + (criterionScores[criterion.code] ?? 0) * criterion.weight,
          0,
        ) / 10,
      ) / 10
    return { offer, criterionScores, weightedScore }
  })

  // The recommended bank's offer must carry the highest weighted score.
  if (args.recommendedBankId !== null) {
    const top = Math.max(...drafts.map((draft) => draft.weightedScore), 0)
    for (const draft of drafts) {
      if (draft.offer.bankId === args.recommendedBankId) {
        draft.weightedScore = Math.round((top + 2.5) * 10) / 10
      }
    }
  }

  const ranked = [...drafts].sort((a, b) => b.weightedScore - a.weightedScore)

  const evaluations: OfferEvaluation[] = ranked.map((draft, index) => ({
    id: args.nextId(),
    investmentRequestId: args.requestId,
    offerId: draft.offer.id,
    criterionScores: draft.criterionScores,
    weightedScore: draft.weightedScore,
    rank: index + 1,
    decision:
      args.recommendedBankId !== null && draft.offer.bankId === args.recommendedBankId
        ? 'RECOMMENDED'
        : 'NOT_RECOMMENDED',
    exclusionJustification: null,
    reviewerNotes:
      index === 0 && args.recommendedBankId !== null
        ? 'الأعلى في الدرجة الموزونة وفق معايير التقييم المعتمدة.'
        : null,
    evaluatedByUserId: args.evaluatedByUserId,
    evaluatedAt: args.evaluatedAt,
  }))

  const scoreByOfferId = new Map(ranked.map((draft) => [draft.offer.id, draft.weightedScore]))
  const scoredOffers: BankOffer[] = args.offers.map((offer) => {
    const score = scoreByOfferId.get(offer.id)
    if (score === undefined) {
      return offer
    }
    return {
      ...offer,
      evaluationScore: score,
      isRecommended:
        args.recommendedBankId !== null && offer.bankId === args.recommendedBankId,
    }
  })

  return { evaluations, scoredOffers }
}
