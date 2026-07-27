/**
 * Mock-service layer barrel (plan §14 step 3). All services are async,
 * framework-independent, and read/write only the in-memory store — no
 * backend, no fetch, no API client anywhere in the prototype.
 */
export * from '@/services/service-config'
export * from '@/services/investment-request-service'
export * from '@/services/deposit-service'
export * from '@/services/task-service'
export * from '@/services/dashboard-service'
export * from '@/services/report-service'
export * from '@/services/notification-service'
export * from '@/services/lookup-service'
export * from '@/services/user-service'
export * from '@/services/settings-service'
export { getState, resetStoreToBaseline } from '@/services/store'
export type { StoreState } from '@/services/store'
