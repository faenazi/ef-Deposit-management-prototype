import type { DashboardProfile, Role, RoleCode } from '@/domain/roles'
import { roles } from '@/domain/roles'
import { rolePermissions } from '@/domain/permissions'

/**
 * Seeded Role records (domain-model.md — Role). Identity comes from
 * `domain/roles.ts` and permissions from `domain/permissions.ts` — this
 * module only adds the descriptive reference data.
 */

const roleDescriptions: Record<RoleCode, string> = {
  'deposit-specialist':
    'إعداد طلبات الاستثمار ومتابعتها: بيانات الطلب والسيولة ومخاطبات البنوك والعروض والتقييم والتوصية، واستكمال بيانات البنك الفائز وتأكيد تفعيل الوديعة.',
  'treasury-general-manager':
    'مراجعة طلبات الاستثمار المقدمة واعتمادها حتى 100 مليون ريال، واعتماد مرحلة الخزينة للطلبات الأعلى، مع صلاحية الإعادة أو الرفض.',
  'investment-treasury-executive':
    'الاعتماد التنفيذي للطلبات التي تتجاوز 100 مليون ريال، ومتابعة مؤشرات المحفظة والتركز البنكي.',
  'investment-support':
    'التحقق من اكتمال مستندات الاعتماد وبيانات البنك الفائز قبل إحالة الطلب إلى الإدارة المالية.',
  'finance-reviewer':
    'التحقق المالي: توفر السيولة والموازنة وصحة بيانات المستفيد، والاعتماد لتنفيذ التحويل أو الإعادة لدعم الاستثمار.',
  'accounting-executor':
    'تنفيذ التحويل المحاسبي وتسجيل مراجع القيد والدفع وإرفاق إثباتات التنفيذ.',
  'system-admin':
    'إدارة إعدادات النموذج الأولي والبيانات المرجعية والمستخدمين وسيناريوهات العرض، دون تنفيذ قرارات الاعتماد نيابة عن الأدوار.',
  'read-only-user':
    'اطلاع فقط على لوحات المعلومات والطلبات والودائع والتقارير المصرح بها، دون أي إجراء.',
}

const roleDashboardProfiles: Record<RoleCode, DashboardProfile> = {
  'deposit-specialist': 'specialist',
  'treasury-general-manager': 'treasury-management',
  'investment-treasury-executive': 'executive',
  'investment-support': 'operational-review',
  'finance-reviewer': 'operational-review',
  'accounting-executor': 'operational-review',
  'system-admin': 'administration',
  'read-only-user': 'read-only',
}

export const roleRecords: readonly Role[] = (
  Object.keys(roles) as RoleCode[]
).map((code) => ({
  id: code,
  ...roles[code],
  description: roleDescriptions[code],
  permissions: rolePermissions[code],
  dashboardProfile: roleDashboardProfiles[code],
}))
