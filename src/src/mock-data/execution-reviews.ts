import type {
  AccountingExecution,
  DepositActivation,
  FinanceReview,
  InvestmentSupportReview,
} from '@/domain/execution'
import type { WinningBankDetails } from '@/domain/investment-request'
import type { BankOffer } from '@/domain/offer'
import type { Bank } from '@/domain/bank'
import type { SeededRandom } from '@/mock-data/seed'
import type { RequestSeedSpec } from '@/mock-data/investment-requests'
import type { CaseTimeline } from '@/mock-data/timeline'
import {
  executionComments,
  financeReviewComments,
  supportReviewComments,
} from '@/mock-data/phrases'

/**
 * Execution-phase record builders (execution-and-activation.md Stages 1–5):
 * winning-bank details, Investment Support review, Finance review,
 * Accounting execution, and Deposit activation — created only for requests
 * whose timeline reached the corresponding stage.
 */

/** Deterministic fictional Saudi IBAN (24 characters, `.test`-grade data). */
export function fictionalIban(sequence: number, bankId: string): string {
  const check = String(28 + (sequence % 60)).padStart(2, '0')
  const bankDigits = bankId.slice(-3).padStart(3, '0').slice(0, 2)
  const account = String(2400100200300 + sequence * 9137).padStart(18, '0')
  return `SA${check}${bankDigits}${account}`.slice(0, 24)
}

export interface BuildWinningBankArgs {
  readonly spec: RequestSeedSpec
  readonly requestId: string
  readonly timeline: CaseTimeline
  readonly winningOffer: BankOffer
  readonly bank: Bank
  readonly ibanCertificateAttachmentId: string | null
  readonly verifiedByUserId: string
  readonly ts: (day: string, hour: number) => string
}

export function buildWinningBankDetails(args: BuildWinningBankArgs): WinningBankDetails {
  const day = args.timeline.winningBankDay ?? args.timeline.stageEnteredDay
  return {
    bankId: args.winningOffer.bankId,
    winningOfferId: args.winningOffer.id,
    beneficiaryName: 'صندوق البيئة',
    iban: fictionalIban(args.spec.sequence, args.winningOffer.bankId),
    bankAccountNumber: String(3100200000 + args.spec.sequence * 41),
    bankSwiftCode: `${args.bank.code}SARIXXX`.slice(0, 11),
    transferAmount: args.spec.amount,
    valueDate: args.winningOffer.valueDate,
    depositReference: `TD-${args.winningOffer.bankId.slice(-3)}-${String(2600 + args.spec.sequence)}`,
    ibanCertificateAttachmentId: args.ibanCertificateAttachmentId,
    relationshipManagerDetails: `${args.bank.relationshipManagerName} — ${args.bank.relationshipManagerEmail}`,
    finalRate: args.winningOffer.annualRate,
    controlledChangeJustification: null,
    notes: '',
    verifiedByUserId: args.verifiedByUserId,
    verifiedAt: args.ts(day, 12),
  }
}

export interface BuildExecutionRecordsArgs {
  readonly spec: RequestSeedSpec
  readonly requestId: string
  readonly timeline: CaseTimeline
  readonly rng: SeededRandom
  readonly ids: {
    readonly supportReview: () => string
    readonly financeReview: () => string
    readonly accountingExecution: () => string
    readonly activation: () => string
  }
  readonly reviewers: {
    readonly support: string
    readonly finance: string
    readonly accounting: string
    readonly specialist: string
  }
  readonly transferAttachmentId: string | null
  readonly certificateAttachmentId: string | null
  readonly depositReference: string
  readonly valueDate: string
  readonly maturityDate: string
  readonly finalRate: number
  readonly ts: (day: string, hour: number) => string
}

export interface ExecutionRecords {
  readonly supportReviews: readonly InvestmentSupportReview[]
  readonly financeReviews: readonly FinanceReview[]
  readonly accountingExecutions: readonly AccountingExecution[]
  readonly activations: readonly DepositActivation[]
}

export function buildExecutionRecords(args: BuildExecutionRecordsArgs): ExecutionRecords {
  const { spec, timeline } = args
  const supportReviews: InvestmentSupportReview[] = []
  const financeReviews: FinanceReview[] = []
  const accountingExecutions: AccountingExecution[] = []
  const activations: DepositActivation[] = []

  const completeChecklist = {
    approvalRouteComplete: true,
    winningOfferMatchesRecommendation: true,
    beneficiaryAndIbanComplete: true,
    mandatoryDocumentsPresent: true,
    noUnresolvedReturnReason: true,
  }

  const reachedSupport =
    spec.status === 'PENDING_INVESTMENT_SUPPORT_REVIEW' || timeline.supportDecisionDay !== null
  if (!reachedSupport) {
    return { supportReviews, financeReviews, accountingExecutions, activations }
  }

  const resolvedFinanceReturn =
    spec.returnEvent?.fromStage === 'FINANCE_REVIEW' && spec.returnEvent.resolved === true

  // --- Stage 2: Investment Support review ---
  if (spec.status === 'PENDING_INVESTMENT_SUPPORT_REVIEW') {
    supportReviews.push({
      id: args.ids.supportReview(),
      investmentRequestId: args.requestId,
      reviewerUserId: null,
      decision: 'PENDING',
      checklist: {
        approvalRouteComplete: true,
        winningOfferMatchesRecommendation: true,
        beneficiaryAndIbanComplete: false,
        mandatoryDocumentsPresent: false,
        noUnresolvedReturnReason: true,
      },
      comments: null,
      returnReason: null,
      evidenceAttachmentIds: [],
      reviewedAt: null,
      sequence: 1,
    })
    return { supportReviews, financeReviews, accountingExecutions, activations }
  }
  if (timeline.supportDecisionDay !== null) {
    supportReviews.push({
      id: args.ids.supportReview(),
      investmentRequestId: args.requestId,
      reviewerUserId: args.reviewers.support,
      decision: 'APPROVED',
      checklist: completeChecklist,
      comments: args.rng.pick(supportReviewComments),
      returnReason: null,
      evidenceAttachmentIds: [],
      reviewedAt: args.ts(timeline.supportDecisionDay, 12),
      sequence: resolvedFinanceReturn ? 2 : 1,
    })
  }

  // --- Stage 3: Finance review ---
  if (spec.status === 'PENDING_FINANCE_REVIEW') {
    if (resolvedFinanceReturn && timeline.returnDay !== null) {
      financeReviews.push({
        id: args.ids.financeReview(),
        investmentRequestId: args.requestId,
        reviewerUserId: args.reviewers.finance,
        reviewStatus: 'RETURNED',
        budgetAvailabilityConfirmed: true,
        cashAvailabilityConfirmed: true,
        beneficiaryVerified: false,
        comments: null,
        returnReason: spec.returnEvent?.reasonAr ?? null,
        evidenceAttachmentIds: [],
        reviewedAt: args.ts(timeline.returnDay, 12),
        sequence: 1,
      })
    }
    financeReviews.push({
      id: args.ids.financeReview(),
      investmentRequestId: args.requestId,
      reviewerUserId: null,
      reviewStatus: 'PENDING',
      budgetAvailabilityConfirmed: false,
      cashAvailabilityConfirmed: false,
      beneficiaryVerified: false,
      comments: null,
      returnReason: null,
      evidenceAttachmentIds: [],
      reviewedAt: null,
      sequence: resolvedFinanceReturn ? 2 : 1,
    })
    return { supportReviews, financeReviews, accountingExecutions, activations }
  }
  if (timeline.financeDecisionDay !== null) {
    financeReviews.push({
      id: args.ids.financeReview(),
      investmentRequestId: args.requestId,
      reviewerUserId: args.reviewers.finance,
      reviewStatus: 'APPROVED',
      budgetAvailabilityConfirmed: true,
      cashAvailabilityConfirmed: true,
      beneficiaryVerified: true,
      comments: args.rng.pick(financeReviewComments),
      returnReason: null,
      evidenceAttachmentIds: [],
      reviewedAt: args.ts(timeline.financeDecisionDay, 12),
      sequence: 1,
    })
  }

  // --- Stage 4: Accounting execution ---
  if (spec.status === 'PENDING_ACCOUNTING_EXECUTION') {
    accountingExecutions.push({
      id: args.ids.accountingExecution(),
      investmentRequestId: args.requestId,
      executorUserId: null,
      executionStatus: 'PENDING',
      journalReference: null,
      paymentReference: null,
      debitAccount: null,
      beneficiaryAccount: null,
      transferDate: null,
      transferAmount: null,
      varianceJustification: null,
      transferAttachmentId: null,
      comments: null,
      returnReason: null,
      executedAt: null,
      sequence: 1,
    })
    return { supportReviews, financeReviews, accountingExecutions, activations }
  }
  if (timeline.executionDay !== null) {
    accountingExecutions.push({
      id: args.ids.accountingExecution(),
      investmentRequestId: args.requestId,
      executorUserId: args.reviewers.accounting,
      executionStatus: 'CONFIRMED',
      journalReference: `JV-2026-${String(4200 + spec.sequence)}`,
      paymentReference: `PAY-2026-${String(8600 + spec.sequence)}`,
      debitAccount: 'حساب الصندوق التشغيلي الرئيسي',
      beneficiaryAccount: fictionalIban(spec.sequence, spec.recommendedBankId),
      transferDate: timeline.activationDay ?? timeline.executionDay,
      transferAmount: spec.amount,
      varianceJustification: null,
      transferAttachmentId: args.transferAttachmentId,
      comments: args.rng.pick(executionComments),
      returnReason: null,
      executedAt: args.ts(timeline.executionDay, 13),
      sequence: 1,
    })
  }

  // --- Stage 5: Deposit activation ---
  if (timeline.activationDay !== null && spec.status === 'CONVERTED_TO_ACTIVE_DEPOSIT') {
    activations.push({
      id: args.ids.activation(),
      investmentRequestId: args.requestId,
      bankDepositReference: args.depositReference,
      actualValueDate: args.valueDate,
      actualMaturityDate: args.maturityDate,
      confirmedRate: args.finalRate,
      confirmedAmount: spec.amount,
      certificateAttachmentId: args.certificateAttachmentId,
      activationConfirmationDate: args.ts(timeline.activationDay, 14),
      confirmedByUserId: args.reviewers.specialist,
      notes: null,
    })
  }

  return { supportReviews, financeReviews, accountingExecutions, activations }
}
