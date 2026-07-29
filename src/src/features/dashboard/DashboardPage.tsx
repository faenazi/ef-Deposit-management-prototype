import { useEffect, useState } from 'react'
import { CalendarDays, FilePlus2 } from 'lucide-react'
import { Link } from 'react-router'

import { useUser } from '@/app/user-context'
import { BrandPattern } from '@/components/brand/BrandPattern'
import { Button } from '@/components/ui/Button'
import { ErrorState } from '@/components/ui/ErrorState'
import { Icon } from '@/components/ui/Icon'
import { Skeleton } from '@/components/ui/Skeleton'
import type { RoleCode } from '@/domain/roles'
import { formatDate } from '@/lib/format'
import { PageContainer } from '@/layouts/PageContainer'
import { fetchDashboardSummary, type DashboardSummary } from '@/services/dashboard-service'
import { Exceptions } from './Exceptions'
import { ExecutiveSummary } from './ExecutiveSummary'
import { PortfolioDistribution } from './PortfolioDistribution'
import { PriorityTasks } from './PriorityTasks'
import { RecentActivity } from './RecentActivity'
import { RequestPipeline } from './RequestPipeline'
import { UpcomingMaturities } from './UpcomingMaturities'

const roleContext: Record<RoleCode, { title: string; description: string }> = {
  'deposit-specialist': {
    title: 'ابدأ بالمهام ذات الأولوية',
    description: 'راجع الطلبات المعادة، استكمل المسودات، وجهّز قرارات الودائع القريبة من الاستحقاق.',
  },
  'treasury-general-manager': {
    title: 'راجع القرارات ذات الأثر المالي',
    description: 'تابع الاعتمادات المعلقة، توزيع التعرض البنكي، والاستحقاقات حسب قيمتها وموعدها.',
  },
  'investment-treasury-executive': {
    title: 'موجز تنفيذي للقرارات الرئيسية',
    description: 'ركز على الطلبات مرتفعة القيمة، مؤشرات التركّز، والاستحقاقات التي تتطلب توجيهًا تنفيذيًا.',
  },
  'investment-support': {
    title: 'استكمل مراجعات دعم الاستثمار',
    description: 'تحقق من التوصيات والمرفقات التي تمنع انتقال الطلبات إلى المراجعة المالية.',
  },
  'finance-reviewer': {
    title: 'راجع الجاهزية المالية للتنفيذ',
    description: 'تحقق من القيم والتحويلات والمتطلبات المالية قبل انتقال المعاملة للتنفيذ المحاسبي.',
  },
  'accounting-executor': {
    title: 'استكمل عمليات التنفيذ المحاسبي',
    description: 'تابع التحويلات والإثباتات اللازمة لتفعيل الودائع وإقفال المعاملات.',
  },
  'system-admin': {
    title: 'تابع جاهزية المنصة التجريبية',
    description: 'استعرض الوصول والأدوار ومسارات العرض دون تنفيذ قرارات مالية نيابة عن المستخدمين.',
  },
  'read-only-user': {
    title: 'نظرة موحدة على المحفظة',
    description: 'استعرض الموقف المالي وسير الطلبات دون ظهور أي إجراءات إنشاء أو اعتماد أو تنفيذ.',
  },
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
      <Skeleton className="h-36 rounded-xl" />
      <Skeleton className="h-[260px] rounded-xl" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.75fr)]">
        <Skeleton className="h-96 rounded-xl" />
        <Skeleton className="h-96 rounded-xl" />
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

  const dashboardPending = !error && (loading || summary?.roleId !== role.code)

  return (
    <PageContainer width="wide">
      <DashboardContext
        role={role.code}
        roleName={role.nameAr}
        firstName={user.nameAr.split(' ')[0]}
        canCreate={can('requests.create')}
      />

      {dashboardPending && <DashboardSkeleton />}

      {!dashboardPending && error && summary?.roleId !== role.code && (
        <div className="rounded-xl border border-divider-soft bg-surface shadow-xs">
          <ErrorState
            title="تعذر تحميل لوحة المعلومات"
            description="لم نتمكن من استرجاع موجز المحفظة والمهام. أعد تحميل الصفحة للمحاولة مرة أخرى."
          />
        </div>
      )}

      {!dashboardPending && summary && <DashboardContent summary={summary} />}
    </PageContainer>
  )
}

function DashboardContext({
  role,
  roleName,
  firstName,
  canCreate,
}: {
  role: RoleCode
  roleName: string
  firstName: string
  canCreate: boolean
}) {
  const context = roleContext[role]
  const today = new Date()

  return (
    <section className="relative mb-5 overflow-hidden rounded-xl bg-surface-brand-muted px-4 py-4 md:mb-7 md:px-7 md:py-5">
      <BrandPattern
        asset="pattern-secondary"
        placement="bottom-end"
        opacity="subtle"
        scale="corner"
        className="max-w-[10rem]"
      />
      <div className="relative z-[1] grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center md:gap-8">
        <div className="min-w-0">
          <p className="text-small font-semibold text-action-primary">{roleName} · مساحة العمل اليومية</p>
          <h1 className="mt-0.5 text-[24px] font-bold leading-9 tracking-[-0.02em] text-text-primary md:text-[30px] md:leading-10">
            مرحبًا، {firstName}
          </h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-text-secondary">
            <span className="font-semibold text-text-primary">{context.title}</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-border-strong" />
            <span className="inline-flex items-center gap-1.5 text-small font-medium text-text-secondary">
              <Icon icon={CalendarDays} size="xs" />
              {formatDate(today)}
            </span>
          </div>
          <p className="mt-2 max-w-4xl text-small leading-5 text-text-secondary md:text-body md:leading-6">
            {context.description}
          </p>
        </div>

        {canCreate && (
          <Link to="/investment-requests/new" className="relative z-[1] w-full shrink-0 sm:w-auto">
            <Button leadingIcon={FilePlus2} className="w-full sm:min-w-48">
              إنشاء طلب استثمار
            </Button>
          </Link>
        )}
      </div>
    </section>
  )
}

const operationalFirstRoles = new Set<RoleCode>([
  'deposit-specialist',
  'investment-support',
  'finance-reviewer',
  'accounting-executor',
  'system-admin',
])

function DashboardContent({ summary }: { summary: DashboardSummary }) {
  const showTasks = summary.roleId !== 'read-only-user'
  const showMaturities = maturityRoles.has(summary.roleId)
  const showPortfolio = portfolioRoles.has(summary.roleId)
  const showRecentActivity = summary.roleId !== 'investment-treasury-executive'
  const hasExceptions = summary.exceptions.length > 0
  const operationalFirst = operationalFirstRoles.has(summary.roleId)

  return (
    <div className="space-y-5 md:space-y-7">
      {operationalFirst && showTasks && <WorkFocus summary={summary} />}

      <ExecutiveSummary summary={summary} />

      {!operationalFirst && showTasks && <WorkFocus summary={summary} />}

      {!showTasks && hasExceptions && <Exceptions summary={summary} />}

      {showMaturities && <UpcomingMaturities summary={summary} />}

      {showPortfolio ? (
        <>
          <div className="grid items-start gap-4 md:gap-6 xl:grid-cols-2">
            <PortfolioDistribution summary={summary} />
            <RequestPipeline summary={summary} />
          </div>
          {showRecentActivity && <RecentActivity summary={summary} />}
        </>
      ) : (
        <div className="grid items-start gap-4 md:gap-6 xl:grid-cols-2">
          <RequestPipeline summary={summary} />
          {showRecentActivity && <RecentActivity summary={summary} />}
        </div>
      )}
    </div>
  )
}

function WorkFocus({ summary }: { summary: DashboardSummary }) {
  return (
    <section aria-label="أولويات العمل" className="grid items-start gap-4 md:gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(19rem,0.72fr)]">
      <PriorityTasks summary={summary} className="order-2 xl:order-none" />
      <Exceptions summary={summary} className="order-1 xl:order-none" />
    </section>
  )
}
