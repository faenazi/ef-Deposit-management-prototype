# تنفيذ المرحلة 02: نظام التصميم والهيكل العام للتطبيق

## الهدف
بناء Design System قابل لإعادة الاستخدام وApp Shell مؤسسي جميل ومتوافق مع هوية صندوق البيئة، دون تنفيذ محتوى صفحات الأعمال التفصيلي.

## اقرأ قبل التنفيذ
1. `CLAUDE.md`
2. جميع ملفات `docs/07-brand-experience/`
3. `docs/08-design-specifications/00-shared-layout-and-components.md`
4. `docs/09-ai-governance/01-ai-design-principles.md`
5. `docs/09-ai-governance/03-ai-review-checklist.md`
6. راجع ما تم تنفيذه تحت `/src` قبل التعديل.

## نطاق التنفيذ
### 1. Design tokens
أنشئ مصدرًا مركزيًا للقيم التالية:
- ألوان الهوية الأساسية والثانوية.
- الألوان الدلالية للحالات.
- Typography hierarchy.
- Spacing scale.
- Radius scale محدود ومتزن.
- Shadows خفيفة.
- Motion durations.
- Layout widths وbreakpoints.

لا تكرر HEX أو قيم المسافات عشوائيًا داخل المكونات.

### 2. العناصر المشتركة
أنشئ مكونات قابلة لإعادة الاستخدام، بقدر الحاجة الفعلية فقط:
- Button variants.
- Icon button.
- Input, textarea, select.
- Checkbox وradio عند الحاجة.
- Badge وstatus indicator.
- Card وsection container.
- Page header.
- Empty state.
- Loading skeleton.
- Error state.
- Dialog.
- Drawer.
- Toast/feedback mechanism.
- Tabs.
- Table primitives.
- Filter bar primitives.
- Attachment item.
- Timeline primitives.
- Progress/completion indicator.

لا تستخدم مكتبة مكونات كبيرة تغيّر الهوية أو تضيف مظهرًا عامًا دون ضرورة.

### 3. App Shell
أنشئ الهيكل العام:
- قائمة جانبية RTL على يمين الشاشة.
- شريط علوي هادئ.
- مساحة محتوى مرنة.
- شعار رسمي واضح وغير مبالغ في حجمه.
- معلومات المستخدم الحالي.
- Role switcher تجريبي قابل للربط لاحقًا.
- زر إشعارات تجريبي دون اختراع نظام إشعارات كامل.
- حالة active navigation واضحة.

القائمة الرئيسية فقط:
1. الصفحة الرئيسية
2. مهامي
3. محفظة الودائع
4. طلبات الاستثمار
5. التقارير والتحليلات
6. الإعدادات

### 4. Responsive behavior
- Desktop: قائمة جانبية ثابتة متوازنة.
- Tablet: قائمة قابلة للطي مع الحفاظ على سهولة الوصول.
- Mobile: drawer واضح، ولا يتحول المحتوى إلى نسخة مصغرة من سطح المكتب.
- لا يوجد overflow أفقي غير مقصود.

## توجيه جمالي إلزامي
- التصميم يجب أن يبدو مخصصًا لصندوق البيئة وليس قالب admin جاهزًا.
- استخدم مساحات بيضاء واضحة وتسلسلًا بصريًا قويًا.
- لا تجعل كل شيء داخل cards منفصلة.
- لا تستخدم gradients أو glassmorphism أو ظلال ثقيلة.
- لا تجعل الأخضر هو اللون الأساسي.
- استخدم الباترن أو العنصر الشعاعي فقط كلحظة هوية خفيفة ومقصودة، وليس خلف النماذج والجداول.
- الأيقونات داعمة للنص وليست بديلًا غامضًا عنه.
- يجب أن يبدو App Shell جميلًا حتى قبل إضافة بيانات الصفحات.

## صفحات الاختبار المؤقتة
أنشئ route placeholder نظيف لكل عنصر تنقل لاختبار الهيكل فقط. لا تنفذ صفحات الأعمال الكاملة ولا تكرر تصميمات مؤقتة يصعب حذفها.

## معايير القبول
- كل عنصر مشترك له حالات hover, focus, disabled عند انطباقها.
- focus ring مرئي ويمكن استخدام التطبيق بلوحة المفاتيح.
- RTL صحيح في القائمة، الأيقونات الاتجاهية، drawers، tabs، والجداول.
- الشكل متناسق على desktop/tablet/mobile.
- لا توجد قيم بصرية hardcoded ومتعارضة.
- ينجح typecheck وlint وbuild.

## تقرير الإنجاز
اذكر المكونات المنشأة، tokens، سلوك responsive، والأوامر التي تم تشغيلها.