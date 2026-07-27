import { createContext, useContext } from 'react'

import type { Permission } from '@/domain/permissions'
import type { RoleDefinition } from '@/domain/roles'
import type { DemoUser } from '@/mock-data/demo-users'

/**
 * Lightweight prototype user context (no real authentication, tokens, or
 * identity integration). Provided by UserProvider; consumed via useUser().
 */
export interface UserContextValue {
  user: DemoUser
  role: RoleDefinition
  permissions: readonly Permission[]
  can: (permission: Permission) => boolean
  /** Route-level check backed by the central route-access map. */
  canAccessPath: (pathname: string) => boolean
  switchUser: (userId: string) => void
  /** One-click return to the default Deposit Specialist (demo-users.md). */
  resetToDefaultUser: () => void
}

export const UserContext = createContext<UserContextValue | null>(null)

export function useUser(): UserContextValue {
  const value = useContext(UserContext)
  if (!value) throw new Error('useUser must be used within a UserProvider')
  return value
}
