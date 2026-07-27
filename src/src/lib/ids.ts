/**
 * Deterministic identifier composition (DEC-020): stable, zero-padded,
 * Latin-digit identifiers shared by seeded fixtures and runtime creation.
 * Display labels are never used as IDs.
 */

/** `formatSequentialId('IR', 2026, 18)` → `IR-2026-0018`. */
export function formatSequentialId(
  prefix: string,
  year: number,
  sequence: number,
  width = 4,
): string {
  return `${prefix}-${year}-${String(sequence).padStart(width, '0')}`
}

/** Extracts the numeric sequence from a `PREFIX-YYYY-####` identifier. */
export function parseSequence(id: string): number {
  const match = /-(\d+)$/.exec(id)
  return match?.[1] === undefined ? 0 : Number(match[1])
}

/**
 * Monotonic ID allocator used by the in-memory store for records created at
 * runtime — continues after the highest seeded sequence so new IDs never
 * collide with deterministic fixtures.
 */
export function createIdAllocator(prefix: string, year: number, startAfter: number, width = 4) {
  let current = startAfter
  return (): string => {
    current += 1
    return formatSequentialId(prefix, year, current, width)
  }
}
