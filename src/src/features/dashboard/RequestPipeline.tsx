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

export function RequestPipeline({ summary }: { summary: DashboardSummary }) {
  const items = Object.entries(summary.requestPipeline)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
  const total = Object.values(summary.requestPipeline).reduce((sum, count) => sum + count, 0)
  const max = Math.max(...items.map(([, count]) => count), 1)

  return (
    <Card>
      <SectionHeading
        title="أين تقف طلبات الاستثمار؟"
        description={`إجمالي ${formatNumber(total)} طلبًا موزعة على مراحل العمل.`}
        action={
          items.length > 0 ? (
            <Link to="/investment-requests" className="text-action-primary" aria-label="عرض طلبات الاستثمار">
              <Icon icon={ArrowUpLeft} size="sm" mirrorInRtl />
            </Link>
          ) : undefined
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="لا توجد طلبات استثمار"
          description="تظهر مراحل الطلبات هنا بعد إنشاء أول مسودة."
          className="py-8"
        />
      ) : (
        <div className="space-y-4">
          {items.map(([stage, count]) => (
            <Link
              key={stage}
              to={`/investment-requests?stage=${stage}`}
              className="group grid grid-cols-[minmax(8.5rem,1fr)_minmax(6rem,1.25fr)_2rem] items-center gap-3"
            >
              <span className="truncate text-small font-medium text-text-primary group-hover:text-action-primary">
                {STAGE_LABELS[stage] ?? stage}
              </span>
              <span className="h-1.5 overflow-hidden rounded-full bg-surface-brand-soft">
                <span
                  className="block h-full rounded-full bg-action-primary"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </span>
              <bdi className="ef-financial text-end text-small font-bold text-text-primary">{count}</bdi>
            </Link>
          ))}
        </div>
      )}
    </Card>
  )
}
