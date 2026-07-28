import { AlertTriangle, ArrowLeft, CircleAlert, Info } from 'lucide-react'
import { Link } from 'react-router'

import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import { Card, SectionHeading } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { DashboardSummary } from '@/services/dashboard-service'

const severityIcon = {
  critical: CircleAlert,
  warning: AlertTriangle,
  info: Info,
}

const severityStyle = {
  critical: 'bg-danger-bg text-danger-text',
  warning: 'bg-warning-bg text-warning-text',
  info: 'bg-info-bg text-info-text',
}

const severityLabel: Record<DashboardSummary['exceptions'][number]['severity'], string> = {
  critical: 'عاجل',
  warning: 'يحتاج متابعة',
  info: 'للاطلاع',
}

const severityBadge: Record<DashboardSummary['exceptions'][number]['severity'], BadgeVariant> = {
  critical: 'danger',
  warning: 'warning',
  info: 'info-soft',
}

export function Exceptions({
  exceptions,
  className,
}: {
  exceptions: DashboardSummary['exceptions']
  className?: string
}) {
  const visible = exceptions.slice(0, 3)
  const hiddenCount = Math.max(exceptions.length - visible.length, 0)

  return (
    <Card padding="none" className={cn('overflow-hidden', className)}>
      <div className="px-4 py-4 md:px-5 md:py-5">
        <SectionHeading
          className="mb-0"
          title="تنبيهات القرار والمتابعة"
          description="أهم المؤشرات التي قد تؤثر على موعد التنفيذ أو جودة القرار."
          action={<Badge variant="neutral">{exceptions.length} مؤشرات</Badge>}
        />
      </div>

      <ol className="divide-y divide-divider-soft border-t border-divider-soft">
        {visible.map((exception) => {
          const ExceptionIcon = severityIcon[exception.severity]
          return (
            <li key={exception.id}>
              {exception.actionPath ? (
                <Link
                  to={exception.actionPath}
                  aria-label={exception.actionLabel ?? `عرض ${exception.title}`}
                  className="group flex min-h-11 items-start gap-3 px-4 py-3.5 transition-colors hover:bg-surface-raised md:px-5 md:py-4"
                >
                  <ExceptionContent exception={exception} icon={ExceptionIcon} />
                  <span className="ms-auto flex shrink-0 flex-col items-end gap-2">
                    <Badge variant={severityBadge[exception.severity]}>
                      {severityLabel[exception.severity]}
                    </Badge>
                    <span className="flex size-9 items-center justify-center rounded-full bg-canvas text-text-secondary group-hover:bg-surface-brand-soft group-hover:text-action-primary">
                      <Icon icon={ArrowLeft} size="sm" />
                    </span>
                  </span>
                </Link>
              ) : (
                <div className="flex items-start gap-3 px-4 py-3.5 md:px-5 md:py-4">
                  <ExceptionContent exception={exception} icon={ExceptionIcon} />
                  <Badge variant={severityBadge[exception.severity]} className="ms-auto shrink-0">
                    {severityLabel[exception.severity]}
                  </Badge>
                </div>
              )}
            </li>
          )
        })}
      </ol>

      {hiddenCount > 0 && (
        <div className="border-t border-divider-soft bg-surface-subtle px-5 py-3 text-small text-text-secondary">
          يوجد {hiddenCount} مؤشر إضافي ضمن بيانات المتابعة.
        </div>
      )}
    </Card>
  )
}

function ExceptionContent({
  exception,
  icon,
}: {
  exception: DashboardSummary['exceptions'][number]
  icon: Parameters<typeof Icon>[0]['icon']
}) {
  return (
    <>
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${severityStyle[exception.severity]}`}>
        <Icon icon={icon} size="sm" />
      </span>
      <span className="min-w-0 grow">
        <span className="block text-body font-semibold text-text-primary">{exception.title}</span>
        <span className="mt-1 block line-clamp-2 text-small leading-5 text-text-secondary">
          {getActionGuidance(exception)}
        </span>
        {exception.actionLabel && (
          <span className="mt-1.5 block text-small font-semibold text-action-primary">
            {exception.actionLabel}
          </span>
        )}
      </span>
    </>
  )
}

function getActionGuidance(exception: DashboardSummary['exceptions'][number]) {
  if (exception.type === 'overdue_task') {
    return 'ابدأ بالمهام المتأخرة لتفادي تأخير دورة الاستثمار.'
  }
  if (exception.type === 'returned_request') {
    return 'استكمل النواقص وأعد الإرسال للحفاظ على موعد القرار.'
  }
  if (exception.type === 'high_concentration') {
    return 'راجع توزيع الودائع قبل اتخاذ قرار استثماري جديد.'
  }
  return exception.description
}
