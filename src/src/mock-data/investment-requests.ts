import type { InvestmentRequestStatus } from '@/domain/investment-request'
import type { ApprovalStage } from '@/domain/approval'
import type { TaskPriority } from '@/domain/task'
import { formatSequentialId } from '@/lib/ids'
import { PROTOTYPE_YEAR } from '@/mock-data/reference-date'
import { depositSeedSpecs, depositValueDate } from '@/mock-data/deposits'
import { diffCalendarDays } from '@/lib/dates'
import { PROTOTYPE_REFERENCE_DAY } from '@/mock-data/reference-date'

/**
 * The 55 request seed specs (plan §11.4, PD-05):
 * `IR-2026-0001`…`IR-2026-0030` — the documented 30-request distribution
 * (5 drafts, 3 returned, 4 pending GM, 3 pending executive, 3 pending
 * winning bank, 3 pending Investment Support, 3 pending Finance,
 * 2 pending accounting, 2 pending activation, 1 cancelled, 1 rejected),
 * including every scenario-pinned record of demo-scenarios.md;
 * `IR-2026-0031`…`IR-2026-0055` — the 25 historical requests already
 * converted into deposits `DEP-2026-0001`…`0025` (gap G-04).
 */

/** Curated draft readiness gaps (scenario fixtures). */
export type DraftGap =
  | 'EARLY_STAGE'
  | 'MISSING_LIQUIDITY_EVIDENCE'
  | 'OFFER_VALIDITY_MISSING'
  | 'NO_EVALUATIONS'
  | 'NO_RECOMMENDATION'
  | 'NOT_CONFIRMED'

/** Curated offer override for scenario-critical comparisons. */
export interface CuratedOfferSpec {
  readonly bankId: string
  readonly annualRate: number
  /** Offer without a validity date → INCOMPLETE (scenario 1). */
  readonly missingValidity?: boolean
  /** Restrictive special conditions (scenario 5 Bank C). */
  readonly restrictiveConditions?: boolean
}

export interface RequestSeedSpec {
  readonly sequence: number
  readonly status: InvestmentRequestStatus
  readonly amount: number
  readonly tenorMonths: number
  readonly createdByUserId: string
  readonly priority: TaskPriority
  readonly titleAr: string
  /** Days before the reference date the request was created. */
  readonly createdDaysAgo: number
  /** Days since the current stage was entered (drives SLA/urgency mix). */
  readonly stageAgeDays: number
  /** Bank of the recommended/winning offer. */
  readonly recommendedBankId: string
  /** Total invited banks (≥3 for submitted requests). */
  readonly invitedBankCount: number
  readonly draftGaps?: readonly DraftGap[]
  readonly curatedOffers?: readonly CuratedOfferSpec[]
  /** A recorded return cycle (current or resolved). */
  readonly returnEvent?: {
    readonly fromStage: ApprovalStage
    readonly reasonAr: string
    /** True when the request was resubmitted after the return. */
    readonly resolved: boolean
  }
  readonly rejectionReasonAr?: string
  readonly cancellationReasonAr?: string
  /** Reinvestment origin (R-17). */
  readonly sourceDepositSequence?: number
  /** Converted requests only: the created deposit. */
  readonly depositSequence?: number
}

export function requestId(sequence: number): string {
  return formatSequentialId('IR', PROTOTYPE_YEAR, sequence)
}

const M = 1_000_000
const DS1 = 'USR-DS-001'
const DS2 = 'USR-DS-002'
const DS3 = 'USR-DS-003'
const DS4 = 'USR-DS-004'
const DS5 = 'USR-DS-005'

/** The 30 in-flight/terminal requests (documented distribution). */
const inFlightSpecs: readonly RequestSeedSpec[] = [
  {
    sequence: 1,
    status: 'PENDING_WINNING_BANK_COMPLETION',
    amount: 100 * M,
    tenorMonths: 6,
    createdByUserId: DS2,
    priority: 'HIGH',
    titleAr: 'وديعة لأجل — فائض السيولة التشغيلية (حد الاعتماد)',
    createdDaysAgo: 18,
    stageAgeDays: 1,
    recommendedBankId: 'BNK-002',
    invitedBankCount: 4,
  },
  {
    sequence: 2,
    status: 'DRAFT',
    amount: 35 * M,
    tenorMonths: 3,
    createdByUserId: DS3,
    priority: 'LOW',
    titleAr: 'وديعة قصيرة الأجل من فائض التحصيل',
    createdDaysAgo: 4,
    stageAgeDays: 4,
    recommendedBankId: 'BNK-005',
    invitedBankCount: 2,
    draftGaps: ['EARLY_STAGE'],
  },
  {
    sequence: 3,
    status: 'RETURNED_FOR_COMPLETION',
    amount: 95 * M,
    tenorMonths: 6,
    createdByUserId: DS1,
    priority: 'MEDIUM',
    titleAr: 'استثمار فائض السيولة — النصف الثاني 2026',
    createdDaysAgo: 16,
    stageAgeDays: 2,
    recommendedBankId: 'BNK-004',
    invitedBankCount: 4,
    returnEvent: {
      fromStage: 'TREASURY_GM_APPROVAL',
      reasonAr:
        'يرجى تحديث تحليل السيولة ليعكس آخر أرصدة الحسابات التشغيلية قبل إعادة الإرسال.',
      resolved: false,
    },
  },
  {
    sequence: 4,
    status: 'PENDING_ACCOUNTING_EXECUTION',
    amount: 90 * M,
    tenorMonths: 6,
    createdByUserId: DS1,
    priority: 'CRITICAL',
    titleAr: 'وديعة لأجل — تنفيذ التحويل المحاسبي',
    createdDaysAgo: 24,
    stageAgeDays: 2,
    recommendedBankId: 'BNK-006',
    invitedBankCount: 4,
  },
  {
    sequence: 5,
    status: 'PENDING_TREASURY_GM_APPROVAL',
    amount: 45 * M,
    tenorMonths: 3,
    createdByUserId: DS4,
    priority: 'MEDIUM',
    titleAr: 'وديعة لأجل من الفائض النقدي الربعي',
    createdDaysAgo: 9,
    stageAgeDays: 4,
    recommendedBankId: 'BNK-007',
    invitedBankCount: 3,
  },
  {
    sequence: 6,
    status: 'PENDING_INVESTMENT_SUPPORT_REVIEW',
    amount: 70 * M,
    tenorMonths: 6,
    createdByUserId: DS1,
    priority: 'HIGH',
    titleAr: 'وديعة استثمارية — مراجعة دعم الاستثمار',
    createdDaysAgo: 20,
    stageAgeDays: 1,
    recommendedBankId: 'BNK-005',
    invitedBankCount: 4,
  },
  {
    sequence: 7,
    status: 'PENDING_EXECUTIVE_APPROVAL',
    amount: 150 * M,
    tenorMonths: 9,
    createdByUserId: DS2,
    priority: 'HIGH',
    titleAr: 'توظيف سيولة المحفظة النقدية — مسار تنفيذي',
    createdDaysAgo: 12,
    stageAgeDays: 1,
    recommendedBankId: 'BNK-002',
    invitedBankCount: 5,
  },
  {
    sequence: 8,
    status: 'PENDING_FINANCE_REVIEW',
    amount: 55 * M,
    tenorMonths: 3,
    createdByUserId: DS3,
    priority: 'MEDIUM',
    titleAr: 'وديعة قصيرة الأجل — مراجعة الإدارة المالية',
    createdDaysAgo: 21,
    stageAgeDays: 1,
    recommendedBankId: 'BNK-004',
    invitedBankCount: 3,
  },
  {
    sequence: 9,
    status: 'DRAFT',
    amount: 60 * M,
    tenorMonths: 6,
    createdByUserId: DS1,
    priority: 'MEDIUM',
    titleAr: 'مقارنة عروض تتجاوز أعلى معدل — وديعة 6 أشهر',
    createdDaysAgo: 6,
    stageAgeDays: 6,
    recommendedBankId: 'BNK-008',
    invitedBankCount: 3,
    draftGaps: ['NO_RECOMMENDATION', 'NOT_CONFIRMED'],
    curatedOffers: [
      { bankId: 'BNK-001', annualRate: 5.6 },
      { bankId: 'BNK-008', annualRate: 5.45 },
      { bankId: 'BNK-005', annualRate: 5.1, restrictiveConditions: true },
    ],
  },
  {
    sequence: 10,
    status: 'PENDING_DEPOSIT_ACTIVATION',
    amount: 110 * M,
    tenorMonths: 9,
    createdByUserId: DS4,
    priority: 'HIGH',
    titleAr: 'وديعة لأجل — بانتظار تفعيل البنك',
    createdDaysAgo: 30,
    stageAgeDays: 1,
    recommendedBankId: 'BNK-003',
    invitedBankCount: 4,
  },
  {
    sequence: 11,
    status: 'PENDING_TREASURY_GM_APPROVAL',
    amount: 85 * M,
    tenorMonths: 6,
    createdByUserId: DS1,
    priority: 'MEDIUM',
    titleAr: 'وديعة لأجل — توصية بمعدل أقل من الأعلى',
    createdDaysAgo: 8,
    stageAgeDays: 2,
    recommendedBankId: 'BNK-008',
    invitedBankCount: 3,
  },
  {
    sequence: 12,
    status: 'PENDING_WINNING_BANK_COMPLETION',
    amount: 120 * M,
    tenorMonths: 12,
    createdByUserId: DS5,
    priority: 'HIGH',
    titleAr: 'وديعة طويلة الأجل — استكمال بيانات البنك الفائز',
    createdDaysAgo: 22,
    stageAgeDays: 3,
    recommendedBankId: 'BNK-001',
    invitedBankCount: 5,
  },
  {
    sequence: 13,
    status: 'PENDING_INVESTMENT_SUPPORT_REVIEW',
    amount: 40 * M,
    tenorMonths: 2,
    createdByUserId: DS2,
    priority: 'MEDIUM',
    titleAr: 'وديعة شهرين من فائض التشغيل',
    createdDaysAgo: 15,
    stageAgeDays: 2,
    recommendedBankId: 'BNK-006',
    invitedBankCount: 3,
  },
  {
    sequence: 14,
    status: 'DRAFT',
    amount: 60 * M,
    tenorMonths: 6,
    createdByUserId: DS1,
    priority: 'MEDIUM',
    titleAr: 'إعادة استثمار وديعة مستحقة — مصرف الواحة',
    createdDaysAgo: 5,
    stageAgeDays: 5,
    recommendedBankId: 'BNK-002',
    invitedBankCount: 3,
    draftGaps: ['NO_RECOMMENDATION', 'NOT_CONFIRMED'],
    sourceDepositSequence: 2,
  },
  {
    sequence: 15,
    status: 'CANCELLED',
    amount: 25 * M,
    tenorMonths: 3,
    createdByUserId: DS3,
    priority: 'LOW',
    titleAr: 'وديعة قصيرة الأجل — أُلغيت بعد تحديث خطة السيولة',
    createdDaysAgo: 28,
    stageAgeDays: 10,
    recommendedBankId: 'BNK-007',
    invitedBankCount: 3,
    returnEvent: {
      fromStage: 'TREASURY_GM_APPROVAL',
      reasonAr: 'مذكرة التقييم لا توضح أثر التركز البنكي بشكل كافٍ؛ يرجى استكمالها.',
      resolved: false,
    },
    cancellationReasonAr:
      'إلغاء الطلب بناءً على تحديث خطة السيولة وانخفاض الفائض القابل للاستثمار.',
  },
  {
    sequence: 16,
    status: 'RETURNED_FOR_COMPLETION',
    amount: 130 * M,
    tenorMonths: 6,
    createdByUserId: DS4,
    priority: 'HIGH',
    titleAr: 'وديعة لأجل فوق حد الاعتماد — معاد للاستكمال',
    createdDaysAgo: 14,
    stageAgeDays: 3,
    recommendedBankId: 'BNK-003',
    invitedBankCount: 4,
    returnEvent: {
      fromStage: 'TREASURY_GM_APPROVAL',
      reasonAr:
        'مبررات اختيار البنك الموصى به غير كافية مقارنة بالعرض الأعلى عائدًا؛ يرجى استكمال التحليل وإعادة الإرسال.',
      resolved: false,
    },
  },
  {
    sequence: 17,
    status: 'PENDING_FINANCE_REVIEW',
    amount: 75 * M,
    tenorMonths: 6,
    createdByUserId: DS5,
    priority: 'HIGH',
    titleAr: 'وديعة لأجل — أعيدت من المالية واستُكملت',
    createdDaysAgo: 26,
    stageAgeDays: 2,
    recommendedBankId: 'BNK-002',
    invitedBankCount: 4,
    returnEvent: {
      fromStage: 'FINANCE_REVIEW',
      reasonAr:
        'بيانات المستفيد غير مطابقة لشهادة الآيبان المرفقة؛ يرجى التحقق وإعادة الإحالة.',
      resolved: true,
    },
  },
  {
    sequence: 18,
    status: 'DRAFT',
    amount: 80 * M,
    tenorMonths: 6,
    createdByUserId: DS1,
    priority: 'HIGH',
    titleAr: 'استثمار فائض السيولة التشغيلية — 80 مليون ريال',
    createdDaysAgo: 7,
    stageAgeDays: 7,
    recommendedBankId: 'BNK-002',
    invitedBankCount: 3,
    draftGaps: [
      'MISSING_LIQUIDITY_EVIDENCE',
      'OFFER_VALIDITY_MISSING',
      'NO_RECOMMENDATION',
      'NOT_CONFIRMED',
    ],
    curatedOffers: [
      { bankId: 'BNK-002', annualRate: 5.3 },
      { bankId: 'BNK-006', annualRate: 5.2, missingValidity: true },
      { bankId: 'BNK-004', annualRate: 5.05 },
    ],
  },
  {
    sequence: 19,
    status: 'PENDING_EXECUTIVE_APPROVAL',
    amount: 250 * M,
    tenorMonths: 12,
    createdByUserId: DS2,
    priority: 'CRITICAL',
    titleAr: 'وديعة استراتيجية طويلة الأجل — 250 مليون ريال',
    createdDaysAgo: 13,
    stageAgeDays: 3,
    recommendedBankId: 'BNK-001',
    invitedBankCount: 5,
  },
  {
    sequence: 20,
    status: 'REJECTED',
    amount: 65 * M,
    tenorMonths: 9,
    createdByUserId: DS3,
    priority: 'MEDIUM',
    titleAr: 'وديعة لأجل — مرفوضة لاعتبارات التركز',
    createdDaysAgo: 32,
    stageAgeDays: 20,
    recommendedBankId: 'BNK-009',
    invitedBankCount: 3,
    rejectionReasonAr:
      'رفض الطلب لارتفاع التعرض الحالي على البنك الموصى به وتجاوز الحدود الاسترشادية للتركز.',
  },
  {
    sequence: 21,
    status: 'PENDING_EXECUTIVE_APPROVAL',
    amount: 180 * M,
    tenorMonths: 9,
    createdByUserId: DS1,
    priority: 'HIGH',
    titleAr: 'وديعة لأجل — 180 مليون ريال (اعتماد تنفيذي)',
    createdDaysAgo: 11,
    stageAgeDays: 1,
    recommendedBankId: 'BNK-004',
    invitedBankCount: 5,
  },
  {
    sequence: 22,
    status: 'PENDING_TREASURY_GM_APPROVAL',
    amount: 90 * M,
    tenorMonths: 6,
    createdByUserId: DS2,
    priority: 'MEDIUM',
    titleAr: 'إعادة استثمار وديعة مصرف الفيحاء المستحقة',
    createdDaysAgo: 10,
    stageAgeDays: 1,
    recommendedBankId: 'BNK-005',
    invitedBankCount: 3,
    sourceDepositSequence: 6,
  },
  {
    sequence: 23,
    status: 'PENDING_ACCOUNTING_EXECUTION',
    amount: 160 * M,
    tenorMonths: 9,
    createdByUserId: DS5,
    priority: 'HIGH',
    titleAr: 'وديعة لأجل فوق حد الاعتماد — قيد التنفيذ',
    createdDaysAgo: 27,
    stageAgeDays: 1,
    recommendedBankId: 'BNK-003',
    invitedBankCount: 5,
  },
  {
    sequence: 24,
    status: 'PENDING_WINNING_BANK_COMPLETION',
    amount: 50 * M,
    tenorMonths: 3,
    createdByUserId: DS3,
    priority: 'MEDIUM',
    titleAr: 'وديعة ثلاثة أشهر — استكمال بيانات التحويل',
    createdDaysAgo: 17,
    stageAgeDays: 2,
    recommendedBankId: 'BNK-007',
    invitedBankCount: 3,
  },
  {
    sequence: 25,
    status: 'RETURNED_FOR_COMPLETION',
    amount: 205 * M,
    tenorMonths: 12,
    createdByUserId: DS2,
    priority: 'HIGH',
    titleAr: 'وديعة طويلة الأجل — معادة من الاعتماد التنفيذي',
    createdDaysAgo: 19,
    stageAgeDays: 2,
    recommendedBankId: 'BNK-001',
    invitedBankCount: 5,
    returnEvent: {
      fromStage: 'EXECUTIVE_APPROVAL',
      reasonAr:
        'يرجى تعزيز مبررات التوصية بتحليل أثر التركز على مستوى المحفظة قبل إعادة العرض عبر مسار الخزينة.',
      resolved: false,
    },
  },
  {
    sequence: 26,
    status: 'PENDING_FINANCE_REVIEW',
    amount: 140 * M,
    tenorMonths: 6,
    createdByUserId: DS4,
    priority: 'HIGH',
    titleAr: 'وديعة لأجل — مراجعة مالية لمبلغ فوق الحد',
    createdDaysAgo: 23,
    stageAgeDays: 3,
    recommendedBankId: 'BNK-002',
    invitedBankCount: 4,
  },
  {
    sequence: 27,
    status: 'DRAFT',
    amount: 100 * M,
    tenorMonths: 3,
    createdByUserId: DS1,
    priority: 'MEDIUM',
    titleAr: 'إعادة استثمار وديعة بنك السدرة قرب الاستحقاق',
    createdDaysAgo: 3,
    stageAgeDays: 3,
    recommendedBankId: 'BNK-003',
    invitedBankCount: 3,
    draftGaps: ['NO_EVALUATIONS', 'NO_RECOMMENDATION', 'NOT_CONFIRMED'],
    sourceDepositSequence: 21,
  },
  {
    sequence: 28,
    status: 'PENDING_INVESTMENT_SUPPORT_REVIEW',
    amount: 30 * M,
    tenorMonths: 2,
    createdByUserId: DS4,
    priority: 'LOW',
    titleAr: 'وديعة شهرين — تحقق دعم الاستثمار',
    createdDaysAgo: 12,
    stageAgeDays: 1,
    recommendedBankId: 'BNK-008',
    invitedBankCount: 3,
  },
  {
    sequence: 29,
    status: 'PENDING_TREASURY_GM_APPROVAL',
    amount: 100 * M,
    tenorMonths: 6,
    createdByUserId: DS5,
    priority: 'MEDIUM',
    titleAr: 'وديعة بمبلغ حد الاعتماد — مسار قصير',
    createdDaysAgo: 6,
    stageAgeDays: 0,
    recommendedBankId: 'BNK-006',
    invitedBankCount: 4,
  },
  {
    sequence: 30,
    status: 'PENDING_DEPOSIT_ACTIVATION',
    amount: 85 * M,
    tenorMonths: 6,
    createdByUserId: DS2,
    priority: 'HIGH',
    titleAr: 'وديعة لأجل — تأكيد تفعيل الوديعة',
    createdDaysAgo: 29,
    stageAgeDays: 2,
    recommendedBankId: 'BNK-004',
    invitedBankCount: 4,
  },
]

/** Specialists rotate ownership of the historical converted requests. */
const historicalOwners = [DS1, DS2, DS3, DS4, DS5] as const

/** The 25 converted source requests, derived from the deposit seed table. */
const convertedSpecs: readonly RequestSeedSpec[] = depositSeedSpecs.map((deposit, index) => {
  const sequence = 30 + deposit.sequence
  const valueDate = depositValueDate(deposit)
  // Created ~25 days before the deposit value date (chain built backwards).
  const createdDaysAgo = diffCalendarDays(valueDate, PROTOTYPE_REFERENCE_DAY) + 25
  return {
    sequence,
    status: 'CONVERTED_TO_ACTIVE_DEPOSIT',
    amount: deposit.amount,
    tenorMonths: deposit.tenorMonths,
    createdByUserId: historicalOwners[index % historicalOwners.length] ?? DS1,
    priority: deposit.amount > 100 * M ? 'HIGH' : 'MEDIUM',
    titleAr: `وديعة لأجل ${deposit.tenorMonths} أشهر — ${requestId(sequence)}`,
    createdDaysAgo,
    stageAgeDays: 0,
    recommendedBankId: deposit.bankId,
    invitedBankCount: 3 + (deposit.sequence % 2),
    depositSequence: deposit.sequence,
  }
})

export const requestSeedSpecs: readonly RequestSeedSpec[] = [
  ...inFlightSpecs,
  ...convertedSpecs,
]
