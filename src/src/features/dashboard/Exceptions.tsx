import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import type { DashboardSummary } from '@/services/dashboard-service';

export function Exceptions({ exceptions }: { exceptions: DashboardSummary['exceptions'] }) {
  if (exceptions.length === 0) {
    return null;
  }

  const grouped = {
    critical: exceptions.filter((e) => e.severity === 'critical'),
    warning: exceptions.filter((e) => e.severity === 'warning'),
    info: exceptions.filter((e) => e.severity === 'info'),
  };

  return (
    <Card className="border-l-4 border-l-danger bg-danger-bg/10 dark:border-l-danger dark:bg-danger-bg/5">
      <div className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Icon icon={AlertCircle} size="md" className="text-danger-text" />
          <SectionHeading title="استثناءات وتنبيهات" className="m-0" />
        </div>

        <div className="space-y-3">
          {/* Critical */}
          {grouped.critical.map((exc) => (
            <div
              key={exc.id}
              className="rounded-lg border border-danger-border bg-danger-bg/50 p-3 dark:border-danger-border/40 dark:bg-danger-bg/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-danger-text">
                    {exc.title}
                  </p>
                  <p className="mt-1 text-sm text-danger-text/80">
                    {exc.description}
                  </p>
                </div>
                {exc.actionPath && (
                  <Link
                    to={exc.actionPath}
                    className="whitespace-nowrap text-xs font-medium text-action-secondary hover:text-action-primary underline ml-2"
                  >
                    {exc.actionLabel || 'عرض'}
                  </Link>
                )}
              </div>
            </div>
          ))}

          {/* Warnings */}
          {grouped.warning.map((exc) => (
            <div
              key={exc.id}
              className="rounded-lg border border-warning-border bg-warning-bg/50 p-3 dark:border-warning-border/40 dark:bg-warning-bg/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-warning-text">
                    {exc.title}
                  </p>
                  <p className="mt-1 text-sm text-warning-text/80">
                    {exc.description}
                  </p>
                </div>
                {exc.actionPath && (
                  <Link
                    to={exc.actionPath}
                    className="whitespace-nowrap text-xs font-medium text-action-secondary hover:text-action-primary underline ml-2"
                  >
                    {exc.actionLabel || 'عرض'}
                  </Link>
                )}
              </div>
            </div>
          ))}

          {/* Info */}
          {grouped.info.slice(0, 2).map((exc) => (
            <div
              key={exc.id}
              className="rounded-lg border border-info-border bg-info-bg/50 p-3 dark:border-info-border/40 dark:bg-info-bg/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-info-text">
                    {exc.title}
                  </p>
                  <p className="mt-1 text-sm text-info-text/80">
                    {exc.description}
                  </p>
                </div>
                {exc.actionPath && (
                  <Link
                    to={exc.actionPath}
                    className="whitespace-nowrap text-xs font-medium text-action-secondary hover:text-action-primary underline ml-2"
                  >
                    {exc.actionLabel || 'عرض'}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
