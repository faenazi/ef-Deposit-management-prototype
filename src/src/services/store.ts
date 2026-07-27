import type { MockDataset } from '@/mock-data/index'
import { buildBaselineDataset } from '@/mock-data/index'
import { checkDatasetIntegrity } from '@/mock-data/integrity'
import { demoScenarios, type DemoScenario } from '@/mock-data/scenarios'
import { createIdAllocator, parseSequence } from '@/lib/ids'
import { PROTOTYPE_YEAR } from '@/mock-data/reference-date'

/**
 * The single in-memory prototype store (DEC-019): initialized from the
 * deterministic baseline, mutated only through the mock services, and
 * rebuilt to the identical baseline by `resetDemoData()` / browser reload.
 * No localStorage, IndexedDB, backend, or database — ever.
 */

/** Mutable working copy of the dataset collections. */
export interface StoreState {
  settings: MockDataset['settings']
  roles: MockDataset['roles']
  users: MockDataset['users']
  banks: MockDataset['banks']
  evaluationCriteria: MockDataset['evaluationCriteria']
  requests: MockDataset['requests'][number][]
  invitations: MockDataset['invitations'][number][]
  offers: MockDataset['offers'][number][]
  evaluations: MockDataset['evaluations'][number][]
  approvals: MockDataset['approvals'][number][]
  supportReviews: MockDataset['supportReviews'][number][]
  financeReviews: MockDataset['financeReviews'][number][]
  accountingExecutions: MockDataset['accountingExecutions'][number][]
  activations: MockDataset['activations'][number][]
  deposits: MockDataset['deposits'][number][]
  maturityActions: MockDataset['maturityActions'][number][]
  tasks: MockDataset['tasks'][number][]
  attachments: MockDataset['attachments'][number][]
  notes: MockDataset['notes'][number][]
  activities: MockDataset['activities'][number][]
  notifications: MockDataset['notifications'][number][]
  scenarios: readonly DemoScenario[]
}

/** Runtime ID allocators continuing after the highest seeded sequence. */
export interface StoreIdAllocators {
  request: () => string
  deposit: () => string
  invitation: () => string
  offer: () => string
  evaluation: () => string
  approval: () => string
  task: () => string
  attachment: () => string
  activity: () => string
  note: () => string
  notification: () => string
  supportReview: () => string
  financeReview: () => string
  accountingExecution: () => string
  activation: () => string
  maturityAction: () => string
}

interface Store {
  state: StoreState
  ids: StoreIdAllocators
}

function maxSequence(idsList: readonly string[]): number {
  return idsList.reduce((max, id) => Math.max(max, parseSequence(id)), 0)
}

function createState(dataset: MockDataset): StoreState {
  return {
    settings: structuredClone(dataset.settings),
    roles: dataset.roles,
    users: dataset.users,
    banks: dataset.banks,
    evaluationCriteria: dataset.evaluationCriteria,
    requests: structuredClone(dataset.requests) as StoreState['requests'],
    invitations: structuredClone(dataset.invitations) as StoreState['invitations'],
    offers: structuredClone(dataset.offers) as StoreState['offers'],
    evaluations: structuredClone(dataset.evaluations) as StoreState['evaluations'],
    approvals: structuredClone(dataset.approvals) as StoreState['approvals'],
    supportReviews: structuredClone(dataset.supportReviews) as StoreState['supportReviews'],
    financeReviews: structuredClone(dataset.financeReviews) as StoreState['financeReviews'],
    accountingExecutions: structuredClone(
      dataset.accountingExecutions,
    ) as StoreState['accountingExecutions'],
    activations: structuredClone(dataset.activations) as StoreState['activations'],
    deposits: structuredClone(dataset.deposits) as StoreState['deposits'],
    maturityActions: structuredClone(dataset.maturityActions) as StoreState['maturityActions'],
    tasks: structuredClone(dataset.tasks) as StoreState['tasks'],
    attachments: structuredClone(dataset.attachments) as StoreState['attachments'],
    notes: structuredClone(dataset.notes) as StoreState['notes'],
    activities: structuredClone(dataset.activities) as StoreState['activities'],
    notifications: structuredClone(dataset.notifications) as StoreState['notifications'],
    scenarios: dataset.scenarios,
  }
}

function createAllocators(state: StoreState): StoreIdAllocators {
  const year = PROTOTYPE_YEAR
  return {
    request: createIdAllocator('IR', year, maxSequence(state.requests.map((r) => r.id))),
    deposit: createIdAllocator('DEP', year, maxSequence(state.deposits.map((d) => d.id))),
    invitation: createIdAllocator('RFQ', year, maxSequence(state.invitations.map((i) => i.id))),
    offer: createIdAllocator('OFF', year, maxSequence(state.offers.map((o) => o.id))),
    evaluation: createIdAllocator('EVL', year, maxSequence(state.evaluations.map((e) => e.id))),
    approval: createIdAllocator('APR', year, maxSequence(state.approvals.map((a) => a.id))),
    task: createIdAllocator('TSK', year, maxSequence(state.tasks.map((t) => t.id))),
    attachment: createIdAllocator('ATT', year, maxSequence(state.attachments.map((a) => a.id))),
    activity: createIdAllocator('ACT', year, maxSequence(state.activities.map((a) => a.id)), 5),
    note: createIdAllocator('NOT', year, maxSequence(state.notes.map((n) => n.id))),
    notification: createIdAllocator(
      'NTF',
      year,
      maxSequence(state.notifications.map((n) => n.id)),
    ),
    supportReview: createIdAllocator(
      'ISR',
      year,
      maxSequence(state.supportReviews.map((r) => r.id)),
    ),
    financeReview: createIdAllocator(
      'FRV',
      year,
      maxSequence(state.financeReviews.map((r) => r.id)),
    ),
    accountingExecution: createIdAllocator(
      'AEX',
      year,
      maxSequence(state.accountingExecutions.map((r) => r.id)),
    ),
    activation: createIdAllocator('DAC', year, maxSequence(state.activations.map((r) => r.id))),
    maturityAction: createIdAllocator(
      'MAT',
      year,
      maxSequence(state.maturityActions.map((r) => r.id)),
    ),
  }
}

let store: Store | null = null
let integrityVerified = false

function assertSeedIntegrity(dataset: MockDataset): void {
  if (integrityVerified || !import.meta.env.DEV) {
    return
  }
  integrityVerified = true
  const issues = checkDatasetIntegrity(dataset)
  // Integrity check 15: two independent compositions must be deep-equal.
  const second = buildBaselineDataset()
  if (JSON.stringify(dataset) !== JSON.stringify(second)) {
    issues.push('Determinism: two baseline compositions are not deep-equal')
  }
  if (issues.length > 0) {
    const summary = issues.slice(0, 20).join('\n - ')
    throw new Error(`Mock-data integrity check failed (${String(issues.length)} issues):\n - ${summary}`)
  }
}

/** Lazily builds the store from the deterministic baseline. */
export function getStore(): Store {
  if (store === null) {
    const dataset = buildBaselineDataset()
    assertSeedIntegrity(dataset)
    const state = createState(dataset)
    store = { state, ids: createAllocators(state) }
  }
  return store
}

export function getState(): StoreState {
  return getStore().state
}

export function getIds(): StoreIdAllocators {
  return getStore().ids
}

/**
 * «إعادة ضبط البيانات التجريبية» — replaces the entire store with the
 * freshly generated deterministic baseline (identical IDs, values, and
 * timestamps) without a page reload.
 */
export function resetStoreToBaseline(): void {
  const state = createState(buildBaselineDataset())
  store = { state, ids: createAllocators(state) }
}

/**
 * Scenario loading = deterministic reset + the scenario's starting context.
 * The baseline already contains every scenario's starting state (plan §12).
 */
export function loadScenarioState(scenarioId: string): DemoScenario {
  const scenario = demoScenarios.find((candidate) => candidate.id === scenarioId)
  if (scenario === undefined) {
    throw new Error(`Unknown demo scenario: ${scenarioId}`)
  }
  resetStoreToBaseline()
  return scenario
}
