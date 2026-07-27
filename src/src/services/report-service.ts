import type {
  ApprovalTurnaroundEntry,
  BankParticipationEntry,
  MaturityBucket,
  PipelineStageSummary,
  PortfolioSummary,
  ReportDefinition,
  ReportFilter,
  TenorDistributionEntry,
} from '@/domain/analytics'
import type { BankExposure } from '@/domain/bank'
import { reportKeys } from '@/domain/analytics'
import { serviceDelay } from '@/services/service-config'
import { getState, type StoreState } from '@/services/store'
import {
  getApprovalTurnaround,
  getBankExposures,
  getBankParticipation,
  getMaturityLadder,
  getPipeline,
  getPortfolioSummary,
  getTenorDistribution,
} from '@/services/analytics'

/**
 * Reports mock service (reports-and-analytics.md): report definitions and
 * data sets derived from the same stores as every list view.
 */

const definitions: Record<(typeof reportKeys)[number], ReportDefinition> = {
  PORTFOLIO_OVERVIEW: {
    key: 'PORTFOLIO_OVERVIEW',
    titleAr: 'نظرة عامة على المحفظة',
    descriptionAr: 'إجمالي الودائع النشطة ومتوسط العائد المرجح والعائد المتوقع.',
  },
  MATURITY_LADDER: {
    key: 'MATURITY_LADDER',
    titleAr: 'سلم الاستحقاقات',
    descriptionAr: 'توزيع أصول الودائع النشطة على نوافذ الاستحقاق الزمنية.',
  },
  BANK_CONCENTRATION: {
    key: 'BANK_CONCENTRATION',
    titleAr: 'التركز البنكي',
    descriptionAr: 'تعرض المحفظة النشطة لكل بنك مبلغًا ونسبة.',
  },
  TENOR_DISTRIBUTION: {
    key: 'TENOR_DISTRIBUTION',
    titleAr: 'توزيع المدد',
    descriptionAr: 'توزيع الودائع النشطة حسب مدة الاستثمار.',
  },
  REQUEST_PIPELINE: {
    key: 'REQUEST_PIPELINE',
    titleAr: 'خط سير الطلبات',
    descriptionAr: 'عدد الطلبات وقيمتها في كل حالة من حالات دورة العمل.',
  },
  APPROVAL_TURNAROUND: {
    key: 'APPROVAL_TURNAROUND',
    titleAr: 'زمن دورة الاعتماد',
    descriptionAr: 'متوسط أيام العمل لكل مرحلة قرار مقارنة بالمدة المستهدفة.',
  },
  BANK_PARTICIPATION: {
    key: 'BANK_PARTICIPATION',
    titleAr: 'مشاركة البنوك',
    descriptionAr: 'الدعوات والاستجابات والعروض والترسيات لكل بنك.',
  },
  RETURNS_AND_REJECTIONS: {
    key: 'RETURNS_AND_REJECTIONS',
    titleAr: 'الإعادات والرفض',
    descriptionAr: 'الطلبات المعادة للاستكمال والمرفوضة وأسبابها.',
  },
}

export async function listReportDefinitions(): Promise<ReportDefinition[]> {
  await serviceDelay()
  return reportKeys.map((key) => definitions[key])
}

function applyDepositFilter(state: StoreState, filter?: ReportFilter): StoreState {
  if (filter?.bankIds === undefined || filter.bankIds.length === 0) {
    return state
  }
  const allowed = filter.bankIds
  return {
    ...state,
    deposits: state.deposits.filter((deposit) => allowed.includes(deposit.bankId)),
  }
}

export async function fetchPortfolioOverview(filter?: ReportFilter): Promise<PortfolioSummary> {
  await serviceDelay()
  return getPortfolioSummary(applyDepositFilter(getState(), filter))
}

export async function fetchMaturityLadder(filter?: ReportFilter): Promise<MaturityBucket[]> {
  await serviceDelay()
  return getMaturityLadder(applyDepositFilter(getState(), filter))
}

export async function fetchBankConcentration(filter?: ReportFilter): Promise<BankExposure[]> {
  await serviceDelay()
  return getBankExposures(applyDepositFilter(getState(), filter))
}

export async function fetchTenorDistribution(
  filter?: ReportFilter,
): Promise<TenorDistributionEntry[]> {
  await serviceDelay()
  return getTenorDistribution(applyDepositFilter(getState(), filter))
}

export async function fetchRequestPipeline(): Promise<PipelineStageSummary[]> {
  await serviceDelay()
  return getPipeline(getState())
}

export async function fetchApprovalTurnaround(): Promise<ApprovalTurnaroundEntry[]> {
  await serviceDelay()
  return getApprovalTurnaround(getState())
}

export async function fetchBankParticipation(): Promise<BankParticipationEntry[]> {
  await serviceDelay()
  return getBankParticipation(getState())
}

export interface ReturnsAndRejectionsRow {
  readonly requestId: string
  readonly title: string
  readonly status: 'RETURNED_FOR_COMPLETION' | 'REJECTED'
  readonly reason: string
}

export async function fetchReturnsAndRejections(): Promise<ReturnsAndRejectionsRow[]> {
  await serviceDelay()
  const state = getState()
  const rows: ReturnsAndRejectionsRow[] = []
  for (const request of state.requests) {
    if (request.status === 'RETURNED_FOR_COMPLETION' && request.returnReason !== null) {
      rows.push({
        requestId: request.id,
        title: request.title,
        status: request.status,
        reason: request.returnReason,
      })
    }
    if (request.status === 'REJECTED' && request.rejectionReason !== null) {
      rows.push({
        requestId: request.id,
        title: request.title,
        status: request.status,
        reason: request.rejectionReason,
      })
    }
  }
  return rows
}
