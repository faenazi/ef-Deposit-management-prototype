# Domain and Mock-Data Implementation Plan (Step 03 Deliverable)

## 0. Purpose and Authority

This document is the finalized, implementation-ready plan that Step 07 (`prompts/04-frontend/04-build-domain-model-mock-data-and-services.md`) must follow when it creates the domain model, deterministic mock data, and in-memory services under `src/src/`.

- This is a **planning document**. No TypeScript, mock data, or service exists yet; nothing here is implemented in this step (Decision DEC-013).
- This document **does not replace** the canonical sources. Where it lists statuses, rules, roles, or volumes, it restates them for implementation convenience; on any conflict, the canonical source wins:
  - Statuses: `docs/02-business/statuses-and-transitions.md` (DEC-012).
  - Business rules and prototype defaults: `docs/02-business/business-rules.md` (DEC-017).
  - Roles and permissions: `docs/02-business/roles-and-permissions.md`.
  - Core entities: `docs/05-data/domain-model.md`.
  - Volumes and distributions: `docs/05-data/mock-data-requirements.md`.
  - Demo identities: `docs/05-data/demo-users.md`.
  - Demo scenarios: `docs/05-data/demo-scenarios.md`.
  - Frontend structure: `docs/09-ai-governance/02-ai-coding-standards.md` (DEC-014).
  - Decisions: `EXECUTION-STATUS.md` §6.
- Additions made by this plan (section 15) close genuine documentation gaps discovered during Step 03 validation. They introduce no new business rules.

Step 07 must be able to implement everything below **without making any new business decision**.

## 1. Domain Boundaries

The prototype domain is organized into six bounded areas. Each area maps to one folder concern under `src/src/domain/` (types and rules) and `src/src/mock-data/` (fixtures and generators).

| Boundary | Contents | Primary sources |
|---|---|---|
| Identity and access | User, Role, Permission, section editability modes | `roles-and-permissions.md`, `demo-users.md` |
| Reference data | Bank, EvaluationCriterion, SystemSettings, reference date | `domain-model.md`, `settings.md` (functional) |
| Investment request case | InvestmentRequest, SectionCompletion, LiquidityInformation, BankInvitation (RFQ), BankOffer, OfferEvaluation, Recommendation, Approval, WinningBankDetails, InvestmentSupportReview, FinanceReview, AccountingExecution, DepositActivation | `investment-request-lifecycle.md`, `execution-and-activation.md`, `03-functional/*` |
| Deposit portfolio | Deposit, MaturityAction | `deposit-lifecycle.md`, `deposit-portfolio.md` |
| Work and audit | Task, Attachment, Note, Activity, Notification | `my-tasks.md`, `domain-model.md`, `mock-data-requirements.md` |
| Analytics (derived only) | Dashboard KPIs, reports, portfolio aggregations — **never persisted** | `dashboard.md`, `reports-and-analytics.md` |

Rules that cross boundaries (threshold routing, expected return, maturity window, SLAs, readiness) live in **one** central module: `src/src/domain/business-rules.ts` (see section 6). No page, component, or fixture may re-implement them.

## 2. Identifier Standards

Canonical formats (DEC-020): `IR-2026-####` for investment requests, `DEP-2026-####` for deposits, Latin digits 0–9 everywhere (DEC-021).

| Entity | Format | Example | Notes |
|---|---|---|---|
| InvestmentRequest | `IR-2026-####` | `IR-2026-0018` | `requestNumber`; 4-digit, zero-padded |
| Deposit | `DEP-2026-####` | `DEP-2026-0012` | `depositNumber` |
| User | `USR-<ROLE>-###` | `USR-DS-001` | Role prefixes per `demo-users.md` (DS, GMT, EXE, IS, FIN, ACC, ADM, RO); supporting users continue each series |
| Role | kebab-case code | `deposit-specialist` | Codes fixed in `domain-model.md` |
| Bank | `BNK-###` | `BNK-004` | Planning addition; stable across resets |
| BankInvitation (RFQ) | `RFQ-2026-####` | `RFQ-2026-0113` | Planning addition |
| BankOffer | `OFF-2026-####` | `OFF-2026-0057` | Planning addition |
| OfferEvaluation | `EVL-2026-####` | `EVL-2026-0031` | Planning addition |
| Approval | `APR-2026-####` | `APR-2026-0042` | Planning addition |
| Task | `TSK-2026-####` | `TSK-2026-0027` | Planning addition |
| Attachment | `ATT-2026-####` | `ATT-2026-0088` | Planning addition |
| Note | `NOT-2026-####` | `NOT-2026-0009` | Planning addition |
| Activity | `ACT-2026-#####` | `ACT-2026-00214` | 5-digit (≥150 records) |
| Notification | `NTF-2026-####` | `NTF-2026-0033` | Planning addition |
| MaturityAction | `MAT-2026-####` | `MAT-2026-0003` | Planning addition |

All IDs are stable, deterministic, and identical after every reset (`business-rules.md` audit rules). Display labels are never used as IDs (`domain-model.md` modeling rules).

Curated demo records must use the exact identifiers pinned by `demo-scenarios.md`: `IR-2026-0004`, `IR-2026-0006`, `IR-2026-0009`, `IR-2026-0011`, `IR-2026-0018`, `IR-2026-0021`, `DEP-2026-0008`, `DEP-2026-0012`.

Number-block allocation (planning decision PD-05, section 15): `IR-2026-0001`–`IR-2026-0030` are the 30 in-flight/terminal requests of the documented distribution (including all scenario-pinned IDs); `IR-2026-0031`–`IR-2026-0055` are the 25 historical requests already converted to deposits. `DEP-2026-0001`–`DEP-2026-0025` map 1:1 to those converted requests.

## 3. Controlled Values and Enums

All enums below are string-literal unions (or `as const` objects) planned for `src/src/domain/` in Step 07. "Persisted" means stored on entities in mock data; "Derived" means computed centrally and never stored.

### 3.1 `UserRole` — persisted (`Role.code`)

Source: `docs/05-data/domain-model.md` (role codes), `docs/02-business/roles-and-permissions.md`, DEC-011.

| Code | Arabic label | English label |
|---|---|---|
| `deposit-specialist` | أخصائي الودائع | Deposit Specialist |
| `treasury-general-manager` | مدير عام الخزينة | General Manager of Treasury |
| `investment-treasury-executive` | المدير التنفيذي لقطاع الاستثمار والخزينة | Executive Director of Investment and Treasury Sector |
| `investment-support` | أخصائي دعم الاستثمار | Investment Support Specialist |
| `finance-reviewer` | أخصائي المالية | Finance Specialist |
| `accounting-executor` | أخصائي المحاسبة | Accounting Specialist |
| `system-admin` | مدير النظام | System Administrator |
| `read-only-user` | مستخدم للعرض فقط | Read-only User |

### 3.2 `InvestmentRequestStatus` — persisted

Source: `docs/02-business/statuses-and-transitions.md` (single source of truth, DEC-012). No other status may exist.

| Code | Arabic label | English label |
|---|---|---|
| `DRAFT` | مسودة | Draft |
| `RETURNED_FOR_COMPLETION` | معاد للاستكمال | Returned for Completion |
| `PENDING_TREASURY_GM_APPROVAL` | بانتظار اعتماد مدير عام الخزينة | Pending Treasury GM Approval |
| `PENDING_EXECUTIVE_APPROVAL` | بانتظار اعتماد المدير التنفيذي لقطاع الاستثمار والخزينة | Pending Executive Approval |
| `PENDING_WINNING_BANK_COMPLETION` | بانتظار استكمال بيانات البنك الفائز | Pending Winning Bank Completion |
| `PENDING_INVESTMENT_SUPPORT_REVIEW` | بانتظار مراجعة دعم الاستثمار | Pending Investment Support Review |
| `PENDING_FINANCE_REVIEW` | بانتظار مراجعة المالية | Pending Finance Review |
| `PENDING_ACCOUNTING_EXECUTION` | بانتظار تنفيذ المحاسبة | Pending Accounting Execution |
| `PENDING_DEPOSIT_ACTIVATION` | بانتظار تفعيل الوديعة | Pending Deposit Activation |
| `CONVERTED_TO_ACTIVE_DEPOSIT` | تم التحويل إلى وديعة نشطة | Converted to Active Deposit |
| `REJECTED` | مرفوض | Rejected |
| `CANCELLED` | ملغي | Cancelled |

List views such as «طلبات تتجاوز 100 مليون ريال» are filters over these statuses, never new statuses (`investment-requests.md`).

### 3.3 `SectionCompletionStatus` — persisted (per section, per request)

Source: `statuses-and-transitions.md` "Draft Section Completion States". These never change the overall request status.

| Code | Arabic label | English label |
|---|---|---|
| `NOT_STARTED` | لم يبدأ | Not Started |
| `IN_PROGRESS` | قيد الاستكمال | In Progress |
| `COMPLETE` | مكتمل | Complete |
| `MISSING_REQUIREMENTS` | توجد نواقص | Missing Requirements |

### 3.4 `DepositStatus` — persisted

Source: `statuses-and-transitions.md`. `Approaching Maturity` (تقترب من الاستحقاق) is **derived only** from the 14-day window (DEC-012, DEC-017) and must never appear in this union.

| Code | Arabic label | English label |
|---|---|---|
| `ACTIVE` | نشطة | Active |
| `MATURED_ACTION_REQUIRED` | مستحقة وتتطلب إجراء | Matured – Action Required |
| `REINVESTED` | معاد استثمارها | Reinvested |
| `CLOSED` | مغلقة | Closed |
| `BROKEN_EARLY` | مكسورة قبل الاستحقاق | Broken Early |

### 3.5 `ApprovalStage` — persisted (`Approval.stage`, workflow rail)

Source: `statuses-and-transitions.md` transitions; `08-design-specifications/04-transaction-workspace.md` §5; workspace Arabic labels from `04-ui-ux/transaction-workspace.md` and DEC-020.

| Code | Arabic label | English label |
|---|---|---|
| `DRAFT_PREPARATION` | إعداد الطلب | Draft preparation |
| `TREASURY_GM_APPROVAL` | اعتماد مدير عام الخزينة | Treasury GM approval |
| `EXECUTIVE_APPROVAL` | اعتماد المدير التنفيذي لقطاع الاستثمار والخزينة | Executive approval |
| `WINNING_BANK_COMPLETION` | استكمال بيانات البنك الفائز | Winning bank completion |
| `INVESTMENT_SUPPORT_REVIEW` | مراجعة دعم الاستثمار | Investment Support review |
| `FINANCE_REVIEW` | مراجعة الإدارة المالية | Finance review |
| `ACCOUNTING_EXECUTION` | تنفيذ التحويل المحاسبي | Accounting execution |
| `DEPOSIT_ACTIVATION` | تفعيل الوديعة | Deposit activation |

`EXECUTIVE_APPROVAL` is included in a request's route only when the submitted amount exceeds SAR 100,000,000; the workflow rail shows it as *skipped* (متجاوز) for at-or-below-threshold requests — a display state, not a persisted value.

### 3.6 `ApprovalDecision` — persisted

Source: `domain-model.md` (Approval "Approved decisions").

| Code | Arabic label | English label |
|---|---|---|
| `PENDING` | بانتظار القرار | Pending |
| `APPROVED` | معتمد | Approved |
| `RETURNED` | معاد | Returned |
| `REJECTED` | مرفوض | Rejected |
| `CANCELLED` | ملغي | Cancelled |

### 3.7 `TaskStatus` — persisted

No document enumerates persisted task statuses; `my-tasks.md` defines completion semantics ("a task is completed only when its required business action is completed") and `mock-data-requirements.md` requires overdue / due-today / upcoming / completed distributions. Planning decision PD-02 (section 15) fixes the minimal persisted set; overdue, due-today, and upcoming are **derived** from `dueAt` vs the reference date.

| Code | Arabic label | English label | Persisted/Derived |
|---|---|---|---|
| `OPEN` | مفتوحة | Open | Persisted |
| `COMPLETED` | مكتملة | Completed | Persisted |
| `CANCELLED` | ملغاة | Cancelled | Persisted (e.g. task obsoleted by a return) |
| — overdue | متأخرة | Overdue | Derived (`dueAt` < reference date and `OPEN`) |
| — due today | مستحقة اليوم | Due today | Derived |
| — upcoming | قادمة | Upcoming | Derived |

### 3.8 `TaskPriority` — persisted

Source: `mock-data-requirements.md` task distribution.

| Code | Arabic label | English label |
|---|---|---|
| `CRITICAL` | حرجة | Critical |
| `HIGH` | عالية | High |
| `MEDIUM` | متوسطة | Medium |
| `LOW` | منخفضة | Low |

### 3.9 `RfqStatus` (BankInvitation) — persisted

Source: `03-functional/bank-rfq.md` (Arabic canonical), `business-rules.md` Bank RFQ Rules.

| Code | Arabic label | English label |
|---|---|---|
| `NOT_SENT` | لم يتم الإرسال | Not Sent |
| `SENT` | تم الإرسال | Sent |
| `RESPONSE_RECEIVED` | تم استلام الرد | Response Received |
| `DECLINED` | اعتذر البنك | Declined |
| `NO_RESPONSE` | لم يرد | No Response |

### 3.10 `OfferStatus` — persisted

Source: `business-rules.md` Bank Offer Rules (English terms canonical). Arabic labels are terminology completions consistent with the glossary (gap G-03, section 15).

| Code | Arabic label | English label |
|---|---|---|
| `VALID` | ساري | Valid |
| `EXPIRED` | منتهي الصلاحية | Expired |
| `INCOMPLETE` | غير مكتمل | Incomplete |
| `WITHDRAWN` | مسحوب | Withdrawn |
| `REJECTED` | مرفوض | Rejected |

Only `VALID` offers can be recommended or selected as the winning offer. `EXPIRED` is set in fixtures (deterministic vs the reference date), and services must also derive expiry from `validUntil` at read time so the two never disagree.

### 3.11 `RecommendationDecision` (per evaluated offer) — persisted

Source: `evaluation-and-recommendation.md`, `bank-offers.md` ("exclude an offer from evaluation with justification").

| Code | Arabic label | English label |
|---|---|---|
| `RECOMMENDED` | موصى به | Recommended |
| `NOT_RECOMMENDED` | غير موصى به | Not recommended |
| `EXCLUDED` | مستبعد من التقييم | Excluded from evaluation (justification mandatory) |

Exactly one offer per request may be `RECOMMENDED` at submission time.

### 3.12 `InvestmentSupportDecision` — persisted

Source: `execution-and-activation.md` Stage 2; `statuses-and-transitions.md` transitions.

| Code | Arabic label | English label |
|---|---|---|
| `PENDING` | بانتظار القرار | Pending |
| `APPROVED` | معتمد | Approved (forwards to Finance) |
| `RETURNED` | معاد | Returned to Deposit Specialists group |
| `REJECTED` | مرفوض | Rejected (only where the configured scenario permits) |

### 3.13 `FinanceReviewDecision` — persisted

Source: `execution-and-activation.md` Stage 3; `statuses-and-transitions.md` (Finance may reject).

| Code | Arabic label | English label |
|---|---|---|
| `PENDING` | بانتظار القرار | Pending |
| `APPROVED` | معتمد | Approved for Accounting execution |
| `RETURNED` | معاد | Returned to Investment Support |
| `REJECTED` | مرفوض | Rejected |

### 3.14 `AccountingExecutionStatus` — persisted

Source: `execution-and-activation.md` Stage 4.

| Code | Arabic label | English label |
|---|---|---|
| `PENDING` | بانتظار التنفيذ | Pending execution |
| `CONFIRMED` | تم تنفيذ التحويل | Transfer executed and confirmed |
| `RETURNED_TO_FINANCE` | معاد إلى المالية | Returned to Finance |

### 3.15 `AttachmentCategory` — persisted

Source: `mock-data-requirements.md` required categories.

| Code | Arabic label | English label |
|---|---|---|
| `LIQUIDITY_ANALYSIS` | تحليل السيولة | Liquidity analysis |
| `RFQ_CORRESPONDENCE` | مراسلات طلب العروض | RFQ correspondence |
| `BANK_OFFER` | عرض بنكي | Bank offer |
| `EVALUATION_MEMO` | مذكرة التقييم | Evaluation memorandum |
| `APPROVAL_EVIDENCE` | إثبات الاعتماد | Approval evidence |
| `IBAN_CERTIFICATE` | شهادة الآيبان | IBAN certificate |
| `TRANSFER_RECEIPT` | إيصال التحويل | Transfer receipt |
| `JOURNAL_EVIDENCE` | إثبات القيد المحاسبي | Journal evidence |
| `DEPOSIT_CERTIFICATE` | شهادة الوديعة | Deposit certificate |
| `MATURITY_CORRESPONDENCE` | مراسلات الاستحقاق | Maturity correspondence |

### 3.16 `ActivityType` — persisted

Source: `mock-data-requirements.md` activity list; `investment-request-file.md`; `prototype-interactions.md`.

| Code | Arabic label | English label |
|---|---|---|
| `REQUEST_CREATED` | إنشاء الطلب | Request created |
| `SECTION_COMPLETED` | استكمال قسم | Section completed |
| `RFQ_SENT` | إرسال طلب عروض الأسعار | RFQ sent |
| `OFFER_RECEIVED` | استلام عرض بنكي | Offer received |
| `OFFER_UPDATED` | تحديث عرض بنكي | Offer updated |
| `RECOMMENDATION_SUBMITTED` | تسجيل التوصية | Recommendation submitted |
| `REQUEST_SUBMITTED` | إرسال الطلب للاعتماد | Request submitted |
| `REQUEST_APPROVED` | اعتماد الطلب | Request approved |
| `REQUEST_RETURNED` | إعادة الطلب للاستكمال | Request returned |
| `REQUEST_REJECTED` | رفض الطلب | Request rejected |
| `REQUEST_CANCELLED` | إلغاء الطلب | Request cancelled |
| `REQUEST_RESUBMITTED` | إعادة إرسال الطلب | Request resubmitted |
| `WINNING_BANK_COMPLETED` | استكمال بيانات البنك الفائز | Winning-bank details completed |
| `SUPPORT_REVIEW_COMPLETED` | إتمام مراجعة دعم الاستثمار | Investment Support review completed |
| `FINANCE_REVIEW_COMPLETED` | إتمام مراجعة الإدارة المالية | Finance review completed |
| `EXECUTION_RECORDED` | تنفيذ التحويل المحاسبي | Accounting execution recorded |
| `DEPOSIT_ACTIVATED` | تفعيل الوديعة | Deposit activated |
| `ATTACHMENT_ADDED` | إضافة مرفق | Attachment added |
| `NOTE_ADDED` | إضافة ملاحظة | Note added |
| `MATURITY_DECISION_RECORDED` | تسجيل قرار الاستحقاق | Maturity decision recorded |
| `DEPOSIT_CLOSED` | إغلاق الوديعة | Deposit closed |
| `DEPOSIT_BROKEN` | كسر الوديعة قبل الاستحقاق | Deposit broken early |
| `REINVESTMENT_REQUEST_CREATED` | إنشاء طلب إعادة استثمار | Reinvestment request created |
| `DATA_UPDATED` | تعديل بيانات بعد الإرسال | Post-submission data update |

### 3.17 `NoteVisibility` — persisted

No document defines note-visibility tiers; the workspace spec only requires author, role, and timestamp, and states notes never replace mandatory return reasons. Planning decision PD-03 (section 15): a single value, extensible later.

| Code | Arabic label | English label |
|---|---|---|
| `INTERNAL` | ملاحظة داخلية | Internal (visible to every role authorized to view the request/deposit) |

### 3.18 `MaturityActionType` — persisted

Source: `domain-model.md` (MaturityAction approved action types).

| Code | Arabic label | English label |
|---|---|---|
| `CLOSE` | إغلاق عند الاستحقاق | Close |
| `REINVEST` | إعادة استثمار | Reinvest |
| `EXTEND_REVIEW` | تمديد المراجعة | Extend review |
| `BREAK_EARLY` | كسر مبكر | Break early |

### 3.19 Supporting reference unions

| Union | Values | Persisted/Derived | Source / note |
|---|---|---|---|
| `TenorUnit` | `MONTHS` (شهر), `DAYS` (يوم) | Persisted | `domain-model.md` (`tenorValue`/`tenorUnit`); glossary tenors 2/3/6/9/12 months |
| `Currency` | `SAR` (ريال سعودي) | Persisted | `mock-data-requirements.md` (SAR baseline); `SystemSettings.allowedCurrencies` |
| `CommunicationChannel` | `EMAIL` (بريد إلكتروني), `OFFICIAL_LETTER` (خطاب رسمي), `PHONE` (هاتف) | Persisted | `bank-rfq.md` requires a channel field; values are fixture reference data (PD-04) |
| `BankRiskCategory` | `LOW` (منخفض), `MEDIUM` (متوسط), `HIGH` (مرتفع) | Persisted (reference data) | `domain-model.md` `riskCategory`; display must not imply risk judgment without a documented rule (`05-deposit-portfolio.md` §9) |
| `SectionKey` | 15 workspace section keys (DEC-016): `overview`, `request-information`, `liquidity`, `bank-rfq`, `bank-offers`, `evaluation-recommendation`, `approval-history`, `winning-bank`, `investment-support-review`, `finance-review`, `accounting-execution`, `deposit-activation`, `attachments`, `notes`, `activity-history` | Persisted (as SectionCompletion keys) | `information-architecture.md` |
| `SectionMode` | `HIDDEN`, `READ_ONLY`, `EDITABLE`, `ACTIONABLE` | Derived per role+stage | `roles-and-permissions.md` Field-Level Editability |
| `EntityType` (for Task/Attachment/Note/Activity/Notification polymorphic links) | `INVESTMENT_REQUEST`, `DEPOSIT`, `BANK`, `USER`, `SYSTEM` | Persisted | `domain-model.md` (`entityType`) |

## 4. Entity Catalogue

Every entity below records: purpose, planned TypeScript name, identifier format, key required/optional fields, relationships, ownership, editable roles, lifecycle, persisted vs derived values, validation, allowed actions, and source. Field lists marked "per domain-model.md" adopt that document's field list verbatim; only deltas are spelled out.

### 4.1 User — `User`

- **Purpose:** prototype identity for role switching, ownership, assignment, and audit actor references.
- **ID:** `USR-<ROLE>-###`. Fields per `domain-model.md` (id, employeeNumber, displayNameAr, displayNameEn, email, jobTitleAr, departmentAr, roleId, avatarUrl, isActive).
- **Relationships:** `roleId → Role`. Referenced by requests, approvals, tasks, attachments, notes, activities, reviews.
- **Ownership / editable roles:** reference data; System Administrator manages role assignments in Settings (audited). Users are never business-editable.
- **Lifecycle:** static fixture; `isActive` toggles only.
- **Validation:** email uses the reserved `.test` domain; fictional names only; the 8 primary demo users of `demo-users.md` must exist exactly as documented (IDs, names, departments, default landing pages).
- **Source:** `domain-model.md`, `demo-users.md`.

### 4.2 Role and permissions — `Role`, `Permission`, `RolePermissions`

- **Purpose:** centralized role definitions driving navigation, dashboards, tasks, actions, and section editability.
- **ID:** kebab-case code (also the `UserRole` union). Fields per `domain-model.md` (id, code, nameAr, nameEn, description, permissions, dashboardProfile).
- **Permissions model:** a typed permission-key list (e.g. `request.create`, `request.submitDraft`, `request.deleteOwnDraft`, `request.cancel`, `approval.treasuryGm`, `approval.executive`, `winningBank.edit`, `supportReview.act`, `financeReview.act`, `accounting.execute`, `deposit.activate`, `deposit.maturityAction`, `deposit.breakEarly`, `settings.manage`, `demo.reset`, `*.view` scopes) plus the derived `getSectionMode(role, request, section)` function. The exact key list is finalized in section 10's editability matrix — Step 07 must derive it from that matrix, not from per-component conditions.
- **Derived:** everything permission-driven in the UI (visible navigation, actions, dashboards) derives from this single module.
- **Validation:** the 8 roles of §3.1 exist, no more, no fewer. Read-only User holds zero mutating permissions.
- **Source:** `roles-and-permissions.md`, `domain-model.md`, DEC-011.

### 4.3 Bank — `Bank`

- **Purpose:** banks invited to RFQs, offer providers, deposit counterparties, concentration dimension.
- **ID:** `BNK-###`. Fields per `domain-model.md` (code, nameAr, nameEn, shortName, logoUrl, relationshipManager*, isActive, riskCategory, currentExposure*).
- **Derived override (PD-06):** `currentExposureAmount` / `currentExposurePercentage` must be **derived** by the portfolio service from active deposits so that exposure always reconciles (`mock-data-requirements.md` Financial Realism). Fixtures must not hardcode exposure numbers; the fields are computed at read time (or cached and recomputed on every mutation/reset).
- **Ownership:** reference data; Administrator manages in Settings.
- **Validation:** 10 fictional Saudi-market banks, Arabic+English names, monogram/placeholder logo only (no real bank branding), ≥2 high-exposure, ≥2 low-exposure, exactly 1 inactive bank excluded from new RFQs.
- **Allowed actions:** activate/deactivate (admin); invite to RFQ (specialist) only when `isActive`.
- **Source:** `domain-model.md`, `mock-data-requirements.md` Banks.

### 4.4 Investment request — `InvestmentRequest`

- **Purpose:** the primary business object; one case per proposed placement; becomes at most one deposit.
- **ID:** `IR-2026-####`. Fields per `domain-model.md` (all 34 listed fields) with these clarifications:
  - `status: InvestmentRequestStatus`; `currentStage: ApprovalStage`.
  - `tenorValue`/`tenorUnit`; `investmentDate` (target placement) and `expectedMaturityDate`.
  - `liquiditySummary` is superseded by the structured `liquidity: LiquidityInformation` (4.6); keep `liquiditySummary: string` as the short display summary.
  - `sectionCompletion: Record<SectionKey, SectionCompletionStatus>` (4.5).
  - `priority: TaskPriority` (list/grid column requirement, `investment-requests.md`).
  - `returnReason`, `cancellationReason` optional; mandatory when the corresponding status applies.
  - `sourceDepositId` set only for reinvestment requests; `createdDepositId` set only when `CONVERTED_TO_ACTIVE_DEPOSIT`.
  - `submittedAmount: number` — the amount captured at last submission; the routing input (DEC-017 #5).
- **Derived:** `readinessPercentage`, `missingRequirementCodes`, approval route, threshold category, aging/SLA breach — all computed by `business-rules.ts` / services, recomputed after every edit (never trusted from stale storage).
- **Ownership:** `createdByUserId` (one Deposit Specialist); `currentOwnerRoleId`/`currentOwnerUserId` follow the workflow stage.
- **Editable roles:** see matrix (section 10).
- **Lifecycle:** exactly the transition table of `statuses-and-transitions.md`; invalid transitions blocked centrally.
- **Validation:** amount > 0; currency and tenor required for submission; full readiness checklist (section 8.1) gates submission; delete allowed only pre-first-submission by creator; cancellation requires reason.
- **Allowed actions by status:** per transition table + `roles-and-permissions.md`.
- **Source:** `domain-model.md`, `investment-request-lifecycle.md`, `business-rules.md`, `statuses-and-transitions.md`.

### 4.5 Request section completion — `SectionCompletion`

- **Purpose:** per-section draft progress indicators without workflow transitions (CLAUDE.md §11).
- **Shape:** embedded map on `InvestmentRequest`: `Record<SectionKey, SectionCompletionStatus>` plus derived per-section validation-issue counts.
- **Derived:** overall `readinessPercentage` = weighted completion across the mandatory preparation sections (request information, liquidity, RFQ, offers, evaluation/recommendation, attachments); `missingRequirementCodes` lists the failed readiness checks (section 8.1).
- **Rule:** changing section states never changes `status` (`business-rules.md` Draft Rules #2).
- **Source:** `statuses-and-transitions.md`, `investment-request-file.md`, CLAUDE.md §11. (Gap G-01: not modeled in `domain-model.md`; added by this plan.)

### 4.6 Liquidity information — `LiquidityInformation`

- **Purpose:** financial context supporting the placement decision.
- **Shape:** embedded object on `InvestmentRequest` (single liquidity block per request).
- **Required fields** (from `08-design-specifications/04-transaction-workspace.md` §9): `availableLiquidityAmount`, `requiredOperatingReserve`, `amountAvailableForInvestment`, `forecastPeriod`, `sourceDate`, `preparedByUserId`, `summaryNotes`, `attachmentIds` (evidence, category `LIQUIDITY_ANALYSIS`).
- **Validation:** `amountAvailableForInvestment` = `availableLiquidityAmount` − `requiredOperatingReserve` (consistency check); required liquidity evidence attached before submission.
- **Editable roles:** creating specialist during `DRAFT`/`RETURNED_FOR_COMPLETION` only.
- **Source:** `08` workspace spec §9, `business-rules.md` Submission Rules. (Gap G-01: structured entity added by this plan.)

### 4.7 Bank RFQ — `BankInvitation`

- **Purpose:** one RFQ record per contacted bank per request (`business-rules.md` Bank RFQ Rules #1).
- **ID:** `RFQ-2026-####`. Fields per `domain-model.md` (investmentRequestId, bankId, sentAt, sentByUserId, responseDeadline, communicationChannel, status: `RfqStatus`, responseReceivedAt, notes, attachmentIds) plus `contactPersonName`, `contactEmail`, `declineOrNoResponseReason` (from `bank-rfq.md` Bank Participation Records) and `emailSubject`/`messageSummary` optional (RFQ Information).
- **Relationships:** request 1→N invitations; invitation N→1 bank; offers reference their invitation.
- **Lifecycle:** `NOT_SENT → SENT → RESPONSE_RECEIVED | DECLINED | NO_RESPONSE`. Declined/No-response banks remain visible in history.
- **Editable roles:** creating specialist during preparation; read-only afterwards.
- **Validation:** invited bank must be `isActive`; minimum-contacted-banks readiness (default 3) evaluated centrally with a documented-exception field (`minimumBanksExceptionReason` on the request).
- **Source:** `bank-rfq.md`, `business-rules.md`, `domain-model.md`.

### 4.8 RFQ recipients and communications

Covered by 4.7 (`BankInvitation` carries contact, channel, timestamps, notes, correspondence attachments with category `RFQ_CORRESPONDENCE`). No separate entity — one record per bank per request is the documented granularity. Simulated sending only; no real email.

### 4.9 Bank offer — `BankOffer`

- **Purpose:** one quoted offer from one bank; a bank may submit several.
- **ID:** `OFF-2026-####`. Fields per `domain-model.md` (22 fields incl. `annualRate`, `expectedReturnAmount`, `valueDate`, `maturityDate`, `validUntil`, `isShariaCompliant`, `productType`, `specialConditions`, `status: OfferStatus`, `isRecommended`, `evaluationScore`, `attachmentIds`) plus `earlyBreakTerms`, `partialBreakAvailable` (from `bank-offers.md`).
- **Derived:** `expectedReturnAmount` must equal the central formula output (section 7.1); calculated values are displayed as decision aids distinct from bank-provided values.
- **Validation:** rate > 0; amount and currency mandatory; `valueDate < maturityDate`; maturity consistent with value date + tenor; `validUntil` determines derived expiry; expired/incomplete/withdrawn offers cannot be recommended; each offer belongs to a contacted (invited) bank.
- **Editable roles:** creating specialist while the request is editable.
- **Source:** `bank-offers.md`, `business-rules.md`, `domain-model.md`.

### 4.10 Offer comparison — derived view

Comparison (side-by-side table, sorting by rate/expected return/tenor/validity, concentration context) is a **derived presentation** over `BankOffer` + `OfferEvaluation` + bank exposure. No persisted entity. Source: `bank-offers.md` Comparison Experience, `08-04` §11.

### 4.11 Evaluation and recommendation — `EvaluationCriterion`, `OfferEvaluation`, `Recommendation`

- **`EvaluationCriterion`** per `domain-model.md`: id, code, nameAr, weight, isActive, calculationType; the 7 prototype criteria (annual return rate, expected return amount, bank concentration impact, validity period, tenor alignment, operational readiness, special conditions). Reference data, admin-managed.
- **`OfferEvaluation`** per `domain-model.md`: id (`EVL-2026-####`), investmentRequestId, offerId, criterionScores, weightedScore, rank, reviewerNotes, evaluatedByUserId, evaluatedAt; plus `decision: RecommendationDecision` and `exclusionJustification` (mandatory when `EXCLUDED`).
- **`Recommendation`** (embedded on `InvestmentRequest`, per Step 07 prompt's type list): `recommendedOfferId`, `recommendedBankId`, `recommendedAmount`, `recommendedTenorValue/Unit`, `recommendedRate`, `expectedReturnAmount`, `rationale` (mandatory), `keyRisks`, `alternativesConsidered`, `recommendedByUserId`, `recommendedAt` (from `evaluation-and-recommendation.md` Recommendation Record).
- **Rules:** recommended offer must be `VALID` and complete; rationale mandatory; a lower-rate offer may be recommended with documented justification; read-only after submission unless returned; changes after return recorded in activity.
- **Source:** `evaluation-and-recommendation.md`, `domain-model.md`, `business-rules.md` Evaluation Rules.

### 4.12–4.14 Approval workflow, approval steps, return/resubmission history — `Approval`

- **Purpose:** one record per decision cycle step; the append-only approval history.
- **ID:** `APR-2026-####`. Fields per `domain-model.md`: investmentRequestId, stage: `ApprovalStage`, approverRoleId, approverUserId, decision: `ApprovalDecision`, decisionAt, comments, returnToRoleId, sequence.
- **Workflow derivation:** the route is **never stored as a hand-written list**; `business-rules.ts` exposes `getApprovalRoute(submittedAmount)` → `[TREASURY_GM_APPROVAL]` or `[TREASURY_GM_APPROVAL, EXECUTIVE_APPROVAL]` followed by the fixed execution stages. Threshold evaluated from the submitted amount; recalculated on resubmission if the amount changed (DEC-017 #5–6).
- **Return history:** a `RETURNED` decision keeps its record; resubmission opens a **new** decision cycle (`sequence` increments) while earlier cycles remain visible (`approvals.md` Rules). A returned request resumes at the stage that returned it (`statuses-and-transitions.md`). Executive returns route through the Treasury approval path (GM reviews the executive feedback).
- **Validation:** approver role must match the stage; return/reject require reasons; decisions immutable once made; duplicate actions blocked; an approver acts only when the request is assigned to their role.
- **Source:** `statuses-and-transitions.md`, `approvals.md`, `business-rules.md` Decision Rules, `domain-model.md`.

### 4.15–4.16 Winning bank selection and IBAN information — `WinningBankDetails`

- **Purpose:** operational beneficiary details completed after final investment approval.
- **Shape:** embedded object on `InvestmentRequest` (`winningBankDetails`), per `domain-model.md`: bankId, beneficiaryName, iban, bankAccountNumber, bankSwiftCode, transferAmount, valueDate (`تاريخ بدء الوديعة`), depositReference, ibanCertificateAttachmentId, verifiedByUserId, verifiedAt; plus `winningOfferId`, `relationshipManagerDetails`, `finalRate`, `controlledChangeJustification` (mandatory when the winning offer differs from the approved recommendation), `notes` (from `execution-and-activation.md` Stage 1 and `investment-request-lifecycle.md` §4).
- **Rules:** completed only at `PENDING_WINNING_BANK_COMPLETION` by the Deposit Specialists group; winning offer must be one of the request's valid submitted offers and match the approved recommendation unless a controlled change is documented; IBAN certificate attachment mandatory before Investment Support submission; beneficiary and bank details visible to Finance and Accounting.
- **Source:** `business-rules.md` Winning Bank Rules, `execution-and-activation.md`, `domain-model.md`.

### 4.17 Investment Support review — `InvestmentSupportReview` (gap G-01 addition)

- **Purpose:** completeness/control review after winning-bank completion.
- **ID:** `ISR-2026-####`. Planned fields: id, investmentRequestId, reviewerUserId, decision: `InvestmentSupportDecision`, checklist ({ approvalRouteComplete, winningOfferMatchesRecommendation, beneficiaryAndIbanComplete, mandatoryDocumentsPresent, noUnresolvedReturnReason } — the five verifications of `execution-and-activation.md` Stage 2), comments, returnReason (mandatory on `RETURNED`), evidenceAttachmentIds, reviewedAt.
- **Editable roles:** Investment Support Specialist only, at `PENDING_INVESTMENT_SUPPORT_REVIEW`.
- **Rules:** checklist must be complete before approval; return targets the Deposit Specialists group; reject only where the configured scenario permits.
- **Source:** `execution-and-activation.md` Stage 2, `roles-and-permissions.md`, `08-04` §15.

### 4.18 Finance review — `FinanceReview`

- Per `domain-model.md`: id, investmentRequestId, reviewerUserId, reviewStatus: `FinanceReviewDecision`, budgetAvailabilityConfirmed, cashAvailabilityConfirmed, beneficiaryVerified, comments, reviewedAt; plus `returnReason` (mandatory on `RETURNED`), `evidenceAttachmentIds`.
- **Information boundary:** Finance sees only approved amount, winning bank, beneficiary/IBAN + evidence, winning-offer summary, Investment Support outcome, transfer purpose, and required financial attachments — enforced by the section-visibility matrix, not per-component conditions.
- **Source:** `domain-model.md`, `execution-and-activation.md` Stage 3, `roles-and-permissions.md`.

### 4.19 Accounting execution — `AccountingExecution`

- Per `domain-model.md`: id, investmentRequestId, executorUserId, executionStatus: `AccountingExecutionStatus`, journalReference, paymentReference, transferDate, transferAmount, transferAttachmentId, comments, executedAt; plus `debitAccount`, `beneficiaryAccount`, `varianceJustification` (from `execution-and-activation.md` Stage 4 and `business-rules.md` Review and Execution Rules #4).
- **Rules:** cannot execute before Finance approval; transfer amount must match the approved amount unless an authorized documented variance exists (variance is a structured exception, not a note); reference details and evidence mandatory before confirmation; return to Finance requires a reason.
- **Source:** `execution-and-activation.md`, `business-rules.md`, `domain-model.md`.

### 4.20 Deposit activation — `DepositActivation` (gap G-01 addition)

- **Purpose:** the specialist's confirmation that the bank activated the deposit; the conversion trigger.
- **ID:** `DAC-2026-####` (or embedded on the request; Step 07 may embed — the fields are what matter). Planned fields (from `execution-and-activation.md` Stage 5): investmentRequestId, bankDepositReference, actualValueDate, actualMaturityDate, confirmedRate, confirmedAmount, certificateAttachmentId, activationConfirmationDate, confirmedByUserId, notes.
- **Rules:** available only after `AccountingExecution.executionStatus === CONFIRMED`; mandatory terms present before confirmation; confirming creates **exactly one** `Deposit`, sets `createdDepositId`, and moves the request to `CONVERTED_TO_ACTIVE_DEPOSIT`; duplicate activation blocked; differences between approved and actual terms highlighted.
- **Source:** `execution-and-activation.md` Stage 5, `investment-request-lifecycle.md` §8, acceptance criteria.

### 4.21–4.22 Active, matured, and historical deposits — `Deposit`, `MaturityAction`

- **`Deposit`** per `domain-model.md` (23 fields) with clarifications:
  - `status: DepositStatus` (§3.4); `daysToMaturity` is **derived** (PD-06), never seeded.
  - `actualReturnAmount` populated only for closed/broken deposits (expected vs realized must remain distinguishable).
  - Break fields (`brokenAt`, `breakReason`) plus planned `breakPenaltyAmount`, `realizedReturnAmount`, `bankConfirmationAttachmentId` for the early-break record (`deposit-lifecycle.md` Early Break Principle).
  - Permanent links: `sourceInvestmentRequestId` (exactly one), winning offer via the source request, `reinvestmentRequestId` when applicable.
- **`MaturityAction`** per `domain-model.md`: id, depositId, actionType: `MaturityActionType`, decisionByUserId, decisionAt, notes, resultingRequestId (for `REINVEST`).
- **Derived indicators:** `isApproachingMaturity` (maturity within 14 calendar days of the reference date and status `ACTIVE`) — display condition only.
- **Lifecycle:** `ACTIVE → MATURED_ACTION_REQUIRED → CLOSED | REINVESTED`; `ACTIVE → BROKEN_EARLY` (exceptional, reason + evidence mandatory). Historical terms immutable.
- **Editable roles:** Deposit Specialist records maturity actions and activation; break-early follows `prototype-interactions.md` (confirmation + mandatory reason). All other roles read-only per permissions.
- **Source:** `deposit-lifecycle.md`, `deposit-portfolio.md`, `statuses-and-transitions.md`, `domain-model.md`.

### 4.23 Task — `Task`

- Per `domain-model.md`: id, type, title, description, entityType, entityId, assignedRoleId, assignedUserId (optional for group tasks), priority: `TaskPriority`, status: `TaskStatus`, dueAt, createdAt, completedAt, actionCode; plus `returnReason` display field when the task originates from a return (`my-tasks.md` Required Task Data) and `completedByUserId` (group tasks record the actual actor).
- **Rules:** tasks originate only from workflow events (submission, approval assignment, return, winning-bank completion, reviews, execution, activation, maturity follow-up) — no user-created tasks; a task completes only when its business action completes; group tasks may be claimed by an eligible user; `dueAt` = stage entry + stage SLA (section 6, DEC-017 #4) in business days; overdue is derived.
- **Validation:** assigned role must match the current workflow stage of the linked entity; every task links to a valid request or deposit.
- **Source:** `my-tasks.md`, `domain-model.md`, `business-rules.md` Prototype Business Defaults.

### 4.24 Attachment — `Attachment`

- Per `domain-model.md`: id, entityType, entityId, category: `AttachmentCategory`, fileName, fileType, fileSizeBytes, fileUrl, uploadedByUserId, uploadedAt, isRequired, validationStatus; plus `sectionKey` (workspace attachment register groups by section context, `08-04` §19).
- **Rules:** realistic Arabic filenames; lightweight local placeholder files (no real documents); mandatory categories enforced at readiness/stage gates (liquidity evidence, offer source, IBAN certificate, transfer evidence, deposit certificate); prototype-document labeling in UI.
- **Editable roles:** upload/replace/remove only by the role editing the owning section at its stage; read-only elsewhere.
- **Source:** `domain-model.md`, `mock-data-requirements.md` Attachments, `08-04` §9/§19.

### 4.25 Note — `Note` (gap G-01 addition)

- **Purpose:** contextual annotations on requests and deposits; never a substitute for mandatory return reasons.
- **ID:** `NOT-2026-####`. Planned fields: id, entityType, entityId, authorUserId, authorRoleId, body, visibility: `NoteVisibility`, createdAt, sectionKey (optional context).
- **Rules:** any role with edit or action rights on the entity at its current stage may add notes; Read-only User cannot; notes are append-only; `NOTE_ADDED` activity recorded.
- **Source:** `04-ui-ux/transaction-workspace.md`, `08-04` §19, `investment-request-lifecycle.md` §9 ("read-only except for authorized notes").

### 4.26 Activity history — `Activity`

- Per `domain-model.md`: id, entityType, entityId, activityType: `ActivityType`, title, description, actorUserId, occurredAt, metadata; plus `actorRoleId`, `previousStatus`, `newStatus`, `comment` (history entries must record previous status, new status, actor, role, timestamp, action, and comment — `statuses-and-transitions.md` Transition Controls).
- **Rules:** append-only; every material action writes exactly one entry; timestamps follow the lifecycle sequence; no keystroke/autosave noise (`08-04` §21).
- **Source:** `domain-model.md`, `business-rules.md` Audit rules, `statuses-and-transitions.md`.

### 4.27 Notification — `Notification` (gap G-02 addition)

- **Purpose:** the top-bar notification indicator (`navigation.md` Top Bar) and role-directed event feed. Kept deliberately minimal: notifications are a **projection of workflow events**, not a parallel messaging system, and must not be confused with tasks (`ux-review-checklist.md`).
- **ID:** `NTF-2026-####`. Planned fields: id, recipientRoleId, recipientUserId (optional), eventActivityId (link to the source `Activity`), titleAr, entityType, entityId, createdAt, isRead.
- **Fixture scope:** a small seeded set (~20) derived from recent activities so the indicator is populated; runtime workflow actions append notifications for the next responsible role. Notification **rules** administration (`07-settings.md` §9) is a read-only reference-data view in the prototype; no delivery channels.
- **Source:** `04-ui-ux/navigation.md`, `08-design-specifications/07-settings.md` §9. (Documented as prototype projection; no new business rules.)

### 4.28 Reports and dashboard-derived data — derived only

No persisted report entities. A central `analytics` service derives, from the entity stores: portfolio totals, weighted average rate, expected return, maturity ladder/buckets (0–30/31–60/61–90/91–180/180+ days), bank concentration, tenor distribution, request pipeline by stage, approval turnaround (from `Approval` timestamps), returned/rejected counts, bank participation and response rates, offer-rate comparisons, SLA breaches, and role dashboard KPIs. Every metric must reconcile with list views because it is computed from the same store (`reports-and-analytics.md` Rules, `dashboard.md`, functional-review checklist "Dashboard Data Integrity").

### 4.29 System settings — `SystemSettings` (gap G-01 addition)

- **Purpose:** centralized configurable prototype values consumed by `business-rules.ts` (never hardcoded in components).
- **Shape:** single object in the store. Planned fields (from `03-functional/settings.md` and DEC-017): `approvalThresholdSar` (default `100_000_000`), `minContactedBanks` (default `3`), `maturityWarningDays` (default `14`), `slaByStage` (GM 2, Executive 2, Support 1, Finance 1, Accounting 1, Activation 1 — business days), `allowedCurrencies` (['SAR']), `standardTenors` ([2, 3, 6, 9, 12] months), `referenceDate` (section 11.2), `dayCountBasis` (360).
- **Editable roles:** System Administrator only; edits are audited; reset restores defaults.
- **Source:** `settings.md`, `business-rules.md` Prototype Business Defaults, DEC-017/DEC-019.

### 4.30 Demo-data reset behavior — service behavior, not an entity

- In-memory store only (DEC-019): no localStorage, IndexedDB, backend, or database. Browser reload rebuilds the deterministic seed.
- `resetDemoData()` — the administrator's explicit `إعادة ضبط البيانات التجريبية` action — replaces the entire store with the freshly generated deterministic baseline (identical IDs, values, timestamps) without page reload; requires a confirmation dialog.
- `loadScenario(scenarioId)` resets state then applies a curated scenario starting point (section 12); reset-current-scenario and reset-all are separate controls (`demo-scenarios.md` Scenario Controls).
- **Source:** DEC-019, `settings.md`, `demo-scenarios.md`, `prototype-interactions.md`.

## 5. Relationship Summary

Adopted verbatim from `domain-model.md` Relationships, extended for the added entities:

- Role 1→N User.
- InvestmentRequest N→1 creator User; 1→N BankInvitation; 1→N BankOffer; 1→N OfferEvaluation; 1→N Approval; 1→N Task/Attachment/Note/Activity; 1→0..1 Recommendation (embedded); 1→0..1 WinningBankDetails (embedded); 1→0..1 InvestmentSupportReview; 1→0..1 FinanceReview (per cycle; returns create new records with incremented sequence); 1→0..1 AccountingExecution; 1→0..1 DepositActivation; 1→0..1 created Deposit; 0..1 source Deposit (reinvestment).
- BankOffer N→1 Bank, N→1 InvestmentRequest, N→1 BankInvitation.
- Deposit 1→1 source InvestmentRequest; N→1 Bank; 1→N MaturityAction; 1→0..1 reinvestment InvestmentRequest.
- Task/Attachment/Note/Activity/Notification → polymorphic (`entityType`, `entityId`).
- Reinvestment lineage: Source Deposit → Reinvestment Request (`sourceDepositId`) → New Deposit (bidirectional links visible).

## 6. Centralized Business Rules (`src/src/domain/business-rules.ts`)

Step 07 must implement each rule **exactly once** in this module (constants read from `SystemSettings`), and every consumer — services, fixtures, generators, UI — must call it. Canonical home of the values: `docs/02-business/business-rules.md` (DEC-017).

| # | Rule | Canonical value |
|---|---|---|
| R-01 | Approval threshold | SAR 100,000,000, inclusive lower path (≤ threshold → short path) |
| R-02 | Short route | Specialist → Treasury GM → execution stages |
| R-03 | Extended route (> threshold) | Specialist → Treasury GM → Executive Director of Investment and Treasury Sector → execution stages |
| R-04 | Execution stages (both routes) | Winning bank completion → Investment Support → Finance → Accounting → Deposit activation |
| R-05 | Threshold input | The amount submitted for approval (`submittedAmount`) |
| R-06 | Route recalculation | If the amount changes after a return and before resubmission, recompute the route |
| R-07 | Draft principle | Status stays `DRAFT` until first submission; section completion never transitions the workflow |
| R-08 | Returned status | `معاد للاستكمال` (`RETURNED_FOR_COMPLETION`), never a plain draft; resumes at the stage that returned it; history preserved |
| R-09 | Minimum contacted banks | 3, or a documented exception reason |
| R-10 | Expected return | `principal × annualRate × tenorDays ÷ 360` (360-day basis) |
| R-11 | Maturity warning window | 14 calendar days; derived indicator only, never persisted |
| R-12 | SLAs (business days) | Treasury GM 2, Executive 2, Investment Support 1, Finance 1, Accounting 1, Activation 1 |
| R-13 | Mandatory reasons | Every return, rejection, and cancellation requires a reason |
| R-14 | Terminal states | `REJECTED` and `CANCELLED` are terminal and read-only; `CONVERTED_TO_ACTIVE_DEPOSIT` read-only except authorized notes/attachment viewing |
| R-15 | Deletion | Draft deletable by creator before first submission only; never after |
| R-16 | One-to-one conversion | One completed request → exactly one deposit; one deposit → exactly one source request |
| R-17 | Reinvestment | Creates a new request linked to the source deposit; never edits the source deposit |
| R-18 | Execution ordering | Accounting cannot execute before Finance approval; activation cannot occur before confirmed execution |
| R-19 | Transfer variance | Transfer amount must match approved amount unless an authorized documented variance exists |
| R-20 | Digits | Latin digits 0–9 for all financial values, dates, identifiers, tabular data (DEC-021; implemented in the central format utility, referenced here for completeness) |

Planned exports (names indicative): `getApprovalRoute(amount)`, `requiresExecutiveApproval(amount)`, `calculateExpectedReturn(principal, annualRate, tenorDays)`, `getTenorDays(tenorValue, tenorUnit)`, `isApproachingMaturity(deposit, referenceDate)`, `getDaysToMaturity(deposit, referenceDate)`, `getReadiness(request)`, `getMissingRequirements(request)`, `getNextStage(request, action)`, `canTransition(request, action, role)`, `getReturnTarget(stage)`, `getStageSlaDueDate(stage, enteredAt)`, `getSectionMode(role, request, section)`.

## 7. Derived Calculations

Never persisted; always computed centrally from `SystemSettings` + entity stores:

| Derived value | Formula / rule | Source |
|---|---|---|
| Expected return | R-10 | `business-rules.md`, glossary |
| Tenor days | months × 30 for the 360-day basis (2/3/6/9/12 months → 60/90/180/270/360 days); explicit days pass through | Consistent with R-10's banking basis (PD-07) |
| `daysToMaturity` | `maturityDate − referenceDate` in calendar days | `domain-model.md` modeling rules |
| Approaching maturity | `ACTIVE` and `0 ≤ daysToMaturity ≤ 14` | DEC-017 #3 |
| Readiness percentage | completed mandatory readiness checks ÷ total checks (section 8.1) | `investment-request-file.md` |
| Missing requirements | failed readiness checks, coded | `business-rules.md` Submission Rules |
| Offer expiry | `validUntil < referenceDate` → treated as `EXPIRED` | `bank-offers.md` |
| Task overdue / due today / upcoming | `dueAt` vs reference date | `my-tasks.md`, PD-02 |
| SLA breach ("delayed") | stage age > `slaByStage[stage]` business days | DEC-017 #4, `dashboard.md` |
| Bank exposure | Σ active-deposit principal per bank; percentage of total active principal | `mock-data-requirements.md`, PD-06 |
| Weighted average rate | Σ(principal × rate) ÷ Σ(principal) over active deposits | `deposit-portfolio.md` |
| Maturity buckets | 0–30 / 31–60 / 61–90 / 91–180 / 180+ days | `05-deposit-portfolio.md` §8 |
| Threshold category | ≤ / > SAR 100M from `submittedAmount` | R-01/R-05 |
| All dashboard/report KPIs | derived from stores (section 4.28) | `reports-and-analytics.md` |

## 8. Validation Rules

### 8.1 Submission readiness checklist (blocks `Submit`)

From `business-rules.md` Submission Rules — each check gets a stable code for `missingRequirementCodes`:

1. `REQ_INFO_COMPLETE` — request information complete.
2. `AMOUNT_POSITIVE` — amount > 0.
3. `CURRENCY_SELECTED`, `TENOR_SELECTED`.
4. `LIQUIDITY_COMPLETE` — liquidity information complete.
5. `LIQUIDITY_EVIDENCE` — required liquidity attachment present.
6. `MIN_BANKS_CONTACTED` — ≥ 3 invited banks, or documented exception.
7. `VALID_OFFER_EXISTS` — ≥ 1 `VALID` offer.
8. `EVALUATION_COMPLETE` — evaluation and recommendation complete.
9. `RECOMMENDED_OFFER_SET` — exactly one recommended, valid offer.
10. `RECOMMENDATION_RATIONALE` — written rationale present.
11. `MANDATORY_ATTACHMENTS` — mandatory attachment categories present.
12. `COMPLETENESS_CONFIRMED` — specialist confirmation flag.

### 8.2 Stage-gate validations

- Winning-bank submission: IBAN + certificate attachment mandatory; winning offer valid and matching recommendation or controlled change documented (R-16 family).
- Investment Support approval: all five checklist items confirmed.
- Finance approval: budget/cash/beneficiary confirmations recorded.
- Accounting confirmation: transfer date, references, amount, evidence present; variance justified (R-19).
- Activation: all Stage-5 mandatory terms present; execution confirmed (R-18).
- Every return/reject/cancel dialog: reason mandatory (R-13).
- Offer entry: §4.9 validations; date ordering; expired offers cannot be recommended.
- Central transition guard: `canTransition` blocks any action not in the transition table for the actor's role and current status.

## 9. Persisted vs Derived Summary

Persisted in fixtures/store: all entity records of section 4 (except 4.10, 4.28), including seeded timestamps, statuses, and financial terms.
Derived at runtime, never seeded: readiness, missing requirements, days-to-maturity, approaching-maturity, overdue/aging, SLA breaches, bank exposure, offer expiry evaluation, all KPI/report aggregations, section modes, approval routes.
Seeded-but-verified: `expectedReturnAmount` values are stored on offers/deposits for display stability but must exactly equal the central formula; the integrity checker (section 13) fails the seed otherwise.

## 10. Role-Based Editability Matrix

Section modes (`HIDDEN` / `READ_ONLY` / `EDITABLE` / `ACTIONABLE`) derive from one central matrix. Summary of the matrix Step 07 must encode (source: `roles-and-permissions.md`, `execution-and-activation.md`, `statuses-and-transitions.md`):

| Stage (status) | Editable/actionable role | What is editable | Everyone else |
|---|---|---|---|
| `DRAFT` / `RETURNED_FOR_COMPLETION` (returned to specialist) | Creating Deposit Specialist (or assigned specialist for group returns) | All preparation sections (request info, liquidity, RFQ, offers, evaluation/recommendation, attachments, notes); submit/resubmit; delete (pre-first-submission only) | Drafts hidden from Finance, Accounting, Investment Support, and non-Treasury roles; Treasury GM read-only on authorized Treasury requests |
| `PENDING_TREASURY_GM_APPROVAL` | Treasury GM | Decision panel only (approve/return/reject + comment); cannot edit specialist data | Specialist read-only; executive read-only if authorized |
| `PENDING_EXECUTIVE_APPROVAL` | Executive Director | Decision panel only | Read-only per visibility |
| `PENDING_WINNING_BANK_COMPLETION` | Deposit Specialists group | Winning-bank and IBAN section; submit to Investment Support | Prior sections read-only for all |
| `PENDING_INVESTMENT_SUPPORT_REVIEW` | Investment Support Specialist | IS checklist, comments, evidence; approve/return/reject | Read-only |
| `PENDING_FINANCE_REVIEW` | Finance Specialist | Finance checklist, comments, evidence; approve/return/reject | Finance sees only the restricted information set (4.18); draft-working details and internal comparisons hidden from Finance |
| `PENDING_ACCOUNTING_EXECUTION` | Accounting Specialist | Execution details, references, evidence; confirm/return | Read-only |
| `PENDING_DEPOSIT_ACTIVATION` | Deposit Specialists group | Activation section; confirm activation | Read-only |
| `CONVERTED_TO_ACTIVE_DEPOSIT`, `REJECTED`, `CANCELLED` | — | Notes viewing/adding per 4.25 (not for terminal-rejected editing) | All read-only |
| Deposit lifecycle | Deposit Specialist | Maturity actions, reinvestment creation, early break (with confirmation + reason) | Read-only |
| Settings | System Administrator | Business configuration, reference data, users/roles, demo reset | User switcher only; configuration read-only |
| Read-only User | — | Nothing; view-only everywhere authorized | — |

Additional constraints: completed stages are always read-only; visibility ≠ editability; the Administrator must not perform business workflow decisions in normal scenarios; a user cannot act on a task assigned to another role.

## 11. Mock-Data Plan

### 11.1 Fixture module structure (final)

Baseline tree per `mock-data-requirements.md` Seed Organization, extended (extension marked ▲) for entities this plan added — all under `src/src/mock-data/`:

```text
src/src/mock-data/
├── reference-date.ts          # PROTOTYPE_REFERENCE_DATE (single source)
├── seed.ts                  ▲ # fixed seed constant + seeded PRNG (mulberry32-style)
├── roles.ts
├── users.ts                   # 8 primary (exact demo-users.md identities) + 15 supporting
├── banks.ts                   # 10 banks
├── evaluation-criteria.ts   ▲ # 7 criteria (reference data)
├── investment-requests.ts     # curated 30 + generated 25 converted
├── bank-invitations.ts
├── bank-offers.ts             # ≥100
├── evaluations.ts             # OfferEvaluation records + embedded recommendations data
├── approvals.ts               # ≥35 decisions incl. full historical chains
├── execution-reviews.ts     ▲ # InvestmentSupportReview, FinanceReview, AccountingExecution, DepositActivation records
├── deposits.ts                # 25 deposits + MaturityAction records
├── tasks.ts                   # ≥40
├── attachments.ts             # ≥80
├── notes.ts                 ▲
├── activities.ts              # ≥150
├── notifications.ts         ▲ # ~20 projected from activities
├── system-settings.ts       ▲ # DEC-017 defaults
├── scenarios.ts             ▲ # curated scenario definitions (section 12)
├── integrity.ts             ▲ # referential-integrity checker (section 13), run in dev/seed
└── index.ts                   # composes the deterministic baseline dataset
```

No single giant data file; each module owns one concern. Generators that produce volume records live beside the fixtures they feed (or in a `generators/` subfolder if Step 07 prefers — content, not layout, is binding here; the documented module names above are the contract).

### 11.2 Reference date and seed

- `PROTOTYPE_REFERENCE_DATE = '2026-07-27T09:00:00+03:00'` (Riyadh). All seeded timestamps and all derived date logic (maturity, overdue, aging, expiry) use this constant; the system clock is **never** read during seed generation (`mock-data-requirements.md` Date Strategy). Changing this one constant shifts the demonstrated "today".
- `MOCK_DATA_SEED = 20260727`. A small deterministic PRNG (e.g. mulberry32) seeded with this constant drives every generated value (names, amounts, rates, dates, distributions). Same seed → byte-identical dataset on every load and reset.

### 11.3 Curated fixtures vs deterministic generators

- **Curated (hand-authored, stable):** the 8 primary users, 10 banks, evaluation criteria, system settings, and the ~12 scenario-critical requests/deposits (all IDs pinned by `demo-scenarios.md`, with exact statuses, amounts, readiness gaps, offers, and return reasons the scenarios require). Curated records never depend on the PRNG.
- **Generated (seeded PRNG):** supporting users, the remaining in-flight requests of the 30-request distribution, the 25 historical converted requests with their full approval chains, execution records, deposits, the offer volume, tasks, attachments, notes, activities, notifications. Generators fill realistic Arabic titles, rationales, and comments from curated phrase pools (no lorem ipsum, no "test 1").
- **Relationship:** `index.ts` composes curated + generated records into one baseline dataset; `resetDemoData()` re-runs this composition; `loadScenario()` resets then applies scenario deltas; in-memory repositories/services are initialized from the composed baseline and are the only mutation path afterwards.

### 11.4 Volumes and distributions (baseline seed)

Meets or exceeds every minimum in `mock-data-requirements.md` and CLAUDE.md §16:

| Set | Count | Distribution |
|---|---|---|
| Investment requests | **55** | 30 per the documented distribution: 5 `DRAFT`, 3 `RETURNED_FOR_COMPLETION`, 4 `PENDING_TREASURY_GM_APPROVAL`, 3 `PENDING_EXECUTIVE_APPROVAL`, 3 `PENDING_WINNING_BANK_COMPLETION`, 3 `PENDING_INVESTMENT_SUPPORT_REVIEW`, 3 `PENDING_FINANCE_REVIEW`, 2 `PENDING_ACCOUNTING_EXECUTION`, 2 `PENDING_DEPOSIT_ACTIVATION`, 1 `CANCELLED`, 1 `REJECTED`; **plus 25 `CONVERTED_TO_ACTIVE_DEPOSIT`** as the deposits' source requests (gap G-04) |
| Amount spread | — | ≥10 requests ≤ SAR 100M, ≥10 > SAR 100M, **≥1 exactly SAR 100,000,000** (short path, boundary case); principals ≈ SAR 10M–300M |
| Readiness / returns / reinvestment | — | ≥5 requests with incomplete readiness; ≥4 with return reasons; 3 reinvestment-originated requests (`sourceDepositId` set: 1 → the `REINVESTED` deposit, 2 → matured/near-maturity deposits pending processing) |
| Deposits | **25** | Persisted: 18 `ACTIVE` (of which 4 within the 14-day window → derived approaching-maturity), 2 `MATURED_ACTION_REQUIRED`, 3 `CLOSED`, 1 `REINVESTED`, 1 `BROKEN_EARLY`; spread across banks, tenors (2–12 months), rates, maturity months; visible concentration in the 2 high-exposure banks |
| Banks | **10** | 2 high exposure, 2 low exposure, 1 inactive (excluded from new RFQs) |
| Bank offers | **≥100** | Valid, expired (validUntil < reference date), incomplete, withdrawn, recommended, and non-recommended-high-rate offers (concentration/operational justifications); ≥2 comparable offers per offered request unless a documented exception; some banks with multiple offers at different tenors; amounts ≤ request amount unless marked partial/alternative |
| Tasks | **≥40** | All four priorities; overdue, due-today, upcoming, completed; every role's inbox populated (incl. group tasks for the Deposit Specialists group); returned-work tasks carry return reasons |
| Users | **23** | 8 primary demo users (verbatim from `demo-users.md`) + 15 supporting (4 DS, 2 Treasury, 2 IS, 3 Finance, 2 Accounting, 2 system support) |
| Attachments | **≥80** | All 10 categories; realistic Arabic filenames; mandatory categories present wherever a stage gate requires them |
| Activities | **≥150** | Full lifecycle coverage incl. returns, rejection, cancellation, executions, activations, maturity decisions, closure, break, reinvestment; timestamps strictly lifecycle-ordered |
| Approvals | **≥35** | Complete chains on all 25 converted requests (mix of short and extended paths) + in-flight pending/returned/rejected decisions; return cycles with preserved history |
| Notes | ~15 | Across scenario-critical requests and deposits |
| Notifications | ~20 | Projected from recent activities per role |

Role-specific dashboards, task inboxes, and the Read-only walkthrough must all be non-empty from this baseline (dashboard/functional checklists).

### 11.5 Realism rules

Arabic names from realistic Saudi name pools (fictional); fictional Saudi-market bank names with no real-brand claims; Saudi treasury/banking terminology from the glossary; plausible-but-fictional rates; amounts, rates, tenors, and expected returns mathematically consistent via R-10; `.test` emails; Latin digits (DEC-021); no placeholder text.

## 12. Curated Demo Scenarios

`scenarios.ts` defines the 10 scenarios of `demo-scenarios.md` (IDs `SCN-01`…`SCN-10`), each with: id, titleAr, description, startingUserId, startingRoute, required record IDs, and expected outcome notes for presenters. The baseline seed already contains every scenario's starting state; `loadScenario()` therefore = reset + navigate/select user (no data mutation needed beyond reset). Scenario-critical fixtures:

| Scenario | Record | Seeded state |
|---|---|---|
| 1 — Prepare and submit | `IR-2026-0018` | `DRAFT`, SAR 80,000,000, owner `USR-DS-001`, readiness ≈65%, missing: one liquidity attachment, one offer `validUntil`, recommendation rationale |
| 2 — Approve below threshold | `IR-2026-0018` | Same record after Scenario-1 actions (runtime transition) |
| 3 — Executive approval | `IR-2026-0021` | SAR 180,000,000, `PENDING_EXECUTIVE_APPROVAL`, GM approval recorded |
| 4 — Return incomplete | `IR-2026-0011` | `PENDING_TREASURY_GM_APPROVAL`, weak lower-rate justification |
| 5 — Compare beyond highest rate | `IR-2026-0009` | 3 valid offers: high-rate/high-concentration bank, slightly-lower-rate/low-concentration bank, low-rate restrictive-conditions bank; evaluations seeded |
| 6 — Post-approval reviews | `IR-2026-0006` | `PENDING_INVESTMENT_SUPPORT_REVIEW`, winning bank + IBAN certificate present |
| 7 — Execute and activate | `IR-2026-0004` | `PENDING_ACCOUNTING_EXECUTION`, Finance approved |
| 8 — Near-maturity deposit | `DEP-2026-0012` | `ACTIVE`, maturity within 14 days of the reference date |
| 9 — Early break | `DEP-2026-0008` | `ACTIVE`, safely outside the maturity window |
| 10 — Executive portfolio review | portfolio-wide | No specific record; aggregations from the baseline |

Settings provides the scenario selector, descriptions, load/reset-current/reset-all actions with confirmation (`demo-scenarios.md` Scenario Controls).

## 13. Referential-Integrity Checks (`integrity.ts`)

Step 07 must implement an automated checker executed against the composed baseline (dev-time assertion; failing check fails the seed) covering:

1. Every foreign key resolves (users, roles, banks, requests, invitations, offers, evaluations, approvals, tasks, attachments, notes, activities, deposits, notifications).
2. Every request has a valid owner (`createdByUserId` exists; `currentOwnerRoleId` matches its status's responsible role).
3. Every approval step has a valid stage-appropriate role and assignee.
4. Every offer belongs to a contacted (invited) bank of its request.
5. Every winning bank references a valid submitted, valid-status offer of the same request.
6. Only `CONVERTED_TO_ACTIVE_DEPOSIT` requests have `createdDepositId`; every such request has confirmed execution and activation records.
7. Every deposit originates from exactly one converted request; the back-link matches; no duplicate deposit numbers or request numbers.
8. Amounts and expected returns are mathematically consistent (R-10 recomputation matches stored values; liquidity arithmetic per 4.6; transfer amount matches approved amount or carries a variance justification).
9. Approval chains match the submitted amount (extended path iff `submittedAmount` > SAR 100,000,000).
10. Task assignments match the current workflow stage of the linked entity; every open task's role equals the current responsible role.
11. Timestamps follow the lifecycle sequence (created ≤ submitted ≤ decisions ≤ execution ≤ activation; activity ordering monotonic per entity; offer receivedAt ≥ RFQ sentAt).
12. No impossible status combinations (e.g. `RETURNED_FOR_COMPLETION` without a return reason and a `RETURNED` approval; `REJECTED` without a rejecting decision; active deposit with `closedAt`; recommended offer that is expired/incomplete; recommendation without evaluation).
13. Derived maturity indicators match the 14-day rule against the reference date (the 4 near-maturity deposits fall inside the window; no others do).
14. Read-only users hold no mutating permissions (service-level guard: mutation APIs reject `read-only-user`).
15. `resetDemoData()` returns the store to a state deep-equal to the original deterministic baseline.

## 14. Step 07 Implementation Checklist

1. Create `src/src/domain/`: entity types (section 4), enums and label maps (section 3), `business-rules.ts` (section 6), permission/editability matrix (section 10), format utilities consumption points (DEC-021 — utility itself is a Step 05 token/util concern; digits rule enforced wherever values render).
2. Create `src/src/mock-data/` exactly per section 11.1 with the reference date, seed, curated fixtures, generators, scenarios, and the integrity checker; volumes per 11.4.
3. Create `src/src/services/`: in-memory repositories initialized from the baseline; async service functions with light centrally-configured latency and an optional error-simulation hook (per the Step 07 prompt); workflow action services implementing the transition table with central guards; `resetDemoData()` / `loadScenario()`; analytics/selectors service (4.28).
4. Never: localStorage/IndexedDB/backend/API; status values outside section 3; duplicated threshold/routing/formula logic; mock data in one giant file; `any`.
5. Run the integrity checker against the seed; run `tsc`, lint, and the production build; report volumes, scenarios, services, and centralized rules.

Prerequisite note: Step 07 runs after Steps 04–06; the domain/mock-data layer must consume the role context and routing built in Step 06 rather than re-implementing permission plumbing.

## 15. Gaps Resolved and Planning Decisions

Genuine documentation gaps found during Step 03 validation, and how this plan closes them (no new business rules invented):

- **G-01 — Missing entities in `domain-model.md`.** The workflow and design specs require records that the core entity list omits: `InvestmentSupportReview` (execution Stage 2), structured `LiquidityInformation` (workspace §9 fields), `DepositActivation` (execution Stage 5), `Note` (workspace sections 14/19), `SectionCompletion` (draft section states), `SystemSettings` (functional settings + DEC-017). All fields trace to existing functional/design documents (sections 4.5, 4.6, 4.17, 4.20, 4.25, 4.29). `domain-model.md` now cross-references this plan.
- **G-02 — Notification entity undefined.** The top bar requires a notifications indicator and Settings documents notification rules, but no entity existed. Planned as a minimal projection of activities (4.27); no delivery channels, no new rules.
- **G-03 — Missing Arabic labels for controlled values.** Offer statuses, approval decisions, task statuses/priorities, attachment categories, and activity types had English-only (or no) canonical labels. Section 3 fixes glossary-consistent Arabic labels.
- **G-04 — Volume contradiction: 30 requests vs 25 deposits.** The documented 30-request distribution contains zero converted requests, while every one of the 25 deposits requires a completed source request. Resolution: the baseline seed contains **55 requests** — the documented 30 plus 25 converted source requests. All documented minimums ("at least 30") remain satisfied.
- **PD-01 — Reference date and seed values** fixed at `2026-07-27T09:00:00+03:00` and `20260727` (11.2). Any fixed values satisfy the docs; these are now the canonical ones.
- **PD-02 — Persisted `TaskStatus`** fixed as `OPEN`/`COMPLETED`/`CANCELLED` with overdue/due-today/upcoming derived (3.7).
- **PD-03 — `NoteVisibility`** fixed as the single value `INTERNAL` pending any future business tiers (3.17).
- **PD-04 — `CommunicationChannel` values** fixed as EMAIL / OFFICIAL_LETTER / PHONE reference data (3.19).
- **PD-05 — Identifier number blocks**: `IR-2026-0001–0030` in-flight/terminal (includes all scenario-pinned IDs), `IR-2026-0031–0055` historical converted; request numbers are stable identifiers, not strictly chronological (section 2).
- **PD-06 — Derived-not-persisted override** for `Bank.currentExposure*`, `Deposit.daysToMaturity`: listed as fields in `domain-model.md` but required to reconcile with live data; computed centrally (4.3, 4.21).
- **PD-07 — Tenor-days convention** for the 360-day basis: months × 30 (7). Keeps the documented formula deterministic for month-based tenors.
- **Reinvestment count consistency** (3 reinvestment-originated requests vs 1 `REINVESTED` deposit) resolved by linking the other 2 to matured/near-maturity deposits whose processing is not complete — consistent with Scenario 8's rule that the source deposit remains unchanged until maturity processing completes (11.4).

## 16. Traceability Matrix

| Plan area | Canonical source(s) |
|---|---|
| Statuses, transitions, section states | `docs/02-business/statuses-and-transitions.md` (DEC-012) |
| Threshold, routes, defaults, SLAs, formula, reasons | `docs/02-business/business-rules.md` (DEC-017) |
| Roles, permissions, editability modes | `docs/02-business/roles-and-permissions.md`, DEC-011 |
| Lifecycle behavior | `docs/02-business/investment-request-lifecycle.md`, `deposit-lifecycle.md`, `business-process.md` |
| Entity fields | `docs/05-data/domain-model.md` + functional docs (`bank-rfq.md`, `bank-offers.md`, `evaluation-and-recommendation.md`, `approvals.md`, `execution-and-activation.md`, `my-tasks.md`, `settings.md`) + `docs/08-design-specifications/04-transaction-workspace.md` |
| Volumes, distributions, fixture layout, realism | `docs/05-data/mock-data-requirements.md`, CLAUDE.md §16 |
| Demo identities | `docs/05-data/demo-users.md` |
| Scenarios and pinned IDs | `docs/05-data/demo-scenarios.md` |
| Workspace sections, section deep links | DEC-015, DEC-016, `docs/04-ui-ux/information-architecture.md` |
| Terminology, identifiers, digits | `docs/01-product/glossary.md`, DEC-020, DEC-021 |
| Persistence and reset | DEC-019, `docs/09-ai-governance/02-ai-coding-standards.md` |
| Frontend structure | DEC-014, `docs/09-ai-governance/02-ai-coding-standards.md` |
| Quality gates | `docs/06-quality/functional-review-checklist.md`, `acceptance-criteria.md` |

## 17. Out-of-Scope Confirmations

This plan deliberately contains no: backend, database, real authentication, real APIs/email/banking, localStorage/IndexedDB, deployment configuration, custodian entities, non-canonical statuses, or UI/component specifications (Steps 04–06 own those). Nothing under `src/` was created or modified by this planning step.
