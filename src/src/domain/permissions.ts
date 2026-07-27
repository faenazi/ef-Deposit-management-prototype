import type { RoleCode } from '@/domain/roles'

/**
 * Central prototype permission model (docs/02-business/roles-and-permissions.md).
 * Permissions are role-based; stage-aware refinement (combining a permission
 * with the transaction status) arrives with the workflow in later steps and
 * layers on top of this model without rewriting it.
 * No permission string may be written as a literal outside this file and the
 * route-access map.
 */
export type Permission =
  | 'dashboard.view'
  | 'tasks.view'
  | 'requests.view'
  | 'requests.create'
  | 'requests.edit-draft'
  | 'requests.submit'
  | 'requests.approve-treasury'
  | 'requests.approve-executive'
  | 'requests.enter-winning-bank'
  | 'requests.review-investment-support'
  | 'requests.review-finance'
  | 'requests.execute-accounting'
  | 'requests.confirm-activation'
  | 'deposits.view'
  | 'reports.view'
  | 'settings.view'
  | 'settings.manage'

/**
 * Role → permission matrix, derived strictly from the documented
 * "Can View / Can Edit / Can Act" lists per role. View permissions grant
 * page access; visibility never implies edit permission.
 */
export const rolePermissions: Record<RoleCode, readonly Permission[]> = {
  'deposit-specialist': [
    'dashboard.view',
    'tasks.view',
    'requests.view',
    'requests.create',
    'requests.edit-draft',
    'requests.submit',
    'requests.enter-winning-bank',
    'requests.confirm-activation',
    'deposits.view',
  ],
  'treasury-general-manager': [
    'dashboard.view',
    'tasks.view',
    'requests.view',
    'requests.approve-treasury',
    'deposits.view',
    'reports.view',
  ],
  'investment-treasury-executive': [
    'dashboard.view',
    'tasks.view',
    'requests.view',
    'requests.approve-executive',
    'deposits.view',
    'reports.view',
  ],
  'investment-support': [
    'dashboard.view',
    'tasks.view',
    'requests.view',
    'requests.review-investment-support',
  ],
  'finance-reviewer': [
    'dashboard.view',
    'tasks.view',
    'requests.view',
    'requests.review-finance',
  ],
  'accounting-executor': [
    'dashboard.view',
    'tasks.view',
    'requests.view',
    'requests.execute-accounting',
  ],
  // The administrator views all records for testing but must not perform
  // business approval decisions on behalf of business roles.
  'system-admin': [
    'dashboard.view',
    'tasks.view',
    'requests.view',
    'deposits.view',
    'reports.view',
    'settings.view',
    'settings.manage',
  ],
  // Read-only: view only — no create, edit, approve, execute, or activate,
  // and no assigned tasks.
  'read-only-user': ['dashboard.view', 'requests.view', 'deposits.view', 'reports.view'],
}

export function roleHasPermission(role: RoleCode, permission: Permission): boolean {
  return rolePermissions[role].includes(permission)
}
