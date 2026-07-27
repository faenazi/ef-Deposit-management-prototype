import type { Note } from '@/domain/audit'
import type { RoleCode } from '@/domain/roles'
import type { EntityType } from '@/domain/common'
import type { SectionKey } from '@/domain/investment-request'

/**
 * Curated notes on scenario-critical requests and deposits (plan §4.25).
 * Append-only annotations — never a substitute for mandatory return reasons.
 */

interface NoteSeed {
  readonly entityType: EntityType
  readonly entityId: string
  readonly authorUserId: string
  readonly authorRoleId: RoleCode
  readonly body: string
  readonly daysBeforeReference: number
  readonly sectionKey?: SectionKey
}

const noteSeeds: readonly NoteSeed[] = [
  {
    entityType: 'INVESTMENT_REQUEST',
    entityId: 'IR-2026-0018',
    authorUserId: 'USR-DS-001',
    authorRoleId: 'deposit-specialist',
    body: 'بانتظار نسخة تحليل السيولة المحدثة من إدارة التخطيط المالي قبل الإرفاق.',
    daysBeforeReference: 2,
    sectionKey: 'liquidity',
  },
  {
    entityType: 'INVESTMENT_REQUEST',
    entityId: 'IR-2026-0018',
    authorUserId: 'USR-DS-001',
    authorRoleId: 'deposit-specialist',
    body: 'تمت مخاطبة مصرف الواحة لتأكيد مدة سريان العرض المحدث.',
    daysBeforeReference: 1,
    sectionKey: 'bank-offers',
  },
  {
    entityType: 'INVESTMENT_REQUEST',
    entityId: 'IR-2026-0009',
    authorUserId: 'USR-DS-001',
    authorRoleId: 'deposit-specialist',
    body: 'يُراعى عند التوصية أثر التعرض المرتفع الحالي على بنك النخيل الوطني رغم أعلى معدل.',
    daysBeforeReference: 2,
    sectionKey: 'evaluation-recommendation',
  },
  {
    entityType: 'INVESTMENT_REQUEST',
    entityId: 'IR-2026-0011',
    authorUserId: 'USR-GMT-001',
    authorRoleId: 'treasury-general-manager',
    body: 'مبررات اختيار البنك الأقل معدلًا تحتاج إلى تحليل أوضح قبل اتخاذ القرار.',
    daysBeforeReference: 1,
    sectionKey: 'evaluation-recommendation',
  },
  {
    entityType: 'INVESTMENT_REQUEST',
    entityId: 'IR-2026-0006',
    authorUserId: 'USR-IS-001',
    authorRoleId: 'investment-support',
    body: 'جارٍ التحقق من مطابقة شهادة الآيبان لبيانات المستفيد.',
    daysBeforeReference: 0,
    sectionKey: 'investment-support-review',
  },
  {
    entityType: 'INVESTMENT_REQUEST',
    entityId: 'IR-2026-0004',
    authorUserId: 'USR-ACC-001',
    authorRoleId: 'accounting-executor',
    body: 'سيُنفذ التحويل في تاريخ بدء الوديعة المعتمد بعد اكتمال مستندات القيد.',
    daysBeforeReference: 1,
    sectionKey: 'accounting-execution',
  },
  {
    entityType: 'INVESTMENT_REQUEST',
    entityId: 'IR-2026-0021',
    authorUserId: 'USR-GMT-001',
    authorRoleId: 'treasury-general-manager',
    body: 'أوصي بالاعتماد؛ أثر التركز ضمن الحدود بعد التوزيع المقترح.',
    daysBeforeReference: 1,
    sectionKey: 'approval-history',
  },
  {
    entityType: 'INVESTMENT_REQUEST',
    entityId: 'IR-2026-0017',
    authorUserId: 'USR-DS-005',
    authorRoleId: 'deposit-specialist',
    body: 'أُرفقت نسخة محدثة من شهادة الآيبان بعد معالجة ملاحظة الإدارة المالية.',
    daysBeforeReference: 2,
    sectionKey: 'winning-bank',
  },
  {
    entityType: 'INVESTMENT_REQUEST',
    entityId: 'IR-2026-0025',
    authorUserId: 'USR-DS-002',
    authorRoleId: 'deposit-specialist',
    body: 'جارٍ إعداد تحليل التركز على مستوى المحفظة المطلوب في ملاحظة الإعادة التنفيذية.',
    daysBeforeReference: 1,
    sectionKey: 'evaluation-recommendation',
  },
  {
    entityType: 'INVESTMENT_REQUEST',
    entityId: 'IR-2026-0027',
    authorUserId: 'USR-DS-001',
    authorRoleId: 'deposit-specialist',
    body: 'طلب إعادة استثمار للوديعة DEP-2026-0021 المستحقة خلال أسبوعين؛ تُستكمل العروض قبل الاستحقاق.',
    daysBeforeReference: 1,
    sectionKey: 'request-information',
  },
  {
    entityType: 'DEPOSIT',
    entityId: 'DEP-2026-0012',
    authorUserId: 'USR-DS-001',
    authorRoleId: 'deposit-specialist',
    body: 'الوديعة تستحق خلال المدة التحذيرية؛ يُعرض قرار الاستحقاق على مدير عام الخزينة هذا الأسبوع.',
    daysBeforeReference: 1,
  },
  {
    entityType: 'DEPOSIT',
    entityId: 'DEP-2026-0008',
    authorUserId: 'USR-GMT-001',
    authorRoleId: 'treasury-general-manager',
    body: 'قد يتطلب الاحتياج التشغيلي الطارئ دراسة كسر مبكر؛ تُقيَّم الكلفة مقابل بدائل السيولة.',
    daysBeforeReference: 2,
  },
  {
    entityType: 'DEPOSIT',
    entityId: 'DEP-2026-0002',
    authorUserId: 'USR-DS-001',
    authorRoleId: 'deposit-specialist',
    body: 'أُنشئ طلب إعادة الاستثمار IR-2026-0014 وجارٍ استكمال عروض البنوك.',
    daysBeforeReference: 4,
  },
  {
    entityType: 'DEPOSIT',
    entityId: 'DEP-2026-0019',
    authorUserId: 'USR-DS-004',
    authorRoleId: 'deposit-specialist',
    body: 'بانتظار توجيه مدير عام الخزينة بشأن الإغلاق أو إعادة الاستثمار.',
    daysBeforeReference: 1,
  },
  {
    entityType: 'INVESTMENT_REQUEST',
    entityId: 'IR-2026-0016',
    authorUserId: 'USR-DS-004',
    authorRoleId: 'deposit-specialist',
    body: 'جارٍ استكمال التحليل المقارن المطلوب في سبب الإعادة قبل إعادة الإرسال.',
    daysBeforeReference: 1,
    sectionKey: 'evaluation-recommendation',
  },
]

export interface BuildNotesArgs {
  readonly nextId: () => string
  readonly dayBefore: (days: number) => string
  readonly ts: (day: string, hour: number) => string
}

export function buildNotes(args: BuildNotesArgs): Note[] {
  return noteSeeds.map((seed, index) => ({
    id: args.nextId(),
    entityType: seed.entityType,
    entityId: seed.entityId,
    authorUserId: seed.authorUserId,
    authorRoleId: seed.authorRoleId,
    body: seed.body,
    visibility: 'INTERNAL',
    createdAt: args.ts(args.dayBefore(seed.daysBeforeReference), 10 + (index % 5)),
    sectionKey: seed.sectionKey ?? null,
  }))
}
