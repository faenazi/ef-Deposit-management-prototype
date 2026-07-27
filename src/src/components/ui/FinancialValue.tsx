import { cn } from '@/lib/cn'
import {
  formatCompactCurrency,
  formatCurrency,
  formatDate,
  formatNumber,
  formatPercent,
} from '@/lib/format'

type FinancialKind = 'currency' | 'currency-compact' | 'percent' | 'number' | 'date'

interface FinancialValueProps {
  value: number | string | Date
  kind?: FinancialKind
  className?: string
}

/**
 * The single component for rendering amounts, rates, and dates with the
 * central formatting rules (token plan §15): tabular numerals, Latin digits
 * (DEC-021), directionally-safe bidi isolation, currency kept with the value.
 */
export function FinancialValue({ value, kind = 'currency', className }: FinancialValueProps) {
  let text: string
  let title: string | undefined

  if (kind === 'date') {
    text = formatDate(value as string | Date)
  } else {
    const numeric = value as number
    switch (kind) {
      case 'currency':
        text = formatCurrency(numeric)
        break
      case 'currency-compact':
        text = formatCompactCurrency(numeric)
        // The full amount must remain available (04-typography.md §5).
        title = formatCurrency(numeric)
        break
      case 'percent':
        text = formatPercent(numeric)
        break
      default:
        text = formatNumber(numeric)
    }
  }

  return (
    <bdi className={cn('ef-financial', className)} title={title}>
      {text}
    </bdi>
  )
}
