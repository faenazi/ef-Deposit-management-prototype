/**
 * Reusable, framework-independent collection utilities: filtering, sorting,
 * pagination, and grouping used by mock services and later list pages.
 */

export type SortDirection = 'asc' | 'desc'

/** Stable sort by a selector without mutating the source array. */
export function sortBy<T>(
  items: readonly T[],
  selector: (item: T) => string | number,
  direction: SortDirection = 'asc',
): T[] {
  const factor = direction === 'asc' ? 1 : -1
  return [...items].sort((a, b) => {
    const av = selector(a)
    const bv = selector(b)
    if (av < bv) return -1 * factor
    if (av > bv) return 1 * factor
    return 0
  })
}

/** Groups items by a string key selector, preserving encounter order. */
export function groupBy<T, K extends string>(
  items: readonly T[],
  selector: (item: T) => K,
): Map<K, T[]> {
  const groups = new Map<K, T[]>()
  for (const item of items) {
    const key = selector(item)
    const bucket = groups.get(key)
    if (bucket === undefined) {
      groups.set(key, [item])
    } else {
      bucket.push(item)
    }
  }
  return groups
}

export interface Page<T> {
  readonly items: readonly T[]
  readonly totalCount: number
  readonly pageIndex: number
  readonly pageSize: number
  readonly pageCount: number
}

/** Slices one zero-based page out of a full result set. */
export function paginate<T>(items: readonly T[], pageIndex: number, pageSize: number): Page<T> {
  const safeSize = Math.max(1, pageSize)
  const pageCount = Math.max(1, Math.ceil(items.length / safeSize))
  const safeIndex = Math.min(Math.max(0, pageIndex), pageCount - 1)
  const start = safeIndex * safeSize
  return {
    items: items.slice(start, start + safeSize),
    totalCount: items.length,
    pageIndex: safeIndex,
    pageSize: safeSize,
    pageCount,
  }
}

/** Sums a numeric selector over a collection. */
export function sumBy<T>(items: readonly T[], selector: (item: T) => number): number {
  return items.reduce((total, item) => total + selector(item), 0)
}

/**
 * Normalizes Arabic text for tolerant search: strips diacritics/tatweel and
 * unifies alef, taa marbuta, and yaa variants before lower-casing.
 */
export function normalizeArabic(text: string): string {
  return text
    .replace(/[ً-ْـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .toLowerCase()
    .trim()
}

/** Case- and diacritic-insensitive substring match for Arabic/Latin search. */
export function matchesSearch(haystack: string, query: string): boolean {
  const normalizedQuery = normalizeArabic(query)
  if (normalizedQuery === '') {
    return true
  }
  return normalizeArabic(haystack).includes(normalizedQuery)
}
