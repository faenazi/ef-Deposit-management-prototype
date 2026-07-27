import { matchPath } from 'react-router'

import type { Permission } from '@/domain/permissions'

/**
 * Canonical route table (DEC-015) with the permission each route requires.
 * This is the single place that maps routes to permissions: the router guard
 * (RouteAccessBoundary) and the sidebar visibility both read from it, so a
 * hidden navigation link can never remain reachable by direct URL.
 */
export interface RouteAccessRule {
  /** react-router path pattern. */
  pattern: string
  /** `null` — open to every demo user. */
  permission: Permission | null
}

/** Canonical access-denied route (DEC-015) — the guard's redirect target. */
export const accessDeniedPath = '/access-denied'

/** Evaluated in order: literal segments must precede parameter patterns. */
export const routeAccessRules: readonly RouteAccessRule[] = [
  { pattern: '/', permission: 'dashboard.view' },
  { pattern: '/tasks', permission: 'tasks.view' },
  { pattern: '/deposits', permission: 'deposits.view' },
  { pattern: '/deposits/:depositId', permission: 'deposits.view' },
  { pattern: '/investment-requests', permission: 'requests.view' },
  { pattern: '/investment-requests/new', permission: 'requests.create' },
  { pattern: '/investment-requests/:requestId', permission: 'requests.view' },
  { pattern: '/investment-requests/:requestId/:section', permission: 'requests.view' },
  { pattern: '/reports', permission: 'reports.view' },
  { pattern: '/settings', permission: 'settings.view' },
  { pattern: accessDeniedPath, permission: null },
]

/**
 * Required permission for a concrete pathname, or `null` when the path is
 * open (including unknown paths, which the router resolves to Not Found).
 */
export function requiredPermissionForPath(pathname: string): Permission | null {
  for (const rule of routeAccessRules) {
    if (matchPath({ path: rule.pattern, end: true }, pathname)) return rule.permission
  }
  return null
}

export function canAccessRoute(
  permissions: readonly Permission[],
  pathname: string,
): boolean {
  const required = requiredPermissionForPath(pathname)
  return required === null || permissions.includes(required)
}
