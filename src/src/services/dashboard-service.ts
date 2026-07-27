import type { DashboardSummary } from '@/domain/analytics'
import type { RoleCode } from '@/domain/roles'
import { serviceDelay } from '@/services/service-config'
import { getState } from '@/services/store'
import { getDashboardSummary } from '@/services/analytics'

/**
 * Dashboard mock service: role-aware KPI payloads derived entirely from
 * the entity stores (plan §4.28) — totals always reconcile with lists.
 */
export async function fetchDashboardSummary(roleId: RoleCode): Promise<DashboardSummary> {
  await serviceDelay()
  return getDashboardSummary(getState(), roleId)
}
