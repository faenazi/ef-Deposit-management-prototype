import type { RoleCode } from '@/domain/roles'
import type { InvestmentRequest, SectionKey } from '@/domain/investment-request'
import type { ApprovalStage } from '@/domain/approval'
import {
  isPreparationStatus,
  isTerminalStatus,
  responsibleRoleForStatus,
  stageForStatus,
} from '@/domain/business-rules'
import { approvalStages } from '@/domain/approval'

/**
 * Role-based section visibility and editability (plan §10;
 * roles-and-permissions.md Field-Level Editability). One central matrix —
 * pages must never re-implement per-component permission conditions.
 * Visibility never implies editability; completed stages are always
 * read-only.
 */

export const sectionModes = ['HIDDEN', 'READ_ONLY', 'EDITABLE', 'ACTIONABLE'] as const

export type SectionMode = (typeof sectionModes)[number]

/** Roles allowed to see unsubmitted drafts (Draft Rules #6, plan §10). */
const draftVisibleRoles: readonly RoleCode[] = [
  'deposit-specialist',
  'treasury-general-manager',
  'system-admin',
]

/**
 * Request-level visibility: Finance, Accounting, Investment Support, and
 * non-Treasury roles cannot access unsubmitted drafts. Everything else is
 * visible per the role's view permissions (enforced at the page level).
 */
export function canViewRequest(role: RoleCode, request: InvestmentRequest): boolean {
  if (request.submittedAt === null && request.status === 'DRAFT') {
    return draftVisibleRoles.includes(role)
  }
  return true
}

/** The workspace section that carries each execution stage's record. */
const stageSections: Readonly<Partial<Record<SectionKey, ApprovalStage>>> = {
  'winning-bank': 'WINNING_BANK_COMPLETION',
  'investment-support-review': 'INVESTMENT_SUPPORT_REVIEW',
  'finance-review': 'FINANCE_REVIEW',
  'accounting-execution': 'ACCOUNTING_EXECUTION',
  'deposit-activation': 'DEPOSIT_ACTIVATION',
}

/** Preparation sections editable by the creating specialist while preparing. */
const preparationEditableSections: readonly SectionKey[] = [
  'request-information',
  'liquidity',
  'bank-rfq',
  'bank-offers',
  'evaluation-recommendation',
  'attachments',
]

/**
 * The restricted information set visible to Finance (plan §4.18): approved
 * request summary, winning bank and beneficiary details, Investment Support
 * outcome, its own review, and the required attachments/history — never the
 * draft-working details or internal comparisons.
 */
const financeVisibleSections: readonly SectionKey[] = [
  'overview',
  'request-information',
  'approval-history',
  'winning-bank',
  'investment-support-review',
  'finance-review',
  'accounting-execution',
  'attachments',
  'notes',
  'activity-history',
]

const stageOrder = (stage: ApprovalStage): number => approvalStages.indexOf(stage)

/**
 * Central mode resolution for one role, one request, one workspace section.
 * Later steps render sections strictly from this result.
 */
export function getSectionMode(
  role: RoleCode,
  request: InvestmentRequest,
  section: SectionKey,
): SectionMode {
  if (!canViewRequest(role, request)) {
    return 'HIDDEN'
  }

  const currentStage = stageForStatus[request.status]
  const responsibleRole = responsibleRoleForStatus[request.status]
  const isResponsible = role === responsibleRole

  // Stage-record sections are hidden until their stage is reached (no data
  // exists yet) and read-only after their stage completes. Terminal
  // rejected/cancelled requests keep the sections whose records exist
  // (winning-bank data marks entry into the execution phase).
  const sectionStage = stageSections[section]
  if (sectionStage !== undefined) {
    const reached =
      request.status === 'CONVERTED_TO_ACTIVE_DEPOSIT' ||
      (request.status === 'REJECTED' || request.status === 'CANCELLED'
        ? request.winningBankDetails !== null
        : stageOrder(currentStage) >= stageOrder(sectionStage))
    if (!reached) {
      return 'HIDDEN'
    }
  }

  // Finance information boundary (Review and Execution Rules #2).
  if (role === 'finance-reviewer' && !financeVisibleSections.includes(section)) {
    return 'HIDDEN'
  }

  // Read-only user and administrator never edit business sections; the
  // administrator must not perform workflow decisions in normal scenarios.
  if (role === 'read-only-user' || role === 'system-admin') {
    return 'READ_ONLY'
  }

  // Preparation: the specialist edits preparation sections and notes.
  if (isPreparationStatus(request.status)) {
    if (role === 'deposit-specialist') {
      if (preparationEditableSections.includes(section)) {
        return 'EDITABLE'
      }
      if (section === 'notes') {
        return 'EDITABLE'
      }
      return 'READ_ONLY'
    }
    return 'READ_ONLY'
  }

  // Decision stages: the deciding role acts through the decision panel —
  // encoded on the approval-history section; specialist data stays read-only.
  if (
    request.status === 'PENDING_TREASURY_GM_APPROVAL' ||
    request.status === 'PENDING_EXECUTIVE_APPROVAL'
  ) {
    if (isResponsible && section === 'approval-history') {
      return 'ACTIONABLE'
    }
    return 'READ_ONLY'
  }

  // Execution stages: only the stage's own section is editable/actionable
  // for the responsible role; everything else is read-only.
  if (sectionStage !== undefined && sectionStage === currentStage && isResponsible) {
    return 'ACTIONABLE'
  }
  if (isResponsible && section === 'notes' && !isTerminalStatus(request.status)) {
    return 'EDITABLE'
  }

  return 'READ_ONLY'
}
