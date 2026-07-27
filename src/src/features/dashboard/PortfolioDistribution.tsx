import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { FinancialValue } from '@/components/ui/FinancialValue';
import type { DashboardSummary } from '@/services/dashboard-service';

export function PortfolioDistribution({ summary }: { summary: DashboardSummary }) {
  const banks = summary.activeBanks.byBank.slice(0, 5);
  const total = summary.activeBanks.totalValue;

  if (banks.length === 0) {
    return (
      <Card>
        <div className="p-6">
          <SectionHeading title="توزيع المحفظة حسب البنك" className="mb-6" />
          <EmptyState
            title="لا توجد ودائع"
            description="لم يتم تفعيل أي ودائع بعد"
          />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <SectionHeading title="توزيع المحفظة حسب البنك" className="mb-6" />

        <div className="space-y-4">
          {banks.map((bank, idx) => {
            const percentage = total > 0 ? (bank.value / total) * 100 : 0;
            const isHighExposure = percentage > 25;
            const colorClass = isHighExposure
              ? 'from-amber-500 to-amber-600'
              : 'from-blue-500 to-blue-600';

            return (
              <div key={bank.bankId} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {idx + 1}. {bank.bankName}
                    </p>
                    {isHighExposure && (
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        تركز مرتفع
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {Math.round(percentage)}%
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      <FinancialValue value={bank.value} kind="currency-compact" />
                    </p>
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className={`h-full bg-gradient-to-r ${colorClass} transition-all`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {summary.activeBanks.byBank.length > 5 && (
          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              +{summary.activeBanks.byBank.length - 5} بنوك أخرى
            </p>
          </div>
        )}

        {summary.highConcentrationBanks.length > 0 && (
          <div className="mt-4 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
            <p className="text-xs font-medium text-amber-900 dark:text-amber-200">
              ⚠️ تركز بنكي مرتفع:
            </p>
            <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">
              {summary.highConcentrationBanks.map((b) => b.bankName).join('، ')}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
