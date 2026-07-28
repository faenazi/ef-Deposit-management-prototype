import { useEffect, useState } from 'react'
import { FilePlus2 } from 'lucide-react'
import { Link } from 'react-router'

import { useUser } from '@/app/user-context'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import type { RoleCode } from '@/domain/roles'
import { cn } from '@/lib/cn'
import { PageContainer } from '@/layouts/PageContainer'
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
    'ابدأ بالمهام ذات الأولوية، ثم راجع الطلبات المعادة والاستحقاقات التي تحتاج تجهيز قرار.',
  'treasury-general-manager':
    'راجع الاعتمادات المعلقة والتعرض البنكي والاستحقاقات حسب أثرها المالي وموعدها.',
  'investment-treasury-executive':
    'ركز على القرارات مرتفعة القيمة ومؤشرات التركّز والاستحقاقات ذات الأثر التنفيذي.',
  'investment-support':
    'راجع التوصيات والمستندات الناقصة التي تمنع انتقال الطلبات إلى المرحلة المالية.',
  'finance-reviewer':
    'تابع الطلبات الجاهزة للمراجعة المالية والقيم المعلقة قبل تنفيذ التحويل.',
  'accounting-executor':
    'تابع عمليات التحويل والإثباتات المحاسبية المطلوبة قبل تفعيل الوديعة.',
  'system-admin':
    'استعرض بيانات المنصة التجريبية ومسارات العمل دون اتخاذ قرارات مالية نيابة عن المستخدمين.',
  'read-only-user':
    'استعرض الموقف المالي وسير الطلبات دون ظهور إجراءات إنشاء أو اعتماد أو تنفيذ.',
}

const maturityRoles = new Set<RoleCode>([
  'deposit-specialist',
  'treasury-general-manager',
  'investment-treasury-executive',
  'read-only-user',
])

const portfolioRoles = new Set<RoleCode>([
  'treasury-general-manager',
  'investment-treasury-executive',
  'read-only-user',
])

function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-label="جارٍ تحميل لوحة المعلومات">
      <Skeleton className="h-[330px] rounded-xl" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.75fr)]">
        <Skeleton className="h-96 rounded-xl" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
      <Skeleton className="h-72 rounded-xl" />
    </div>
  )
}

export function DashboardPage() {
  const { role, can } = useUser()
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
      <div className="mb-6 flex flex-col gap-4 border-b border-divider-soft pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">{role.nameAr}</Badge>
            <span className="text-small font-medium text-text-muted">ملخص العمل اليومي</span>
          </div>
          <p className="mt-2 max-w-3xl text-body leading-6 text-text-secondary">
            {roleContext[role.code]}
          </p>
        </div>

        {can('requests.create') && (
          <Link to="/investment-requests/new" className="shrink-0">
            <Button leadingIcon={FilePlus2}>طلب استثمار جديد</Button>
          </Link>
        )}
      </div>

      {loading && <DashboardSkeleton />}

      {!loading && error && !summary && (
        <div className="rounded-xl border border-divider-soft bg-surface shadow-xs">
          <ErrorState
            title="تعذر تحميل لوحة المعلومات"
            description="لم نتمكن من استرجاع موجز المحفظة والمهام. أعد تحميل الصفحة للمحاولة مرة أخرى."
          />
        </div>
      )}

      {!loading && summary && <DashboardContent summary={summary} />}
    </PageContainer>
  )
}

function DashboardContent({ summary }: { summary: DashboardSummary }) {
  const showTasks = summary.roleId !== 'read-only-user'
  const showMaturities = maturityRoles.has(summary.roleId)
  const showPortfolio = portfolioRoles.has(summary.roleId)
  const showRecentActivity = summary.roleId !== 'investment-treasury-executive'
  const hasExceptions = summary.exceptions.length > 0

  return (
    <div className="space-y-6">
      <ExecutiveSummary summary={summary} />

      {showTasks ? (
        <div
          className={cn(
            'grid items-start gap-6',
            hasExceptions && 'lg:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.75fr)]',
          )}
        >
          <PriorityTasks summary={summary} />
          {hasExceptions && <Exceptions exceptions={summary.exceptions} />}
        </div>
      ) : (
        hasExceptions && <Exceptions exceptions={summary.exceptions} />
      )}

      {showMaturities && <UpcomingMaturities summary={summary} />}

      {showPortfolio ? (
        <>
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <PortfolioDistribution summary={summary} />
            <RequestPipeline summary={summary} />
          </div>
          {showRecentActivity && <RecentActivity summary={summary} />}
        </>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <RequestPipeline summary={summary} />
          {showRecentActivity && <RecentActivity summary={summary} />}
        </div>
      )}
    </div>
  )
}
