import type { User } from '@/domain/user'
import type { RoleCode } from '@/domain/roles'
import { serviceDelay } from '@/services/service-config'
import { getState } from '@/services/store'
import { requireUser } from '@/services/workflow-engine'

/**
 * User mock service: prototype identities for switching, assignment,
 * and audit display. Users are reference data — never business-editable.
 */

export async function listUsers(filter: { roleId?: RoleCode } = {}): Promise<User[]> {
  await serviceDelay()
  const state = getState()
  return filter.roleId === undefined
    ? [...state.users]
    : state.users.filter((user) => user.roleId === filter.roleId)
}

export async function getUserById(userId: string): Promise<User> {
  await serviceDelay()
  return requireUser(getState(), userId)
}

/** The eight primary demo users, in demo-users.md order. */
export async function listPrimaryDemoUsers(): Promise<User[]> {
  await serviceDelay()
  return getState().users.filter((user) => user.isPrimary)
}
