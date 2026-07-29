import { AlertTriangle, ArrowLeft, CircleAlert, CircleCheckBig, Info } from 'lucide-react'
import { Link } from 'react-router'

import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { DashboardSummary } from '@/services/dashboard-service'

const severityIcon = {
  critical: CircleAlert,
  warning: AlertTriangle,
  info: Info,
}

const severityStyle = {
  critical: 'text-danger-text',
  warning: 'text-warning-text',
  info: 'text-info-text',
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

const roleAttentionCopy: Record<DashboardSummary['roleId'], { title: string; description: string }> = {
  'deposit-specialist': {
    title: 'يحتاج انتباهك اليوم',
    description: 'ابدأ بالمتأخر والمعاد قبل استكمال بقية الطلبات.',
  },
  'treasury-general-manager': {
    title: 'قرارات ومخاطر للمتابعة',
    description: 'راجع ما قد يؤثر على الاعتماد أو توقيت الاستثمار.',
  },
  'investment-treasury-executive': {
    title: 'مؤشرات تستدعي قرارًا',
    description: 'ركز على الأثر المالي والتركيز والاستحقاقات الحرجة.',
  },
  'investment-support': {
    title: 'عوائق انتقال الطلبات',
    description: 'استكمل النواقص التي تمنع انتقال الطلب للمراجعة المالية.',
  },
  'finance-reviewer': {
    title: 'ملاحظات قبل التنفيذ',
    description: 'راجع الحالات التي تعطل الجاهزية المالية للتحويل.',
  },
  'accounting-executor': {
    title: 'عوائق الإقفال والتفعيل',
    description: 'ابدأ بما يؤخر التحويل أو إثبات التنفيذ.',
  },
  'system-admin': {
    title: 'متابعة بيئة العرض',
    description: 'مؤشرات مرتبطة بالبيانات التجريبية ومسارات العرض.',
  },
  'read-only-user': {
    title: 'مؤشرات المحفظة',
    description: 'مخاطر تشغيلية ومالية ظاهرة للاطلاع فقط.',
  },
}

export function Exceptions({
  summary,
  className,
}: {
  summary: DashboardSummary
  className?: string
}) {
  const exceptions = summary.exceptions
  const visible = exceptions.slice(0, 2)
  const hiddenCount = Math.max(exceptions.length - visible.length, 0)
  const copy = roleAttentionCopy[summary.roleId]

  return (
    <Card
      padding="none"
      className={cn('overflow-hidden border-0 bg-surface-brand-muted shadow-none', className)}
    >
      <div className="flex items-start gap-3 px-4 pb-3 pt-4 md:px-5 md:pt-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-action-primary text-white">
          <Icon icon={CircleAlert} size="md" />
        </span>
        <div className="min-w-0 grow">
          <h2 className="text-h3 font-bold text-text-primary">{copy.title}</h2>
          <p className="mt-0.5 text-small leading-5 text-text-secondary">{copy.description}</p>
        </div>
        {exceptions.length > 0 && <Badge variant="danger">{exceptions.length}</Badge>}
      </div>

      {visible.length === 0 ? (
        <div className="mx-4 mb-4 flex min-h-20 items-center gap-3 rounded-lg bg-surface px-4 py-3 md:mx-5 md:mb-5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success-bg text-success-text">
            <Icon icon={CircleCheckBig} size="sm" />
          </span>
          <div>
            <p className="text-body font-semibold text-text-primary">لا توجد حالات تعطل العمل</p>
            <p className="mt-0.5 text-small text-text-secondary">يمكنك متابعة المهام حسب ترتيبها الحالي.</p>
          </div>
        </div>
      ) : (
        <ol className="space-y-2 px-3 pb-3 md:px-4 md:pb-4">
          {visible.map((exception) => {
            const ExceptionIcon = severityIcon[exception.severity]
            return (
              <li key={exception.id}>
                {exception.actionPath ? (
                  <Link
                    to={exception.actionPath}
                    aria-label={exception.actionLabel ?? `عرض ${exception.title}`}
                    className="group flex min-h-[72px] items-start gap-3 rounded-lg bg-surface px-3 py-3 transition-colors hover:bg-white md:px-4"
                  >
                    <ExceptionContent exception={exception} icon={ExceptionIcon} />
                    <span className="ms-auto flex shrink-0 flex-col items-end gap-2">
                      <Badge variant={severityBadge[exception.severity]}>
                        {severityLabel[exception.severity]}
                      </Badge>
                      <span className="text-action-primary transition-transform group-hover:-translate-x-0.5">
                        <Icon icon={ArrowLeft} size="sm" />
                      </span>
                    </span>
                  </Link>
                ) : (
                  <div className="flex min-h-[72px] items-start gap-3 rounded-lg bg-surface px-3 py-3 md:px-4">
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
      )}

      {hiddenCount > 0 && (
        <div className="px-5 pb-4 text-small text-text-secondary">
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
      <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center ${severityStyle[exception.severity]}`}>
        <Icon icon={icon} size="sm" />
      </span>
      <span className="min-w-0 grow">
        <span className="block text-small font-bold leading-5 text-text-primary md:text-body">{exception.title}</span>
        <span className="mt-1 block line-clamp-2 text-small leading-5 text-text-secondary">
          {getActionGuidance(exception)}
        </span>
        {exception.actionLabel && (
          <span className="mt-1 block text-[11px] font-semibold text-action-primary">
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
