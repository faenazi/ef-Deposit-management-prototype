/**
 * The single prototype reference "today" (plan §11.2, PD-01). All seeded
 * timestamps and all derived date logic (maturity, overdue, aging, expiry)
 * use this constant — the system clock is never read during seed
 * generation. Changing this one constant shifts the demonstrated «اليوم».
 */
export const PROTOTYPE_REFERENCE_DATE = '2026-07-27T09:00:00+03:00'

/** Date-only form of the reference date. */
export const PROTOTYPE_REFERENCE_DAY = PROTOTYPE_REFERENCE_DATE.slice(0, 10)

/** Identifier year for `IR-2026-####` / `DEP-2026-####` formats (DEC-020). */
export const PROTOTYPE_YEAR = 2026
