import { AlertTriangle, ArrowUpLeft, CircleAlert, Info } from 'lucide-react'
import { Link } from 'react-router'

import { Icon } from '@/components/ui/Icon'
import type { DashboardSummary } from '@/services/dashboard-service'

const severityIcon = {
  critical: CircleAlert,
  warning: AlertTriangle,
  info: Info,
}

const severityStyle = {
  critical: 'border-danger-border bg-danger-bg text-danger-text',
  warning: 'border-warning-border bg-warning-bg text-warning-text',
  info: 'border-info-border bg-info-bg text-info-text',
}

export function Exceptions({ exceptions }: { exceptions: DashboardSummary['exceptions'] }) {
  const visible = exceptions.slice(0, 3)

  return (
    <section aria-labelledby="attention-title">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id="attention-title" className="text-body font-bold text-text-primary">
          نقاط تحتاج انتباهًا
        </h2>
        <span className="text-small text-text-secondary">{exceptions.length} مؤشرات</span>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {visible.map((exception) => {
          const ExceptionIcon = severityIcon[exception.severity]
          return (
            <article
              key={exception.id}
              className={`flex min-w-0 items-start gap-3 rounded-md border px-4 py-3 ${severityStyle[exception.severity]}`}
            >
              <Icon icon={ExceptionIcon} size="sm" className="mt-0.5 shrink-0" />
              <div className="min-w-0 grow">
                <h3 className="text-small font-bold">{exception.title}</h3>
                <p className="mt-0.5 line-clamp-2 text-small">{exception.description}</p>
              </div>
              {exception.actionPath && (
                <Link
                  to={exception.actionPath}
                  aria-label={exception.actionLabel ?? `عرض ${exception.title}`}
                  className="shrink-0"
                >
                  <Icon icon={ArrowUpLeft} size="sm" mirrorInRtl />
                </Link>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
