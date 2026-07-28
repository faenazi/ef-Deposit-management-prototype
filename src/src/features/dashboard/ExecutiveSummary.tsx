import { ArrowUpLeft, CalendarClock, CircleAlert, Landmark } from 'lucide-react'
import { Link } from 'react-router'

import { BrandPattern } from '@/components/brand/BrandPattern'
import { FinancialValue } from '@/components/ui/FinancialValue'
import { Icon } from '@/components/ui/Icon'
import { formatDate } from '@/lib/format'
import type { DashboardSummary } from '@/services/dashboard-service'

const summaryLabel: Record<DashboardSummary['roleId'], string> = {
  'deposit-specialist': 'وضع المحفظة أثناء عملك اليوم',
  'treasury-general-manager': 'الموقف المالي والقرارات المعلقة',
  'investment-treasury-executive': 'الموجز التنفيذي للمحفظة',
  'investment-support': 'المحفظة المرتبطة بالمراجعات التشغيلية',
  'finance-reviewer': 'القيمة المالية قيد الإجراء',
  'accounting-executor': 'المحفظة وعمليات التنفيذ',
  'system-admin': 'ملخص بيانات المنصة',
  'read-only-user': 'الموجز المالي',
}

export function ExecutiveSummary({ summary }: { summary: DashboardSummary }) {
  return (
    <section
      aria-labelledby="portfolio-summary-title"
      className="relative overflow-hidden rounded-lg bg-sidebar-surface text-white shadow-shell"
    >
      <BrandPattern
        asset="pattern-primary"
        placement="bottom-end"
        opacity="soft"
        scale="hero"
        className="max-w-[24rem]"
      />

      <div className="relative grid gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(28rem,0.85fr)] lg:p-8">
        <div>
          <div className="flex items-center gap-2 text-small font-semibold text-sidebar-text">
            <Icon icon={Landmark} size="sm" />
            {summaryLabel[summary.roleId]}
          </div>
          <h2 id="portfolio-summary-title" className="mt-4 text-small font-medium text-sidebar-text">
            إجمالي أصل الودائع النشطة
          </h2>
          <p className="ef-financial mt-1 text-[2.25rem] font-bold leading-[1.35] tracking-[-0.035em] sm:text-[2.75rem]">
            <FinancialValue value={summary.activeBanks.totalValue} kind="currency-compact" />
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-sidebar-text">
            <span>{summary.activeBanks.count} وديعة نشطة</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-sidebar-text" />
            <span>
              كما في <FinancialValue value={summary.referenceDate} kind="date" />
            </span>
          </div>
          <Link
            to="/deposits"
            className="mt-6 inline-flex items-center gap-2 text-body font-semibold text-white underline-offset-4 hover:underline"
          >
            عرض محفظة الودائع
            <Icon icon={ArrowUpLeft} size="sm" mirrorInRtl />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-sidebar-border bg-sidebar-border">
          <SummaryMetric
            label="متوسط العائد المرجّح"
            value={<FinancialValue value={summary.weightedAverageReturn} kind="percent" />}
          />
          <SummaryMetric
            label="العائد المتوقع"
            value={<FinancialValue value={summary.totalExpectedReturn} kind="currency-compact" />}
          />
          <SummaryMetric
            label="قيمة الطلبات الجارية"
            value={<FinancialValue value={summary.pendingRequests.value} kind="currency-compact" />}
            context={`${summary.pendingRequests.count} طلبًا`}
          />
          <SummaryMetric
            label="استحقاقات قريبة"
            value={<FinancialValue value={summary.approachingMaturity.value} kind="currency-compact" />}
            context={`${summary.approachingMaturity.count} وديعة`}
          />
        </div>
      </div>

      {(summary.overdueTasks > 0 || summary.returnedRequests > 0) && (
        <div className="relative flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-sidebar-border px-5 py-3 text-small sm:px-7 lg:px-8">
          {summary.overdueTasks > 0 && (
            <span className="inline-flex items-center gap-2 text-white">
              <Icon icon={CircleAlert} size="sm" />
              {summary.overdueTasks} مهام متأخرة تتطلب إجراء
            </span>
          )}
          {summary.returnedRequests > 0 && (
            <span className="inline-flex items-center gap-2 text-sidebar-text">
              <Icon icon={CalendarClock} size="sm" />
              {summary.returnedRequests} طلبات معادة للاستكمال
            </span>
          )}
          <span className="ms-auto hidden text-sidebar-text md:inline">
            آخر تحديث: {formatDate(summary.referenceDate)}
          </span>
        </div>
      )}
    </section>
  )
}

function SummaryMetric({
  label,
  value,
  context,
}: {
  label: string
  value: React.ReactNode
  context?: string
}) {
  return (
    <div className="min-w-0 bg-surface-navy-soft p-4 sm:p-5">
      <p className="text-small font-medium text-sidebar-text">{label}</p>
      <p className="ef-financial mt-2 break-words text-h3 font-bold text-white sm:text-h2">{value}</p>
      {context && <p className="mt-1 text-small text-sidebar-text">{context}</p>}
    </div>
  )
}
