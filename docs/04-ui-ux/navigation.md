# Navigation

## Main Sidebar

The sidebar is right-aligned for Arabic RTL layouts.

Items:

- الصفحة الرئيسية
- مهامي
- محفظة الودائع
- طلبات الاستثمار
- التقارير والتحليلات
- الإعدادات

## Sidebar Behavior

- Expanded by default on large screens.
- Collapsible to icon-only mode on smaller laptops.
- Active item must be visually obvious without relying on color alone.
- Show a task count badge beside `مهامي` when relevant.
- Keep the logo area visually calm and proportionate.
- Do not place nested request sections inside the main sidebar.

## Top Bar

Contains:

- Page context or breadcrumb
- Global search trigger
- Notifications
- Demo role switcher
- Current user profile

The top bar should remain visually lightweight.

## Breadcrumbs

Examples:

```text
طلبات الاستثمار / IR-2026-0014
```

```text
محفظة الودائع / DEP-2026-0008
```

Breadcrumbs must not duplicate the full page title.

## Request Workspace Navigation

Use contextual section navigation inside the request workspace.

Canonical sections (Decision DEC-016; see `docs/04-ui-ux/information-architecture.md`):

1. نظرة عامة
2. معلومات الطلب
3. معلومات السيولة ومرفقاتها
4. طلبات عروض الأسعار والتواصل مع البنوك
5. عروض البنوك المستلمة
6. التقييم والتوصية
7. سجل الاعتمادات
8. بيانات البنك الفائز والآيبان
9. مراجعة دعم الاستثمار
10. مراجعة الإدارة المالية
11. تنفيذ التحويل المحاسبي وإثباته
12. تفعيل الوديعة
13. المرفقات
14. الملاحظات
15. سجل النشاط

Sections appear or remain hidden according to the workflow stage and the active role.

Each section displays:

- Label
- Completion state where applicable
- Validation issue count when applicable
- Read-only indicator when applicable

## Quick Actions

Quick actions are role-aware and contextual. Examples:

- إنشاء طلب استثمار
- فتح المهمة التالية
- استكمال طلب معاد
- مراجعة الاستحقاقات القادمة

Do not expose actions a role cannot perform.

## Drawers and Dialogs

Use drawers for contextual inspection without losing the parent page, including:

- Task preview
- Offer details
- Attachment preview
- Activity details

Use dialogs for focused confirmations, including:

- Approve
- Return
- Reject
- Cancel
- Reset demo data

## Navigation Safety

- Warn users before leaving unsaved editing states.
- Preserve draft data in the in-memory prototype state (no localStorage — Decision DEC-019).
- Never navigate after a failed simulated action.
- Provide a clear back path from every detail view.
