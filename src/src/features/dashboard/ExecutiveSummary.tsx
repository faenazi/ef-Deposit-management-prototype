import type { ReactNode } from 'react'
import { CalendarClock, FileClock, TrendingUp, WalletCards } from 'lucide-react'

import { BrandPattern } from '@/components/brand/BrandPattern'
import { FinancialValue } from '@/components/ui/FinancialValue'
import { Icon } from '@/components/ui/Icon'
import { formatDate } from '@/lib/format'
import type { DashboardSummary } from '@/services/dashboard-service'

const summaryLabel: Record<DashboardSummary['roleId'], string> = {
  'deposit-specialist': 'السياق المالي الذي تحتاجه عند إعداد الطلبات وقرارات الاستحقاق.',
  'treasury-general-manager': 'قيمة المحفظة والعائد والطلبات المؤثرة على قرارات الخزينة.',
  'investment-treasury-executive': 'المؤشرات المالية الأعلى أثرًا على القرار التنفيذي.',
  'investment-support': 'القيم المرتبطة بالطلبات المنتقلة إلى المراجعة والدعم.',
  'finance-reviewer': 'الموقف المالي للطلبات الجارية قبل التنفيذ والتحويل.',
  'accounting-executor': 'القيم المرتبطة بعمليات التنفيذ والتفعيل المحاسبي.',
  'system-admin': 'مؤشرات المحفظة من بيانات بيئة العرض التجريبية.',
  'read-only-user': 'الموقف المالي للمحفظة دون إجراءات تشغيلية.',
}

export function ExecutiveSummary({ summary }: { summary: DashboardSummary }) {
  return (
    <section aria-labelledby="portfolio-summary-title">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3 md:mb-4">
        <div>
          <p className="text-small font-semibold text-action-primary">الموقف المالي</p>
          <h2
            id="portfolio-summary-title"
            className="mt-0.5 text-h3 font-bold tracking-[-0.015em] text-text-primary md:text-h2"
          >
            المحفظة في نظرة واحدة
          </h2>
          <p className="mt-1 max-w-3xl text-small leading-5 text-text-secondary md:text-body md:leading-6">
            {summaryLabel[summary.roleId]}
          </p>
        </div>
        <span className="text-[11px] font-medium text-text-secondary md:text-small">
          البيانات حتى {formatDate(summary.referenceDate)}
        </span>
      </div>

      <div className="relative grid grid-cols-2 overflow-hidden rounded-xl bg-surface-navy-soft text-white shadow-sm xl:grid-cols-[minmax(19rem,1.4fr)_repeat(4,minmax(0,1fr))]">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 z-[2] h-1 bg-success-border" />
        <BrandPattern
          asset="pattern-primary"
          placement="bottom-end"
          opacity="subtle"
          scale="corner"
          className="max-w-[12rem]"
        />

        <div className="relative z-[1] col-span-2 flex min-h-[138px] items-center border-b border-white/10 px-5 py-5 md:px-6 xl:col-span-1 xl:min-h-[166px] xl:border-b-0">
          <div className="min-w-0">
            <p className="text-small font-semibold text-white/65">أصل الودائع النشط</p>
            <p className="mt-2 whitespace-nowrap text-[30px] font-bold leading-10 tracking-[-0.035em] text-white md:text-[34px] xl:text-[30px] 2xl:text-[34px]">
              <FinancialValue value={summary.activeBanks.totalValue} kind="currency-compact" />
            </p>
            <p className="mt-1.5 text-small text-white/60">{summary.activeBanks.count} وديعة نشطة</p>
          </div>
        </div>

        <FinancialMetric
          icon={TrendingUp}
          label="متوسط العائد"
          value={<FinancialValue value={summary.weightedAverageReturn} kind="percent" />}
          context="للودائع النشطة"
          valueClassName="text-success-border"
        />
        <FinancialMetric
          icon={WalletCards}
          label="العائد المتوقع"
          value={<FinancialValue value={summary.totalExpectedReturn} kind="currency-compact" />}
          context="حتى نهاية مدد الودائع"
        />
        <FinancialMetric
          icon={FileClock}
          label="طلبات قيد الإجراء"
          value={summary.pendingRequests.count}
          context={<FinancialValue value={summary.pendingRequests.value} kind="currency-compact" />}
        />
        <FinancialMetric
          icon={CalendarClock}
          label="استحقاقات قريبة"
          value={summary.approachingMaturity.count}
          context={<FinancialValue value={summary.approachingMaturity.value} kind="currency-compact" />}
        />
      </div>
    </section>
  )
}

function FinancialMetric({
  icon,
  label,
  value,
  context,
  valueClassName,
}: {
  icon: Parameters<typeof Icon>[0]['icon']
  label: string
  value: ReactNode
  context: ReactNode
  valueClassName?: string
}) {
  return (
    <article className="relative z-[1] flex min-h-[106px] flex-col justify-center border-t border-white/10 px-4 py-4 odd:border-e xl:min-h-[166px] xl:border-s xl:border-t-0 xl:odd:border-e-0">
      <div className="flex items-center gap-2 text-white/55">
        <Icon icon={icon} size="xs" />
        <p className="text-[11px] font-medium leading-5 md:text-small">{label}</p>
      </div>
      <p className={`ef-financial mt-2 whitespace-nowrap text-[21px] font-bold leading-7 tracking-[-0.025em] text-white xl:text-[19px] 2xl:text-[22px] ${valueClassName ?? ''}`}>
        {value}
      </p>
      <p className="mt-1 line-clamp-1 text-[11px] leading-5 text-white/50">{context}</p>
    </article>
  )
}
