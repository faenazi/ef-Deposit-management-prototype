import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  FileCheck,
  FileText,
  Receipt,
  RotateCcw,
  Send,
  Target,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router'

import { Card, SectionHeading } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Icon } from '@/components/ui/Icon'
import { formatDate } from '@/lib/format'
import type { DashboardSummary } from '@/services/dashboard-service'

const activityIcons: Record<string, LucideIcon> = {
  'request-created': FileText,
  'request-submitted': Send,
  'request-approved': CheckCircle2,
  'request-returned': RotateCcw,
  'offer-added': FileCheck,
  'offer-evaluated': Target,
  'recommendation-made': Target,
  'deposit-activated': CheckCircle2,
  'deposit-executed': Send,
  'accounting-completed': Receipt,
  'maturity-recorded': Calendar,
}

export function RecentActivity({ summary }: { summary: DashboardSummary }) {
  const activities = summary.recentActivity.slice(0, 4)

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-4 py-4 md:px-6 md:py-5">
        <SectionHeading
          className="mb-0"
          title="آخر التحديثات"
          description="أحدث الحركات المسجلة على الطلبات والودائع بترتيبها الزمني."
        />
      </div>

      {activities.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="لا يوجد نشاط مسجل"
          description="ستظهر الأحداث المهمة بعد بدء العمل على الطلبات."
          className="border-t border-divider-soft py-8"
        />
      ) : (
        <ol className="divide-y divide-divider-soft border-t border-divider-soft">
          {activities.map((activity) => {
            const ActivityIcon = activityIcons[activity.activityType] ?? Calendar
            const href =
              activity.entityType === 'investment-request'
                ? `/investment-requests/${activity.entityId}`
                : activity.entityType === 'deposit'
                  ? `/deposits/${activity.entityId}`
                  : '/tasks'

            return (
              <li key={activity.id}>
                <Link
                  to={href}
                  className="group grid min-h-11 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-raised md:px-6 md:py-4"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-brand-muted text-action-primary md:size-9">
                    <Icon icon={ActivityIcon} size="sm" />
                  </span>

                  <span className="min-w-0">
                    <span className="block line-clamp-1 text-body font-semibold text-text-primary group-hover:text-action-primary">
                      {activity.description}
                    </span>
                    <span className="mt-0.5 flex min-w-0 items-center gap-x-1.5 text-small text-text-secondary">
                      <span className="max-w-24 truncate sm:max-w-none">{activity.actor}</span>
                      <span aria-hidden="true">·</span>
                      <span className="shrink-0">{formatDate(activity.timestamp)}</span>
                      <span aria-hidden="true" className="hidden sm:inline">·</span>
                      <bdi className="hidden truncate font-semibold text-action-secondary sm:inline">
                        {activity.entityId}
                      </bdi>
                    </span>
                  </span>

                  <span className="flex size-9 items-center justify-center rounded-full bg-canvas text-text-secondary group-hover:bg-surface-brand-soft group-hover:text-action-primary">
                    <Icon icon={ArrowLeft} size="sm" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      )}
    </Card>
  )
}
