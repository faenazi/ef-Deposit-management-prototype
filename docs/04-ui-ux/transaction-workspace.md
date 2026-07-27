# Transaction Workspace

## Purpose

The investment request is implemented as a transaction workspace, not a long form and not a simple detail page.

## Workspace Anatomy

### 1. Case Header

Displays:

- Request number
- Request title
- Current status
- Amount
- Tenor
- Current owner
- Last update
- Primary role-appropriate action

### 2. Workflow Progress

Shows the complete process while clearly distinguishing:

- Completed stages
- Current stage
- Future stages
- Skipped executive approval when amount is at or below the threshold
- Returned stage when applicable

### 3. Contextual Navigation

Sections (canonical list — Decision DEC-016; see `docs/04-ui-ux/information-architecture.md`):

- نظرة عامة
- معلومات الطلب
- معلومات السيولة ومرفقاتها
- طلبات عروض الأسعار والتواصل مع البنوك
- عروض البنوك المستلمة
- التقييم والتوصية
- سجل الاعتمادات
- بيانات البنك الفائز والآيبان
- مراجعة دعم الاستثمار
- مراجعة الإدارة المالية
- تنفيذ التحويل المحاسبي وإثباته
- تفعيل الوديعة
- المرفقات
- الملاحظات
- سجل النشاط

Sections appear or remain hidden according to workflow stage and active role. Each item may display completion, validation, or read-only state.

### 4. Main Work Area

Contains the selected section only. Avoid rendering the entire case as one continuous page.

### 5. Sticky Summary Panel

Displays the most important cross-section facts:

- Amount and currency
- Recommended bank
- Recommended rate
- Expected return
- Request readiness
- Missing mandatory items
- Current assignment
- Deadline or waiting duration

The panel must collapse gracefully on smaller screens.

### 6. Sticky Action Bar

Displays only valid actions for the current role and status.

Examples:

- حفظ
- إرسال للاعتماد
- اعتماد
- إعادة للاستكمال
- رفض
- تأكيد المراجعة
- تأكيد التنفيذ
- تفعيل الوديعة

Destructive or irreversible actions require confirmation.

## Editing Behavior

- Draft sections autosave locally in the prototype.
- A visible saved state confirms the latest local save.
- Validation issues are shown at field and section levels.
- Read-only sections remain visually readable without appearing disabled.
- Returned requests highlight the return reason and the affected section.

## Review Experience

Reviewers receive a condensed decision view first, with access to full supporting details.

The review view must include:

- Recommendation summary
- Selected offer
- Comparison context
- Key risks
- Required evidence
- Previous approvals and comments

## Activity and Audit

Every simulated business action adds an activity entry with:

- Actor
- Role
- Timestamp
- Action
- Comment or reason
- Previous and new status where relevant

## UX Quality Rules

- Do not overload the header.
- Do not duplicate the same data in every section.
- Do not hide critical readiness issues inside tabs.
- Keep business actions consistently placed.
- Preserve section and scroll context after save or simulated workflow actions.
