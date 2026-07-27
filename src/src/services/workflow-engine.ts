import type { InvestmentRequest } from '@/domain/investment-request'
import type { ActivityType } from '@/domain/audit'
import type { User } from '@/domain/user'
import type { WorkflowAction } from '@/domain/business-rules'
import {
  actionRequiresReason,
  canSubmit,
  canTransition,
  getNextStatus,
  getReadiness,
  responsibleRoleForStatus,
  stageForStatus,
} from '@/domain/business-rules'
import { activityTypeLabels } from '@/domain/audit'
import { MockServiceError } from '@/services/service-config'
import type { StoreState } from '@/services/store'
import { getIds } from '@/services/store'
import { buildOpenRequestTask } from '@/mock-data/tasks'
import { isoDatePart } from '@/lib/dates'

/**
 * Central runtime workflow engine: every status change goes through the
 * domain transition guard (`canTransition` / `getNextStatus`), completes
 * the open task, creates the next stage's task and notification, and
 * appends the audit entry — exactly once, for every consumer.
 */

export function requireRequest(state: StoreState, requestId: string): InvestmentRequest {
  const request = state.requests.find((candidate) => candidate.id === requestId)
  if (request === undefined) {
    throw new MockServiceError('طلب الاستثمار المطلوب غير موجود.')
  }
  return request
}

export function requireUser(state: StoreState, userId: string): User {
  const user = state.users.find((candidate) => candidate.id === userId)
  if (user === undefined) {
    throw new MockServiceError('المستخدم غير معروف في بيانات النموذج الأولي.')
  }
  return user
}

/** Service-level guard: the read-only role can never mutate (integrity 14). */
export function requireBusinessActor(state: StoreState, userId: string): User {
  const user = requireUser(state, userId)
  if (user.roleId === 'read-only-user') {
    throw new MockServiceError('هذا المستخدم للعرض فقط ولا يملك صلاحية تنفيذ إجراءات.')
  }
  return user
}

/** The prototype "now": always the configured reference date (DEC-019). */
export function nowIso(state: StoreState): string {
  return state.settings.referenceDate
}

export function readinessContextFor(state: StoreState, requestId: string) {
  return {
    invitations: state.invitations.filter((i) => i.investmentRequestId === requestId),
    offers: state.offers.filter((o) => o.investmentRequestId === requestId),
    evaluations: state.evaluations.filter((e) => e.investmentRequestId === requestId),
    attachments: state.attachments.filter(
      (a) => a.entityType === 'INVESTMENT_REQUEST' && a.entityId === requestId,
    ),
  }
}

/** Recomputes and stores derived readiness after a draft edit. */
export function refreshReadiness(state: StoreState, request: InvestmentRequest): InvestmentRequest {
  const readiness = getReadiness(request, readinessContextFor(state, request.id), state.settings)
  const updated: InvestmentRequest = {
    ...request,
    readinessPercentage: readiness.percentage,
    missingRequirementCodes: readiness.missingCodes,
    updatedAt: nowIso(state),
  }
  replaceRequest(state, updated)
  return updated
}

export function replaceRequest(state: StoreState, request: InvestmentRequest): void {
  const index = state.requests.findIndex((candidate) => candidate.id === request.id)
  if (index >= 0) {
    state.requests[index] = request
  }
}

export function appendActivity(
  state: StoreState,
  input: {
    entityType: 'INVESTMENT_REQUEST' | 'DEPOSIT'
    entityId: string
    activityType: ActivityType
    actor: User
    title?: string
    description?: string | null
    previousStatus?: InvestmentRequest['status'] | null
    newStatus?: InvestmentRequest['status'] | null
    comment?: string | null
  },
): string {
  const ids = getIds()
  const id = ids.activity()
  state.activities.push({
    id,
    entityType: input.entityType,
    entityId: input.entityId,
    activityType: input.activityType,
    title: input.title ?? activityTypeLabels[input.activityType].ar,
    description: input.description ?? null,
    actorUserId: input.actor.id,
    actorRoleId: input.actor.roleId,
    occurredAt: nowIso(state),
    previousStatus: input.previousStatus ?? null,
    newStatus: input.newStatus ?? null,
    comment: input.comment ?? null,
    metadata: null,
  })
  return id
}

const activityTypeForAction: Record<WorkflowAction, ActivityType> = {
  SUBMIT: 'REQUEST_SUBMITTED',
  RESUBMIT: 'REQUEST_RESUBMITTED',
  APPROVE: 'REQUEST_APPROVED',
  RETURN: 'REQUEST_RETURNED',
  REJECT: 'REQUEST_REJECTED',
  CANCEL: 'REQUEST_CANCELLED',
  SUBMIT_WINNING_BANK: 'WINNING_BANK_COMPLETED',
  CONFIRM_EXECUTION: 'EXECUTION_RECORDED',
  CONFIRM_ACTIVATION: 'DEPOSIT_ACTIVATED',
}

export interface TransitionOptions {
  /** Mandatory for RETURN / REJECT / CANCEL (R-13). */
  readonly reason?: string
  readonly comment?: string
}

/**
 * Executes one workflow action. Throws when the transition table or the
 * actor's role forbids it; returns the updated request otherwise.
 */
export function executeTransition(
  state: StoreState,
  requestId: string,
  action: WorkflowAction,
  actorUserId: string,
  options: TransitionOptions = {},
): InvestmentRequest {
  const ids = getIds()
  const actor = requireBusinessActor(state, actorUserId)
  const request = requireRequest(state, requestId)

  if (!canTransition(request, action, actor.roleId)) {
    throw new MockServiceError('هذا الإجراء غير متاح للحالة الحالية أو لدور المستخدم الحالي.')
  }
  const reason = options.reason?.trim() ?? ''
  if (actionRequiresReason(action) && reason === '') {
    throw new MockServiceError('يجب إدخال سبب واضح لهذا الإجراء (إعادة أو رفض أو إلغاء).')
  }
  if (action === 'SUBMIT' || action === 'RESUBMIT') {
    if (!canSubmit(request, readinessContextFor(state, request.id), state.settings)) {
      throw new MockServiceError('لا يمكن الإرسال قبل استيفاء جميع متطلبات الجاهزية.')
    }
  }

  const submittedAmount =
    action === 'SUBMIT' || action === 'RESUBMIT' ? request.amount : undefined
  const nextStatus = getNextStatus(request, action, state.settings, submittedAmount)
  if (nextStatus === null) {
    throw new MockServiceError('انتقال غير صالح وفق جدول الحالات المعتمد.')
  }

  const now = nowIso(state)
  const previousStatus = request.status
  const currentStage = stageForStatus[previousStatus]

  // Resolve the PENDING approval record of the current decision stage.
  const pendingApproval = state.approvals.find(
    (approval) =>
      approval.investmentRequestId === request.id &&
      approval.stage === currentStage &&
      approval.decision === 'PENDING',
  )
  const decisionForAction =
    action === 'APPROVE' || action === 'CONFIRM_EXECUTION' || action === 'CONFIRM_ACTIVATION'
      ? ('APPROVED' as const)
      : action === 'RETURN'
        ? ('RETURNED' as const)
        : action === 'REJECT'
          ? ('REJECTED' as const)
          : action === 'CANCEL'
            ? ('CANCELLED' as const)
            : null
  if (pendingApproval !== undefined && decisionForAction !== null) {
    const index = state.approvals.indexOf(pendingApproval)
    state.approvals[index] = {
      ...pendingApproval,
      decision: decisionForAction,
      approverUserId: actor.id,
      decisionAt: now,
      comments: reason !== '' ? reason : (options.comment ?? null),
      returnToRoleId:
        decisionForAction === 'RETURNED' ? responsibleRoleForStatus[nextStatus] : null,
    }
  }

  // Complete the actor's open task on this request.
  const openTaskIndex = state.tasks.findIndex(
    (task) =>
      task.entityType === 'INVESTMENT_REQUEST' &&
      task.entityId === request.id &&
      task.status === 'OPEN',
  )
  const openTask = openTaskIndex >= 0 ? state.tasks[openTaskIndex] : undefined
  if (openTask !== undefined) {
    state.tasks[openTaskIndex] = {
      ...openTask,
      status: action === 'CANCEL' ? 'CANCELLED' : 'COMPLETED',
      completedAt: action === 'CANCEL' ? null : now,
      completedByUserId: action === 'CANCEL' ? null : actor.id,
    }
  }

  const isReturnAction = action === 'RETURN'
  const updated: InvestmentRequest = {
    ...request,
    status: nextStatus,
    currentStage: stageForStatus[nextStatus],
    currentOwnerRoleId: responsibleRoleForStatus[nextStatus],
    currentOwnerUserId: null,
    updatedAt: now,
    stageEnteredAt: now,
    submittedAt:
      action === 'SUBMIT' && request.submittedAt === null ? now : request.submittedAt,
    submittedAmount: submittedAmount ?? request.submittedAmount,
    returnReason: nextStatus === 'RETURNED_FOR_COMPLETION' ? reason : null,
    returnedFromStage:
      nextStatus === 'RETURNED_FOR_COMPLETION' ? currentStage : isReturnAction ? null : request.returnedFromStage,
    rejectionReason: action === 'REJECT' ? reason : request.rejectionReason,
    cancellationReason: action === 'CANCEL' ? reason : request.cancellationReason,
  }
  replaceRequest(state, updated)

  // Open the next decision cycle's PENDING approval record when entering a
  // decision/execution stage.
  const nextResponsibleRole = responsibleRoleForStatus[nextStatus]
  if (
    nextResponsibleRole !== null &&
    nextStatus !== 'DRAFT' &&
    nextStatus !== 'RETURNED_FOR_COMPLETION'
  ) {
    const priorSequences = state.approvals
      .filter(
        (approval) =>
          approval.investmentRequestId === request.id &&
          approval.stage === stageForStatus[nextStatus],
      )
      .map((approval) => approval.sequence)
    state.approvals.push({
      id: ids.approval(),
      investmentRequestId: request.id,
      stage: stageForStatus[nextStatus],
      approverRoleId: nextResponsibleRole,
      approverUserId: null,
      decision: 'PENDING',
      decisionAt: null,
      comments: null,
      returnToRoleId: null,
      sequence: priorSequences.length === 0 ? 1 : Math.max(...priorSequences) + 1,
      createdAt: now,
    })
  }

  // Next stage's workflow task + notification for the responsible role.
  if (nextResponsibleRole !== null) {
    const primaryUser = state.users.find(
      (user) => user.roleId === nextResponsibleRole && user.isPrimary,
    )
    const nextTask = buildOpenRequestTask({
      nextId: ids.task,
      status: nextStatus,
      requestId: request.id,
      requestTitle: request.id,
      priority: request.priority,
      stageEnteredDay: isoDatePart(now),
      assignedUserId:
        nextResponsibleRole === 'deposit-specialist' ? request.createdByUserId : (primaryUser?.id ?? null),
      returnReason: nextStatus === 'RETURNED_FOR_COMPLETION' ? reason : null,
      settings: state.settings,
      ts: (day, hour) => `${day}T${String(hour).padStart(2, '0')}:00:00+03:00`,
    })
    if (nextTask !== null) {
      state.tasks.push(nextTask)
    }
  }

  const activityId = appendActivity(state, {
    entityType: 'INVESTMENT_REQUEST',
    entityId: request.id,
    activityType: activityTypeForAction[action],
    actor,
    previousStatus,
    newStatus: nextStatus,
    comment: reason !== '' ? reason : (options.comment ?? null),
  })

  if (nextResponsibleRole !== null) {
    state.notifications.push({
      id: ids.notification(),
      recipientRoleId: nextResponsibleRole,
      recipientUserId: null,
      eventActivityId: activityId,
      titleAr: `${activityTypeLabels[activityTypeForAction[action]].ar} — ${request.id}`,
      entityType: 'INVESTMENT_REQUEST',
      entityId: request.id,
      createdAt: now,
      isRead: false,
    })
  }

  return updated
}
