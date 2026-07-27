import type { RoleCode } from '@/domain/roles'

/**
 * The eight primary demo users (docs/05-data/demo-users.md) — fictional
 * prototype identities on the reserved `.test` domain. The ~15 supporting
 * users arrive with the full mock dataset in Step 07.
 */
export interface DemoUser {
  id: string
  nameAr: string
  nameEn: string
  jobTitleAr: string
  departmentAr: string
  email: string
  roleCode: RoleCode
  /** Default landing route after switching, per demo-users.md. */
  defaultRoute: string
  /** Marks one of the eight primary demo users (vs Step 07 supporting users). */
  isPrimary: boolean
}

export const demoUsers: DemoUser[] = [
  {
    id: 'USR-DS-001',
    nameAr: 'نورة العتيبي',
    nameEn: 'Noura Alotaibi',
    jobTitleAr: 'أخصائي ودائع استثمارية',
    departmentAr: 'الإدارة العامة للخزينة',
    email: 'noura.alotaibi@example.test',
    roleCode: 'deposit-specialist',
    defaultRoute: '/tasks',
    isPrimary: true,
  },
  {
    id: 'USR-GMT-001',
    nameAr: 'خالد القحطاني',
    nameEn: 'Khalid Alqahtani',
    jobTitleAr: 'مدير عام الخزينة',
    departmentAr: 'الإدارة العامة للخزينة',
    email: 'khalid.alqahtani@example.test',
    roleCode: 'treasury-general-manager',
    defaultRoute: '/',
    isPrimary: true,
  },
  {
    id: 'USR-EXE-001',
    nameAr: 'تغريد الحربي',
    nameEn: 'Taghreed Alharbi',
    jobTitleAr: 'المدير التنفيذي لقطاع الاستثمار والخزينة',
    departmentAr: 'قطاع الاستثمار والخزينة',
    email: 'taghreed.alharbi@example.test',
    roleCode: 'investment-treasury-executive',
    defaultRoute: '/',
    isPrimary: true,
  },
  {
    id: 'USR-IS-001',
    nameAr: 'سارة الدوسري',
    nameEn: 'Sarah Aldosari',
    jobTitleAr: 'أخصائي دعم استثمار',
    departmentAr: 'الإدارة العامة لدعم الاستثمار',
    email: 'sarah.aldosari@example.test',
    roleCode: 'investment-support',
    defaultRoute: '/tasks',
    isPrimary: true,
  },
  {
    id: 'USR-FIN-001',
    nameAr: 'محمد الشهري',
    nameEn: 'Mohammed Alshehri',
    jobTitleAr: 'أخصائي مالي',
    departmentAr: 'الإدارة العامة للشؤون المالية',
    email: 'mohammed.alshehri@example.test',
    roleCode: 'finance-reviewer',
    defaultRoute: '/tasks',
    isPrimary: true,
  },
  {
    id: 'USR-ACC-001',
    nameAr: 'ريم الغامدي',
    nameEn: 'Reem Alghamdi',
    jobTitleAr: 'محاسب أول',
    departmentAr: 'الإدارة العامة للشؤون المالية',
    email: 'reem.alghamdi@example.test',
    roleCode: 'accounting-executor',
    defaultRoute: '/tasks',
    isPrimary: true,
  },
  {
    id: 'USR-ADM-001',
    nameAr: 'عبدالله العنزي',
    nameEn: 'Abdullah Alanazi',
    jobTitleAr: 'مدير النظام',
    departmentAr: 'الخدمات الرقمية وحلول البيانات',
    email: 'abdullah.alanazi@example.test',
    roleCode: 'system-admin',
    defaultRoute: '/settings',
    isPrimary: true,
  },
  {
    id: 'USR-RO-001',
    nameAr: 'هند المطيري',
    nameEn: 'Hind Almutairi',
    jobTitleAr: 'مراجع داخلي',
    departmentAr: 'الإدارة العامة للمراجعة الداخلية',
    email: 'hind.almutairi@example.test',
    roleCode: 'read-only-user',
    defaultRoute: '/',
    isPrimary: true,
  },
]

/** Default demo identity: the Deposit Specialist (demo-users.md switcher rules). */
export const defaultDemoUser = demoUsers[0]

export function findDemoUser(id: string): DemoUser | undefined {
  return demoUsers.find((user) => user.id === id)
}
