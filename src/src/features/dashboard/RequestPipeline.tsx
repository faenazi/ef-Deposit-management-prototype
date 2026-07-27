import { Link } from 'react-router';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import type { DashboardSummary } from '@/services/dashboard-service';

const STAGE_LABELS: Record<string, string> = {
  draft: 'مسودة',
  returned: 'معاد للاستكمال',
  'pending-treasury': 'مراجعة الخزينة',
  'pending-executive': 'مراجعة المدير التنفيذي',
  'pending-winning-bank': 'بيانات البنك الفائز',
  'pending-investment-support': 'مراجعة دعم الاستثمار',
  'pending-finance': 'مراجعة المالية',
  'pending-accounting': 'تنفيذ التحويل المحاسبي',
  'pending-activation': 'تأكيد تفعيل الوديعة',
  completed: 'مكتمل',
  cancelled: 'ملغى',
  rejected: 'مرفوض',
};

export function RequestPipeline({ summary }: { summary: DashboardSummary }) {
  const pipeline = summary.requestPipeline;

  if (!pipeline || Object.keys(pipeline).length === 0) {
    return (
      <Card>
        <div className="p-6">
          <SectionHeading title="توزيع طلبات الاستثمار" className="mb-6" />
          <EmptyState
            title="لا توجد طلبات"
            description="لم يتم إنشاء أي طلبات استثمار بعد"
          />
        </div>
      </Card>
    );
  }

  // Calculate total for percentages
  const total = Object.values(pipeline).reduce((sum, count) => sum + count, 0);

  return (
    <Card>
      <div className="p-6">
        <SectionHeading title="توزيع طلبات الاستثمار" className="mb-6" />

        <div className="space-y-3">
          {Object.entries(pipeline).map(([stage, count]) => {
            if (count === 0) return null;

            const percentage = total > 0 ? (count / total) * 100 : 0;
            const stageLabel = STAGE_LABELS[stage] || stage;

            return (
              <div key={stage} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-slate-900 dark:text-white">
                      <Link
                        to={`/investment-requests?stage=${stage}`}
                        className="hover:underline text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        {stageLabel}
                      </Link>
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {count} ({Math.round(percentage)}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">الإجمالي</span>
            <span className="font-semibold text-slate-900 dark:text-white">{total} طلب</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
