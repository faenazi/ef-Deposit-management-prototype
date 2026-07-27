import type { SystemSettings } from '@/domain/settings'
import type { DemoScenario } from '@/mock-data/scenarios'
import { MockServiceError, serviceDelay } from '@/services/service-config'
import { getState, loadScenarioState, resetStoreToBaseline } from '@/services/store'
import { requireUser } from '@/services/workflow-engine'

/**
 * Settings mock service (docs/03-functional/settings.md): business
 * configuration, demo scenarios, and the administrator's deterministic
 * demo-data reset (DEC-019). Configuration is administrator-only and every
 * value is consumed by the central business rules — never by components.
 */

function requireAdministrator(actorUserId: string): void {
  const user = requireUser(getState(), actorUserId)
  if (user.roleId !== 'system-admin') {
    throw new MockServiceError('إعدادات النظام متاحة لمدير النظام فقط.')
  }
}

export async function getSystemSettings(): Promise<SystemSettings> {
  await serviceDelay()
  return getState().settings
}

/** Administrator-only configuration update; audited by the caller's UI. */
export async function updateSystemSettings(
  actorUserId: string,
  patch: Partial<
    Pick<
      SystemSettings,
      'approvalThresholdSar' | 'minContactedBanks' | 'maturityWarningDays' | 'standardTenors'
    >
  >,
): Promise<SystemSettings> {
  await serviceDelay()
  requireAdministrator(actorUserId)
  const state = getState()
  if (patch.approvalThresholdSar !== undefined && !(patch.approvalThresholdSar > 0)) {
    throw new MockServiceError('حد الاعتماد يجب أن يكون أكبر من صفر.')
  }
  if (patch.minContactedBanks !== undefined && patch.minContactedBanks < 1) {
    throw new MockServiceError('الحد الأدنى لعدد البنوك المخاطبة يجب ألا يقل عن بنك واحد.')
  }
  state.settings = { ...state.settings, ...patch }
  return state.settings
}

export async function listDemoScenarios(): Promise<readonly DemoScenario[]> {
  await serviceDelay()
  return getState().scenarios
}

/**
 * «إعادة ضبط البيانات التجريبية» — restores the deterministic baseline
 * (identical IDs, values, and timestamps) without a page reload. The UI
 * must confirm before calling this.
 */
export async function resetDemoData(actorUserId: string): Promise<void> {
  await serviceDelay()
  requireAdministrator(actorUserId)
  resetStoreToBaseline()
}

/** Loads a curated scenario: deterministic reset + its starting context. */
export async function loadScenario(
  actorUserId: string,
  scenarioId: string,
): Promise<DemoScenario> {
  await serviceDelay()
  requireAdministrator(actorUserId)
  return loadScenarioState(scenarioId)
}
