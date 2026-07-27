import type { Role } from '@/domain/roles'
import type { User } from '@/domain/user'
import type { Bank } from '@/domain/bank'
import type {
  InvestmentRequest,
  LiquidityInformation,
  SectionCompletionMap,
  TreasuryRecommendation,
  WinningBankDetails,
} from '@/domain/investment-request'
import type { Approval, ApprovalStage } from '@/domain/approval'
import type {
  BankInvitation,
  BankOffer,
  EvaluationCriterion,
  OfferEvaluation,
} from '@/domain/offer'
import type {
  AccountingExecution,
  DepositActivation,
  FinanceReview,
  InvestmentSupportReview,
} from '@/domain/execution'
import type { Deposit, MaturityAction } from '@/domain/deposit'
import type { Task } from '@/domain/task'
import type { AppNotification, Attachment, AuditEntry, Note } from '@/domain/audit'
import type { SystemSettings } from '@/domain/settings'
import {
  getReadiness,
  getTenorDays,
  requiresExecutiveApproval,
  responsibleRoleForStatus,
  stageForStatus,
} from '@/domain/business-rules'
import { addDays } from '@/lib/dates'
import { createIdAllocator } from '@/lib/ids'
import { SeededRandom } from '@/mock-data/seed'
import { PROTOTYPE_REFERENCE_DAY, PROTOTYPE_YEAR } from '@/mock-data/reference-date'
import { defaultSystemSettings } from '@/mock-data/system-settings'
import { roleRecords } from '@/mock-data/roles'
import { users } from '@/mock-data/users'
import { banks } from '@/mock-data/banks'
import { evaluationCriteria } from '@/mock-data/evaluation-criteria'
import { requestSeedSpecs, requestId, type RequestSeedSpec } from '@/mock-data/investment-requests'
import { buildCaseTimeline, type CaseTimeline } from '@/mock-data/timeline'
import { buildInvitations } from '@/mock-data/bank-invitations'
import { buildOffers } from '@/mock-data/bank-offers'
import { buildEvaluations } from '@/mock-data/evaluations'
import { buildApprovals } from '@/mock-data/approvals'
import {
  buildExecutionRecords,
  buildWinningBankDetails,
} from '@/mock-data/execution-reviews'
import {
  depositSeedSpecs,
  depositId,
  depositMaturityDate,
  depositValueDate,
  buildDeposit,
  buildMaturityAction,
} from '@/mock-data/deposits'
import { makeAttachment } from '@/mock-data/attachments'
import {
  buildClosedRequestTask,
  buildDepositTask,
  buildOpenRequestTask,
} from '@/mock-data/tasks'
import { createActivityCollector, type ActivityPush } from '@/mock-data/activities'
import { buildNotes } from '@/mock-data/notes'
import { buildNotifications } from '@/mock-data/notifications'
import { demoScenarios, type DemoScenario } from '@/mock-data/scenarios'
import {
  liquiditySummaryNotes,
  forecastPeriods,
  recommendationAlternatives,
  recommendationKeyRisks,
  recommendationRationales,
  requestPurposes,
} from '@/mock-data/phrases'

/** Banks with visibly high exposure (evaluation concentration scoring). */
const HIGH_EXPOSURE_BANK_IDS = ['BNK-001', 'BNK-003'] as const

/**
 * The complete deterministic baseline dataset (plan §11). Composing it
 * twice always yields deep-equal results (integrity check 15).
 */
export interface MockDataset {
  readonly settings: SystemSettings
  readonly roles: readonly Role[]
  readonly users: readonly User[]
  readonly banks: readonly Bank[]
  readonly evaluationCriteria: readonly EvaluationCriterion[]
  readonly requests: readonly InvestmentRequest[]
  readonly invitations: readonly BankInvitation[]
  readonly offers: readonly BankOffer[]
  readonly evaluations: readonly OfferEvaluation[]
  readonly approvals: readonly Approval[]
  readonly supportReviews: readonly InvestmentSupportReview[]
  readonly financeReviews: readonly FinanceReview[]
  readonly accountingExecutions: readonly AccountingExecution[]
  readonly activations: readonly DepositActivation[]
  readonly deposits: readonly Deposit[]
  readonly maturityActions: readonly MaturityAction[]
  readonly tasks: readonly Task[]
  readonly attachments: readonly Attachment[]
  readonly notes: readonly Note[]
  readonly activities: readonly AuditEntry[]
  readonly notifications: readonly AppNotification[]
  readonly scenarios: readonly DemoScenario[]
}

/** `2026-07-15` + hour → `2026-07-15T11:00:00+03:00` (Riyadh). */
function ts(day: string, hour: number): string {
  return `${day}T${String(hour).padStart(2, '0')}:00:00+03:00`
}

const primaryByRole = {
  gm: 'USR-GMT-001',
  executive: 'USR-EXE-001',
  support: 'USR-IS-001',
  finance: 'USR-FIN-001',
  accounting: 'USR-ACC-001',
} as const

/** Deterministic distinct extra banks for a request's respondent list. */
function pickRespondentBanks(spec: RequestSeedSpec, count: number): string[] {
  const pool = banks.filter((bank) => bank.isActive && bank.id !== spec.recommendedBankId)
  const result = [spec.recommendedBankId]
  for (let index = 0; result.length < count && index < pool.length; index += 1) {
    const candidate = pool[(spec.sequence + index * 3) % pool.length]
    if (candidate !== undefined && !result.includes(candidate.id)) {
      result.push(candidate.id)
    }
  }
  return result
}

interface PreparationDays {
  readonly rfqDay: string
  readonly offersDay: string
  readonly evaluationDay: string
}

function getPreparationDays(timeline: CaseTimeline): PreparationDays {
  if (timeline.submittedDay !== null) {
    return {
      rfqDay: addDays(timeline.submittedDay, -5),
      offersDay: addDays(timeline.submittedDay, -3),
      evaluationDay: addDays(timeline.submittedDay, -1),
    }
  }
  return {
    rfqDay: addDays(timeline.createdDay, 1),
    offersDay: addDays(timeline.createdDay, 2),
    evaluationDay: addDays(timeline.createdDay, 3),
  }
}

export function buildBaselineDataset(): MockDataset {
  const rng = new SeededRandom()
  const settings = defaultSystemSettings

  const ids = {
    invitation: createIdAllocator('RFQ', PROTOTYPE_YEAR, 100),
    offer: createIdAllocator('OFF', PROTOTYPE_YEAR, 0),
    evaluation: createIdAllocator('EVL', PROTOTYPE_YEAR, 0),
    approval: createIdAllocator('APR', PROTOTYPE_YEAR, 0),
    task: createIdAllocator('TSK', PROTOTYPE_YEAR, 0),
    attachment: createIdAllocator('ATT', PROTOTYPE_YEAR, 0),
    activity: createIdAllocator('ACT', PROTOTYPE_YEAR, 0, 5),
    note: createIdAllocator('NOT', PROTOTYPE_YEAR, 0),
    notification: createIdAllocator('NTF', PROTOTYPE_YEAR, 0),
    supportReview: createIdAllocator('ISR', PROTOTYPE_YEAR, 0),
    financeReview: createIdAllocator('FRV', PROTOTYPE_YEAR, 0),
    accountingExecution: createIdAllocator('AEX', PROTOTYPE_YEAR, 0),
    activation: createIdAllocator('DAC', PROTOTYPE_YEAR, 0),
    maturityAction: createIdAllocator('MAT', PROTOTYPE_YEAR, 0),
  }

  const requests: InvestmentRequest[] = []
  const invitations: BankInvitation[] = []
  const offers: BankOffer[] = []
  const evaluations: OfferEvaluation[] = []
  const approvals: Approval[] = []
  const supportReviews: InvestmentSupportReview[] = []
  const financeReviews: FinanceReview[] = []
  const accountingExecutions: AccountingExecution[] = []
  const activations: DepositActivation[] = []
  const deposits: Deposit[] = []
  const maturityActions: MaturityAction[] = []
  const tasks: Task[] = []
  const attachments: Attachment[] = []
  const activityLog = createActivityCollector(ids.activity, ts)

  for (const spec of requestSeedSpecs) {
    const id = requestId(spec.sequence)
    const extendedRoute = requiresExecutiveApproval(spec.amount, settings)
    const timeline = buildCaseTimeline(spec, extendedRoute)
    const prep = getPreparationDays(timeline)
    const specialistRole = 'deposit-specialist' as const
    const isConverted = spec.status === 'CONVERTED_TO_ACTIVE_DEPOSIT'
    const isTerminal = spec.status === 'REJECTED' || spec.status === 'CANCELLED' || isConverted
    const gaps = spec.draftGaps ?? []
    const earlyStage = gaps.includes('EARLY_STAGE')

    // Events are collected in code order and flushed chronologically once
    // the whole case is composed, so the persisted history is always
    // lifecycle-ordered even for cases with a resolved return cycle.
    const requestEvents: ActivityPush[] = []
    const requestAttachmentIds: string[] = []
    const requestTaskIds: string[] = []

    const logActivity = (event: ActivityPush) => {
      requestEvents.push(event)
    }

    logActivity({
      entityType: 'INVESTMENT_REQUEST',
      entityId: id,
      activityType: spec.sourceDepositSequence !== undefined ? 'REINVESTMENT_REQUEST_CREATED' : 'REQUEST_CREATED',
      day: timeline.createdDay,
      hour: 9,
      actorUserId: spec.createdByUserId,
      actorRoleId: specialistRole,
      ...(spec.sourceDepositSequence !== undefined
        ? {
            description: `أُنشئ الطلب بإعادة استثمار من الوديعة ${depositId(spec.sourceDepositSequence)}.`,
          }
        : {}),
    })

    // --- Invitations and offers ---
    const respondentCount =
      spec.curatedOffers?.length ?? (earlyStage ? 0 : 2 + (spec.sequence % 2))
    const respondingBankIds =
      spec.curatedOffers?.map((offer) => offer.bankId) ??
      (respondentCount === 0 ? [] : pickRespondentBanks(spec, respondentCount))

    const caseInvitations = buildInvitations({
      requestId: id,
      rng,
      nextId: ids.invitation,
      banks,
      respondingBankIds: earlyStage ? [] : respondingBankIds,
      invitedCount: earlyStage
        ? spec.invitedBankCount
        : Math.max(spec.invitedBankCount, respondingBankIds.length),
      sentDay: prep.rfqDay,
      sentByUserId: spec.createdByUserId,
      awaitingResponses: earlyStage,
      ts,
    })
    invitations.push(...caseInvitations)
    logActivity({
      entityType: 'INVESTMENT_REQUEST',
      entityId: id,
      activityType: 'RFQ_SENT',
      day: prep.rfqDay,
      hour: 10,
      actorUserId: spec.createdByUserId,
      actorRoleId: specialistRole,
      description: `أُرسل طلب عروض الأسعار إلى ${caseInvitations.length} بنوك.`,
    })

    const valueDate = isConverted
      ? depositValueDate(depositSeedSpecs.find((d) => d.sequence === spec.depositSequence)!)
      : timeline.executionDay !== null
        ? addDays(timeline.executionDay, 1)
        : addDays(PROTOTYPE_REFERENCE_DAY, 7)

    const convertedDepositSpec = isConverted
      ? depositSeedSpecs.find((d) => d.sequence === spec.depositSequence)
      : undefined
    const caseOffers = buildOffers({
      spec,
      requestId: id,
      rng,
      nextId: ids.offer,
      invitations: caseInvitations,
      valueDate,
      receivedDay: prep.offersDay,
      receivedByUserId: spec.createdByUserId,
      keepValid: !isTerminal,
      referenceDay: PROTOTYPE_REFERENCE_DAY,
      // The winning offer of a converted request carries the deposit's rate.
      recommendedRateOverride: convertedDepositSpec?.annualRate,
      ts,
    })
    for (const offer of caseOffers) {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'OFFER_RECEIVED',
        day: prep.offersDay,
        hour: 11,
        actorUserId: spec.createdByUserId,
        actorRoleId: specialistRole,
        description: `استلام عرض من ${banks.find((b) => b.id === offer.bankId)?.nameAr ?? offer.bankId} بمعدل ${offer.annualRate.toFixed(2)}%.`,
      })
    }

    // --- Evaluations and recommendation ---
    const hasEvaluations = caseOffers.length > 0 && !gaps.includes('NO_EVALUATIONS')
    const hasRecommendation = hasEvaluations && !gaps.includes('NO_RECOMMENDATION')
    let scoredOffers = caseOffers
    let recommendation: TreasuryRecommendation | null = null
    if (hasEvaluations) {
      const result = buildEvaluations({
        requestId: id,
        rng,
        nextId: ids.evaluation,
        offers: caseOffers,
        criteria: evaluationCriteria,
        recommendedBankId: hasRecommendation ? spec.recommendedBankId : null,
        highExposureBankIds: HIGH_EXPOSURE_BANK_IDS,
        evaluatedByUserId: spec.createdByUserId,
        evaluatedAt: ts(prep.evaluationDay, 12),
      })
      evaluations.push(...result.evaluations)
      scoredOffers = [...result.scoredOffers]
    }
    offers.push(...scoredOffers)

    const recommendedOffer = scoredOffers.find((offer) => offer.isRecommended) ?? null
    if (recommendedOffer !== null) {
      recommendation = {
        recommendedOfferId: recommendedOffer.id,
        recommendedBankId: recommendedOffer.bankId,
        recommendedAmount: recommendedOffer.amount,
        recommendedTenorValue: recommendedOffer.tenorValue,
        recommendedTenorUnit: recommendedOffer.tenorUnit,
        recommendedRate: recommendedOffer.annualRate,
        expectedReturnAmount: recommendedOffer.expectedReturnAmount,
        rationale: rng.pick(recommendationRationales),
        keyRisks: rng.pick(recommendationKeyRisks),
        alternativesConsidered: rng.pick(recommendationAlternatives),
        recommendedByUserId: spec.createdByUserId,
        recommendedAt: ts(prep.evaluationDay, 13),
      }
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'RECOMMENDATION_SUBMITTED',
        day: prep.evaluationDay,
        hour: 13,
        actorUserId: spec.createdByUserId,
        actorRoleId: specialistRole,
      })
    }

    // --- Attachments per progress ---
    const attach = (
      category: Attachment['category'],
      day: string,
      uploadedByUserId: string,
      entity: { type: Attachment['entityType']; id: string } = {
        type: 'INVESTMENT_REQUEST',
        id,
      },
    ): string => {
      const attachment = makeAttachment({
        nextId: ids.attachment,
        rng,
        entityType: entity.type,
        entityId: entity.id,
        category,
        referenceLabel: entity.id,
        uploadedByUserId,
        uploadedDay: day,
        ts,
      })
      attachments.push(attachment)
      if (entity.type === 'INVESTMENT_REQUEST') {
        requestAttachmentIds.push(attachment.id)
      }
      return attachment.id
    }

    const hasLiquidity = !earlyStage
    const liquidityAttachmentId =
      hasLiquidity && !gaps.includes('MISSING_LIQUIDITY_EVIDENCE')
        ? attach('LIQUIDITY_ANALYSIS', prep.rfqDay, spec.createdByUserId)
        : null
    if (caseInvitations.length > 0) {
      attach('RFQ_CORRESPONDENCE', prep.rfqDay, spec.createdByUserId)
    }
    if (scoredOffers.length > 0) {
      attach('BANK_OFFER', prep.offersDay, spec.createdByUserId)
    }
    if (hasEvaluations && timeline.submittedDay !== null) {
      attach('EVALUATION_MEMO', prep.evaluationDay, spec.createdByUserId)
    }
    if (extendedRoute && timeline.execDecisionDay !== null) {
      attach('APPROVAL_EVIDENCE', timeline.execDecisionDay, primaryByRole.executive)
    }

    // --- Winning bank details (Stage 1) ---
    const reachedWinningBankCompletion =
      timeline.winningBankDay !== null || spec.status === 'PENDING_INVESTMENT_SUPPORT_REVIEW'
    let winningBankDetails: WinningBankDetails | null = null
    if (reachedWinningBankCompletion && recommendedOffer !== null) {
      const winningDay = timeline.winningBankDay ?? timeline.stageEnteredDay
      const ibanCertificateAttachmentId = attach(
        'IBAN_CERTIFICATE',
        winningDay,
        spec.createdByUserId,
      )
      winningBankDetails = buildWinningBankDetails({
        spec,
        requestId: id,
        timeline,
        winningOffer: recommendedOffer,
        bank: banks.find((bank) => bank.id === recommendedOffer.bankId)!,
        ibanCertificateAttachmentId,
        verifiedByUserId: spec.createdByUserId,
        ts,
      })
    }

    // --- Execution records (Stages 2–5) ---
    let transferAttachmentId: string | null = null
    let certificateAttachmentId: string | null = null
    if (timeline.executionDay !== null) {
      transferAttachmentId = attach('TRANSFER_RECEIPT', timeline.executionDay, primaryByRole.accounting)
      attach('JOURNAL_EVIDENCE', timeline.executionDay, primaryByRole.accounting)
    }
    const depositSpec = convertedDepositSpec ?? null
    if (depositSpec !== null && timeline.activationDay !== null) {
      certificateAttachmentId = attach(
        'DEPOSIT_CERTIFICATE',
        timeline.activationDay,
        spec.createdByUserId,
        { type: 'DEPOSIT', id: depositId(depositSpec.sequence) },
      )
    }

    const executionRecords = buildExecutionRecords({
      spec,
      requestId: id,
      timeline,
      rng,
      ids: {
        supportReview: ids.supportReview,
        financeReview: ids.financeReview,
        accountingExecution: ids.accountingExecution,
        activation: ids.activation,
      },
      reviewers: {
        support: primaryByRole.support,
        finance: primaryByRole.finance,
        accounting: primaryByRole.accounting,
        specialist: spec.createdByUserId,
      },
      transferAttachmentId,
      certificateAttachmentId,
      depositReference: winningBankDetails?.depositReference ?? '',
      valueDate,
      maturityDate: addDays(valueDate, getTenorDays(spec.tenorMonths, 'MONTHS')),
      finalRate: depositSpec?.annualRate ?? recommendedOffer?.annualRate ?? 0,
      ts,
    })
    supportReviews.push(...executionRecords.supportReviews)
    financeReviews.push(...executionRecords.financeReviews)
    accountingExecutions.push(...executionRecords.accountingExecutions)
    activations.push(...executionRecords.activations)

    // --- Approval history ---
    const caseApprovals = buildApprovals({
      spec,
      requestId: id,
      timeline,
      extendedRoute,
      rng,
      nextId: ids.approval,
      ts,
      approvers: {
        TREASURY_GM_APPROVAL: primaryByRole.gm,
        EXECUTIVE_APPROVAL: primaryByRole.executive,
        INVESTMENT_SUPPORT_REVIEW: primaryByRole.support,
        FINANCE_REVIEW: primaryByRole.finance,
        ACCOUNTING_EXECUTION: primaryByRole.accounting,
        DEPOSIT_ACTIVATION: spec.createdByUserId,
        DRAFT_PREPARATION: spec.createdByUserId,
      } satisfies Partial<Record<ApprovalStage, string>>,
    })
    approvals.push(...caseApprovals)

    // --- Workflow activities (submission onwards, lifecycle-ordered) ---
    if (timeline.submittedDay !== null) {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'REQUEST_SUBMITTED',
        day: timeline.submittedDay,
        hour: 13,
        actorUserId: spec.createdByUserId,
        actorRoleId: specialistRole,
        previousStatus: 'DRAFT',
        newStatus: 'PENDING_TREASURY_GM_APPROVAL',
      })
    }
    if (timeline.gmDecisionDay !== null) {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'REQUEST_APPROVED',
        day: timeline.gmDecisionDay,
        hour: 13,
        actorUserId: primaryByRole.gm,
        actorRoleId: 'treasury-general-manager',
        previousStatus: 'PENDING_TREASURY_GM_APPROVAL',
        newStatus: extendedRoute ? 'PENDING_EXECUTIVE_APPROVAL' : 'PENDING_WINNING_BANK_COMPLETION',
      })
    }
    if (timeline.execDecisionDay !== null) {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'REQUEST_APPROVED',
        day: timeline.execDecisionDay,
        hour: 13,
        actorUserId: primaryByRole.executive,
        actorRoleId: 'investment-treasury-executive',
        previousStatus: 'PENDING_EXECUTIVE_APPROVAL',
        newStatus: 'PENDING_WINNING_BANK_COMPLETION',
      })
    }
    if (timeline.returnDay !== null && spec.returnEvent !== undefined) {
      const fromExecutive = spec.returnEvent.fromStage === 'EXECUTIVE_APPROVAL'
      const fromFinance = spec.returnEvent.fromStage === 'FINANCE_REVIEW'
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'REQUEST_RETURNED',
        day: timeline.returnDay,
        hour: 14,
        actorUserId: fromFinance
          ? primaryByRole.finance
          : fromExecutive
            ? primaryByRole.executive
            : primaryByRole.gm,
        actorRoleId: fromFinance
          ? 'finance-reviewer'
          : fromExecutive
            ? 'investment-treasury-executive'
            : 'treasury-general-manager',
        previousStatus: fromFinance
          ? 'PENDING_FINANCE_REVIEW'
          : fromExecutive
            ? 'PENDING_EXECUTIVE_APPROVAL'
            : 'PENDING_TREASURY_GM_APPROVAL',
        newStatus: fromFinance ? 'PENDING_INVESTMENT_SUPPORT_REVIEW' : 'RETURNED_FOR_COMPLETION',
        comment: spec.returnEvent.reasonAr,
      })
    }
    if (timeline.resubmitDay !== null) {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'REQUEST_RESUBMITTED',
        day: timeline.resubmitDay,
        hour: 12,
        actorUserId: spec.createdByUserId,
        actorRoleId: specialistRole,
      })
    }
    if (timeline.winningBankDay !== null) {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'WINNING_BANK_COMPLETED',
        day: timeline.winningBankDay,
        hour: 12,
        actorUserId: spec.createdByUserId,
        actorRoleId: specialistRole,
        previousStatus: 'PENDING_WINNING_BANK_COMPLETION',
        newStatus: 'PENDING_INVESTMENT_SUPPORT_REVIEW',
      })
    }
    if (timeline.supportDecisionDay !== null && spec.status !== 'PENDING_INVESTMENT_SUPPORT_REVIEW') {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'SUPPORT_REVIEW_COMPLETED',
        day: timeline.supportDecisionDay,
        hour: 12,
        actorUserId: primaryByRole.support,
        actorRoleId: 'investment-support',
        previousStatus: 'PENDING_INVESTMENT_SUPPORT_REVIEW',
        newStatus: 'PENDING_FINANCE_REVIEW',
      })
    }
    if (timeline.financeDecisionDay !== null) {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'FINANCE_REVIEW_COMPLETED',
        day: timeline.financeDecisionDay,
        hour: 12,
        actorUserId: primaryByRole.finance,
        actorRoleId: 'finance-reviewer',
        previousStatus: 'PENDING_FINANCE_REVIEW',
        newStatus: 'PENDING_ACCOUNTING_EXECUTION',
      })
    }
    if (timeline.executionDay !== null) {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'EXECUTION_RECORDED',
        day: timeline.executionDay,
        hour: 13,
        actorUserId: primaryByRole.accounting,
        actorRoleId: 'accounting-executor',
        previousStatus: 'PENDING_ACCOUNTING_EXECUTION',
        newStatus: 'PENDING_DEPOSIT_ACTIVATION',
      })
    }
    if (timeline.activationDay !== null && isConverted) {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'DEPOSIT_ACTIVATED',
        day: timeline.activationDay,
        hour: 14,
        actorUserId: spec.createdByUserId,
        actorRoleId: specialistRole,
        previousStatus: 'PENDING_DEPOSIT_ACTIVATION',
        newStatus: 'CONVERTED_TO_ACTIVE_DEPOSIT',
      })
    }
    if (spec.status === 'REJECTED' && timeline.terminalDay !== null) {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'REQUEST_REJECTED',
        day: timeline.terminalDay,
        hour: 14,
        actorUserId: primaryByRole.gm,
        actorRoleId: 'treasury-general-manager',
        previousStatus: 'PENDING_TREASURY_GM_APPROVAL',
        newStatus: 'REJECTED',
        comment: spec.rejectionReasonAr,
      })
    }
    if (spec.status === 'CANCELLED' && timeline.terminalDay !== null) {
      logActivity({
        entityType: 'INVESTMENT_REQUEST',
        entityId: id,
        activityType: 'REQUEST_CANCELLED',
        day: timeline.terminalDay,
        hour: 14,
        actorUserId: spec.createdByUserId,
        actorRoleId: specialistRole,
        previousStatus: 'RETURNED_FOR_COMPLETION',
        newStatus: 'CANCELLED',
        comment: spec.cancellationReasonAr,
      })
    }

    // --- Tasks ---
    if (!isTerminal) {
      const responsibleRole = responsibleRoleForStatus[spec.status]
      const primaryUserForRole = users.find(
        (user) => user.roleId === responsibleRole && user.isPrimary,
      )
      const assignedUserId =
        responsibleRole === 'deposit-specialist' ? spec.createdByUserId : (primaryUserForRole?.id ?? null)
      const openTask = buildOpenRequestTask({
        nextId: ids.task,
        status: spec.status,
        requestId: id,
        requestTitle: id,
        priority: spec.priority,
        stageEnteredDay: timeline.stageEnteredDay,
        assignedUserId,
        returnReason:
          spec.status === 'RETURNED_FOR_COMPLETION' ? (spec.returnEvent?.reasonAr ?? null) : null,
        settings,
        ts,
      })
      if (openTask !== null) {
        tasks.push(openTask)
        requestTaskIds.push(openTask.id)
      }
    }
    if (spec.status === 'CANCELLED') {
      const cancelledTask = buildClosedRequestTask({
        nextId: ids.task,
        forStatus: 'RETURNED_FOR_COMPLETION',
        requestId: id,
        requestTitle: id,
        priority: spec.priority,
        enteredDay: timeline.returnDay ?? timeline.createdDay,
        completedDay: timeline.terminalDay ?? PROTOTYPE_REFERENCE_DAY,
        completedByUserId: spec.createdByUserId,
        settings,
        ts,
        cancelled: true,
      })
      if (cancelledTask !== null) {
        tasks.push(cancelledTask)
        requestTaskIds.push(cancelledTask.id)
      }
    }
    // Completed historical tasks for the five most recent converted chains.
    if (isConverted && spec.sequence > 50) {
      const historicalTasks = [
        {
          forStatus: 'PENDING_TREASURY_GM_APPROVAL' as const,
          enteredDay: timeline.submittedDay,
          completedDay: timeline.gmDecisionDay,
          completedByUserId: primaryByRole.gm,
        },
        {
          forStatus: 'PENDING_FINANCE_REVIEW' as const,
          enteredDay: timeline.supportDecisionDay,
          completedDay: timeline.financeDecisionDay,
          completedByUserId: primaryByRole.finance,
        },
        {
          forStatus: 'PENDING_DEPOSIT_ACTIVATION' as const,
          enteredDay: timeline.executionDay,
          completedDay: timeline.activationDay,
          completedByUserId: spec.createdByUserId,
        },
      ]
      for (const shape of historicalTasks) {
        if (shape.enteredDay === null || shape.completedDay === null) continue
        const closed = buildClosedRequestTask({
          nextId: ids.task,
          forStatus: shape.forStatus,
          requestId: id,
          requestTitle: id,
          priority: spec.priority,
          enteredDay: shape.enteredDay,
          completedDay: shape.completedDay,
          completedByUserId: shape.completedByUserId,
          settings,
          ts,
        })
        if (closed !== null) {
          tasks.push(closed)
          requestTaskIds.push(closed.id)
        }
      }
    }

    // --- Section completion map ---
    const complete = 'COMPLETE' as const
    const sectionCompletion: SectionCompletionMap = earlyStage
      ? {
          'request-information': 'IN_PROGRESS',
          liquidity: 'NOT_STARTED',
          'bank-rfq': 'IN_PROGRESS',
          'bank-offers': 'NOT_STARTED',
          'evaluation-recommendation': 'NOT_STARTED',
          attachments: 'NOT_STARTED',
        }
      : {
          'request-information': complete,
          liquidity: gaps.includes('MISSING_LIQUIDITY_EVIDENCE') ? 'MISSING_REQUIREMENTS' : complete,
          'bank-rfq': complete,
          'bank-offers': gaps.includes('OFFER_VALIDITY_MISSING') ? 'MISSING_REQUIREMENTS' : complete,
          'evaluation-recommendation': gaps.includes('NO_EVALUATIONS')
            ? 'NOT_STARTED'
            : gaps.includes('NO_RECOMMENDATION')
              ? 'IN_PROGRESS'
              : complete,
          attachments: gaps.includes('MISSING_LIQUIDITY_EVIDENCE') ? 'MISSING_REQUIREMENTS' : complete,
        }

    // --- Liquidity block ---
    const liquidity: LiquidityInformation | null = hasLiquidity
      ? {
          availableLiquidityAmount: spec.amount * 2,
          requiredOperatingReserve: spec.amount,
          amountAvailableForInvestment: spec.amount,
          forecastPeriod: rng.pick(forecastPeriods),
          sourceDate: timeline.createdDay,
          preparedByUserId: spec.createdByUserId,
          summaryNotes: rng.pick(liquiditySummaryNotes),
          attachmentIds: liquidityAttachmentId === null ? [] : [liquidityAttachmentId],
        }
      : null

    const requestActivityIds = activityLog.pushChronological(requestEvents)

    const isPreparation = spec.status === 'DRAFT' || spec.status === 'RETURNED_FOR_COMPLETION'
    const investmentDate = earlyStage ? null : valueDate
    const expectedMaturityDate = earlyStage
      ? null
      : addDays(valueDate, getTenorDays(spec.tenorMonths, 'MONTHS'))

    const request: InvestmentRequest = {
      id,
      requestNumber: id,
      title: spec.titleAr,
      status: spec.status,
      currentStage: stageForStatus[spec.status],
      currentOwnerRoleId: responsibleRoleForStatus[spec.status],
      currentOwnerUserId: (() => {
        const role = responsibleRoleForStatus[spec.status]
        if (role === null) return null
        if (role === 'deposit-specialist') {
          return spec.status === 'PENDING_WINNING_BANK_COMPLETION' ||
            spec.status === 'PENDING_DEPOSIT_ACTIVATION'
            ? null // group-owned until claimed
            : spec.createdByUserId
        }
        return users.find((user) => user.roleId === role && user.isPrimary)?.id ?? null
      })(),
      createdByUserId: spec.createdByUserId,
      createdAt: ts(timeline.createdDay, 9),
      updatedAt: ts(timeline.stageEnteredDay, 14),
      submittedAt: timeline.submittedDay === null ? null : ts(timeline.submittedDay, 13),
      stageEnteredAt: ts(timeline.stageEnteredDay, 11),
      amount: spec.amount,
      submittedAmount: timeline.submittedDay === null ? null : spec.amount,
      currency: 'SAR',
      tenorValue: spec.tenorMonths,
      tenorUnit: 'MONTHS',
      investmentDate,
      expectedMaturityDate,
      purpose: rng.pick(requestPurposes),
      liquiditySummary:
        liquidity === null
          ? ''
          : `فائض قابل للاستثمار ${String(spec.amount / 1_000_000)} مليون ريال بعد تغطية الاحتياطي التشغيلي.`,
      liquidity,
      sectionCompletion,
      priority: spec.priority,
      invitedBankIds: caseInvitations.map((invitation) => invitation.bankId),
      offerIds: scoredOffers.map((offer) => offer.id),
      recommendation,
      minimumBanksExceptionReason: null,
      completenessConfirmed: !gaps.includes('NOT_CONFIRMED') && !earlyStage,
      readinessPercentage: 100,
      missingRequirementCodes: [],
      returnReason:
        spec.status === 'RETURNED_FOR_COMPLETION' ? (spec.returnEvent?.reasonAr ?? null) : null,
      returnedFromStage:
        spec.status === 'RETURNED_FOR_COMPLETION' ? (spec.returnEvent?.fromStage ?? null) : null,
      rejectionReason: spec.rejectionReasonAr ?? null,
      cancellationReason: spec.cancellationReasonAr ?? null,
      winningBankDetails,
      approvalIds: caseApprovals.map((approval) => approval.id),
      taskIds: requestTaskIds,
      attachmentIds: requestAttachmentIds,
      activityIds: requestActivityIds,
      sourceDepositId:
        spec.sourceDepositSequence === undefined ? null : depositId(spec.sourceDepositSequence),
      createdDepositId: depositSpec === null ? null : depositId(depositSpec.sequence),
    }

    // Preparation statuses carry live readiness; later stages passed at 100%.
    const finalRequest: InvestmentRequest = isPreparation
      ? (() => {
          const readiness = getReadiness(
            request,
            {
              invitations: caseInvitations,
              offers: scoredOffers,
              evaluations: evaluations.filter((e) => e.investmentRequestId === id),
              attachments: attachments.filter(
                (a) => a.entityType === 'INVESTMENT_REQUEST' && a.entityId === id,
              ),
            },
            settings,
          )
          return {
            ...request,
            readinessPercentage: readiness.percentage,
            missingRequirementCodes: readiness.missingCodes,
          }
        })()
      : request

    requests.push(finalRequest)

    // --- Deposit for converted requests ---
    if (depositSpec !== null) {
      const depositEvents: ActivityPush[] = []
      const depositEntityId = depositId(depositSpec.sequence)
      const pushDepositActivity = (event: ActivityPush) => {
        depositEvents.push(event)
      }
      pushDepositActivity({
        entityType: 'DEPOSIT',
        entityId: depositEntityId,
        activityType: 'DEPOSIT_ACTIVATED',
        day: timeline.activationDay ?? valueDate,
        hour: 15,
        actorUserId: spec.createdByUserId,
        actorRoleId: specialistRole,
        description: `تفعيل الوديعة ${depositEntityId} من الطلب ${id}.`,
      })

      const maturityDay = depositMaturityDate(depositSpec)
      let reinvestmentRequestId: string | null = null
      if (depositSpec.reinvestmentRequestSequence !== undefined) {
        reinvestmentRequestId = requestId(depositSpec.reinvestmentRequestSequence)
        const reinvestSpec = requestSeedSpecs.find(
          (candidate) => candidate.sequence === depositSpec.reinvestmentRequestSequence,
        )
        const decisionDay = addDays(
          PROTOTYPE_REFERENCE_DAY,
          -(reinvestSpec?.createdDaysAgo ?? 5),
        )
        maturityActions.push(
          buildMaturityAction({
            id: ids.maturityAction(),
            spec: depositSpec,
            actionType: 'REINVEST',
            decisionByUserId: spec.createdByUserId,
            resultingRequestId: reinvestmentRequestId,
            decisionAt: ts(decisionDay, 10),
            notes:
              depositSpec.category === 'NEAR'
                ? 'قرار مبكر بإعادة الاستثمار قبل الاستحقاق لضمان استمرارية التوظيف.'
                : null,
          }),
        )
        pushDepositActivity({
          entityType: 'DEPOSIT',
          entityId: depositEntityId,
          activityType: 'MATURITY_DECISION_RECORDED',
          day: decisionDay,
          hour: 10,
          actorUserId: spec.createdByUserId,
          actorRoleId: specialistRole,
          description: `قرار إعادة الاستثمار عبر الطلب ${reinvestmentRequestId}.`,
        })
        pushDepositActivity({
          entityType: 'DEPOSIT',
          entityId: depositEntityId,
          activityType: 'REINVESTMENT_REQUEST_CREATED',
          day: decisionDay,
          hour: 11,
          actorUserId: spec.createdByUserId,
          actorRoleId: specialistRole,
        })
      }
      if (depositSpec.category === 'CLOSED') {
        maturityActions.push(
          buildMaturityAction({
            id: ids.maturityAction(),
            spec: depositSpec,
            actionType: 'CLOSE',
            decisionByUserId: spec.createdByUserId,
            resultingRequestId: null,
            decisionAt: ts(addDays(maturityDay, -3), 10),
            notes: null,
          }),
        )
        attach('MATURITY_CORRESPONDENCE', addDays(maturityDay, -3), spec.createdByUserId, {
          type: 'DEPOSIT',
          id: depositEntityId,
        })
        pushDepositActivity({
          entityType: 'DEPOSIT',
          entityId: depositEntityId,
          activityType: 'DEPOSIT_CLOSED',
          day: maturityDay,
          hour: 12,
          actorUserId: spec.createdByUserId,
          actorRoleId: specialistRole,
        })
      }
      if (depositSpec.category === 'BROKEN' && depositSpec.brokenOffsetDays !== undefined) {
        const breakDay = addDays(PROTOTYPE_REFERENCE_DAY, depositSpec.brokenOffsetDays)
        maturityActions.push(
          buildMaturityAction({
            id: ids.maturityAction(),
            spec: depositSpec,
            actionType: 'BREAK_EARLY',
            decisionByUserId: primaryByRole.gm,
            resultingRequestId: null,
            decisionAt: ts(breakDay, 10),
            notes: 'موافقة مدير عام الخزينة على الكسر المبكر لاحتياج تشغيلي طارئ.',
          }),
        )
        attach('MATURITY_CORRESPONDENCE', breakDay, spec.createdByUserId, {
          type: 'DEPOSIT',
          id: depositEntityId,
        })
        pushDepositActivity({
          entityType: 'DEPOSIT',
          entityId: depositEntityId,
          activityType: 'DEPOSIT_BROKEN',
          day: breakDay,
          hour: 12,
          actorUserId: spec.createdByUserId,
          actorRoleId: specialistRole,
          comment:
            'احتياج تشغيلي طارئ للسيولة تطلب كسر الوديعة قبل الاستحقاق بعد موافقة مدير عام الخزينة.',
        })
      }
      if (depositSpec.category === 'REINVESTED') {
        pushDepositActivity({
          entityType: 'DEPOSIT',
          entityId: depositEntityId,
          activityType: 'DEPOSIT_CLOSED',
          day: maturityDay,
          hour: 13,
          actorUserId: spec.createdByUserId,
          actorRoleId: specialistRole,
          description: 'إغلاق الوديعة عند الاستحقاق بعد قرار إعادة الاستثمار.',
        })
      }

      const depositAttachmentIds = attachments
        .filter((a) => a.entityType === 'DEPOSIT' && a.entityId === depositEntityId)
        .map((a) => a.id)
      const depositActivityIds = activityLog.pushChronological(depositEvents)

      deposits.push(
        buildDeposit({
          spec: depositSpec,
          sourceInvestmentRequestId: id,
          reinvestmentRequestId,
          certificateAttachmentId,
          bankConfirmationAttachmentId: null,
          activityIds: depositActivityIds,
          attachmentIds: depositAttachmentIds,
          createdAt: ts(timeline.activationDay ?? valueDate, 15),
        }),
      )

      // Maturity follow-up tasks for near/matured deposits.
      if (depositSpec.category === 'NEAR') {
        tasks.push(
          buildDepositTask({
            nextId: ids.task,
            actionCode: 'REVIEW_NEAR_MATURITY',
            depositId: depositEntityId,
            depositLabel: depositEntityId,
            priority: 'HIGH',
            createdDay: addDays(maturityDay, -14),
            dueDay: addDays(maturityDay, -7),
            assignedUserId: spec.createdByUserId,
            ts,
          }),
        )
      }
      if (depositSpec.category === 'MATURED') {
        tasks.push(
          buildDepositTask({
            nextId: ids.task,
            actionCode: 'PROCESS_MATURED_DEPOSIT',
            depositId: depositEntityId,
            depositLabel: depositEntityId,
            priority: 'CRITICAL',
            createdDay: maturityDay,
            dueDay: addDays(maturityDay, 2),
            assignedUserId: null,
            ts,
          }),
        )
      }
    }
  }

  const notes = buildNotes({
    nextId: ids.note,
    dayBefore: (days) => addDays(PROTOTYPE_REFERENCE_DAY, -days),
    ts,
  })
  const notifications = buildNotifications({
    nextId: ids.notification,
    activities: activityLog.entries,
    requests,
  })

  return {
    settings,
    roles: roleRecords,
    users,
    banks,
    evaluationCriteria,
    requests,
    invitations,
    offers,
    evaluations,
    approvals,
    supportReviews,
    financeReviews,
    accountingExecutions,
    activations,
    deposits,
    maturityActions,
    tasks,
    attachments,
    notes,
    activities: activityLog.entries,
    notifications,
    scenarios: demoScenarios,
  }
}
