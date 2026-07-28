import {
  CalendarClock,
  CircleAlert,
  FileClock,
  Landmark,
  TrendingUp,
  WalletCards,
} from 'lucide-react'

import { FinancialValue } from '@/components/ui/FinancialValue'
import { Icon } from '@/components/ui/Icon'
import { formatDate } from '@/lib/format'
import type { DashboardSummary } from '@/services/dashboard-service'

const summaryLabel: Record<DashboardSummary['roleId'], string> = {
  'deposit-specialist': 'إحصائيات المحفظة والطلبات المرتبطة بعملك',
  'treasury-general-manager': 'الموقف المالي والقرارات المعلقة',
  'investment-treasury-executive': 'الموجز التنفيذي للمحفظة',
  'investment-support': 'المحفظة والمراجعات التشغيلية',
  'finance-reviewer': 'القيمة المالية قيد الإجراء',
  'accounting-executor': 'المحفظة وعمليات التنفيذ',
  'system-admin': 'ملخص بيانات المنصة التجريبية',
  'read-only-user': 'الموجز المالي للمحفظة',
}

export function ExecutiveSummary({ summary }: { summary: DashboardSummary }) {
  const attentionCount = summary.overdueTasks + summary.returnedRequests

  return (
    <section
      aria-labelledby="portfolio-summary-title"
      className="overflow-hidden rounded-xl border border-divider-soft bg-surface shadow-xs"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 px-5 pb-2 pt-5 md:px-6 md:pt-6">
        <div>
          <h2 id="portfolio-summary-title" className="text-h2 font-bold text-action-primary">
            إحصائيات الودائع والطلبات
          </h2>
          <p className="mt-1 text-body text-text-secondary">{summaryLabel[summary.roleId]}</p>
        </div>
        <p className="text-small text-text-muted">آخر تحديث: {formatDate(summary.referenceDate)}</p>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-2 md:px-6 md:pb-6 lg:grid-cols-3">
        <SummaryMetric
          icon={Landmark}
          label="إجمالي أصل الودائع النشطة"
          value={<FinancialValue value={summary.activeBanks.totalValue} kind="currency-compact" />}
          context={`${summary.activeBanks.count} وديعة نشطة`}
          tone="primary"
        />
        <SummaryMetric
          icon={WalletCards}
          label="عدد الودائع النشطة"
          value={summary.activeBanks.count}
          context="ضمن المحفظة الحالية"
          tone="blue"
        />
        <SummaryMetric
          icon={TrendingUp}
          label="متوسط العائد المرجّح"
          value={<FinancialValue value={summary.weightedAverageReturn} kind="percent" />}
          context={`عائد متوقع ${formatCompactInline(summary.totalExpectedReturn)}`}
          tone="success"
        />
        <SummaryMetric
          icon={FileClock}
          label="الطلبات تحت الإجراء"
          value={summary.pendingRequests.count}
          context={formatCompactInline(summary.pendingRequests.value)}
          tone="neutral"
        />
        <SummaryMetric
          icon={CalendarClock}
          label="استحقاقات قريبة"
          value={summary.approachingMaturity.count}
          context={formatCompactInline(summary.approachingMaturity.value)}
          tone="warning"
        />
        <SummaryMetric
          icon={CircleAlert}
          label="إجراءات تحتاج انتباهًا"
          value={attentionCount}
          context={`${summary.overdueTasks} متأخرة · ${summary.returnedRequests} معادة`}
          tone="danger"
        />
      </div>
    </section>
  )
}

const toneClass = {
  primary: 'bg-surface-brand-soft text-action-primary',
  blue: 'bg-info-bg text-info-text',
  success: 'bg-success-bg text-success-text',
  neutral: 'bg-canvas text-text-secondary',
  warning: 'bg-warning-bg text-warning-text',
  danger: 'bg-danger-bg text-danger-text',
}

function SummaryMetric({
  icon,
  label,
  value,
  context,
  tone,
}: {
  icon: Parameters<typeof Icon>[0]['icon']
  label: string
  value: React.ReactNode
  context: string
  tone: keyof typeof toneClass
}) {
  return (
    <article className="flex min-h-[126px] items-center justify-between gap-4 rounded-lg border border-divider-soft bg-surface px-5 py-4">
      <div className="min-w-0">
        <p className="text-body font-semibold text-text-secondary">{label}</p>
        <p className="ef-financial mt-2 text-[28px] font-bold leading-9 text-text-primary">{value}</p>
        <p className="mt-1 truncate text-small text-text-muted">{context}</p>
      </div>
      <span className={`flex size-12 shrink-0 items-center justify-center rounded-full ${toneClass[tone]}`}>
        <Icon icon={icon} size="lg" />
      </span>
    </article>
  )
}

function formatCompactInline(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SAR',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}
