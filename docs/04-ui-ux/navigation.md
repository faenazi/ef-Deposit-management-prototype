# Navigation

## Main Sidebar

The sidebar is right-aligned for Arabic RTL layouts.

Items:

- الصفحة الرئيسية
- مهامي
- طلبات الاستثمار
- محفظة الودائع
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
طلبات الاستثمار / IR-2026-014
```

```text
محفظة الودائع / DEP-2026-008
```

Breadcrumbs must not duplicate the full page title.

## Request Workspace Navigation

Use contextual section navigation inside the request workspace.

Recommended sections:

1. نظرة عامة
2. معلومات الطلب
3. السيولة
4. التواصل مع البنوك
5. عروض البنوك
6. التقييم والتوصية
7. الاعتمادات
8. التنفيذ والتفعيل
9. المرفقات
10. سجل النشاط

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
- Preserve draft data locally.
- Never navigate after a failed simulated action.
- Provide a clear back path from every detail view.
