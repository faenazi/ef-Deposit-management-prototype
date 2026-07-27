import type { RoleCode } from '@/domain/roles'
import { users } from '@/mock-data/users'

/**
 * The eight primary demo users for the header role switcher, derived from
 * the single user fixture (`mock-data/users.ts`) — identities are never
 * duplicated. Supporting users appear in ownership, assignment, and
 * activity data but not as switcher entries.
 */
export interface DemoUser {
  id: string
  nameAr: string
  nameEn: string
  jobTitleAr: string
  departmentAr: string
  email: string
  roleCode: RoleCode
  /** Default landing route after switching, per demo-users.md. */
  defaultRoute: string
  /** Marks one of the eight primary demo users (vs supporting users). */
  isPrimary: boolean
}

export const demoUsers: DemoUser[] = users
  .filter((user) => user.isPrimary)
  .map((user) => ({
    id: user.id,
    nameAr: user.displayNameAr,
    nameEn: user.displayNameEn,
    jobTitleAr: user.jobTitleAr,
    departmentAr: user.departmentAr,
    email: user.email,
    roleCode: user.roleId,
    defaultRoute: user.defaultRoute ?? '/',
    isPrimary: user.isPrimary,
  }))

/** Default demo identity: the Deposit Specialist (demo-users.md switcher rules). */
export const defaultDemoUser = demoUsers[0]

export function findDemoUser(id: string): DemoUser | undefined {
  return demoUsers.find((user) => user.id === id)
}
