import type { ReactNode } from 'react'
import {
  ArrowUpLeft,
  CalendarClock,
  CircleAlert,
  FileClock,
  Landmark,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router'

import { FinancialValue } from '@/components/ui/FinancialValue'
import { Icon } from '@/components/ui/Icon'
import { formatDate } from '@/lib/format'
import type { DashboardSummary } from '@/services/dashboard-service'

const summaryLabel: Record<DashboardSummary['roleId'], string> = {
  'deposit-specialist': 'ملخص المحفظة والطلبات المرتبطة بعملك اليوم.',
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
      <div className="flex flex-wrap items-start justify-between gap-4 px-5 pb-3 pt-5 md:px-6 md:pt-6">
        <div>
          <h2 id="portfolio-summary-title" className="text-h2 font-bold text-action-primary">
            الموقف المالي اليوم
          </h2>
          <p className="mt-1.5 max-w-2xl text-body leading-6 text-text-secondary">
            {summaryLabel[summary.roleId]}
          </p>
        </div>
        <span className="rounded-full bg-canvas px-3 py-1.5 text-small font-medium text-text-secondary">
          آخر تحديث: {formatDate(summary.referenceDate)}
        </span>
      </div>

      <div className="grid gap-4 px-5 pb-5 md:px-6 md:pb-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Link
          to="/deposits"
          aria-label="عرض محفظة الودائع"
          className="group flex min-h-[248px] flex-col justify-between rounded-lg border border-divider-soft bg-surface-brand-muted p-5 transition-colors hover:border-border-strong md:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="flex size-11 items-center justify-center rounded-full bg-surface text-action-primary shadow-xs">
              <Icon icon={Landmark} size="lg" />
            </span>
            <span className="inline-flex items-center gap-1 text-small font-semibold text-action-primary">
              عرض المحفظة
              <Icon icon={ArrowUpLeft} size="xs" mirrorInRtl />
            </span>
          </div>

          <div className="mt-6">
            <p className="text-body font-semibold text-text-secondary">إجمالي أصل الودائع النشطة</p>
            <p className="ef-financial mt-2 text-[38px] font-bold leading-[1.2] tracking-[-0.035em] text-text-primary md:text-[44px]">
              <FinancialValue value={summary.activeBanks.totalValue} kind="currency-compact" />
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border-default pt-4">
            <div>
              <p className="text-small text-text-muted">الودائع النشطة</p>
              <p className="ef-financial mt-1 text-h3 font-bold text-text-primary">
                {summary.activeBanks.count}
              </p>
            </div>
            <div>
              <p className="text-small text-text-muted">متوسط العائد المرجّح</p>
              <p className="ef-financial mt-1 text-h3 font-bold text-text-primary">
                <FinancialValue value={summary.weightedAverageReturn} kind="percent" />
              </p>
            </div>
          </div>
        </Link>

        <div className="grid gap-3 sm:grid-cols-2">
          <SummaryMetric
            icon={TrendingUp}
            label="العائد المتوقع"
            value={<FinancialValue value={summary.totalExpectedReturn} kind="currency-compact" />}
            context="العائد المتوقع من الودائع النشطة"
            tone="success"
          />
          <SummaryMetric
            icon={FileClock}
            label="الطلبات تحت الإجراء"
            value={summary.pendingRequests.count}
            context={<FinancialValue value={summary.pendingRequests.value} kind="currency-compact" />}
            tone="primary"
          />
          <SummaryMetric
            icon={CalendarClock}
            label="استحقاقات خلال 14 يومًا"
            value={summary.approachingMaturity.count}
            context={<FinancialValue value={summary.approachingMaturity.value} kind="currency-compact" />}
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
      </div>
    </section>
  )
}

const toneClass = {
  primary: 'bg-surface-brand-soft text-action-primary',
  success: 'bg-success-bg text-success-text',
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
    <article className="flex min-h-[118px] flex-col justify-between rounded-lg border border-divider-soft bg-surface px-4 py-4 md:px-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-body font-semibold leading-5 text-text-secondary">{label}</p>
        <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${toneClass[tone]}`}>
          <Icon icon={icon} size="sm" />
        </span>
      </div>
      <div className="mt-4">
        <p className="ef-financial text-[26px] font-bold leading-8 text-text-primary">{value}</p>
        <p className="mt-1 truncate text-small text-text-muted">{context}</p>
      </div>
    </article>
  )
}
