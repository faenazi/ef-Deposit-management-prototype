import type { RoleCode } from '@/domain/roles'
import { serviceDelay } from '@/services/service-config'
import { getState } from '@/services/store'
import { getDashboardSummary, getTaskSummary, getBankExposures, getPortfolioSummary, getPipeline } from '@/services/analytics'
import { isApproachingMaturity, getDaysToMaturity } from '@/domain/business-rules'
import { sumBy } from '@/lib/collections'

/**
 * Dashboard UI structure — enriched from analytics layer with
 * actionable row data, role-aware task lists, and exception alerts.
 */
export interface DashboardSummary {
  readonly roleId: RoleCode
  readonly referenceDate: string

  // Executive summary
  readonly activeBanks: {
    readonly count: number
    readonly totalValue: number
    readonly byBank: Array<{ bankId: string; bankName: string; value: number }>
  }
  readonly weightedAverageReturn: number
  readonly totalExpectedReturn: number
  readonly pendingRequests: { count: number; value: number }
  readonly approachingMaturity: {
    readonly count: number
    readonly value: number
    readonly deposits: Array<{
      depositId: string
      bankName: string
      principal: number
      rate: number
      maturityDate: string
      daysUntilMaturity: number
    }>
  }
  readonly overdueTasks: number
  readonly returnedRequests: number

  // Tasks
  readonly priorityTasks: Array<{
    id: string
    title: string
    priority: 'high' | 'medium' | 'low'
    context: string
    relatedEntity: string | null
    dueDate: string
    isOverdue: boolean
    agingDays: number
    actionPath: string
  }>

  // Pipeline
  readonly requestPipeline: Record<string, number>

  // Exceptions
  readonly exceptions: Array<{
    id: string
    type: 'overdue_task' | 'returned_request' | 'high_concentration' | 'incomplete_offer' | 'expired_offer'
    title: string
    description: string
    severity: 'critical' | 'warning' | 'info'
    actionPath?: string
    actionLabel?: string
  }>

  // Activity
  readonly recentActivity: Array<{
    id: string
    activityType: string
    description: string
    actor: string
    entityType: 'investment-request' | 'deposit' | 'task'
    entityId: string
    timestamp: string
  }>

  // Portfolio
  readonly highConcentrationBanks: Array<{ bankId: string; bankName: string }>
}

/**
 * Dashboard mock service: role-aware KPI payloads derived entirely from
 * the entity stores (plan §4.28) — totals always reconcile with lists.
 */
export async function fetchDashboardSummary(roleId?: RoleCode): Promise<DashboardSummary> {
  await serviceDelay()
  const state = getState()

  // Default to specialist if no role provided
  const actualRoleId: RoleCode = roleId || 'deposit-specialist'

  // Get base analytics
  const baseSummary = getDashboardSummary(state, actualRoleId)
  const bankExposures = getBankExposures(state)
  const portfolio = getPortfolioSummary(state)
  const tasks = getTaskSummary(state, actualRoleId)
  const pipeline = getPipeline(state)

  // Build active banks summary with names
  const activeBanks = state.deposits
    .filter((d) => d.status === 'ACTIVE')
    .reduce(
      (acc, deposit) => {
        const bank = state.banks.find((b) => b.id === deposit.bankId)
        if (!bank) return acc

        const existing = acc.byBank.find((b) => b.bankId === bank.id)
        if (existing) {
          existing.value += deposit.principalAmount
        } else {
          acc.byBank.push({
            bankId: bank.id,
            bankName: bank.nameAr,
            value: deposit.principalAmount,
          })
        }
        acc.count++
        acc.totalValue += deposit.principalAmount
        return acc
      },
      { count: 0, totalValue: 0, byBank: [] as Array<{bankId: string; bankName: string; value: number}> }
    )

  // Build approaching maturity deposits with details
  const approachingDeposits = state.deposits
    .filter((d) => isApproachingMaturity(d, state.settings))
    .map((deposit) => {
      const bank = state.banks.find((b) => b.id === deposit.bankId)
      return {
        depositId: deposit.id,
        bankName: bank?.nameAr || 'Unknown',
        principal: deposit.principalAmount,
        rate: deposit.annualRate,
        maturityDate: deposit.maturityDate,
        daysUntilMaturity: getDaysToMaturity(deposit, state.settings.referenceDate),
      }
    })
    .sort((a, b) => a.daysUntilMaturity - b.daysUntilMaturity)

  // Build priority tasks
  const roleTasks = state.tasks
    .filter((t) => t.assignedRoleId === actualRoleId && t.status === 'OPEN')
    .sort((a, b) => {
      // Sort by priority, then by due date
      const priorityOrder: Record<string, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 }
      const priorityDiff = (priorityOrder[a.priority] || 999) - (priorityOrder[b.priority] || 999)
      if (priorityDiff !== 0) return priorityDiff
      return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime()
    })

  const priorityTasks = roleTasks.slice(0, 10).map((task) => {
    const isOverdue = new Date(task.dueAt) < new Date(state.settings.referenceDate)
    const agingDays = Math.ceil(
      (new Date(state.settings.referenceDate).getTime() - new Date(task.dueAt).getTime()) / (1000 * 60 * 60 * 24)
    )

    let actionPath = '/tasks'
    let relatedEntity: string | null = null
    if (task.entityType === 'INVESTMENT_REQUEST') {
      actionPath = `/investment-requests/${task.entityId}`
      relatedEntity = task.entityId
    } else if (task.entityType === 'DEPOSIT') {
      actionPath = `/deposits/${task.entityId}`
      relatedEntity = task.entityId
    }

    return {
      id: task.id,
      title: task.title,
      priority: task.priority.toLowerCase() as 'high' | 'medium' | 'low',
      context: task.description,
      relatedEntity,
      dueDate: task.dueAt,
      isOverdue,
      agingDays,
      actionPath,
    }
  })

  // Build request pipeline distribution
  const requestPipeline: Record<string, number> = {}
  pipeline.forEach((stage) => {
    requestPipeline[stage.status] = stage.count
  })

  // Build exceptions/alerts
  const exceptions: DashboardSummary['exceptions'] = []

  // Overdue tasks
  if (tasks.overdueCount > 0) {
    exceptions.push({
      id: 'overdue-tasks',
      type: 'overdue_task',
      title: `${tasks.overdueCount} مهام متأخرة`,
      description: `لديك ${tasks.overdueCount} مهام متأخرة تتطلب إجراءك الفوري`,
      severity: 'critical',
      actionPath: '/tasks',
      actionLabel: 'عرض المهام',
    })
  }

  // Returned requests
  if (baseSummary.returnedRequestCount > 0) {
    exceptions.push({
      id: 'returned-requests',
      type: 'returned_request',
      title: `${baseSummary.returnedRequestCount} طلبات معادة`,
      description: `هناك ${baseSummary.returnedRequestCount} طلبات أعيدت للاستكمال`,
      severity: 'warning',
      actionPath: '/investment-requests?status=returned',
      actionLabel: 'عرض الطلبات',
    })
  }

  // High bank concentration
  const highConcentrationBanks: DashboardSummary['highConcentrationBanks'] = []
  bankExposures.forEach((exposure) => {
    if (exposure.exposurePercentage > 25) {
      const bank = state.banks.find((b) => b.id === exposure.bankId)
      if (bank) {
        highConcentrationBanks.push({
          bankId: bank.id,
          bankName: bank.nameAr,
        })
        if (exceptions.length < 5) {
          exceptions.push({
            id: `concentration-${bank.id}`,
            type: 'high_concentration',
            title: `تركز بنكي مرتفع: ${bank.nameAr}`,
            description: `تركز في ${bank.nameAr} بنسبة ${exposure.exposurePercentage}% من المحفظة`,
            severity: 'warning',
            actionPath: '/deposits?bank=' + bank.id,
            actionLabel: 'عرض الودائع',
          })
        }
      }
    }
  })

  // Build recent activity
  const recentActivity: DashboardSummary['recentActivity'] = []
  state.activities
    .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
    .slice(0, 15)
    .forEach((activity) => {
      recentActivity.push({
        id: activity.id,
        activityType: activity.activityType || 'other',
        description: activity.description || activity.title,
        actor: state.users.find((u) => u.id === activity.actorUserId)?.displayNameAr || 'Unknown',
        entityType: activity.entityType === 'INVESTMENT_REQUEST' ? 'investment-request' : activity.entityType === 'DEPOSIT' ? 'deposit' : 'task',
        entityId: activity.entityId,
        timestamp: activity.occurredAt,
      })
    })

  // Pending requests
  const pendingRequests = state.requests
    .filter((r) => !['DRAFT', 'COMPLETED', 'REJECTED', 'CANCELLED'].includes(r.status))
    .reduce(
      (acc, req) => ({ count: acc.count + 1, value: acc.value + req.amount }),
      { count: 0, value: 0 }
    )

  return {
    roleId: actualRoleId,
    referenceDate: state.settings.referenceDate,
    activeBanks,
    weightedAverageReturn: portfolio.weightedAverageRate,
    totalExpectedReturn: portfolio.totalExpectedReturn,
    pendingRequests,
    approachingMaturity: {
      count: approachingDeposits.length,
      value: sumBy(approachingDeposits, (d) => d.principal),
      deposits: approachingDeposits,
    },
    overdueTasks: tasks.overdueCount,
    returnedRequests: baseSummary.returnedRequestCount,
    priorityTasks,
    requestPipeline,
    exceptions,
    recentActivity,
    highConcentrationBanks,
  }
}
