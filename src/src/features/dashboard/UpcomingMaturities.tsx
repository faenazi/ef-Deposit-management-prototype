import { ArrowLeft, ArrowUpLeft, CalendarClock } from 'lucide-react'
import { Link } from 'react-router'

import { Badge } from '@/components/ui/Badge'
import { Card, SectionHeading } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { FinancialValue } from '@/components/ui/FinancialValue'
import { Icon } from '@/components/ui/Icon'
import type { DashboardSummary } from '@/services/dashboard-service'

export function UpcomingMaturities({ summary }: { summary: DashboardSummary }) {
  const maturities = summary.approachingMaturity.deposits.slice(0, 3)

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-4 py-4 md:px-6 md:py-5">
        <SectionHeading
          className="mb-0"
          title="استحقاقات خلال 14 يومًا"
          description="الودائع التي يجب تجهيز قرارها قبل تاريخ الاستحقاق."
          action={
            maturities.length > 0 ? (
              <div className="flex items-center gap-3">
                <span className="hidden text-small text-text-secondary lg:inline">
                  إجمالي{' '}
                  <strong className="ef-financial font-semibold text-text-primary">
                    <FinancialValue value={summary.approachingMaturity.value} kind="currency-compact" />
                  </strong>
                </span>
                <Link
                  to="/deposits?filter=approaching-maturity"
                  className="inline-flex items-center gap-1 text-small font-semibold text-action-primary hover:underline"
                >
                  عرض الكل
                  <Icon icon={ArrowUpLeft} size="xs" mirrorInRtl />
                </Link>
              </div>
            ) : undefined
          }
        />
      </div>

      {maturities.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="لا توجد استحقاقات قريبة"
          description="لا توجد ودائع ضمن نافذة التنبيه الحالية البالغة 14 يومًا."
          className="border-t border-divider-soft py-9"
        />
      ) : (
        <div className="border-t border-divider-soft">
          <div className="hidden grid-cols-[minmax(0,1.2fr)_8.5rem_5.5rem_8rem_6rem_2.75rem] items-center gap-3 bg-surface-subtle px-6 py-3 text-table font-semibold text-text-secondary xl:grid">
            <span>البنك والوديعة</span>
            <span>أصل الوديعة</span>
            <span>العائد</span>
            <span>تاريخ الاستحقاق</span>
            <span>المتبقي</span>
            <span className="sr-only">فتح</span>
          </div>

          <ol className="divide-y divide-divider-soft">
            {maturities.map((maturity) => (
              <li key={maturity.depositId}>
                <Link
                  to={`/deposits/${maturity.depositId}`}
                  aria-label={`فتح الوديعة ${maturity.depositId} لدى ${maturity.bankName}`}
                  className="group block min-h-11 px-4 py-3.5 transition-colors hover:bg-surface-raised md:px-6 xl:grid xl:min-h-16 xl:grid-cols-[minmax(0,1.2fr)_8.5rem_5.5rem_8rem_6rem_2.75rem] xl:items-center xl:gap-3"
                >
                  <span className="flex min-w-0 items-start justify-between gap-3 xl:block">
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-text-primary group-hover:text-action-primary">
                        {maturity.bankName}
                      </span>
                      <bdi className="mt-0.5 block text-small text-text-muted xl:mt-1">{maturity.depositId}</bdi>
                    </span>
                    <Badge
                      variant={maturity.daysUntilMaturity <= 7 ? 'warning' : 'neutral'}
                      className="shrink-0 xl:hidden"
                    >
                      {maturity.daysUntilMaturity === 0 ? 'يستحق اليوم' : `${maturity.daysUntilMaturity} يوم`}
                    </Badge>
                  </span>

                  <span className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 xl:mt-0 xl:contents">
                    <span>
                      <span className="mb-0.5 block text-[11px] font-medium text-text-muted xl:hidden">أصل الوديعة</span>
                      <span className="ef-financial font-semibold text-text-primary">
                        <FinancialValue value={maturity.principal} kind="currency-compact" />
                      </span>
                    </span>

                    <span>
                      <span className="mb-0.5 block text-[11px] font-medium text-text-muted xl:hidden">العائد</span>
                      <span className="ef-financial text-small font-semibold text-text-primary">
                        <FinancialValue value={maturity.rate} kind="percent" />
                      </span>
                    </span>

                    <span>
                      <span className="mb-0.5 block text-[11px] font-medium text-text-muted xl:hidden">تاريخ الاستحقاق</span>
                      <span className="text-small font-semibold text-text-primary">
                        <FinancialValue value={maturity.maturityDate} kind="date" />
                      </span>
                    </span>

                    <span className="hidden xl:block">
                      <Badge variant={maturity.daysUntilMaturity <= 7 ? 'warning' : 'neutral'}>
                        {maturity.daysUntilMaturity === 0 ? 'يستحق اليوم' : `${maturity.daysUntilMaturity} يوم`}
                      </Badge>
                    </span>

                    <span className="flex items-end justify-end xl:items-center xl:justify-center">
                      <span className="flex size-9 items-center justify-center rounded-full bg-canvas text-text-secondary group-hover:bg-surface-brand-soft group-hover:text-action-primary">
                        <Icon icon={ArrowLeft} size="sm" />
                      </span>
                    </span>
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
