import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface FinancialKpiProps {
  label: string
  /** Usually a <FinancialValue>; the number is visually dominant (00-shared §8). */
  value: ReactNode
  /** Comparison or supporting context — required for business meaning. */
  context?: string
  /** Optional restrained trend/status element (never color-only). */
  trend?: ReactNode
  className?: string
}

/** Purposeful KPI presentation — no walls of identical KPI cards. */
export function FinancialKpi({ label, value, context, trend, className }: FinancialKpiProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-small font-medium text-text-secondary">{label}</span>
      <span className="text-h2 font-bold text-text-primary">{value}</span>
      {(context || trend) && (
        <span className="flex items-center gap-2 text-small text-text-secondary">
          {trend}
          {context}
        </span>
      )}
    </div>
  )
}
