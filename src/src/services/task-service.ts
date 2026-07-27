import type { Task, TaskDueBucket, TaskPriority, TaskStatus } from '@/domain/task'
import type { RoleCode } from '@/domain/roles'
import { getTaskDueBucket } from '@/domain/business-rules'
import { sortBy } from '@/lib/collections'
import { MockServiceError, serviceDelay } from '@/services/service-config'
import { getState } from '@/services/store'
import { requireBusinessActor, requireUser } from '@/services/workflow-engine'

/**
 * Task mock service (my-tasks.md). Tasks originate only from workflow
 * events; completing the business action completes its task through the
 * workflow engine — this service reads, claims, and derives urgency.
 */

export interface TaskListFilter {
  readonly roleId?: RoleCode
  readonly assignedUserId?: string
  readonly status?: TaskStatus
  readonly priority?: TaskPriority
  readonly dueBucket?: TaskDueBucket
}

export interface TaskListItem {
  readonly task: Task
  /** Derived urgency for OPEN tasks (never persisted). */
  readonly dueBucket: TaskDueBucket | null
}

const priorityOrder: Record<TaskPriority, number> = {
  CRITICAL: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
}

export async function listTasks(filter: TaskListFilter = {}): Promise<TaskListItem[]> {
  await serviceDelay()
  const state = getState()
  let results = [...state.tasks]
  if (filter.roleId !== undefined) {
    results = results.filter((task) => task.assignedRoleId === filter.roleId)
  }
  if (filter.assignedUserId !== undefined) {
    // A user sees personal tasks plus their role group's unclaimed tasks.
    const user = requireUser(state, filter.assignedUserId)
    results = results.filter(
      (task) =>
        task.assignedUserId === user.id ||
        (task.assignedUserId === null && task.assignedRoleId === user.roleId),
    )
  }
  if (filter.status !== undefined) {
    results = results.filter((task) => task.status === filter.status)
  }
  if (filter.priority !== undefined) {
    results = results.filter((task) => task.priority === filter.priority)
  }
  let items = results.map((task) => ({
    task,
    dueBucket: getTaskDueBucket(task, state.settings.referenceDate),
  }))
  if (filter.dueBucket !== undefined) {
    items = items.filter((item) => item.dueBucket === filter.dueBucket)
  }
  return sortBy(
    sortBy(items, (item) => item.task.dueAt),
    (item) => priorityOrder[item.task.priority],
  )
}

/** Claims an unassigned group task for an eligible user (my-tasks.md). */
export async function claimGroupTask(actorUserId: string, taskId: string): Promise<Task> {
  await serviceDelay()
  const state = getState()
  const actor = requireBusinessActor(state, actorUserId)
  const index = state.tasks.findIndex((candidate) => candidate.id === taskId)
  const task = index >= 0 ? state.tasks[index] : undefined
  if (task === undefined) {
    throw new MockServiceError('المهمة غير موجودة.')
  }
  if (task.status !== 'OPEN' || task.assignedUserId !== null) {
    throw new MockServiceError('هذه المهمة غير متاحة للاستلام.')
  }
  if (task.assignedRoleId !== actor.roleId) {
    throw new MockServiceError('لا يمكن استلام مهمة مسندة إلى دور آخر.')
  }
  const claimed: Task = { ...task, assignedUserId: actor.id }
  state.tasks[index] = claimed
  return claimed
}
