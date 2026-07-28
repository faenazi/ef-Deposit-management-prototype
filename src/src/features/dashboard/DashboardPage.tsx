import { useEffect, useState } from 'react'
import { FilePlus2 } from 'lucide-react'
import { Link } from 'react-router'

import { useUser } from '@/app/user-context'
import { Button } from '@/components/ui/Button'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import type { RoleCode } from '@/domain/roles'
import { cn } from '@/lib/cn'
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
    'إليك ملخص محفظة الودائع والطلبات والمهام التي تتطلب إجراءك اليوم.',
  'treasury-general-manager':
    'راجع قرارات الاعتماد والتعرض البنكي والاستحقاقات مرتبة حسب أثرها المالي.',
  'investment-treasury-executive':
    'موجز تنفيذي للطلبات مرتفعة القيمة ووضع المحفظة وأهم مؤشرات التركّز والاستحقاق.',
  'investment-support':
    'المراجعات المسندة إليك ونواقص المستندات التي تعيق انتقال الطلبات إلى المالية.',
  'finance-reviewer':
    'الطلبات الجاهزة للمراجعة المالية والقيم المعلقة قبل تنفيذ التحويل.',
  'accounting-executor':
    'عمليات التحويل والأدلة المحاسبية التي يجب استكمالها قبل تفعيل الوديعة.',
  'system-admin':
    'موجز تشغيلي لبيانات العرض التجريبي وحالة الوصول إلى وحدات المنصة.',
  'read-only-user':
    'عرض موحد للوضع المالي وسير الطلبات دون صلاحيات تنفيذية.',
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-label="جارٍ تحميل لوحة المعلومات">
      <Skeleton className="h-[390px] rounded-xl" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.75fr)]">
        <Skeleton className="h-96 rounded-xl" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
      <Skeleton className="h-80 rounded-xl" />
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
    setLoading(true)

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
              <Button leadingIcon={FilePlus2}>طلب استثمار جديد</Button>
            </Link>
          ) : undefined
        }
      />

      {loading && <DashboardSkeleton />}

      {!loading && error && !summary && (
        <div className="rounded-xl border border-divider-soft bg-surface shadow-xs">
          <ErrorState
            title="تعذر تحميل لوحة المعلومات"
            description="لم نتمكن من استرجاع موجز المحفظة والمهام. أعد تحميل الصفحة للمحاولة مرة أخرى."
          />
        </div>
      )}

      {!loading && summary && (
        <div className="space-y-6">
          <ExecutiveSummary summary={summary} />

          <div
            className={cn(
              'grid items-start gap-6',
              summary.exceptions.length > 0 &&
                'lg:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.75fr)]',
            )}
          >
            <PriorityTasks summary={summary} />
            {summary.exceptions.length > 0 && <Exceptions exceptions={summary.exceptions} />}
          </div>

          <UpcomingMaturities summary={summary} />

          {(summary.roleId === 'investment-treasury-executive' ||
            summary.roleId === 'treasury-general-manager' ||
            summary.roleId === 'read-only-user') && (
            <div className="grid items-start gap-6 lg:grid-cols-2">
              <PortfolioDistribution summary={summary} />
              <RequestPipeline summary={summary} />
            </div>
          )}

          {summary.roleId !== 'investment-treasury-executive' && <RecentActivity summary={summary} />}
        </div>
      )}
    </PageContainer>
  )
}
