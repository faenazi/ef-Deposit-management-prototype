import { Link } from 'react-router';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate } from '@/lib/format';
import type { DashboardSummary } from '@/services/dashboard-service';

export function PriorityTasks({ summary }: { summary: DashboardSummary }) {
  const tasks = summary.priorityTasks.slice(0, 5);

  if (tasks.length === 0) {
    return (
      <Card>
        <div className="p-6">
          <SectionHeading title="المهام ذات الأولوية" className="mb-6" />
          <EmptyState
            title="لا توجد مهام حالية"
            description="لا توجد مهام تتطلب إجراءك في الوقت الراهن"
          />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <SectionHeading title="المهام ذات الأولوية" />
          {summary.priorityTasks.length > 5 && (
            <Link
              to="/tasks"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              عرض الكل →
            </Link>
          )}
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col gap-3 border-b border-slate-200 pb-3 last:border-0 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 items-center mb-1">
                  <Link
                    to={task.actionPath}
                    className="font-medium text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                  >
                    {task.title}
                  </Link>
                  <Badge
                    variant={
                      task.isOverdue ? 'danger' :
                      task.priority === 'high' ? 'warning' :
                      'info-soft'
                    }
                    className="text-xs"
                  >
                    {task.priority === 'high' && 'عاجل'}
                    {task.priority === 'medium' && 'متوسط'}
                    {task.priority === 'low' && 'منخفض'}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
                  <span>{task.context}</span>
                  {task.relatedEntity && (
                    <span>{task.relatedEntity}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 whitespace-nowrap text-sm">
                <span className="font-medium text-slate-900 dark:text-white">
                  {formatDate(new Date(task.dueDate))}
                </span>
                {task.isOverdue && (
                  <span className="text-xs font-medium text-red-600 dark:text-red-400">
                    متأخر بـ {task.agingDays} يوم
                  </span>
                )}
                {!task.isOverdue && task.agingDays <= 1 && (
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    استحقاق اليوم
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
