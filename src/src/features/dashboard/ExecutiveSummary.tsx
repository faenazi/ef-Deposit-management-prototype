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
  'deposit-specialist': 'المركز المالي للمحفظة وما يرتبط بعملك من طلبات واستحقاقات.',
  'treasury-general-manager': 'الموقف المالي والقرارات التي تحتاج متابعة الإدارة العامة للخزينة.',
  'investment-treasury-executive': 'قيمة المحفظة والعائد والاستحقاقات ذات الأثر المالي الأعلى.',
  'investment-support': 'القيم المالية للطلبات والمراجعات التشغيلية المرتبطة بدورك.',
  'finance-reviewer': 'القيم المالية للطلبات الجارية وما ينتظر المراجعة والتنفيذ.',
  'accounting-executor': 'المحفظة والعمليات التي وصلت إلى مرحلة التنفيذ المحاسبي.',
  'system-admin': 'مؤشرات عامة من بيانات المنصة التجريبية دون صلاحيات قرار مالي.',
  'read-only-user': 'عرض مختصر للموقف المالي دون إجراءات تنفيذية.',
}

export function ExecutiveSummary({ summary }: { summary: DashboardSummary }) {
  const attentionCount = summary.overdueTasks + summary.returnedRequests

  return (
    <section aria-labelledby="portfolio-summary-title">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3 md:mb-4">
        <div>
          <p className="text-small font-semibold text-action-primary">المركز المالي</p>
          <h2
            id="portfolio-summary-title"
            className="mt-0.5 text-h3 font-bold tracking-[-0.015em] text-text-primary md:text-h2"
          >
            ملخص المحفظة
          </h2>
          <p className="mt-1 hidden max-w-3xl text-small leading-5 text-text-secondary sm:block md:text-body md:leading-6">
            {summaryLabel[summary.roleId]}
          </p>
        </div>
        <span className="inline-flex min-h-8 items-center rounded-full border border-border-default bg-surface px-3 text-[11px] font-medium text-text-secondary md:text-small">
          محدّث {formatDate(summary.referenceDate)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3 xl:grid-cols-12">
        <PrimaryPortfolioMetric summary={summary} />
        <SupportingMetric
          icon={WalletCards}
          label="العائد المتوقع"
          value={<FinancialValue value={summary.totalExpectedReturn} kind="currency-compact" />}
          context="حتى نهاية مدد الودائع"
          tone="success"
        />
        <SupportingMetric
          icon={FileClock}
          label="طلبات قيد الإجراء"
          value={summary.pendingRequests.count}
          context={<FinancialValue value={summary.pendingRequests.value} kind="currency-compact" />}
          tone="neutral"
        />
        <SupportingMetric
          icon={CalendarClock}
          label="استحقاقات قريبة"
          value={summary.approachingMaturity.count}
          context="خلال 14 يومًا"
          tone="warning"
        />
        <SupportingMetric
          icon={CircleAlert}
          label="تحتاج متابعة"
          value={attentionCount}
          context={`${summary.overdueTasks} متأخرة · ${summary.returnedRequests} معادة`}
          tone="danger"
        />
      </div>
    </section>
  )
}

function PrimaryPortfolioMetric({ summary }: { summary: DashboardSummary }) {
  return (
    <article className="col-span-2 flex min-h-[132px] flex-col overflow-hidden rounded-xl bg-action-primary p-3.5 text-white shadow-sm md:col-span-4 md:grid md:min-h-[140px] md:grid-cols-[minmax(0,1fr)_14rem] md:items-stretch md:gap-6 md:p-5 xl:col-span-4 xl:flex xl:min-h-[156px] xl:flex-col xl:gap-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-small font-semibold text-white/75">أصل الودائع النشط</p>
          <p className="mt-1.5 whitespace-nowrap text-[28px] font-bold leading-9 tracking-[-0.03em] text-white md:mt-2 md:text-[34px] md:leading-10 xl:text-[30px] 2xl:text-[34px]">
            <FinancialValue value={summary.activeBanks.totalValue} kind="currency-compact" />
          </p>
          <p className="mt-1 text-small text-white/65">{summary.activeBanks.count} وديعة نشطة</p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white md:size-11">
          <Icon icon={Landmark} size="md" />
        </span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/15 pt-2.5 md:mt-0 md:items-center md:border-s md:border-t-0 md:ps-6 md:pt-0 xl:mt-auto xl:items-end xl:border-s-0 xl:border-t xl:ps-0 xl:pt-3">
        <div>
          <p className="text-[11px] font-medium text-white/60 md:text-small">العائد المرجّح</p>
          <p className="mt-0.5 text-[22px] font-bold leading-7 tracking-[-0.02em] text-white">
            <FinancialValue value={summary.weightedAverageReturn} kind="percent" />
          </p>
        </div>
        <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/90 md:size-9">
          <Icon icon={TrendingUp} size="sm" />
        </span>
      </div>
    </article>
  )
}

const toneClass = {
  success: 'bg-success-bg text-success-text',
  neutral: 'bg-canvas text-text-secondary',
  warning: 'bg-warning-bg text-warning-text',
  danger: 'bg-danger-bg text-danger-text',
}

function SupportingMetric({
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
    <article className="col-span-1 flex min-h-[102px] flex-col rounded-lg border border-divider-soft bg-surface p-2.5 shadow-xs md:min-h-[126px] md:p-3.5 xl:col-span-2 xl:min-h-[156px] xl:p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold leading-5 text-text-secondary sm:text-small">{label}</p>
        <span className={`flex size-6 shrink-0 items-center justify-center rounded-full md:size-8 xl:size-9 ${toneClass[tone]}`}>
          <Icon icon={icon} size="sm" />
        </span>
      </div>
      <div className="mt-auto pt-2">
        <p className="ef-financial whitespace-nowrap text-[19px] font-bold leading-7 tracking-[-0.025em] text-text-primary sm:text-[20px] md:text-[21px] xl:text-[17px] min-[1400px]:text-[19px] min-[1700px]:text-[22px]">
          {value}
        </p>
        <p className="mt-1 line-clamp-1 text-[11px] leading-5 text-text-muted">{context}</p>
      </div>
    </article>
  )
}
