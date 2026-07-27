import type { AppNotification, AuditEntry } from '@/domain/audit'
import type { InvestmentRequest } from '@/domain/investment-request'
import { responsibleRoleForStatus } from '@/domain/business-rules'

/**
 * Notification projection (plan §4.27 — gap G-02): a small seeded set
 * derived from the most recent workflow activities so the top-bar
 * indicator is populated. Notifications are projections of events, never
 * a parallel messaging system.
 */

const NOTIFICATION_COUNT = 20

export interface BuildNotificationsArgs {
  readonly nextId: () => string
  readonly activities: readonly AuditEntry[]
  readonly requests: readonly InvestmentRequest[]
}

export function buildNotifications(args: BuildNotificationsArgs): AppNotification[] {
  const requestById = new Map(args.requests.map((request) => [request.id, request]))

  // Latest workflow events on requests that still await an action — the
  // responsible role is the natural recipient.
  const candidates = [...args.activities]
    .filter((activity) => {
      if (activity.entityType !== 'INVESTMENT_REQUEST') return false
      const request = requestById.get(activity.entityId)
      if (request === undefined) return false
      return responsibleRoleForStatus[request.status] !== null
    })
    .sort((a, b) => (a.occurredAt < b.occurredAt ? 1 : -1))
    .slice(0, NOTIFICATION_COUNT)

  return candidates.map((activity, index) => {
    const request = requestById.get(activity.entityId)
    const recipientRole =
      request === undefined ? 'deposit-specialist' : (responsibleRoleForStatus[request.status] ?? 'deposit-specialist')
    return {
      id: args.nextId(),
      recipientRoleId: recipientRole,
      recipientUserId: null,
      eventActivityId: activity.id,
      titleAr: `${activity.title} — ${activity.entityId}`,
      entityType: activity.entityType,
      entityId: activity.entityId,
      createdAt: activity.occurredAt,
      isRead: index >= 12,
    }
  })
}
