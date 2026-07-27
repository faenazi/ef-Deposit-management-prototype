import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Card';
import { FinancialValue } from '@/components/ui/FinancialValue';
import { FinancialKpi } from '@/components/ui/FinancialKpi';
import { formatCompactCurrency } from '@/lib/format';
import type { DashboardSummary } from '@/services/dashboard-service';

export function ExecutiveSummary({ summary }: { summary: DashboardSummary }) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-sm">
      <div className="p-6 lg:p-8">
        <SectionHeading title="ملخص المحفظة" className="mb-6" />

        {/* Primary KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <FinancialKpi
            label="إجمالي الودائع النشطة"
            value={<FinancialValue value={summary.activeBanks.totalValue} kind="currency" />}
            context={`${summary.activeBanks.count} وديعة`}
          />

          <FinancialKpi
            label="متوسط معدل العائد"
            value={<FinancialValue value={summary.weightedAverageReturn} kind="percent" />}
          />

          <FinancialKpi
            label="العائد المتوقع"
            value={<FinancialValue value={summary.totalExpectedReturn} kind="currency" />}
          />

          <FinancialKpi
            label="الطلبات قيد الإجراء"
            value={summary.pendingRequests.count}
            context={formatCompactCurrency(summary.pendingRequests.value)}
          />
        </div>

        {/* Secondary metrics */}
        {summary.approachingMaturity.count > 0 && (
          <div className="mt-6 space-y-2 border-t border-slate-200 pt-4 dark:border-slate-700">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">الودائع القريبة من الاستحقاق</p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {summary.approachingMaturity.count}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600 dark:text-slate-400">القيمة الإجمالية</p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                  <FinancialValue value={summary.approachingMaturity.value} />
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Overdue/urgent alerts summary */}
        {(summary.overdueTasks > 0 || summary.returnedRequests > 0) && (
          <div className="mt-6 space-y-2 border-t border-slate-200 pt-4 dark:border-slate-700">
            <div className="flex flex-wrap gap-4">
              {summary.overdueTasks > 0 && (
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400">مهام متأخرة</p>
                  <p className="text-xl font-semibold text-red-700 dark:text-red-300">
                    {summary.overdueTasks}
                  </p>
                </div>
              )}
              {summary.returnedRequests > 0 && (
                <div>
                  <p className="text-sm text-amber-600 dark:text-amber-400">طلبات معادة للاستكمال</p>
                  <p className="text-xl font-semibold text-amber-700 dark:text-amber-300">
                    {summary.returnedRequests}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
