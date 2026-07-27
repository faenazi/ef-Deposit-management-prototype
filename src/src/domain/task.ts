import type { RoleCode } from '@/domain/roles'
import type { EntityType, IsoDateString, ValueLabels } from '@/domain/common'

/**
 * Persisted task statuses (plan PD-02). Overdue, due-today, and upcoming
 * are derived from `dueAt` vs the reference date — never persisted.
 */
export const taskStatuses = ['OPEN', 'COMPLETED', 'CANCELLED'] as const

export type TaskStatus = (typeof taskStatuses)[number]

export const taskStatusLabels: Record<TaskStatus, ValueLabels> = {
  OPEN: { ar: 'مفتوحة', en: 'Open' },
  COMPLETED: { ar: 'مكتملة', en: 'Completed' },
  CANCELLED: { ar: 'ملغاة', en: 'Cancelled' },
}

/** Derived urgency bucket for open tasks (my-tasks.md). */
export const taskDueBuckets = ['OVERDUE', 'DUE_TODAY', 'UPCOMING'] as const

export type TaskDueBucket = (typeof taskDueBuckets)[number]

export const taskDueBucketLabels: Record<TaskDueBucket, ValueLabels> = {
  OVERDUE: { ar: 'متأخرة', en: 'Overdue' },
  DUE_TODAY: { ar: 'مستحقة اليوم', en: 'Due today' },
  UPCOMING: { ar: 'قادمة', en: 'Upcoming' },
}

export const taskPriorities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const

export type TaskPriority = (typeof taskPriorities)[number]

export const taskPriorityLabels: Record<TaskPriority, ValueLabels> = {
  CRITICAL: { ar: 'حرجة', en: 'Critical' },
  HIGH: { ar: 'عالية', en: 'High' },
  MEDIUM: { ar: 'متوسطة', en: 'Medium' },
  LOW: { ar: 'منخفضة', en: 'Low' },
}

/**
 * Workflow task action codes — tasks originate only from workflow events
 * (my-tasks.md); there are no user-created tasks.
 */
export const taskActionCodes = [
  'PREPARE_DRAFT',
  'COMPLETE_RETURNED_REQUEST',
  'APPROVE_TREASURY_GM',
  'APPROVE_EXECUTIVE',
  'COMPLETE_WINNING_BANK',
  'REVIEW_INVESTMENT_SUPPORT',
  'REVIEW_FINANCE',
  'EXECUTE_ACCOUNTING',
  'CONFIRM_ACTIVATION',
  'REVIEW_NEAR_MATURITY',
  'PROCESS_MATURED_DEPOSIT',
] as const

export type TaskActionCode = (typeof taskActionCodes)[number]

/**
 * Actionable workflow assignment (domain-model.md — Task; my-tasks.md).
 * A task completes only when its required business action completes.
 */
export interface Task {
  readonly id: string
  readonly type: TaskActionCode
  readonly title: string
  readonly description: string
  readonly entityType: EntityType
  readonly entityId: string
  readonly assignedRoleId: RoleCode
  /** Null for group tasks until claimed (Deposit Specialists group). */
  readonly assignedUserId: string | null
  readonly priority: TaskPriority
  readonly status: TaskStatus
  readonly dueAt: IsoDateString
  readonly createdAt: IsoDateString
  readonly completedAt: IsoDateString | null
  /** Group tasks record the actual actor on completion. */
  readonly completedByUserId: string | null
  readonly actionCode: TaskActionCode
  /** Highlighted return reason when the task originates from a return. */
  readonly returnReason: string | null
}
