import { ArrowUpLeft, CalendarDays, CircleCheckBig } from 'lucide-react'
import { Link } from 'react-router'

import { Badge } from '@/components/ui/Badge'
import { Card, SectionHeading } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Icon } from '@/components/ui/Icon'
import { formatDate } from '@/lib/format'
import type { DashboardSummary } from '@/services/dashboard-service'

export function PriorityTasks({ summary }: { summary: DashboardSummary }) {
  const tasks = summary.priorityTasks.slice(0, 5)

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="border-b border-border-default px-5 py-5 md:px-6">
        <SectionHeading
          className="mb-0"
          title={summary.roleId === 'investment-treasury-executive' ? 'قرارات تتطلب اعتمادك' : 'ما يتطلب إجراءك الآن'}
          description="مرتبة حسب الأولوية وتاريخ الاستحقاق."
          action={
            tasks.length > 0 ? (
              <Link
                to="/tasks"
                className="inline-flex items-center gap-1 text-small font-semibold text-action-primary hover:underline"
              >
                عرض جميع المهام
                <Icon icon={ArrowUpLeft} size="xs" mirrorInRtl />
              </Link>
            ) : undefined
          }
        />
      </div>

      {tasks.length === 0 ? (
        <EmptyState
          icon={CircleCheckBig}
          title="لا يوجد إجراء مطلوب حاليًا"
          description="اكتملت المهام المسندة إلى دورك، وستظهر هنا أي مهمة جديدة فور انتقالها إليك."
          className="py-10"
        />
      ) : (
        <ol className="divide-y divide-border-default">
          {tasks.map((task, index) => (
            <li key={task.id}>
              <Link
                to={task.actionPath}
                className="group grid gap-3 px-5 py-4 transition-colors hover:bg-surface-raised focus-visible:bg-surface-brand-muted md:grid-cols-[2rem_minmax(0,1fr)_auto] md:items-center md:px-6"
              >
                <span
                  aria-hidden="true"
                  className="hidden size-8 items-center justify-center rounded-md bg-surface-brand-muted text-small font-bold text-action-primary md:flex"
                >
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-text-primary group-hover:text-action-primary">
                      {task.title}
                    </span>
                    <TaskBadge task={task} />
                  </span>
                  <span className="mt-1 block text-small text-text-secondary">{task.context}</span>
                  {task.relatedEntity && (
                    <bdi className="mt-1 block text-small font-semibold text-action-secondary">
                      {task.relatedEntity}
                    </bdi>
                  )}
                </span>
                <span className="flex items-center justify-between gap-3 md:block md:text-end">
                  <span className="inline-flex items-center gap-1.5 text-small font-medium text-text-primary">
                    <Icon icon={CalendarDays} size="xs" className="text-text-muted" />
                    {formatDate(task.dueDate)}
                  </span>
                  <span className="mt-1 block text-small font-semibold text-action-primary">فتح المهمة</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </Card>
  )
}

function TaskBadge({ task }: { task: DashboardSummary['priorityTasks'][number] }) {
  if (task.isOverdue) {
    return <Badge variant="danger">متأخرة {Math.max(task.agingDays, 1)} يوم</Badge>
  }
  if (task.priority === 'high') return <Badge variant="warning">أولوية عالية</Badge>
  if (task.priority === 'medium') return <Badge variant="info-soft">أولوية متوسطة</Badge>
  return <Badge variant="neutral">أولوية اعتيادية</Badge>
}
