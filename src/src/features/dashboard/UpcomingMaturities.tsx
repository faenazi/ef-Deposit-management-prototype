import { Link } from 'react-router';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Badge } from '@/components/ui/Badge';
import { FinancialValue } from '@/components/ui/FinancialValue';
import { formatDate, formatPercent } from '@/lib/format';
import type { DashboardSummary } from '@/services/dashboard-service';

export function UpcomingMaturities({ summary }: { summary: DashboardSummary }) {
  const maturities = summary.approachingMaturity.deposits.slice(0, 10);

  if (maturities.length === 0) {
    return (
      <Card>
        <div className="p-6">
          <SectionHeading title="الاستحقاقات القادمة" className="mb-6" />
          <EmptyState
            title="لا توجد استحقاقات"
            description="لا توجد ودائع قريبة من الاستحقاق"
          />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <SectionHeading title="الاستحقاقات القادمة" />
          {summary.approachingMaturity.deposits.length > 10 && (
            <Link
              to="/deposits?filter=approaching-maturity"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              عرض الكل
            </Link>
          )}
        </div>

        <div className="space-y-3">
          {maturities.map((maturity) => (
            <Link
              key={maturity.depositId}
              to={`/deposits/${maturity.depositId}`}
              className="block rounded-lg border border-slate-200 bg-slate-50 p-3 transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-medium text-slate-900 dark:text-white break-all">
                  {maturity.depositId}
                </span>
                <Badge
                  variant={maturity.daysUntilMaturity <= 3 ? 'danger' : 'neutral'}
                  className="text-xs whitespace-nowrap"
                >
                  {maturity.daysUntilMaturity === 0 && 'اليوم'}
                  {maturity.daysUntilMaturity === 1 && 'غدًا'}
                  {maturity.daysUntilMaturity > 1 &&
                    `${maturity.daysUntilMaturity} أيام`}
                </Badge>
              </div>

              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>{maturity.bankName}</span>
                  <span>
                    <FinancialValue value={maturity.principal} kind="currency-compact" />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-500">
                    {formatDate(new Date(maturity.maturityDate))}
                  </span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {formatPercent(maturity.rate)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}
