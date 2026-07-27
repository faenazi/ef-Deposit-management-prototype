/**
 * Shared domain primitives and cross-entity controlled values.
 * Sources: docs/05-data/domain-and-mock-data-implementation-plan.md §3.19,
 * docs/05-data/domain-model.md (modeling rules).
 * Dates are stored as ISO strings and formatted only in presentation
 * utilities; financial values are stored as numbers, never formatted strings.
 */

/** ISO 8601 date string, e.g. `2026-07-27` or `2026-07-27T09:00:00+03:00`. */
export type IsoDateString = string

/** Bilingual display labels for one controlled value. */
export interface ValueLabels {
  readonly ar: string
  readonly en: string
}

/** Polymorphic link target for tasks, attachments, notes, activities, notifications. */
export const entityTypes = ['INVESTMENT_REQUEST', 'DEPOSIT', 'BANK', 'USER', 'SYSTEM'] as const
export type EntityType = (typeof entityTypes)[number]

export const entityTypeLabels: Record<EntityType, ValueLabels> = {
  INVESTMENT_REQUEST: { ar: 'طلب استثمار', en: 'Investment request' },
  DEPOSIT: { ar: 'وديعة', en: 'Deposit' },
  BANK: { ar: 'بنك', en: 'Bank' },
  USER: { ar: 'مستخدم', en: 'User' },
  SYSTEM: { ar: 'النظام', en: 'System' },
}

/** SAR is the baseline prototype currency (mock-data-requirements.md). */
export const currencies = ['SAR'] as const
export type Currency = (typeof currencies)[number]

export const currencyLabels: Record<Currency, ValueLabels> = {
  SAR: { ar: 'ريال سعودي', en: 'Saudi Riyal' },
}

export const tenorUnits = ['MONTHS', 'DAYS'] as const
export type TenorUnit = (typeof tenorUnits)[number]

export const tenorUnitLabels: Record<TenorUnit, ValueLabels> = {
  MONTHS: { ar: 'شهر', en: 'Months' },
  DAYS: { ar: 'يوم', en: 'Days' },
}

/** RFQ communication channels (plan PD-04, bank-rfq.md). */
export const communicationChannels = ['EMAIL', 'OFFICIAL_LETTER', 'PHONE'] as const
export type CommunicationChannel = (typeof communicationChannels)[number]

export const communicationChannelLabels: Record<CommunicationChannel, ValueLabels> = {
  EMAIL: { ar: 'بريد إلكتروني', en: 'Email' },
  OFFICIAL_LETTER: { ar: 'خطاب رسمي', en: 'Official letter' },
  PHONE: { ar: 'هاتف', en: 'Phone' },
}

/** Bank risk classification — reference data only (domain-model.md `riskCategory`). */
export const bankRiskCategories = ['LOW', 'MEDIUM', 'HIGH'] as const
export type BankRiskCategory = (typeof bankRiskCategories)[number]

export const bankRiskCategoryLabels: Record<BankRiskCategory, ValueLabels> = {
  LOW: { ar: 'منخفض', en: 'Low' },
  MEDIUM: { ar: 'متوسط', en: 'Medium' },
  HIGH: { ar: 'مرتفع', en: 'High' },
}
