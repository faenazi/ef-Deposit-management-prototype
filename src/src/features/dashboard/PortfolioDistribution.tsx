import { AlertTriangle, ArrowUpLeft, Landmark } from 'lucide-react'
import { Link } from 'react-router'

import { Card, SectionHeading } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { FinancialValue } from '@/components/ui/FinancialValue'
import { Icon } from '@/components/ui/Icon'
import type { DashboardSummary } from '@/services/dashboard-service'

export function PortfolioDistribution({ summary }: { summary: DashboardSummary }) {
  const banks = [...summary.activeBanks.byBank]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
  const total = summary.activeBanks.totalValue
  const largestShare = banks[0] && total > 0 ? Math.round((banks[0].value / total) * 100) : 0

  return (
    <Card>
      <SectionHeading
        title="توزيع التعرض على البنوك"
        description={
          banks[0]
            ? `أكبر تعرض لدى ${banks[0].bankName} بنسبة ${largestShare}% من أصل المحفظة.`
            : 'ترتيب قيمة أصل الودائع حسب البنك.'
        }
        action={
          banks.length > 0 ? (
            <Link to="/deposits" className="text-action-primary" aria-label="عرض محفظة الودائع">
              <Icon icon={ArrowUpLeft} size="sm" mirrorInRtl />
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
                    </div>
                    <div className="shrink-0 text-end">
                      <bdi className="ef-financial block text-small font-bold text-text-primary">
                        {Math.round(percentage)}%
                      </bdi>
                      <span className="text-small text-text-secondary">
                        <FinancialValue value={bank.value} kind="currency-compact" />
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-brand-soft">
                    <div
                      className="h-full rounded-full bg-action-primary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ol>

          {summary.highConcentrationBanks.length > 0 && (
            <div className="mt-5 flex items-start gap-3 rounded-md border border-warning-border bg-warning-bg px-4 py-3">
              <Icon icon={AlertTriangle} size="sm" className="mt-0.5 shrink-0 text-warning-text" />
              <div>
                <p className="text-small font-semibold text-warning-text">مؤشر تركّز يحتاج مراجعة</p>
                <p className="mt-0.5 text-small text-warning-text">
                  {summary.highConcentrationBanks.map((bank) => bank.bankName).join('، ')}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  )
}
