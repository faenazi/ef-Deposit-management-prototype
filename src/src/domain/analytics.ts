import type { RoleCode } from '@/domain/roles'
import type { InvestmentRequestStatus } from '@/domain/investment-request'
import type { ApprovalStage } from '@/domain/approval'
import type { DepositStatus } from '@/domain/deposit'
import type { TaskPriority } from '@/domain/task'
import type { BankExposure } from '@/domain/bank'
import type { IsoDateString } from '@/domain/common'

/**
 * Derived analytics shapes (plan §4.28). None of these are persisted —
 * every metric is computed from the entity stores so dashboards and
 * reports always reconcile with list views.
 */

export interface PortfolioSummary {
  readonly activeDepositCount: number
  readonly totalActivePrincipal: number
  readonly weightedAverageRate: number
  readonly totalExpectedReturn: number
  readonly approachingMaturityCount: number
  readonly approachingMaturityPrincipal: number
  readonly maturedActionRequiredCount: number
}

/** Maturity ladder buckets: 0–30 / 31–60 / 61–90 / 91–180 / 180+ days. */
export interface MaturityBucket {
  readonly key: '0-30' | '31-60' | '61-90' | '91-180' | '180+'
  readonly labelAr: string
  readonly depositCount: number
  readonly principalAmount: number
}

export interface PipelineStageSummary {
  readonly status: InvestmentRequestStatus
  readonly count: number
  readonly totalAmount: number
}

export interface TenorDistributionEntry {
  readonly tenorMonths: number
  readonly depositCount: number
  readonly principalAmount: number
}

export interface ApprovalTurnaroundEntry {
  readonly stage: ApprovalStage
  readonly decidedCount: number
  readonly averageBusinessDays: number
  readonly slaBusinessDays: number
  readonly breachedCount: number
}

export interface BankParticipationEntry {
  readonly bankId: string
  readonly invitationCount: number
  readonly respondedCount: number
  readonly declinedCount: number
  readonly noResponseCount: number
  readonly offerCount: number
  readonly wonCount: number
  /** 0–100. */
  readonly responseRatePercentage: number
}

export interface TaskSummary {
  readonly openCount: number
  readonly overdueCount: number
  readonly dueTodayCount: number
  readonly upcomingCount: number
  readonly completedCount: number
  readonly byPriority: Readonly<Record<TaskPriority, number>>
}

/** Role-aware dashboard payload — content varies by dashboard profile. */
export interface DashboardSummary {
  readonly roleId: RoleCode
  readonly referenceDate: IsoDateString
  readonly portfolio: PortfolioSummary
  readonly pipeline: readonly PipelineStageSummary[]
  readonly maturityLadder: readonly MaturityBucket[]
  readonly bankExposures: readonly BankExposure[]
  readonly tasks: TaskSummary
  readonly returnedRequestCount: number
  readonly rejectedRequestCount: number
  readonly slaBreachedRequestCount: number
}

/** Available report identifiers (reports-and-analytics.md). */
export const reportKeys = [
  'PORTFOLIO_OVERVIEW',
  'MATURITY_LADDER',
  'BANK_CONCENTRATION',
  'TENOR_DISTRIBUTION',
  'REQUEST_PIPELINE',
  'APPROVAL_TURNAROUND',
  'BANK_PARTICIPATION',
  'RETURNS_AND_REJECTIONS',
] as const

export type ReportKey = (typeof reportKeys)[number]

export interface ReportDefinition {
  readonly key: ReportKey
  readonly titleAr: string
  readonly descriptionAr: string
}

/** Common report filter input — every filter is optional. */
export interface ReportFilter {
  readonly bankIds?: readonly string[]
  readonly depositStatuses?: readonly DepositStatus[]
  readonly requestStatuses?: readonly InvestmentRequestStatus[]
  readonly fromDate?: IsoDateString
  readonly toDate?: IsoDateString
  readonly minAmount?: number
  readonly maxAmount?: number
}
