import { Link } from 'react-router';
import {
  FileText,
  Send,
  CheckCircle2,
  XCircle,
  RotateCcw,
  FileCheck,
  TrendingUp,
  Target,
  Wallet,
  DollarSign,
  Receipt,
  Calendar,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Timeline } from '@/components/ui/Timeline';
import { TimelineItem } from '@/components/ui/Timeline';
import { formatDate } from '@/lib/format';
import type { DashboardSummary } from '@/services/dashboard-service';

const ACTIVITY_ICONS: Record<string, LucideIcon> = {
  'request-created': FileText,
  'request-submitted': Send,
  'request-approved': CheckCircle2,
  'request-rejected': XCircle,
  'request-returned': RotateCcw,
  'offer-added': FileCheck,
  'offer-evaluated': TrendingUp,
  'recommendation-made': Target,
  'deposit-activated': Wallet,
  'deposit-executed': DollarSign,
  'accounting-completed': Receipt,
  'maturity-recorded': Calendar,
};

export function RecentActivity({ summary }: { summary: DashboardSummary }) {
  const activities = summary.recentActivity.slice(0, 10);

  if (activities.length === 0) {
    return (
      <Card>
        <div className="p-6">
          <SectionHeading title="النشاط الأخير" className="mb-6" />
          <EmptyState
            title="لا يوجد نشاط"
            description="لم يتم تسجيل أي نشاط حتى الآن"
          />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <SectionHeading title="النشاط الأخير" className="mb-6" />

        <Timeline>
          {activities.map((activity, index) => {
            const IconComponent = ACTIVITY_ICONS[activity.activityType] || Calendar;
            const actionUrl =
              activity.entityType === 'investment-request'
                ? `/investment-requests/${activity.entityId}`
                : activity.entityType === 'deposit'
                  ? `/deposits/${activity.entityId}`
                  : undefined;

            return (
              <TimelineItem
                key={activity.id}
                icon={IconComponent}
                title={activity.description}
                meta={`${activity.actor} • ${formatDate(new Date(activity.timestamp))}`}
                isLast={index === activities.length - 1}
              >
                {activity.entityId && (
                  <div className="flex gap-2 text-xs text-text-secondary">
                    <span>•</span>
                    {actionUrl ? (
                      <Link
                        to={actionUrl}
                        className="text-action-secondary hover:text-action-primary"
                      >
                        {activity.entityId}
                      </Link>
                    ) : (
                      <span>{activity.entityId}</span>
                    )}
                  </div>
                )}
              </TimelineItem>
            );
          })}
        </Timeline>

        {summary.recentActivity.length > 10 && (
          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
            <Link
              to="/investment-requests"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              عرض سجل النشاط الكامل →
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}
