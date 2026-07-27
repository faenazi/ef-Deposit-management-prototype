/**
 * Canonical prototype roles.
 * Codes: docs/05-data/domain-model.md (approved prototype roles).
 * Display names: docs/02-business/roles-and-permissions.md and DEC-011.
 * This file is the single source of role identity — role codes and role
 * names must never be written as literals anywhere else.
 */
export const roleCodes = [
  'deposit-specialist',
  'treasury-general-manager',
  'investment-treasury-executive',
  'investment-support',
  'finance-reviewer',
  'accounting-executor',
  'system-admin',
  'read-only-user',
] as const

export type RoleCode = (typeof roleCodes)[number]

export interface RoleDefinition {
  code: RoleCode
  nameAr: string
  nameEn: string
}

export const roles: Record<RoleCode, RoleDefinition> = {
  'deposit-specialist': {
    code: 'deposit-specialist',
    nameAr: 'أخصائي ودائع',
    nameEn: 'Deposit Specialist',
  },
  'treasury-general-manager': {
    code: 'treasury-general-manager',
    nameAr: 'مدير عام الخزينة',
    nameEn: 'General Manager of Treasury',
  },
  'investment-treasury-executive': {
    code: 'investment-treasury-executive',
    nameAr: 'المدير التنفيذي لقطاع الاستثمار والخزينة',
    nameEn: 'Executive Director of Investment and Treasury Sector',
  },
  'investment-support': {
    code: 'investment-support',
    nameAr: 'أخصائي دعم الاستثمار',
    nameEn: 'Investment Support Specialist',
  },
  'finance-reviewer': {
    code: 'finance-reviewer',
    nameAr: 'أخصائي المالية',
    nameEn: 'Finance Specialist',
  },
  'accounting-executor': {
    code: 'accounting-executor',
    nameAr: 'أخصائي المحاسبة',
    nameEn: 'Accounting Specialist',
  },
  'system-admin': {
    code: 'system-admin',
    nameAr: 'مدير النظام',
    nameEn: 'System Administrator',
  },
  'read-only-user': {
    code: 'read-only-user',
    nameAr: 'مستخدم للعرض فقط',
    nameEn: 'Read-only User',
  },
}
