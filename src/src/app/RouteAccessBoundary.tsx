import { Navigate, Outlet, useLocation } from 'react-router'

import { accessDeniedPath } from '@/app/route-access'
import { useUser } from '@/app/user-context'

/**
 * Route-level access protection for the prototype. Hiding navigation links is
 * not sufficient: entering a restricted URL directly must land on the branded
 * access-denied page. Re-evaluates on every navigation and on user switching.
 */
export function RouteAccessBoundary() {
  const { pathname } = useLocation()
  const { canAccessPath } = useUser()

  if (!canAccessPath(pathname)) {
    return <Navigate to={accessDeniedPath} replace state={{ deniedPath: pathname }} />
  }

  return <Outlet />
}
