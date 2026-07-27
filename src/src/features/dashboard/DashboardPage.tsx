import { useEffect, useState } from 'react';
import { useUser } from '@/app/user-context';
import { fetchDashboardSummary, type DashboardSummary } from '@/services/dashboard-service';
import { PageHeader } from '@/layouts/PageHeader';
import { PageContainer } from '@/layouts/PageContainer';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { ExecutiveSummary } from './ExecutiveSummary';
import { PriorityTasks } from './PriorityTasks';
import { RequestPipeline } from './RequestPipeline';
import { PortfolioDistribution } from './PortfolioDistribution';
import { UpcomingMaturities } from './UpcomingMaturities';
import { Exceptions } from './Exceptions';
import { RecentActivity } from './RecentActivity';

export function DashboardPage() {
  const user = useUser();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDashboardSummary(user.role.code);
        if (mounted) {
          setSummary(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load dashboard'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, [user.role.code]); // Reload when user role changes

  if (error && !summary) {
    return (
      <PageContainer>
        <PageHeader title="الصفحة الرئيسية" />
        <ErrorState title="خطأ في تحميل لوحة المعلومات" description={error.message} />
      </PageContainer>
    );
  }

  if (loading) {
    return (
      <PageContainer>
        <PageHeader title="الصفحة الرئيسية" />
        <div className="flex items-center justify-center py-12">
          <Spinner />
        </div>
      </PageContainer>
    );
  }

  if (!summary) {
    return (
      <PageContainer>
        <PageHeader title="الصفحة الرئيسية" />
        <EmptyState title="لا توجد بيانات" description="تعذر تحميل بيانات لوحة المعلومات" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="الصفحة الرئيسية" />

      <div className="space-y-6">
        {/* Executive Summary */}
        <ExecutiveSummary summary={summary} />

        {/* Main operational grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Primary tasks section - wider on desktop */}
          <div className="lg:col-span-2">
            <PriorityTasks summary={summary} />
          </div>

          {/* Upcoming maturities - narrower */}
          <div className="lg:col-span-1">
            <UpcomingMaturities summary={summary} />
          </div>
        </div>

        {/* Supporting insights */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RequestPipeline summary={summary} />
          <PortfolioDistribution summary={summary} />
        </div>

        {/* Exceptions and alerts */}
        {summary.exceptions.length > 0 && (
          <Exceptions exceptions={summary.exceptions} />
        )}

        {/* Recent activity */}
        <RecentActivity summary={summary} />
      </div>
    </PageContainer>
  );
}
