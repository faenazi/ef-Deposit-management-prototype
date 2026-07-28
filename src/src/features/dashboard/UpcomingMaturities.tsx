import { ArrowLeft, ArrowUpLeft, CalendarClock } from 'lucide-react'
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
      <div className="px-5 py-5 md:px-6">
        <SectionHeading
          className="mb-0"
          title="الاستحقاقات القادمة"
          description="ودائع ضمن نافذة التنبيه وتحتاج تجهيز قرار الاستحقاق."
          action={
            maturities.length > 0 ? (
              <Link
                to="/deposits?filter=approaching-maturity"
                className="inline-flex items-center gap-1 text-small font-semibold text-action-primary hover:underline"
              >
                عرض الكل
                <Icon icon={ArrowUpLeft} size="xs" mirrorInRtl />
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
          className="border-t border-divider-soft py-9"
        />
      ) : (
        <div className="border-t border-divider-soft">
          <div className="hidden grid-cols-[minmax(0,1fr)_9rem_7rem_7rem_2.5rem] items-center gap-3 bg-surface-subtle px-6 py-3 text-table font-semibold text-text-secondary md:grid">
            <span>البنك والوديعة</span>
            <span>أصل الوديعة</span>
            <span>العائد</span>
            <span>الاستحقاق</span>
            <span className="sr-only">فتح</span>
          </div>
          <ol className="divide-y divide-divider-soft">
            {maturities.map((maturity) => (
              <li key={maturity.depositId}>
                <Link
                  to={`/deposits/${maturity.depositId}`}
                  className="group grid gap-3 px-5 py-4 transition-colors hover:bg-surface-raised md:grid-cols-[minmax(0,1fr)_9rem_7rem_7rem_2.5rem] md:items-center md:px-6"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-text-primary group-hover:text-action-primary">
                      {maturity.bankName}
                    </span>
                    <bdi className="mt-1 block text-small text-text-muted">{maturity.depositId}</bdi>
                  </span>

                  <span className="ef-financial font-semibold text-text-primary">
                    <FinancialValue value={maturity.principal} kind="currency-compact" />
                  </span>

                  <span className="ef-financial text-small font-semibold text-text-primary">
                    <FinancialValue value={maturity.rate} kind="percent" />
                  </span>

                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-small text-text-secondary">
                      <FinancialValue value={maturity.maturityDate} kind="date" />
                    </span>
                    <Badge variant={maturity.daysUntilMaturity <= 7 ? 'warning' : 'neutral'}>
                      {maturity.daysUntilMaturity === 0
                        ? 'اليوم'
                        : `${maturity.daysUntilMaturity} يوم`}
                    </Badge>
                  </span>

                  <span className="flex size-8 items-center justify-center rounded-full bg-canvas text-text-secondary group-hover:bg-surface-brand-soft group-hover:text-action-primary">
                    <Icon icon={ArrowLeft} size="sm" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </Card>
  )
}
