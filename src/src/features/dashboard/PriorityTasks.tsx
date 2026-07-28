import { ArrowLeft, ArrowUpLeft, CalendarDays, CircleCheckBig } from 'lucide-react'
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
      <div className="px-5 py-5 md:px-6">
        <SectionHeading
          className="mb-0"
          title={summary.roleId === 'investment-treasury-executive' ? 'قرارات تتطلب اعتمادك' : 'مهامي'}
          description="الأعمال المسندة إلى دورك مرتبة حسب الأولوية والاستحقاق."
          action={
            tasks.length > 0 ? (
              <Link
                to="/tasks"
                className="inline-flex items-center gap-1 text-small font-semibold text-action-primary hover:underline"
              >
                عرض الكل
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
          className="border-t border-divider-soft py-10"
        />
      ) : (
        <div className="border-t border-divider-soft">
          <div className="hidden grid-cols-[minmax(0,1.45fr)_10rem_9rem_8rem_2.5rem] items-center gap-3 bg-surface-subtle px-6 py-3 text-table font-semibold text-text-secondary md:grid">
            <span>المهمة</span>
            <span>المرجع</span>
            <span>تاريخ الاستحقاق</span>
            <span>الحالة</span>
            <span className="sr-only">فتح</span>
          </div>

          <ol className="divide-y divide-divider-soft">
            {tasks.map((task) => (
              <li key={task.id}>
                <Link
                  to={task.actionPath}
                  className="group grid gap-3 px-5 py-4 transition-colors hover:bg-surface-raised focus-visible:bg-surface-brand-muted md:grid-cols-[minmax(0,1.45fr)_10rem_9rem_8rem_2.5rem] md:items-center md:px-6"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-text-primary group-hover:text-action-primary">
                      {task.title}
                    </span>
                    <span className="mt-1 block line-clamp-1 text-small text-text-secondary">
                      {task.context}
                    </span>
                  </span>

                  <bdi className="text-small font-semibold text-action-secondary">
                    {task.relatedEntity ?? task.id}
                  </bdi>

                  <span className="inline-flex items-center gap-1.5 text-small text-text-primary">
                    <Icon icon={CalendarDays} size="xs" className="text-text-muted" />
                    {formatDate(task.dueDate)}
                  </span>

                  <TaskBadge task={task} />

                  <span className="flex size-8 items-center justify-center rounded-full bg-canvas text-text-secondary transition-colors group-hover:bg-surface-brand-soft group-hover:text-action-primary">
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

function TaskBadge({ task }: { task: DashboardSummary['priorityTasks'][number] }) {
  if (task.isOverdue) {
    return <Badge variant="danger">متأخرة {Math.max(task.agingDays, 1)} يوم</Badge>
  }
  if (task.priority === 'high') return <Badge variant="warning">أولوية عالية</Badge>
  if (task.priority === 'medium') return <Badge variant="info-soft">أولوية متوسطة</Badge>
  return <Badge variant="neutral">اعتيادية</Badge>
}
