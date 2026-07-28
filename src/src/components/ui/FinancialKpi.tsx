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
  emphasis?: 'primary' | 'supporting'
  className?: string
}

/** Purposeful KPI presentation — no walls of identical KPI cards. */
export function FinancialKpi({
  label,
  value,
  context,
  trend,
  emphasis = 'supporting',
  className,
}: FinancialKpiProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-small font-semibold text-text-secondary">{label}</span>
      <span
        className={cn(
          'font-bold tracking-[-0.025em] text-text-primary',
          emphasis === 'primary' ? 'text-[2rem] leading-[2.7rem] md:text-display' : 'text-h2',
        )}
      >
        {value}
      </span>
      {(context || trend) && (
        <span className="flex items-center gap-2 text-small text-text-secondary">
          {trend}
          {context}
        </span>
      )}
    </div>
  )
}
