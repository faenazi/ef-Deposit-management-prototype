import { AlertTriangle, ArrowUpLeft, Landmark } from 'lucide-react'
import { Link } from 'react-router'

import { Card, SectionHeading } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { FinancialValue } from '@/components/ui/FinancialValue'
import { Icon } from '@/components/ui/Icon'
import type { DashboardSummary } from '@/services/dashboard-service'

export function PortfolioDistribution({ summary }: { summary: DashboardSummary }) {
  const banks = [...summary.activeBanks.byBank].sort((a, b) => b.value - a.value).slice(0, 5)
  const total = summary.activeBanks.totalValue
  const largestShare = banks[0] && total > 0 ? Math.round((banks[0].value / total) * 100) : 0

  return (
    <Card>
      <SectionHeading
        title="التعرض البنكي"
        description="توزيع أصل الودائع النشطة على البنوك، مرتبًا من الأعلى إلى الأقل."
        action={
          banks.length > 0 ? (
            <Link
              to="/deposits"
              className="inline-flex items-center gap-1 text-small font-semibold text-action-primary hover:underline"
            >
              عرض المحفظة
              <Icon icon={ArrowUpLeft} size="xs" mirrorInRtl />
            </Link>
          ) : undefined
        }
      />

      {banks.length === 0 ? (
        <EmptyState
          icon={Landmark}
          title="لا توجد ودائع نشطة"
          description="سيظهر توزيع التعرض بعد تفعيل أول وديعة."
          className="py-8"
        />
      ) : (
        <>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4 rounded-lg bg-surface-brand-muted px-4 py-4">
            <div className="min-w-0">
              <p className="text-small font-medium text-text-muted">أعلى تعرض حالي</p>
              <p className="mt-1 truncate text-body font-bold text-text-primary">{banks[0].bankName}</p>
              <p className="mt-1 text-small text-text-secondary">
                <FinancialValue value={banks[0].value} kind="currency-compact" />
              </p>
            </div>
            <div className="text-end">
              <bdi className="ef-financial text-[28px] font-bold leading-8 text-action-primary">
                {largestShare}%
              </bdi>
              <p className="mt-1 text-small text-text-secondary">من أصل المحفظة</p>
            </div>
          </div>

          <ol className="space-y-4">
            {banks.map((bank, index) => {
              const percentage = total > 0 ? (bank.value / total) * 100 : 0
              return (
                <li key={bank.bankId}>
                  <div className="mb-2 flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-small font-semibold text-text-primary">
                        <span className="me-2 text-text-muted">{index + 1}</span>
                        {bank.bankName}
                      </p>
                      <p className="mt-0.5 text-small text-text-secondary">
                        <FinancialValue value={bank.value} kind="currency-compact" />
                      </p>
                    </div>
                    <bdi className="ef-financial shrink-0 text-small font-bold text-text-primary">
                      {Math.round(percentage)}%
                    </bdi>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-brand-soft">
                    <div
                      className="h-full rounded-full bg-action-primary"
                      style={{ width: `${Math.max(percentage, 4)}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ol>

          {summary.highConcentrationBanks.length > 0 && (
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-warning-border/60 bg-warning-bg px-4 py-3">
              <Icon icon={AlertTriangle} size="sm" className="mt-0.5 shrink-0 text-warning-text" />
              <div>
                <p className="text-small font-semibold text-warning-text">تركز يتجاوز الحد الإرشادي</p>
                <p className="mt-0.5 text-small leading-5 text-warning-text">
                  راجع التعرض لدى {summary.highConcentrationBanks.map((bank) => bank.bankName).join('، ')}.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  )
}
