/*
 * Central number, currency, percentage, and date formatting
 * (04-typography.md §5, token plan §6, DEC-021).
 *
 * DEC-021: financial values, rates, percentages, dates, identifiers, and
 * tabular data use Latin digits (0-9) by default. Any future switch to
 * Arabic-Indic digits is a locale change here and requires a new owner
 * decision.
 */

const NUMBER_LOCALE = 'ar-SA-u-nu-latn'
const DATE_LOCALE = 'ar-SA-u-nu-latn-ca-gregory'

export const CURRENCY_LABEL = 'ر.س'

const integerFormat = new Intl.NumberFormat(NUMBER_LOCALE, {
  maximumFractionDigits: 0,
})

const decimalFormat = new Intl.NumberFormat(NUMBER_LOCALE, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const dateFormat = new Intl.DateTimeFormat(DATE_LOCALE, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

/** `125000000` → `"125,000,000"` */
export function formatNumber(value: number): string {
  return integerFormat.format(value)
}

/** `125000000` → `"125,000,000 ر.س"` — currency always kept with the value. */
export function formatCurrency(value: number): string {
  return `${integerFormat.format(value)} ${CURRENCY_LABEL}`
}

/**
 * Compact KPI form: `125000000` → `"125 مليون ر.س"`.
 * The full amount must remain available in a tooltip or detail view
 * (04-typography.md §5).
 */
export function formatCompactCurrency(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1_000_000_000) {
    return `${trimZeros(value / 1_000_000_000)} مليار ${CURRENCY_LABEL}`
  }
  if (abs >= 1_000_000) {
    return `${trimZeros(value / 1_000_000)} مليون ${CURRENCY_LABEL}`
  }
  if (abs >= 1_000) {
    return `${trimZeros(value / 1_000)} ألف ${CURRENCY_LABEL}`
  }
  return formatCurrency(value)
}

/** `5.35` → `"5.35%"` — two decimals for offers and yields (token plan §6). */
export function formatPercent(value: number): string {
  return `${decimalFormat.format(value)}%`
}

/** `"2026-12-31"` or Date → `"31 ديسمبر 2026"` (Gregorian, Latin digits). */
export function formatDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value
  return dateFormat.format(date)
}

/** `12` → `"12 شهرًا"` — tenor label used across offers and deposits. */
export function formatTenorMonths(months: number): string {
  return `${integerFormat.format(months)} شهرًا`
}

/** `90` → `"90 يومًا"` */
export function formatDays(days: number): string {
  return `${integerFormat.format(days)} يومًا`
}

function trimZeros(value: number): string {
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded)
    ? integerFormat.format(rounded)
    : new Intl.NumberFormat(NUMBER_LOCALE, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(rounded)
}
