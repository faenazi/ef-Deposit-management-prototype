import { useMemo, useState, type ReactNode } from 'react'

import { rolePermissions } from '@/domain/permissions'
import { roles } from '@/domain/roles'
import { canAccessRoute } from '@/app/route-access'
import { UserContext, type UserContextValue } from '@/app/user-context'
import { defaultDemoUser, findDemoUser } from '@/mock-data/demo-users'

export function UserProvider({ children }: { children: ReactNode }) {
  // In-memory only (DEC-019): reloading resets to the default Deposit
  // Specialist; no localStorage or other persistence.
  const [user, setUser] = useState(defaultDemoUser)

  const value = useMemo<UserContextValue>(() => {
    const permissions = rolePermissions[user.roleCode]
    return {
      user,
      role: roles[user.roleCode],
      permissions,
      can: (permission) => permissions.includes(permission),
      canAccessPath: (pathname) => canAccessRoute(permissions, pathname),
      switchUser: (userId) => {
        const next = findDemoUser(userId)
        if (next) setUser(next)
      },
      resetToDefaultUser: () => setUser(defaultDemoUser),
    }
  }, [user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
