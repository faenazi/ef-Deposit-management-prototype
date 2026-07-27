import type { Bank } from '@/domain/bank'
import type { EvaluationCriterion } from '@/domain/offer'
import type { Role } from '@/domain/roles'
import type { ValueLabels } from '@/domain/common'
import { investmentRequestStatusLabels } from '@/domain/investment-request'
import { depositStatusLabels, maturityActionTypeLabels } from '@/domain/deposit'
import { approvalStageLabels, approvalDecisionLabels } from '@/domain/approval'
import { offerStatusLabels, rfqStatusLabels, recommendationDecisionLabels } from '@/domain/offer'
import { taskPriorityLabels, taskStatusLabels } from '@/domain/task'
import { attachmentCategoryLabels } from '@/domain/audit'
import {
  bankRiskCategoryLabels,
  communicationChannelLabels,
  currencyLabels,
  tenorUnitLabels,
} from '@/domain/common'
import { serviceDelay } from '@/services/service-config'
import { getState } from '@/services/store'

/**
 * Lookup mock service: centralized reference collections and label maps —
 * no component may hardcode lookup values (Step 07 prompt Lookups rule).
 */

export interface LookupValue {
  readonly code: string
  readonly labelAr: string
  readonly labelEn: string
}

function toLookupValues(labels: Record<string, ValueLabels>): LookupValue[] {
  return Object.entries(labels).map(([code, value]) => ({
    code,
    labelAr: value.ar,
    labelEn: value.en,
  }))
}

/** All static controlled-value lookups keyed by collection name. */
export const staticLookups = {
  requestStatuses: toLookupValues(investmentRequestStatusLabels),
  depositStatuses: toLookupValues(depositStatusLabels),
  approvalStages: toLookupValues(approvalStageLabels),
  approvalDecisions: toLookupValues(approvalDecisionLabels),
  offerStatuses: toLookupValues(offerStatusLabels),
  rfqStatuses: toLookupValues(rfqStatusLabels),
  recommendationDecisions: toLookupValues(recommendationDecisionLabels),
  taskStatuses: toLookupValues(taskStatusLabels),
  taskPriorities: toLookupValues(taskPriorityLabels),
  attachmentCategories: toLookupValues(attachmentCategoryLabels),
  maturityActionTypes: toLookupValues(maturityActionTypeLabels),
  communicationChannels: toLookupValues(communicationChannelLabels),
  currencies: toLookupValues(currencyLabels),
  tenorUnits: toLookupValues(tenorUnitLabels),
  bankRiskCategories: toLookupValues(bankRiskCategoryLabels),
} as const

export async function listBanks(options: { activeOnly?: boolean } = {}): Promise<Bank[]> {
  await serviceDelay()
  const state = getState()
  return options.activeOnly === true
    ? state.banks.filter((bank) => bank.isActive)
    : [...state.banks]
}

export async function listEvaluationCriteria(): Promise<EvaluationCriterion[]> {
  await serviceDelay()
  return [...getState().evaluationCriteria]
}

export async function listRoles(): Promise<Role[]> {
  await serviceDelay()
  return [...getState().roles]
}

/** Standard tenors in months from the live settings (never hardcoded). */
export async function listStandardTenors(): Promise<number[]> {
  await serviceDelay()
  return [...getState().settings.standardTenors]
}
