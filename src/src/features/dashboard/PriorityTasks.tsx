import { ArrowLeft, ArrowUpLeft, CalendarDays, CircleCheckBig } from 'lucide-react'
import { Link } from 'react-router'

import { Badge } from '@/components/ui/Badge'
import { Card, SectionHeading } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Icon } from '@/components/ui/Icon'
import { formatDate } from '@/lib/format'
import { cn } from '@/lib/cn'
import type { DashboardSummary } from '@/services/dashboard-service'

const roleCopy: Record<DashboardSummary['roleId'], { title: string; description: string }> = {
  'deposit-specialist': {
    title: 'مهام تتطلب إجراءك',
    description: 'المسودات والطلبات المعادة والاستحقاقات التشغيلية مرتبة حسب الأولوية.',
  },
  'treasury-general-manager': {
    title: 'طلبات بانتظار مراجعتك',
    description: 'قرارات الخزينة التي تنتظر المراجعة أو الاعتماد ضمن المدة المحددة.',
  },
  'investment-treasury-executive': {
    title: 'قرارات بانتظار اعتمادك',
    description: 'الطلبات مرتفعة القيمة والقرارات التنفيذية ذات الأثر المالي الأعلى.',
  },
  'investment-support': {
    title: 'مراجعات دعم الاستثمار',
    description: 'المعاملات التي تحتاج مراجعة التوصية والمستندات قبل انتقالها للمالية.',
  },
  'finance-reviewer': {
    title: 'مراجعات مالية معلقة',
    description: 'الطلبات الجاهزة للتحقق المالي قبل تنفيذ التحويل.',
  },
  'accounting-executor': {
    title: 'عمليات تنفيذ معلقة',
    description: 'المعاملات التي تحتاج تسجيل التحويل واستكمال الإثباتات المحاسبية.',
  },
  'system-admin': {
    title: 'مهام إدارة المنصة',
    description: 'المهام التجريبية المرتبطة بالوصول والإعدادات والمتابعة التشغيلية.',
  },
  'read-only-user': {
    title: 'المهام',
    description: 'هذا الدور مخصص للعرض ولا يملك إجراءات تنفيذية.',
  },
}

export function PriorityTasks({
  summary,
  className,
}: {
  summary: DashboardSummary
  className?: string
}) {
  const tasks = summary.priorityTasks.slice(0, 4)
  const copy = roleCopy[summary.roleId]

  return (
    <Card padding="none" className={cn('overflow-hidden', className)}>
      <div className="px-4 py-4 md:px-6 md:py-5">
        <SectionHeading
          className="mb-0"
          title={copy.title}
          description={copy.description}
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
          description="لا توجد مهام مفتوحة مسندة إلى دورك في الوقت الحالي."
          className="border-t border-divider-soft py-10"
        />
      ) : (
        <div className="border-t border-divider-soft">
          <div className="hidden grid-cols-[minmax(0,1.5fr)_9rem_8rem_6.5rem_2.75rem] items-center gap-3 bg-surface-subtle px-6 py-3 text-table font-semibold text-text-secondary xl:grid">
            <span>المهمة</span>
            <span>المرجع</span>
            <span>تاريخ الاستحقاق</span>
            <span>الأولوية</span>
            <span className="sr-only">فتح</span>
          </div>

          <ol className="divide-y divide-divider-soft">
            {tasks.map((task, index) => (
              <li key={task.id} className={index === 3 ? 'hidden sm:list-item' : undefined}>
                <Link
                  to={task.actionPath}
                  aria-label={`فتح المهمة: ${task.title}`}
                  className="group block min-h-11 px-4 py-3.5 transition-colors hover:bg-surface-raised focus-visible:bg-surface-brand-muted md:px-6 xl:grid xl:min-h-16 xl:grid-cols-[minmax(0,1.5fr)_9rem_8rem_6.5rem_2.75rem] xl:items-center xl:gap-3"
                >
                  <span className="min-w-0">
                    <span className="block line-clamp-2 font-semibold leading-6 text-text-primary group-hover:text-action-primary xl:truncate">
                      {getTaskDisplayTitle(task.title, task.relatedEntity)}
                    </span>
                    <span className="mt-1 hidden line-clamp-1 text-small text-text-secondary xl:block">
                      {task.context}
                    </span>
                  </span>

                  <span className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 xl:mt-0 xl:contents">
                    <span className="min-w-0">
                      <span className="mb-0.5 block text-[11px] font-medium text-text-muted xl:hidden">المرجع</span>
                      <bdi className="block truncate text-small font-semibold text-action-secondary">
                        {task.relatedEntity ?? task.id}
                      </bdi>
                    </span>

                    <span className="text-end xl:text-start">
                      <span className="mb-0.5 block text-[11px] font-medium text-text-muted xl:hidden">
                        تاريخ الاستحقاق
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-small text-text-primary">
                        <Icon icon={CalendarDays} size="xs" className="text-text-muted" />
                        {formatDate(task.dueDate)}
                      </span>
                    </span>

                    <span className="self-end xl:self-auto">
                      <span className="sr-only xl:hidden">الأولوية</span>
                      <TaskBadge task={task} />
                    </span>

                    <span className="flex items-end justify-end xl:items-center xl:justify-center">
                      <span className="flex size-9 items-center justify-center rounded-full bg-canvas text-text-secondary transition-colors group-hover:bg-surface-brand-soft group-hover:text-action-primary">
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

function getTaskDisplayTitle(title: string, reference: string | null) {
  if (!reference) return title
  return title.replace(new RegExp(`\\s*[—-]\\s*${reference.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`), '')
}

function TaskBadge({ task }: { task: DashboardSummary['priorityTasks'][number] }) {
  if (task.isOverdue) {
    return <Badge variant="danger">متأخرة {Math.max(task.agingDays, 1)} يوم</Badge>
  }
  if (task.priority === 'high') return <Badge variant="warning">عالية</Badge>
  if (task.priority === 'medium') return <Badge variant="info-soft">متوسطة</Badge>
  return <Badge variant="neutral">اعتيادية</Badge>
}
