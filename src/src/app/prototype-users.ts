/**
 * Demo identities for the prototype role switcher (docs/05-data/demo-users.md).
 * Step 05 uses this list for the shell's visual role switcher only; Step 06
 * wires it to the real role context, permissions, and task visibility.
 */
export interface PrototypeUser {
  id: string
  name: string
  /** Canonical Arabic job title from demo-users.md. */
  jobTitle: string
  roleCode:
    | 'DEPOSIT_SPECIALIST'
    | 'TREASURY_GM'
    | 'EXECUTIVE_DIRECTOR'
    | 'INVESTMENT_SUPPORT'
    | 'FINANCE'
    | 'ACCOUNTING'
    | 'SYSTEM_ADMIN'
    | 'READ_ONLY'
}

export const prototypeUsers: PrototypeUser[] = [
  { id: 'USR-DS-001', name: 'نورة العتيبي', jobTitle: 'أخصائي ودائع استثمارية', roleCode: 'DEPOSIT_SPECIALIST' },
  { id: 'USR-GM-001', name: 'خالد القحطاني', jobTitle: 'مدير عام الخزينة', roleCode: 'TREASURY_GM' },
  { id: 'USR-ED-001', name: 'تغريد الحربي', jobTitle: 'المدير التنفيذي لقطاع الاستثمار والخزينة', roleCode: 'EXECUTIVE_DIRECTOR' },
  { id: 'USR-IS-001', name: 'سارة الدوسري', jobTitle: 'أخصائي دعم استثمار', roleCode: 'INVESTMENT_SUPPORT' },
  { id: 'USR-FN-001', name: 'محمد الشهري', jobTitle: 'أخصائي مالي', roleCode: 'FINANCE' },
  { id: 'USR-AC-001', name: 'ريم الغامدي', jobTitle: 'محاسب أول', roleCode: 'ACCOUNTING' },
  { id: 'USR-AD-001', name: 'عبدالله العنزي', jobTitle: 'مدير النظام', roleCode: 'SYSTEM_ADMIN' },
  { id: 'USR-RO-001', name: 'هند المطيري', jobTitle: 'مراجع داخلي', roleCode: 'READ_ONLY' },
]
