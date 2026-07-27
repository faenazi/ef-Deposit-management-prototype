import type { Approval, ApprovalDecision, ApprovalStage } from '@/domain/approval'
import type { RoleCode } from '@/domain/roles'
import type { SeededRandom } from '@/mock-data/seed'
import type { RequestSeedSpec } from '@/mock-data/investment-requests'
import type { CaseTimeline } from '@/mock-data/timeline'
import { addDays } from '@/lib/dates'
import { approvalComments } from '@/mock-data/phrases'

/**
 * Approval-history builder (plan §4.12–4.14): one record per decision step,
 * append-only, with preserved return cycles (`sequence` increments on
 * resubmission) and PENDING records for the stage currently awaiting a
 * decision. Approver roles always match their stages (integrity check 3).
 */

export const approverRoleForStage: Partial<Record<ApprovalStage, RoleCode>> = {
  DRAFT_PREPARATION: 'deposit-specialist',
  TREASURY_GM_APPROVAL: 'treasury-general-manager',
  EXECUTIVE_APPROVAL: 'investment-treasury-executive',
  INVESTMENT_SUPPORT_REVIEW: 'investment-support',
  FINANCE_REVIEW: 'finance-reviewer',
  ACCOUNTING_EXECUTION: 'accounting-executor',
  DEPOSIT_ACTIVATION: 'deposit-specialist',
}

export interface BuildApprovalsArgs {
  readonly spec: RequestSeedSpec
  readonly requestId: string
  readonly timeline: CaseTimeline
  readonly extendedRoute: boolean
  readonly rng: SeededRandom
  readonly nextId: () => string
  readonly ts: (day: string, hour: number) => string
  /** Deciding user per stage (primary demo users / rotating supporters). */
  readonly approvers: Readonly<Partial<Record<ApprovalStage, string>>>
}

export function buildApprovals(args: BuildApprovalsArgs): Approval[] {
  const { spec, timeline } = args
  const records: Approval[] = []

  const push = (
    stage: ApprovalStage,
    decision: ApprovalDecision,
    day: string | null,
    options?: {
      readonly comments?: string | null
      readonly returnToRoleId?: RoleCode | null
      readonly sequence?: number
      readonly createdDay?: string
    },
  ) => {
    const role = approverRoleForStage[stage]
    if (role === undefined) return
    records.push({
      id: args.nextId(),
      investmentRequestId: args.requestId,
      stage,
      approverRoleId: role,
      approverUserId: decision === 'PENDING' ? null : (args.approvers[stage] ?? null),
      decision,
      decisionAt: decision === 'PENDING' || day === null ? null : args.ts(day, 13),
      comments: options?.comments ?? null,
      returnToRoleId: options?.returnToRoleId ?? null,
      sequence: options?.sequence ?? 1,
      createdAt: args.ts(options?.createdDay ?? day ?? timeline.stageEnteredDay, 9),
    })
  }

  if (timeline.submittedDay === null) {
    return records
  }

  const comment = () => {
    const picked = args.rng.pick(approvalComments)
    return picked === '' ? null : picked
  }

  // --- Treasury GM stage ---
  if (spec.status === 'PENDING_TREASURY_GM_APPROVAL') {
    push('TREASURY_GM_APPROVAL', 'PENDING', null, { createdDay: timeline.stageEnteredDay })
  } else if (spec.status === 'REJECTED') {
    push('TREASURY_GM_APPROVAL', 'REJECTED', timeline.terminalDay, {
      comments: spec.rejectionReasonAr ?? null,
    })
    return records
  } else if (
    (spec.status === 'RETURNED_FOR_COMPLETION' || spec.status === 'CANCELLED') &&
    spec.returnEvent?.fromStage === 'TREASURY_GM_APPROVAL'
  ) {
    push('TREASURY_GM_APPROVAL', 'RETURNED', timeline.returnDay, {
      comments: spec.returnEvent.reasonAr,
      returnToRoleId: 'deposit-specialist',
    })
    if (spec.status === 'CANCELLED') {
      push('DRAFT_PREPARATION', 'CANCELLED', timeline.terminalDay, {
        comments: spec.cancellationReasonAr ?? null,
      })
    }
    return records
  } else if (timeline.gmDecisionDay !== null) {
    push('TREASURY_GM_APPROVAL', 'APPROVED', timeline.gmDecisionDay, { comments: comment() })
  }

  // --- Executive stage (extended route only) ---
  if (args.extendedRoute) {
    if (spec.status === 'PENDING_EXECUTIVE_APPROVAL') {
      push('EXECUTIVE_APPROVAL', 'PENDING', null, { createdDay: timeline.stageEnteredDay })
      return records
    }
    if (
      spec.status === 'RETURNED_FOR_COMPLETION' &&
      spec.returnEvent?.fromStage === 'EXECUTIVE_APPROVAL'
    ) {
      push('EXECUTIVE_APPROVAL', 'RETURNED', timeline.returnDay, {
        comments: spec.returnEvent.reasonAr,
        returnToRoleId: 'deposit-specialist',
      })
      return records
    }
    if (timeline.execDecisionDay !== null) {
      push('EXECUTIVE_APPROVAL', 'APPROVED', timeline.execDecisionDay, { comments: comment() })
    }
  }

  // --- Investment Support stage ---
  const resolvedFinanceReturn =
    spec.returnEvent?.fromStage === 'FINANCE_REVIEW' && spec.returnEvent.resolved === true
  if (spec.status === 'PENDING_INVESTMENT_SUPPORT_REVIEW') {
    push('INVESTMENT_SUPPORT_REVIEW', 'PENDING', null, { createdDay: timeline.stageEnteredDay })
    return records
  }
  if (timeline.supportDecisionDay !== null) {
    if (resolvedFinanceReturn && timeline.returnDay !== null && timeline.resubmitDay !== null) {
      // First cycle: approved, returned by Finance, re-approved on resubmission.
      push('INVESTMENT_SUPPORT_REVIEW', 'APPROVED', addDays(timeline.returnDay, -1), {
        comments: comment(),
      })
      push('FINANCE_REVIEW', 'RETURNED', timeline.returnDay, {
        comments: spec.returnEvent?.reasonAr ?? null,
        returnToRoleId: 'investment-support',
      })
      push('INVESTMENT_SUPPORT_REVIEW', 'APPROVED', timeline.resubmitDay, {
        comments: 'تمت معالجة ملاحظة الإدارة المالية وتحديث بيانات المستفيد.',
        sequence: 2,
      })
    } else {
      push('INVESTMENT_SUPPORT_REVIEW', 'APPROVED', timeline.supportDecisionDay, {
        comments: comment(),
      })
    }
  }

  // --- Finance stage ---
  if (spec.status === 'PENDING_FINANCE_REVIEW') {
    push('FINANCE_REVIEW', 'PENDING', null, {
      createdDay: timeline.stageEnteredDay,
      sequence: resolvedFinanceReturn ? 2 : 1,
    })
    return records
  }
  if (timeline.financeDecisionDay !== null) {
    push('FINANCE_REVIEW', 'APPROVED', timeline.financeDecisionDay, { comments: comment() })
  }

  // --- Accounting execution stage ---
  if (spec.status === 'PENDING_ACCOUNTING_EXECUTION') {
    push('ACCOUNTING_EXECUTION', 'PENDING', null, { createdDay: timeline.stageEnteredDay })
    return records
  }
  if (timeline.executionDay !== null) {
    push('ACCOUNTING_EXECUTION', 'APPROVED', timeline.executionDay, {
      comments: 'تم تنفيذ التحويل وتوثيق المراجع.',
    })
  }

  // --- Deposit activation stage ---
  if (spec.status === 'PENDING_DEPOSIT_ACTIVATION') {
    push('DEPOSIT_ACTIVATION', 'PENDING', null, { createdDay: timeline.stageEnteredDay })
    return records
  }
  if (timeline.activationDay !== null) {
    push('DEPOSIT_ACTIVATION', 'APPROVED', timeline.activationDay, {
      comments: 'تم تأكيد تفعيل الوديعة لدى البنك.',
    })
  }

  return records
}
