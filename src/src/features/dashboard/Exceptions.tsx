import { AlertTriangle, ArrowLeft, CircleAlert, Info } from 'lucide-react'
import { Link } from 'react-router'

import { Card, SectionHeading } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
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

export function Exceptions({ exceptions }: { exceptions: DashboardSummary['exceptions'] }) {
  const visible = exceptions.slice(0, 4)

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-5 py-5">
        <SectionHeading
          className="mb-0"
          title="تنبيهات تحتاج انتباهًا"
          description={`${exceptions.length} مؤشرات مرتبطة بالأولوية والمخاطر.`}
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
                  className="group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-surface-raised"
                >
                  <ExceptionContent exception={exception} icon={ExceptionIcon} />
                  <span className="ms-auto flex size-8 shrink-0 items-center justify-center rounded-full bg-canvas text-text-secondary group-hover:bg-surface-brand-soft group-hover:text-action-primary">
                    <Icon icon={ArrowLeft} size="sm" />
                  </span>
                </Link>
              ) : (
                <div className="flex items-start gap-3 px-5 py-4">
                  <ExceptionContent exception={exception} icon={ExceptionIcon} />
                </div>
              )}
            </li>
          )
        })}
      </ol>
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
      <span className="min-w-0">
        <span className="block text-body font-semibold text-text-primary">{exception.title}</span>
        <span className="mt-1 block line-clamp-2 text-small text-text-secondary">
          {exception.description}
        </span>
      </span>
    </>
  )
}
