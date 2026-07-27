/**
 * Pure ISO-date math helpers. Domain rules and mock-data generation use
 * these instead of reading the system clock — the prototype "today" is
 * always the configured reference date (DEC-019, mock-data Date Strategy).
 *
 * All calendar arithmetic normalizes to the date portion (UTC midnight) so
 * timezone offsets in stored timestamps never shift day differences.
 */

const DAY_MS = 24 * 60 * 60 * 1000

/** `2026-07-27T09:00:00+03:00` → `2026-07-27`. */
export function isoDatePart(iso: string): string {
  return iso.slice(0, 10)
}

function toUtcMidnight(iso: string): number {
  const [year, month, day] = isoDatePart(iso).split('-').map(Number)
  return Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1)
}

/** Calendar days from `from` to `to` (positive when `to` is later). */
export function diffCalendarDays(from: string, to: string): number {
  return Math.round((toUtcMidnight(to) - toUtcMidnight(from)) / DAY_MS)
}

/** Adds calendar days to an ISO date and returns a date-only ISO string. */
export function addDays(iso: string, days: number): string {
  const date = new Date(toUtcMidnight(iso) + days * DAY_MS)
  return date.toISOString().slice(0, 10)
}

/** Adds calendar months, clamping the day into the target month. */
export function addMonths(iso: string, months: number): string {
  const [year, month, day] = isoDatePart(iso).split('-').map(Number)
  const base = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1 + months, 1))
  const daysInTarget = new Date(
    Date.UTC(base.getUTCFullYear(), base.getUTCMonth() + 1, 0),
  ).getUTCDate()
  base.setUTCDate(Math.min(day ?? 1, daysInTarget))
  return base.toISOString().slice(0, 10)
}

/**
 * Saudi business-day arithmetic: the weekend is Friday and Saturday.
 * Used for stage SLAs (DEC-017 #4).
 */
export function isBusinessDay(iso: string): boolean {
  const weekday = new Date(toUtcMidnight(iso)).getUTCDay()
  return weekday !== 5 && weekday !== 6
}

/** Adds N business days (Sun–Thu), skipping Friday and Saturday. */
export function addBusinessDays(iso: string, businessDays: number): string {
  let current = isoDatePart(iso)
  let remaining = businessDays
  while (remaining > 0) {
    current = addDays(current, 1)
    if (isBusinessDay(current)) {
      remaining -= 1
    }
  }
  return current
}

/** Business days elapsed from `from` to `to` (0 when `to` ≤ `from`). */
export function diffBusinessDays(from: string, to: string): number {
  let count = 0
  let current = isoDatePart(from)
  const target = isoDatePart(to)
  while (current < target) {
    current = addDays(current, 1)
    if (isBusinessDay(current)) {
      count += 1
    }
  }
  return count
}

/** True when both ISO strings fall on the same calendar day. */
export function isSameCalendarDay(a: string, b: string): boolean {
  return isoDatePart(a) === isoDatePart(b)
}
