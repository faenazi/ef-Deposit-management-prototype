import { ArrowUpLeft, CalendarClock } from 'lucide-react'
import { Link } from 'react-router'

import { Badge } from '@/components/ui/Badge'
import { Card, SectionHeading } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { FinancialValue } from '@/components/ui/FinancialValue'
import { Icon } from '@/components/ui/Icon'
import type { DashboardSummary } from '@/services/dashboard-service'

export function UpcomingMaturities({ summary }: { summary: DashboardSummary }) {
  const maturities = summary.approachingMaturity.deposits.slice(0, 4)

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="border-b border-border-default px-5 py-5">
        <SectionHeading
          className="mb-0"
          title="ما يستحق قريبًا"
          description="ودائع تحتاج تجهيز قرار الاستحقاق."
          action={
            maturities.length > 0 ? (
              <Link
                to="/deposits?filter=approaching-maturity"
                aria-label="عرض جميع الودائع القريبة من الاستحقاق"
                className="text-action-primary"
              >
                <Icon icon={ArrowUpLeft} size="sm" mirrorInRtl />
              </Link>
            ) : undefined
          }
        />
      </div>

      {maturities.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="لا توجد استحقاقات قريبة"
          description="لا توجد ودائع ضمن نافذة التنبيه الحالية."
          className="py-9"
        />
      ) : (
        <ol className="divide-y divide-border-default">
          {maturities.map((maturity) => (
            <li key={maturity.depositId}>
              <Link
                to={`/deposits/${maturity.depositId}`}
                className="block px-5 py-4 transition-colors hover:bg-surface-raised"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-text-primary">{maturity.bankName}</p>
                    <bdi className="mt-0.5 block text-small text-text-secondary">
                      {maturity.depositId}
                    </bdi>
                  </div>
                  <Badge variant={maturity.daysUntilMaturity <= 7 ? 'warning' : 'neutral'}>
                    {maturity.daysUntilMaturity === 0
                      ? 'يستحق اليوم'
                      : `متبقٍ ${maturity.daysUntilMaturity} يومًا`}
                  </Badge>
                </div>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <span className="ef-financial font-bold text-text-primary">
                    <FinancialValue value={maturity.principal} kind="currency-compact" />
                  </span>
                  <span className="text-small text-text-secondary">
                    <FinancialValue value={maturity.maturityDate} kind="date" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </Card>
  )
}
