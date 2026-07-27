# Demo Users

## Purpose

The prototype must include realistic users that allow stakeholders to experience the platform from every role without authentication or external identity integration.

The user switcher is a prototype-only capability and must visibly state that it is used for demonstration.

## Primary Demo Users

### Deposit Specialist

- ID: `USR-DS-001`
- Name: نورة العتيبي
- English Name: Noura Alotaibi
- Role: Deposit Specialist
- Department: الإدارة العامة للخزينة
- Job title: أخصائي ودائع استثمارية
- Email: `noura.alotaibi@example.test`
- Default landing page: My Tasks
- Key capabilities:
  - Create and edit Draft requests.
  - Manage RFQs and bank offers.
  - Prepare evaluations and recommendations.
  - Complete returned requests.
  - Enter winning bank information.
  - Confirm deposit activation when assigned.

### Treasury General Manager

- ID: `USR-GMT-001`
- Name: خالد القحطاني
- English Name: Khalid Alqahtani
- Role: Treasury General Manager
- Department: الإدارة العامة للخزينة
- Job title: مدير عام الخزينة
- Email: `khalid.alqahtani@example.test`
- Default landing page: Dashboard
- Key capabilities:
  - Review all Treasury requests.
  - Approve requests up to and including SAR 100,000,000.
  - Approve the Treasury stage for requests above the threshold.
  - Return requests to the Deposit Specialist.
  - Review portfolio and maturity exposure.

### Executive Director of Investment and Treasury Sector

- ID: `USR-EXE-001`
- Name: تغريد الحربي
- English Name: Taghreed Alharbi
- Role: Executive Director of Investment and Treasury Sector
- Department: قطاع الاستثمار والخزينة
- Job title: المدير التنفيذي لقطاع الاستثمار والخزينة
- Email: `taghreed.alharbi@example.test`
- Default landing page: Dashboard
- Key capabilities:
  - Review requests above SAR 100,000,000.
  - Approve, return, or reject eligible requests.
  - View executive portfolio and concentration indicators.
  - View approval history and recommendation rationale.

### Investment Support Reviewer

- ID: `USR-IS-001`
- Name: سارة الدوسري
- English Name: Sarah Aldosari
- Role: Investment Support
- Department: الإدارة العامة لدعم الاستثمار
- Job title: أخصائي دعم استثمار
- Email: `sarah.aldosari@example.test`
- Default landing page: My Tasks
- Key capabilities:
  - Verify approval and winning bank documentation.
  - Validate completeness before Finance review.
  - Return incomplete requests to the Deposit Specialist group.

### Finance Reviewer

- ID: `USR-FIN-001`
- Name: محمد الشهري
- English Name: Mohammed Alshehri
- Role: Finance Reviewer
- Department: الإدارة العامة للشؤون المالية
- Job title: أخصائي مالي
- Email: `mohammed.alshehri@example.test`
- Default landing page: My Tasks
- Key capabilities:
  - Confirm cash availability.
  - Verify beneficiary and financial information.
  - Approve for Accounting execution or return to Investment Support.

### Accounting Executor

- ID: `USR-ACC-001`
- Name: ريم الغامدي
- English Name: Reem Alghamdi
- Role: Accounting Executor
- Department: الإدارة العامة للشؤون المالية
- Job title: محاسب أول
- Email: `reem.alghamdi@example.test`
- Default landing page: My Tasks
- Key capabilities:
  - Record journal and payment references.
  - Upload transfer evidence.
  - Complete Accounting execution.
  - Return requests to Finance when required.

### System Administrator

- ID: `USR-ADM-001`
- Name: عبدالله العنزي
- English Name: Abdullah Alanazi
- Role: System Administrator
- Department: الخدمات الرقمية وحلول البيانات
- Job title: مدير النظام
- Email: `abdullah.alanazi@example.test`
- Default landing page: Settings
- Key capabilities:
  - View prototype configuration.
  - Switch scenarios.
  - Reset demo data.
  - View all records for testing.
  - Must not perform business approval decisions on behalf of business roles.

### Read-only User

- ID: `USR-RO-001`
- Name: هند المطيري
- English Name: Hind Almutairi
- Role: Read-only User / مستخدم للعرض فقط
- Department: الإدارة العامة للمراجعة الداخلية
- Job title: مراجع داخلي
- Email: `hind.almutairi@example.test`
- Default landing page: Dashboard
- Key capabilities:
  - View authorized dashboards, requests, deposits, and reports.
  - Cannot create, edit, upload, approve, reject, return, execute, activate, cancel, or delete.

## Supporting Users

Add at least 15 supporting users to make assignment, ownership, activity logs, and team filters realistic.

Recommended distribution:

- 4 Deposit Specialists
- 2 Treasury managers or supervisors
- 2 Investment Support users
- 3 Finance users
- 2 Accounting users
- 2 system support users

Supporting users do not need unique demo scenarios, but their IDs must be stable and their activity records must be credible.

## User Switcher Requirements

The prototype user switcher must:

- Display Arabic name, job title, department, and role.
- Group users by business role.
- Mark the eight primary demo users.
- Change permissions, tasks, dashboard, and available actions.
- Preserve the selected user in local prototype state.
- Offer a one-click return to the default Deposit Specialist.
- Display a visible `وضع العرض التجريبي` label.

## Permission Behavior

Changing the active user must affect:

- Side navigation visibility.
- Dashboard content.
- My Tasks results.
- Request editing permissions.
- Approval actions.
- Finance and Accounting sections.
- Settings access.

It is unacceptable for the switcher to change only the avatar or display name.

## Privacy and Naming Rules

- All names and contact information are fictional prototype data.
- Use the reserved `.test` domain for email addresses.
- Do not use real employee numbers or personal phone numbers.
- Do not use production identities, photos, or confidential organizational data.
