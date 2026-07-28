import {
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
  const activities = summary.recentActivity.slice(0, 6)

  return (
    <Card>
      <SectionHeading
        title="آخر الحركات المهمة"
        description="أحداث تشغيلية مختارة تحفظ سياق القرار والمعاملة."
      />
      {activities.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="لا يوجد نشاط مسجل"
          description="ستظهر الأحداث المهمة بعد بدء العمل على الطلبات."
          className="py-8"
        />
      ) : (
        <ol className="grid gap-x-8 gap-y-1 md:grid-cols-2">
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
                  className="group flex items-start gap-3 border-b border-border-default py-3 last:border-b-0 hover:text-action-primary"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-surface-brand-muted text-action-primary">
                    <Icon icon={ActivityIcon} size="sm" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-small font-semibold text-text-primary group-hover:text-action-primary">
                      {activity.description}
                    </span>
                    <span className="mt-1 block text-small text-text-secondary">
                      {activity.actor} · {formatDate(activity.timestamp)}
                    </span>
                    <bdi className="mt-0.5 block text-small font-semibold text-action-secondary">
                      {activity.entityId}
                    </bdi>
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
