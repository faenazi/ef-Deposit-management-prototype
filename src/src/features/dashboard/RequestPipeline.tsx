import { ArrowUpLeft, FileText } from 'lucide-react'
import { Link } from 'react-router'

import { Card, SectionHeading } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Icon } from '@/components/ui/Icon'
import { formatNumber } from '@/lib/format'
import type { DashboardSummary } from '@/services/dashboard-service'

const STAGE_LABELS: Record<string, string> = {
  draft: 'مسودات قيد الإعداد',
  returned: 'معادة للاستكمال',
  'pending-treasury': 'مراجعة الخزينة',
  'pending-executive': 'الاعتماد التنفيذي',
  'pending-winning-bank': 'استكمال البنك الفائز',
  'pending-investment-support': 'مراجعة دعم الاستثمار',
  'pending-finance': 'مراجعة المالية',
  'pending-accounting': 'التنفيذ المحاسبي',
  'pending-activation': 'تفعيل الوديعة',
  completed: 'مكتملة',
  cancelled: 'ملغاة',
  rejected: 'مرفوضة',
}

const WORKFLOW_ORDER = [
  'draft',
  'returned',
  'pending-treasury',
  'pending-executive',
  'pending-winning-bank',
  'pending-investment-support',
  'pending-finance',
  'pending-accounting',
  'pending-activation',
]

const CLOSED_STAGES = new Set(['completed', 'cancelled', 'rejected'])

export function RequestPipeline({ summary }: { summary: DashboardSummary }) {
  const order = new Map(WORKFLOW_ORDER.map((stage, index) => [stage, index]))
  const items = Object.entries(summary.requestPipeline)
    .filter(([stage, count]) => count > 0 && !CLOSED_STAGES.has(stage))
    .sort(([stageA], [stageB]) => (order.get(stageA) ?? 999) - (order.get(stageB) ?? 999))
    .slice(0, 8)
  const total = items.reduce((sum, [, count]) => sum + count, 0)
  const max = Math.max(...items.map(([, count]) => count), 1)

  return (
    <Card>
      <SectionHeading
        title="الطلبات الجارية حسب المرحلة"
        description={`إجمالي ${formatNumber(total)} طلبًا قيد العمل، مرتبة وفق مسار الموافقة والتنفيذ.`}
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
        <ol className="space-y-2">
          {items.map(([stage, count], index) => (
            <li key={stage}>
              <Link
                to={`/investment-requests?stage=${stage}`}
                className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface-subtle"
              >
                <span className="ef-financial flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-brand-muted text-small font-bold text-action-primary">
                  {index + 1}
                </span>
                <span className="min-w-0 grow">
                  <span className="flex items-center justify-between gap-3">
                    <span className="truncate text-small font-semibold text-text-primary group-hover:text-action-primary">
                      {STAGE_LABELS[stage] ?? stage}
                    </span>
                    <bdi className="ef-financial shrink-0 text-small font-bold text-text-primary">{count}</bdi>
                  </span>
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-surface-brand-soft">
                    <span
                      className="block h-full rounded-full bg-action-primary"
                      style={{ width: `${Math.max((count / max) * 100, 8)}%` }}
                    />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </Card>
  )
}
