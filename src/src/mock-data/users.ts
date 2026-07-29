import type { User } from '@/domain/user'
import type { RoleCode } from '@/domain/roles'

/**
 * The 23 prototype users: the 8 primary demo users exactly as documented
 * in docs/05-data/demo-users.md, plus 15 supporting users per its
 * recommended distribution (4 specialists, 2 treasury, 2 investment
 * support, 3 finance, 2 accounting, 2 system support). All identities are
 * fictional and use the reserved `.test` email domain.
 */

interface UserSeed {
  readonly id: string
  readonly employeeNumber: string
  readonly nameAr: string
  readonly nameEn: string
  readonly email: string
  readonly jobTitleAr: string
  readonly departmentAr: string
  readonly roleId: RoleCode
  readonly isPrimary?: boolean
  readonly defaultRoute?: string
}

const TREASURY = 'الإدارة العامة للخزينة'
const SUPPORT = 'الإدارة العامة لدعم الاستثمار'
const FINANCE = 'الإدارة العامة للشؤون المالية'
const DIGITAL = 'الخدمات الرقمية وحلول البيانات'
const AUDIT = 'الإدارة العامة للمراجعة الداخلية'

const userSeeds: readonly UserSeed[] = [
  // --- The eight primary demo users (verbatim from demo-users.md) ---
  {
    id: 'USR-DS-001',
    employeeNumber: 'EF-1101',
    nameAr: 'رغد العريني',
    nameEn: 'Raghad Alaraini',
    email: 'raghad.alaraini@example.test',
    jobTitleAr: 'أخصائي ودائع استثمارية',
    departmentAr: TREASURY,
    roleId: 'deposit-specialist',
    isPrimary: true,
    defaultRoute: '/tasks',
  },
  {
    id: 'USR-GMT-001',
    employeeNumber: 'EF-1001',
    nameAr: 'خالد القحطاني',
    nameEn: 'Khalid Alqahtani',
    email: 'khalid.alqahtani@example.test',
    jobTitleAr: 'مدير عام الخزينة',
    departmentAr: TREASURY,
    roleId: 'treasury-general-manager',
    isPrimary: true,
    defaultRoute: '/',
  },
  {
    id: 'USR-EXE-001',
    employeeNumber: 'EF-1000',
    nameAr: 'تغريد الحربي',
    nameEn: 'Taghreed Alharbi',
    email: 'taghreed.alharbi@example.test',
    jobTitleAr: 'المدير التنفيذي لقطاع الاستثمار والخزينة',
    departmentAr: 'قطاع الاستثمار والخزينة',
    roleId: 'investment-treasury-executive',
    isPrimary: true,
    defaultRoute: '/',
  },
  {
    id: 'USR-IS-001',
    employeeNumber: 'EF-1201',
    nameAr: 'سارة الدوسري',
    nameEn: 'Sarah Aldosari',
    email: 'sarah.aldosari@example.test',
    jobTitleAr: 'أخصائي دعم استثمار',
    departmentAr: SUPPORT,
    roleId: 'investment-support',
    isPrimary: true,
    defaultRoute: '/tasks',
  },
  {
    id: 'USR-FIN-001',
    employeeNumber: 'EF-1301',
    nameAr: 'محمد الشهري',
    nameEn: 'Mohammed Alshehri',
    email: 'mohammed.alshehri@example.test',
    jobTitleAr: 'أخصائي مالي',
    departmentAr: FINANCE,
    roleId: 'finance-reviewer',
    isPrimary: true,
    defaultRoute: '/tasks',
  },
  {
    id: 'USR-ACC-001',
    employeeNumber: 'EF-1401',
    nameAr: 'ريم الغامدي',
    nameEn: 'Reem Alghamdi',
    email: 'reem.alghamdi@example.test',
    jobTitleAr: 'محاسب أول',
    departmentAr: FINANCE,
    roleId: 'accounting-executor',
    isPrimary: true,
    defaultRoute: '/tasks',
  },
  {
    id: 'USR-ADM-001',
    employeeNumber: 'EF-1501',
    nameAr: 'عبدالله العنزي',
    nameEn: 'Abdullah Alanazi',
    email: 'abdullah.alanazi@example.test',
    jobTitleAr: 'مدير النظام',
    departmentAr: DIGITAL,
    roleId: 'system-admin',
    isPrimary: true,
    defaultRoute: '/settings',
  },
  {
    id: 'USR-RO-001',
    employeeNumber: 'EF-1601',
    nameAr: 'هند المطيري',
    nameEn: 'Hind Almutairi',
    email: 'hind.almutairi@example.test',
    jobTitleAr: 'مراجع داخلي',
    departmentAr: AUDIT,
    roleId: 'read-only-user',
    isPrimary: true,
    defaultRoute: '/',
  },
  // --- Supporting users: 4 Deposit Specialists ---
  {
    id: 'USR-DS-002',
    employeeNumber: 'EF-1102',
    nameAr: 'سعود الشهراني',
    nameEn: 'Saud Alshahrani',
    email: 'saud.alshahrani@example.test',
    jobTitleAr: 'أخصائي ودائع استثمارية',
    departmentAr: TREASURY,
    roleId: 'deposit-specialist',
  },
  {
    id: 'USR-DS-003',
    employeeNumber: 'EF-1103',
    nameAr: 'أمل الجهني',
    nameEn: 'Amal Aljuhani',
    email: 'amal.aljuhani@example.test',
    jobTitleAr: 'أخصائي ودائع استثمارية',
    departmentAr: TREASURY,
    roleId: 'deposit-specialist',
  },
  {
    id: 'USR-DS-004',
    employeeNumber: 'EF-1104',
    nameAr: 'يوسف البقمي',
    nameEn: 'Yousef Albaqami',
    email: 'yousef.albaqami@example.test',
    jobTitleAr: 'أخصائي ودائع استثمارية أول',
    departmentAr: TREASURY,
    roleId: 'deposit-specialist',
  },
  {
    id: 'USR-DS-005',
    employeeNumber: 'EF-1105',
    nameAr: 'لطيفة السلمي',
    nameEn: 'Latifa Alsulami',
    email: 'latifa.alsulami@example.test',
    jobTitleAr: 'أخصائي ودائع استثمارية',
    departmentAr: TREASURY,
    roleId: 'deposit-specialist',
  },
  // --- 2 Treasury managers/supervisors ---
  {
    id: 'USR-GMT-002',
    employeeNumber: 'EF-1002',
    nameAr: 'وليد الفيصل',
    nameEn: 'Waleed Alfaisal',
    email: 'waleed.alfaisal@example.test',
    jobTitleAr: 'مشرف إدارة السيولة',
    departmentAr: TREASURY,
    roleId: 'treasury-general-manager',
  },
  {
    id: 'USR-GMT-003',
    employeeNumber: 'EF-1003',
    nameAr: 'جواهر السديري',
    nameEn: 'Jawaher Alsudairi',
    email: 'jawaher.alsudairi@example.test',
    jobTitleAr: 'مشرف عمليات الخزينة',
    departmentAr: TREASURY,
    roleId: 'treasury-general-manager',
  },
  // --- 2 Investment Support users ---
  {
    id: 'USR-IS-002',
    employeeNumber: 'EF-1202',
    nameAr: 'فيصل الحقباني',
    nameEn: 'Faisal Alhagbani',
    email: 'faisal.alhagbani@example.test',
    jobTitleAr: 'أخصائي دعم استثمار',
    departmentAr: SUPPORT,
    roleId: 'investment-support',
  },
  {
    id: 'USR-IS-003',
    employeeNumber: 'EF-1203',
    nameAr: 'العنود الخالدي',
    nameEn: 'Alanoud Alkhaldi',
    email: 'alanoud.alkhaldi@example.test',
    jobTitleAr: 'أخصائي دعم استثمار أول',
    departmentAr: SUPPORT,
    roleId: 'investment-support',
  },
  // --- 3 Finance users ---
  {
    id: 'USR-FIN-002',
    employeeNumber: 'EF-1302',
    nameAr: 'عمر باوزير',
    nameEn: 'Omar Bawazir',
    email: 'omar.bawazir@example.test',
    jobTitleAr: 'أخصائي مالي أول',
    departmentAr: FINANCE,
    roleId: 'finance-reviewer',
  },
  {
    id: 'USR-FIN-003',
    employeeNumber: 'EF-1303',
    nameAr: 'شذى القرني',
    nameEn: 'Shatha Alqarni',
    email: 'shatha.alqarni@example.test',
    jobTitleAr: 'أخصائي مالي',
    departmentAr: FINANCE,
    roleId: 'finance-reviewer',
  },
  {
    id: 'USR-FIN-004',
    employeeNumber: 'EF-1304',
    nameAr: 'إبراهيم النفيعي',
    nameEn: 'Ibrahim Alnufaie',
    email: 'ibrahim.alnufaie@example.test',
    jobTitleAr: 'محلل مالي',
    departmentAr: FINANCE,
    roleId: 'finance-reviewer',
  },
  // --- 2 Accounting users ---
  {
    id: 'USR-ACC-002',
    employeeNumber: 'EF-1402',
    nameAr: 'ناصر الحمدان',
    nameEn: 'Nasser Alhamdan',
    email: 'nasser.alhamdan@example.test',
    jobTitleAr: 'محاسب',
    departmentAr: FINANCE,
    roleId: 'accounting-executor',
  },
  {
    id: 'USR-ACC-003',
    employeeNumber: 'EF-1403',
    nameAr: 'غادة العسيري',
    nameEn: 'Ghada Alasiri',
    email: 'ghada.alasiri@example.test',
    jobTitleAr: 'محاسب',
    departmentAr: FINANCE,
    roleId: 'accounting-executor',
  },
  // --- 2 system support users ---
  {
    id: 'USR-ADM-002',
    employeeNumber: 'EF-1502',
    nameAr: 'مشعل الرويلي',
    nameEn: 'Mishal Alruwaili',
    email: 'mishal.alruwaili@example.test',
    jobTitleAr: 'أخصائي دعم تقني',
    departmentAr: DIGITAL,
    roleId: 'system-admin',
  },
  {
    id: 'USR-ADM-003',
    employeeNumber: 'EF-1503',
    nameAr: 'أروى الصقير',
    nameEn: 'Arwa Alsuqair',
    email: 'arwa.alsuqair@example.test',
    jobTitleAr: 'محلل نظم',
    departmentAr: DIGITAL,
    roleId: 'system-admin',
  },
]

export const users: readonly User[] = userSeeds.map((seed) => ({
  id: seed.id,
  employeeNumber: seed.employeeNumber,
  displayNameAr: seed.nameAr,
  displayNameEn: seed.nameEn,
  email: seed.email,
  jobTitleAr: seed.jobTitleAr,
  departmentAr: seed.departmentAr,
  roleId: seed.roleId,
  avatarUrl: null,
  isActive: true,
  isPrimary: seed.isPrimary === true,
  defaultRoute: seed.defaultRoute ?? null,
  createdAt: '2026-01-05T09:00:00+03:00',
}))

/** The rotating pool of specialists used for ownership and assignment. */
export const specialistUserIds: readonly string[] = users
  .filter((user) => user.roleId === 'deposit-specialist')
  .map((user) => user.id)

export function findUser(id: string): User | undefined {
  return users.find((user) => user.id === id)
}
