import type { ActivityType, AuditEntry } from '@/domain/audit'
import { activityTypeLabels } from '@/domain/audit'
import type { InvestmentRequestStatus } from '@/domain/investment-request'
import type { RoleCode } from '@/domain/roles'
import type { EntityType } from '@/domain/common'

/**
 * Activity/audit collector (plan §4.26): append-only entries recording
 * previous status, new status, actor, role, timestamp, and comment.
 * The composer pushes events strictly in lifecycle order (integrity 11).
 */

export interface ActivityPush {
  readonly entityType: EntityType
  readonly entityId: string
  readonly activityType: ActivityType
  readonly day: string
  readonly hour: number
  readonly actorUserId: string
  readonly actorRoleId: RoleCode
  readonly description?: string
  readonly previousStatus?: InvestmentRequestStatus
  readonly newStatus?: InvestmentRequestStatus
  readonly comment?: string
}

export interface ActivityCollector {
  readonly entries: AuditEntry[]
  /** Appends one entry and returns its id. */
  readonly push: (event: ActivityPush) => string
  /**
   * Appends a whole entity's events in chronological order and returns
   * their ids. Events are collected in code order for readability, then
   * sorted here so the persisted history is always lifecycle-ordered
   * (integrity check 11). The sort is stable, so same-timestamp events
   * keep their authored order and the seed stays deterministic.
   */
  readonly pushChronological: (events: readonly ActivityPush[]) => string[]
}

export function createActivityCollector(
  nextId: () => string,
  ts: (day: string, hour: number) => string,
): ActivityCollector {
  const entries: AuditEntry[] = []
  const collector: ActivityCollector = {
    entries,
    push(event) {
      const id = nextId()
      entries.push({
        id,
        entityType: event.entityType,
        entityId: event.entityId,
        activityType: event.activityType,
        title: activityTypeLabels[event.activityType].ar,
        description: event.description ?? null,
        actorUserId: event.actorUserId,
        actorRoleId: event.actorRoleId,
        occurredAt: ts(event.day, event.hour),
        previousStatus: event.previousStatus ?? null,
        newStatus: event.newStatus ?? null,
        comment: event.comment ?? null,
        metadata: null,
      })
      return id
    },
    pushChronological(events) {
      return [...events]
        .sort((a, b) => {
          const byDay = a.day.localeCompare(b.day)
          return byDay !== 0 ? byDay : a.hour - b.hour
        })
        .map((event) => collector.push(event))
    },
  }
  return collector
}
