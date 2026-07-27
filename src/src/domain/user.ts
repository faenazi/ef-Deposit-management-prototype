import type { RoleCode } from '@/domain/roles'
import type { IsoDateString } from '@/domain/common'

/**
 * Prototype user identity (docs/05-data/domain-model.md — User).
 * Fictional prototype identities only, on the reserved `.test` email domain.
 */
export interface User {
  readonly id: string
  readonly employeeNumber: string
  readonly displayNameAr: string
  readonly displayNameEn: string
  readonly email: string
  readonly jobTitleAr: string
  readonly departmentAr: string
  readonly roleId: RoleCode
  /** Local monogram/placeholder only — no real photos. */
  readonly avatarUrl: string | null
  readonly isActive: boolean
  /** Marks one of the eight primary demo users (demo-users.md). */
  readonly isPrimary: boolean
  /** Default landing route after switching — primary demo users only. */
  readonly defaultRoute: string | null
  readonly createdAt: IsoDateString
}
