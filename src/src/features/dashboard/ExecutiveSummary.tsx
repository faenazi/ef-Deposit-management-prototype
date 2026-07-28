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
      <div className="flex flex-wrap items-start justify-between gap-3 px-4 pb-3 pt-4 md:px-6 md:pb-4 md:pt-5">
        <div>
          <h2 id="portfolio-summary-title" className="text-h3 font-bold text-action-primary md:text-h2">
            ملخص المحفظة
          </h2>
          <p className="mt-1 hidden max-w-2xl text-small leading-5 text-text-secondary sm:block md:text-body md:leading-6">
            {summaryLabel[summary.roleId]}
          </p>
        </div>
        <span className="hidden rounded-full bg-canvas px-3 py-1.5 text-small font-medium text-text-secondary sm:inline-flex">
          آخر تحديث: {formatDate(summary.referenceDate)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 border-t border-divider-soft bg-surface-subtle/60 p-3 sm:gap-3 md:grid-cols-3 md:p-5 xl:grid-cols-[1.2fr_repeat(5,minmax(0,1fr))]">
        <SummaryMetric
          icon={Landmark}
          label="أصل الودائع النشط"
          value={<FinancialValue value={summary.activeBanks.totalValue} kind="currency-compact" />}
          context={`${summary.activeBanks.count} وديعة`}
          tone="primary"
          primary
        />
        <SummaryMetric
          icon={TrendingUp}
          label="العائد المرجّح"
          value={<FinancialValue value={summary.weightedAverageReturn} kind="percent" />}
          context="للمحفظة النشطة"
          tone="blue"
        />
        <SummaryMetric
          icon={WalletCards}
          label="العائد المتوقع"
          value={<FinancialValue value={summary.totalExpectedReturn} kind="currency-compact" />}
          context="حتى نهاية مدد الودائع"
          tone="success"
          wrapValue
        />
        <SummaryMetric
          icon={FileClock}
          label="قيد الإجراء"
          value={summary.pendingRequests.count}
          context={<FinancialValue value={summary.pendingRequests.value} kind="currency-compact" />}
          tone="neutral"
        />
        <SummaryMetric
          icon={CalendarClock}
          label="تستحق قريبًا"
          value={summary.approachingMaturity.count}
          context="خلال 14 يومًا"
          tone="warning"
        />
        <SummaryMetric
          icon={CircleAlert}
          label="تحتاج انتباهًا"
          value={attentionCount}
          context={`${summary.overdueTasks} متأخرة · ${summary.returnedRequests} معادة`}
          tone="danger"
          hideOnMobile
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
  primary = false,
  wrapValue = false,
  hideOnMobile = false,
}: {
  icon: Parameters<typeof Icon>[0]['icon']
  label: string
  value: ReactNode
  context: ReactNode
  tone: keyof typeof toneClass
  primary?: boolean
  wrapValue?: boolean
  hideOnMobile?: boolean
}) {
  return (
    <article
      className={[
        'group flex min-h-[90px] flex-col rounded-lg border border-divider-soft bg-surface p-2.5 transition-colors hover:border-border-strong',
        'md:min-h-[132px] md:p-4 xl:min-h-[144px]',
        primary ? 'col-span-2 min-h-[96px] border-action-primary/15 bg-surface-brand-muted md:col-span-1' : '',
        hideOnMobile ? 'hidden sm:flex' : '',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-small font-semibold leading-5 text-text-secondary">{label}</p>
        <span className={`flex size-6 shrink-0 items-center justify-center rounded-full md:size-9 ${toneClass[tone]}`}>
          <Icon icon={icon} size="sm" />
        </span>
      </div>
      <div className="mt-auto pt-1 md:pt-5">
        <p
          className={[
            'ef-financial font-bold tracking-[-0.025em] text-text-primary',
            primary ? 'text-[23px] leading-8 md:text-[25px]' : 'text-[20px] leading-7 md:text-[23px]',
            wrapValue ? 'max-w-full leading-6' : 'whitespace-nowrap',
          ].join(' ')}
        >
          {value}
        </p>
        <p className="mt-0.5 line-clamp-1 text-[11px] leading-5 text-text-muted md:mt-1">
          {context}
        </p>
      </div>
    </article>
  )
}
