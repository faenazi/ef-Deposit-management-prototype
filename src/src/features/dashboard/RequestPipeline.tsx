import { ArrowUpLeft, FileText } from 'lucide-react'
import { Link } from 'react-router'

import { Card, SectionHeading } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Icon } from '@/components/ui/Icon'
import type { RoleCode } from '@/domain/roles'
import { formatNumber } from '@/lib/format'
import type { DashboardSummary } from '@/services/dashboard-service'

const STAGE_LABELS: Record<string, string> = {
  DRAFT: 'قيد الإعداد',
  RETURNED_FOR_COMPLETION: 'معادة للاستكمال',
  PENDING_TREASURY_GM_APPROVAL: 'اعتماد الخزينة',
  PENDING_EXECUTIVE_APPROVAL: 'الاعتماد التنفيذي',
  PENDING_WINNING_BANK_COMPLETION: 'استكمال البنك الفائز',
  PENDING_INVESTMENT_SUPPORT_REVIEW: 'دعم الاستثمار',
  PENDING_FINANCE_REVIEW: 'المراجعة المالية',
  PENDING_ACCOUNTING_EXECUTION: 'التنفيذ المحاسبي',
  PENDING_DEPOSIT_ACTIVATION: 'تفعيل الوديعة',
}

const WORKFLOW_ORDER = [
  'DRAFT',
  'RETURNED_FOR_COMPLETION',
  'PENDING_TREASURY_GM_APPROVAL',
  'PENDING_EXECUTIVE_APPROVAL',
  'PENDING_WINNING_BANK_COMPLETION',
  'PENDING_INVESTMENT_SUPPORT_REVIEW',
  'PENDING_FINANCE_REVIEW',
  'PENDING_ACCOUNTING_EXECUTION',
  'PENDING_DEPOSIT_ACTIVATION',
]

const CLOSED_STAGES = new Set(['CONVERTED_TO_ACTIVE_DEPOSIT', 'CANCELLED', 'REJECTED'])

const ROLE_STAGES: Record<RoleCode, string[]> = {
  'deposit-specialist': [
    'DRAFT',
    'RETURNED_FOR_COMPLETION',
    'PENDING_WINNING_BANK_COMPLETION',
    'PENDING_DEPOSIT_ACTIVATION',
  ],
  'treasury-general-manager': [
    'RETURNED_FOR_COMPLETION',
    'PENDING_TREASURY_GM_APPROVAL',
    'PENDING_EXECUTIVE_APPROVAL',
    'PENDING_WINNING_BANK_COMPLETION',
  ],
  'investment-treasury-executive': [
    'PENDING_TREASURY_GM_APPROVAL',
    'PENDING_EXECUTIVE_APPROVAL',
    'PENDING_FINANCE_REVIEW',
  ],
  'investment-support': [
    'RETURNED_FOR_COMPLETION',
    'PENDING_INVESTMENT_SUPPORT_REVIEW',
    'PENDING_FINANCE_REVIEW',
  ],
  'finance-reviewer': [
    'RETURNED_FOR_COMPLETION',
    'PENDING_FINANCE_REVIEW',
    'PENDING_ACCOUNTING_EXECUTION',
  ],
  'accounting-executor': [
    'PENDING_ACCOUNTING_EXECUTION',
    'PENDING_DEPOSIT_ACTIVATION',
  ],
  'system-admin': WORKFLOW_ORDER,
  'read-only-user': WORKFLOW_ORDER,
}

export function RequestPipeline({ summary }: { summary: DashboardSummary }) {
  const order = new Map(WORKFLOW_ORDER.map((stage, index) => [stage, index]))
  const visibleStages = new Set(ROLE_STAGES[summary.roleId])
  const items = Object.entries(summary.requestPipeline)
    .filter(([stage, count]) => count > 0 && !CLOSED_STAGES.has(stage) && visibleStages.has(stage))
    .sort(([stageA], [stageB]) => (order.get(stageA) ?? 999) - (order.get(stageB) ?? 999))
    .slice(0, 5)
  const total = items.reduce((sum, [, count]) => sum + count, 0)

  return (
    <Card>
      <SectionHeading
        title="الطلبات الجارية حسب المرحلة"
        description={`${formatNumber(total)} طلبًا في المراحل المرتبطة بدورك.`}
        action={
          items.length > 0 ? (
            <Link
              to="/investment-requests"
              className="inline-flex items-center gap-1 text-small font-semibold text-action-primary hover:underline"
            >
              عرض الطلبات
              <Icon icon={ArrowUpLeft} size="xs" mirrorInRtl />
            </Link>
          ) : undefined
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="لا توجد طلبات جارية"
          description="لا توجد طلبات مفتوحة ضمن مراحل العمل الحالية."
          className="py-8"
        />
      ) : (
        <ol className="overflow-hidden rounded-lg border border-divider-soft">
          {items.map(([stage, count], index) => (
            <li key={stage} className="border-b border-divider-soft last:border-b-0">
              <Link
                to={`/investment-requests?stage=${stage}`}
                className="group flex min-h-12 items-center gap-3 px-3 py-2.5 transition-colors hover:bg-surface-subtle"
              >
                <span className="ef-financial flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-brand-muted text-small font-bold text-action-primary">
                  {index + 1}
                </span>
                <span className="min-w-0 grow truncate text-small font-semibold text-text-primary group-hover:text-action-primary">
                  {STAGE_LABELS[stage] ?? stage}
                </span>
                <bdi className="ef-financial flex min-w-8 shrink-0 items-center justify-center rounded-md bg-canvas px-2 py-1 text-small font-bold text-text-primary">
                  {count}
                </bdi>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </Card>
  )
}
