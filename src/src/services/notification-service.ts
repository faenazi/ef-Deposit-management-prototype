import type { AppNotification } from '@/domain/audit'
import type { RoleCode } from '@/domain/roles'
import { sortBy } from '@/lib/collections'
import { serviceDelay } from '@/services/service-config'
import { getState } from '@/services/store'

/**
 * Notification mock service (plan §4.27): role-directed projections of
 * workflow events feeding the top-bar indicator — never a task list.
 */

export async function listNotifications(roleId: RoleCode): Promise<AppNotification[]> {
  await serviceDelay()
  const state = getState()
  return sortBy(
    state.notifications.filter((notification) => notification.recipientRoleId === roleId),
    (notification) => notification.createdAt,
    'desc',
  )
}

export async function countUnreadNotifications(roleId: RoleCode): Promise<number> {
  await serviceDelay()
  return getState().notifications.filter(
    (notification) => notification.recipientRoleId === roleId && !notification.isRead,
  ).length
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  await serviceDelay()
  const state = getState()
  const index = state.notifications.findIndex(
    (notification) => notification.id === notificationId,
  )
  const notification = index >= 0 ? state.notifications[index] : undefined
  if (notification !== undefined) {
    state.notifications[index] = { ...notification, isRead: true }
  }
}

export async function markAllNotificationsRead(roleId: RoleCode): Promise<void> {
  await serviceDelay()
  const state = getState()
  state.notifications = state.notifications.map((notification) =>
    notification.recipientRoleId === roleId ? { ...notification, isRead: true } : notification,
  )
}
