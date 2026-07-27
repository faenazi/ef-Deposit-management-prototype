import type {
  CommunicationChannel,
  Currency,
  IsoDateString,
  TenorUnit,
  ValueLabels,
} from '@/domain/common'

/** RFQ statuses (bank-rfq.md; business-rules.md Bank RFQ Rules). */
export const rfqStatuses = [
  'NOT_SENT',
  'SENT',
  'RESPONSE_RECEIVED',
  'DECLINED',
  'NO_RESPONSE',
] as const

export type RfqStatus = (typeof rfqStatuses)[number]

export const rfqStatusLabels: Record<RfqStatus, ValueLabels> = {
  NOT_SENT: { ar: 'لم يتم الإرسال', en: 'Not Sent' },
  SENT: { ar: 'تم الإرسال', en: 'Sent' },
  RESPONSE_RECEIVED: { ar: 'تم استلام الرد', en: 'Response Received' },
  DECLINED: { ar: 'اعتذر البنك', en: 'Declined' },
  NO_RESPONSE: { ar: 'لم يرد', en: 'No Response' },
}

/**
 * One RFQ record per contacted bank per request
 * (domain-model.md — BankInvitation; bank-rfq.md Bank Participation Records).
 * Declined and no-response banks remain visible in history. Simulated
 * sending only — no real email.
 */
export interface BankInvitation {
  readonly id: string
  readonly investmentRequestId: string
  readonly bankId: string
  readonly sentAt: IsoDateString | null
  readonly sentByUserId: string | null
  readonly responseDeadline: IsoDateString | null
  readonly communicationChannel: CommunicationChannel
  readonly status: RfqStatus
  readonly responseReceivedAt: IsoDateString | null
  readonly contactPersonName: string
  readonly contactEmail: string
  readonly emailSubject: string | null
  readonly messageSummary: string | null
  readonly declineOrNoResponseReason: string | null
  readonly notes: string | null
  readonly attachmentIds: readonly string[]
}

/** Offer statuses (business-rules.md Bank Offer Rules; Arabic labels per plan G-03). */
export const offerStatuses = ['VALID', 'EXPIRED', 'INCOMPLETE', 'WITHDRAWN', 'REJECTED'] as const

export type OfferStatus = (typeof offerStatuses)[number]

export const offerStatusLabels: Record<OfferStatus, ValueLabels> = {
  VALID: { ar: 'ساري', en: 'Valid' },
  EXPIRED: { ar: 'منتهي الصلاحية', en: 'Expired' },
  INCOMPLETE: { ar: 'غير مكتمل', en: 'Incomplete' },
  WITHDRAWN: { ar: 'مسحوب', en: 'Withdrawn' },
  REJECTED: { ar: 'مرفوض', en: 'Rejected' },
}

/**
 * One quoted offer from one bank (domain-model.md — BankOffer; bank-offers.md).
 * `expectedReturnAmount` is stored for display stability but must exactly
 * equal the central formula output (R-10) — verified by the integrity checker.
 */
export interface BankOffer {
  readonly id: string
  readonly investmentRequestId: string
  readonly bankId: string
  readonly invitationId: string
  readonly offerReference: string
  readonly receivedAt: IsoDateString
  readonly receivedByUserId: string
  readonly amount: number
  readonly currency: Currency
  readonly tenorValue: number
  readonly tenorUnit: TenorUnit
  /** Annual rate in percent, e.g. `5.35`. */
  readonly annualRate: number
  readonly expectedReturnAmount: number
  /** تاريخ بدء الوديعة (DEC-020). */
  readonly valueDate: IsoDateString
  readonly maturityDate: IsoDateString
  /** Determines derived expiry vs the reference date. Null while incomplete. */
  readonly validUntil: IsoDateString | null
  readonly isShariaCompliant: boolean
  readonly productType: string
  readonly specialConditions: string | null
  readonly earlyBreakTerms: string | null
  readonly partialBreakAvailable: boolean
  readonly status: OfferStatus
  readonly isRecommended: boolean
  readonly evaluationScore: number | null
  readonly attachmentIds: readonly string[]
}

/**
 * Configurable comparison criterion (domain-model.md — EvaluationCriterion).
 * The seven prototype criteria are seeded as reference data.
 */
export interface EvaluationCriterion {
  readonly id: string
  readonly code: string
  readonly nameAr: string
  readonly weight: number
  readonly isActive: boolean
  readonly calculationType: 'CALCULATED' | 'MANUAL'
}

/** Per-offer recommendation decision (plan §3.11; evaluation-and-recommendation.md). */
export const recommendationDecisions = ['RECOMMENDED', 'NOT_RECOMMENDED', 'EXCLUDED'] as const

export type RecommendationDecision = (typeof recommendationDecisions)[number]

export const recommendationDecisionLabels: Record<RecommendationDecision, ValueLabels> = {
  RECOMMENDED: { ar: 'موصى به', en: 'Recommended' },
  NOT_RECOMMENDED: { ar: 'غير موصى به', en: 'Not recommended' },
  EXCLUDED: { ar: 'مستبعد من التقييم', en: 'Excluded from evaluation' },
}

/**
 * Calculated and manually reviewed evaluation of one offer
 * (domain-model.md — OfferEvaluation).
 */
export interface OfferEvaluation {
  readonly id: string
  readonly investmentRequestId: string
  readonly offerId: string
  /** Criterion code → score (0–100). */
  readonly criterionScores: Readonly<Record<string, number>>
  readonly weightedScore: number
  readonly rank: number
  readonly decision: RecommendationDecision
  /** Mandatory when the decision is EXCLUDED. */
  readonly exclusionJustification: string | null
  readonly reviewerNotes: string | null
  readonly evaluatedByUserId: string
  readonly evaluatedAt: IsoDateString
}
