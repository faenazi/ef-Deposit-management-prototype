import type { ReactNode } from 'react'
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
  'deposit-specialist': 'مؤشرات المحفظة والطلبات المرتبطة بعملك اليوم.',
  'treasury-general-manager': 'الموقف المالي والقرارات التي تحتاج متابعة الإدارة العامة للخزينة.',
  'investment-treasury-executive': 'موجز تنفيذي لقيمة المحفظة والعائد والاستحقاقات ذات الأثر المالي.',
  'investment-support': 'ملخص مالي للطلبات والمراجعات التشغيلية المرتبطة بدورك.',
  'finance-reviewer': 'القيم المالية للطلبات الجارية وما ينتظر المراجعة والتنفيذ.',
  'accounting-executor': 'ملخص المحفظة والعمليات التي وصلت إلى مرحلة التنفيذ المحاسبي.',
  'system-admin': 'مؤشرات عامة من بيانات المنصة التجريبية دون صلاحيات قرار مالي.',
  'read-only-user': 'عرض مختصر للموقف المالي دون إجراءات تنفيذية.',
}

export function ExecutiveSummary({ summary }: { summary: DashboardSummary }) {
  const attentionCount = summary.overdueTasks + summary.returnedRequests

  return (
    <section
      aria-labelledby="portfolio-summary-title"
      className="overflow-hidden rounded-xl border border-divider-soft bg-surface shadow-xs"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 px-5 pb-4 pt-5 md:px-6 md:pt-6">
        <div>
          <h2 id="portfolio-summary-title" className="text-h2 font-bold text-action-primary">
            ملخص المحفظة
          </h2>
          <p className="mt-1.5 max-w-2xl text-body leading-6 text-text-secondary">
            {summaryLabel[summary.roleId]}
          </p>
        </div>
        <span className="rounded-full bg-canvas px-3 py-1.5 text-small font-medium text-text-secondary">
          آخر تحديث: {formatDate(summary.referenceDate)}
        </span>
      </div>

      <div className="grid gap-3 border-t border-divider-soft bg-surface-subtle/60 p-4 sm:grid-cols-2 md:p-5 lg:grid-cols-3 xl:grid-cols-6">
        <SummaryMetric
          icon={Landmark}
          label="إجمالي الودائع"
          value={<FinancialValue value={summary.activeBanks.totalValue} kind="currency-compact" />}
          context={`${summary.activeBanks.count} وديعة نشطة`}
          tone="primary"
        />
        <SummaryMetric
          icon={TrendingUp}
          label="متوسط العائد المرجّح"
          value={<FinancialValue value={summary.weightedAverageReturn} kind="percent" />}
          context="للـودائع النشطة"
          tone="blue"
        />
        <SummaryMetric
          icon={WalletCards}
          label="العائد المتوقع"
          value={<FinancialValue value={summary.totalExpectedReturn} kind="currency-compact" />}
          context="حتى نهاية مدد الودائع"
          tone="success"
        />
        <SummaryMetric
          icon={FileClock}
          label="طلبات تحت الإجراء"
          value={summary.pendingRequests.count}
          context={<FinancialValue value={summary.pendingRequests.value} kind="currency-compact" />}
          tone="neutral"
        />
        <SummaryMetric
          icon={CalendarClock}
          label="استحقاقات قريبة"
          value={summary.approachingMaturity.count}
          context="خلال 14 يومًا"
          tone="warning"
        />
        <SummaryMetric
          icon={CircleAlert}
          label="تنبيهات عاجلة"
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
  value: ReactNode
  context: ReactNode
  tone: keyof typeof toneClass
}) {
  return (
    <article className="group flex min-h-[150px] flex-col rounded-lg border border-divider-soft bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-small font-semibold leading-5 text-text-secondary">{label}</p>
        <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${toneClass[tone]}`}>
          <Icon icon={icon} size="sm" />
        </span>
      </div>
      <div className="mt-auto pt-5">
        <p className="ef-financial text-[26px] font-bold leading-8 tracking-[-0.025em] text-text-primary">
          {value}
        </p>
        <p className="mt-1.5 truncate text-small text-text-muted">{context}</p>
      </div>
    </article>
  )
}
