/**
 * The ten curated demo scenarios (docs/05-data/demo-scenarios.md; plan §12).
 * The baseline seed already contains every scenario's starting state, so
 * loading a scenario = deterministic reset + switching to the starting user
 * and route — no data mutation beyond the reset.
 */
export interface DemoScenario {
  readonly id: string
  readonly titleAr: string
  readonly descriptionAr: string
  readonly startingUserId: string
  readonly startingRoute: string
  readonly requiredRecordIds: readonly string[]
  /** Presenter guidance: the expected outcome of the walkthrough. */
  readonly expectedOutcomeAr: string
}

export const demoScenarios: readonly DemoScenario[] = [
  {
    id: 'SCN-01',
    titleAr: 'إعداد طلب قياسي وإرساله',
    descriptionAr:
      'أخصائي الودائع يستكمل نواقص طلب بمبلغ 80 مليون ريال (مرفق السيولة، سريان عرض، مبررات التوصية) ثم يرسله للاعتماد.',
    startingUserId: 'USR-DS-001',
    startingRoute: '/tasks',
    requiredRecordIds: ['IR-2026-0018'],
    expectedOutcomeAr:
      'تتحول الحالة إلى بانتظار اعتماد مدير عام الخزينة وتظهر مهمة اعتماد جديدة لدى المدير.',
  },
  {
    id: 'SCN-02',
    titleAr: 'اعتماد طلب دون حد الصلاحية',
    descriptionAr:
      'مدير عام الخزينة يراجع طلب 80 مليون ريال ويعتمده اعتمادًا نهائيًا دون المسار التنفيذي.',
    startingUserId: 'USR-GMT-001',
    startingRoute: '/tasks',
    requiredRecordIds: ['IR-2026-0018'],
    expectedOutcomeAr:
      'يتم تجاوز الاعتماد التنفيذي وتتحول الحالة إلى بانتظار استكمال بيانات البنك الفائز.',
  },
  {
    id: 'SCN-03',
    titleAr: 'اعتماد تنفيذي فوق حد الصلاحية',
    descriptionAr:
      'المدير التنفيذي لقطاع الاستثمار والخزينة يعتمد طلبًا بمبلغ 180 مليون ريال بعد اعتماد الخزينة.',
    startingUserId: 'USR-EXE-001',
    startingRoute: '/tasks',
    requiredRecordIds: ['IR-2026-0021'],
    expectedOutcomeAr:
      'تتحول الحالة إلى بانتظار استكمال بيانات البنك الفائز ويظهر الاعتماد التنفيذي في السجل.',
  },
  {
    id: 'SCN-04',
    titleAr: 'إعادة طلب غير مكتمل',
    descriptionAr:
      'مدير عام الخزينة يعيد طلبًا لضعف مبررات التوصية مع سبب إلزامي، ويعالج الأخصائي الملاحظة.',
    startingUserId: 'USR-GMT-001',
    startingRoute: '/tasks',
    requiredRecordIds: ['IR-2026-0011'],
    expectedOutcomeAr:
      'تتحول الحالة إلى معاد للاستكمال مع إبراز سبب الإعادة وحفظ سجل الاعتماد السابق.',
  },
  {
    id: 'SCN-05',
    titleAr: 'مقارنة عروض تتجاوز أعلى معدل',
    descriptionAr:
      'مقارنة ثلاثة عروض سارية: الأعلى معدلًا بتركز مرتفع، ومعدل أقل قليلًا بتركز منخفض، ومعدل أدنى بشروط مقيدة.',
    startingUserId: 'USR-DS-001',
    startingRoute: '/investment-requests/IR-2026-0009',
    requiredRecordIds: ['IR-2026-0009'],
    expectedOutcomeAr:
      'التوصية تستند إلى الدرجة الموزونة لا إلى أعلى معدل، مع بقاء تحذير التركز ظاهرًا.',
  },
  {
    id: 'SCN-06',
    titleAr: 'إتمام مراجعات ما بعد الاعتماد',
    descriptionAr: 'مرور الطلب عبر مراجعة دعم الاستثمار ثم المراجعة المالية وصولًا إلى المحاسبة.',
    startingUserId: 'USR-IS-001',
    startingRoute: '/tasks',
    requiredRecordIds: ['IR-2026-0006'],
    expectedOutcomeAr:
      'تُسجل مراجعتان مستقلتان وتظهر مهمة تنفيذ التحويل لدى أخصائي المحاسبة.',
  },
  {
    id: 'SCN-07',
    titleAr: 'تنفيذ التحويل وتفعيل الوديعة',
    descriptionAr:
      'المحاسبة تسجل مراجع القيد والدفع وترفق إيصال التحويل، ثم يؤكد الأخصائي تفعيل الوديعة.',
    startingUserId: 'USR-ACC-001',
    startingRoute: '/tasks',
    requiredRecordIds: ['IR-2026-0004'],
    expectedOutcomeAr:
      'تُنشأ وديعة واحدة بالضبط ويتحول الطلب إلى «تم التحويل إلى وديعة نشطة» وتتحدث مؤشرات المحفظة.',
  },
  {
    id: 'SCN-08',
    titleAr: 'إدارة وديعة تقترب من الاستحقاق',
    descriptionAr:
      'مراجعة وديعة داخل نافذة التحذير (14 يومًا) وإنشاء طلب إعادة استثمار معبأ مسبقًا منها.',
    startingUserId: 'USR-DS-001',
    startingRoute: '/deposits/DEP-2026-0012',
    requiredRecordIds: ['DEP-2026-0012'],
    expectedOutcomeAr:
      'يُنشأ طلب مسودة جديد بروابط ثنائية الاتجاه مع بقاء الوديعة المصدر دون تغيير حتى اكتمال المعالجة.',
  },
  {
    id: 'SCN-09',
    titleAr: 'كسر وديعة قبل الاستحقاق',
    descriptionAr: 'حالة استثنائية: كسر مبكر بوديعة نشطة مع سبب إلزامي وأثر واضح على العائد.',
    startingUserId: 'USR-DS-001',
    startingRoute: '/deposits/DEP-2026-0008',
    requiredRecordIds: ['DEP-2026-0008'],
    expectedOutcomeAr:
      'تتحول الحالة إلى مكسورة قبل الاستحقاق مع حفظ تاريخ الكسر وسببه وتحديث إجماليات المحفظة.',
  },
  {
    id: 'SCN-10',
    titleAr: 'مراجعة تنفيذية للمحفظة',
    descriptionAr:
      'عرض تنفيذي موجز: إجمالي المحفظة النشطة، متوسط العائد المرجح، التركز البنكي، والاستحقاقات القادمة.',
    startingUserId: 'USR-EXE-001',
    startingRoute: '/',
    requiredRecordIds: [],
    expectedOutcomeAr:
      'كل المؤشرات مشتقة من سجلات الودائع نفسها مع تنقل تفصيلي يحافظ على السياق.',
  },
]
