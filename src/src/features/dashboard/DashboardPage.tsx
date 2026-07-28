import { useEffect, useState } from 'react'
import { FilePlus2 } from 'lucide-react'
import { Link } from 'react-router'

import { useUser } from '@/app/user-context'
import { Button } from '@/components/ui/Button'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import type { RoleCode } from '@/domain/roles'
import { PageContainer } from '@/layouts/PageContainer'
import { PageHeader } from '@/layouts/PageHeader'
import { fetchDashboardSummary, type DashboardSummary } from '@/services/dashboard-service'
import { Exceptions } from './Exceptions'
import { ExecutiveSummary } from './ExecutiveSummary'
import { PortfolioDistribution } from './PortfolioDistribution'
import { PriorityTasks } from './PriorityTasks'
import { RecentActivity } from './RecentActivity'
import { RequestPipeline } from './RequestPipeline'
import { UpcomingMaturities } from './UpcomingMaturities'

const roleContext: Record<RoleCode, string> = {
  'deposit-specialist':
    'ابدأ بما يتطلب استكمالًا اليوم، ثم راقب الطلبات قيد الإعداد والاستحقاقات القريبة.',
  'treasury-general-manager':
    'قرارات الاعتماد والتعرض البنكي والاستحقاقات القريبة مرتبة حسب أثرها المالي.',
  'investment-treasury-executive':
    'موجز تنفيذي للطلبات مرتفعة القيمة، وضع المحفظة، ومؤشرات التركّز والاستحقاق.',
  'investment-support':
    'المراجعات المسندة إليك ونواقص المستندات التي تعيق انتقال الطلبات إلى المالية.',
  'finance-reviewer':
    'الطلبات الجاهزة للمراجعة المالية والقيم المعلقة قبل تنفيذ التحويل.',
  'accounting-executor':
    'عمليات التحويل المطلوبة والأدلة المحاسبية التي يجب استكمالها قبل تفعيل الوديعة.',
  'system-admin':
    'موجز تشغيلي لبيانات العرض التجريبي وحالة الوصول إلى وحدات المنصة.',
  'read-only-user':
    'عرض موحد للوضع المالي وسير الطلبات دون صلاحيات تنفيذية.',
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5" aria-label="جارٍ تحميل لوحة المعلومات">
      <Skeleton className="h-64 rounded-lg" />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(19rem,0.8fr)]">
        <Skeleton className="h-80 rounded-lg" />
        <Skeleton className="h-80 rounded-lg" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Skeleton className="h-72 rounded-lg" />
        <Skeleton className="h-72 rounded-lg" />
      </div>
    </div>
  )
}

export function DashboardPage() {
  const { user, role, can } = useUser()
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    fetchDashboardSummary(role.code)
      .then((data) => {
        if (mounted) {
          setSummary(data)
          setError(null)
        }
      })
      .catch((reason: unknown) => {
        if (mounted) {
          setError(reason instanceof Error ? reason : new Error('تعذر تحميل بيانات لوحة المعلومات.'))
        }
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [role.code])

  return (
    <PageContainer>
      <PageHeader
        eyebrow={role.nameAr}
        title={`مرحبًا، ${user.nameAr.split(' ')[0]}`}
        description={roleContext[role.code]}
        primaryAction={
          can('requests.create') ? (
            <Link to="/investment-requests/new">
              <Button leadingIcon={FilePlus2}>إنشاء طلب استثمار</Button>
            </Link>
          ) : undefined
        }
      />

      {loading && <DashboardSkeleton />}

      {!loading && error && !summary && (
        <div className="rounded-lg border border-border-default bg-surface">
          <ErrorState
            title="تعذر تحميل لوحة المعلومات"
            description="لم نتمكن من استرجاع موجز المحفظة والمهام. أعد تحميل الصفحة للمحاولة مرة أخرى."
          />
        </div>
      )}

      {!loading && summary && (
        <div className="space-y-5">
          <ExecutiveSummary summary={summary} />

          {summary.exceptions.length > 0 && <Exceptions exceptions={summary.exceptions} />}

          {summary.roleId === 'investment-treasury-executive' ? (
            <>
              <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
                <PortfolioDistribution summary={summary} />
                <UpcomingMaturities summary={summary} />
              </div>
              <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
                <PriorityTasks summary={summary} />
                <RequestPipeline summary={summary} />
              </div>
            </>
          ) : summary.roleId === 'treasury-general-manager' ? (
            <>
              <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.75fr)]">
                <PriorityTasks summary={summary} />
                <PortfolioDistribution summary={summary} />
              </div>
              <div className="grid items-start gap-5 lg:grid-cols-2">
                <UpcomingMaturities summary={summary} />
                <RequestPipeline summary={summary} />
              </div>
            </>
          ) : (
            <>
              <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(20rem,0.7fr)]">
                <PriorityTasks summary={summary} />
                <UpcomingMaturities summary={summary} />
              </div>
              <div className="grid items-start gap-5 lg:grid-cols-2">
                <RequestPipeline summary={summary} />
                <PortfolioDistribution summary={summary} />
              </div>
            </>
          )}

          <RecentActivity summary={summary} />
        </div>
      )}
    </PageContainer>
  )
}
