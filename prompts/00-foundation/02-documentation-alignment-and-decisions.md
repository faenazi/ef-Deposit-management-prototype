# Step 01.5 — Documentation Alignment and Decision Resolution

## Role

Act as a senior business analyst, product architect, frontend architect, UI/UX governance lead, and technical writer.

This is a documentation-alignment step only. Do not initialize the frontend and do not create application code.

## Mandatory Reading

Read completely before changing anything:

- `CLAUDE.md`
- `EXECUTION-STATUS.md`
- `docs/00-index.md`
- `prompts/README.md`
- `docs/01-product/`
- `docs/02-business/`
- `docs/03-functional/`
- `docs/04-ui-ux/`
- `docs/05-data/`
- `docs/06-quality/`
- `docs/07-brand-experience/`
- `docs/08-design-specifications/`
- `docs/09-ai-governance/`
- All files under `prompts/`

## Approved Decisions

Apply the following decisions as final. Do not reopen them unless a direct contradiction makes implementation impossible.

### DEC-008 — Brand asset locations

Use two distinct locations:

1. Canonical source/reference assets in the repository:

```text
assets/brand/
├── logos/
├── patterns/
└── graphic-elements/
```

2. Optimized runtime copies used by the React application:

```text
src/public/brand/
```

Runtime code must reference only `/brand/...` files from `src/public/brand/`. Do not import runtime assets from the repository-root `assets/brand/` folder.

The official SVG files are owner-supplied. Never redraw, approximate, trace, regenerate, or replace a missing official brand asset.

### DEC-009 — Main navigation order

The canonical main navigation order is:

1. الصفحة الرئيسية
2. مهامي
3. محفظة الودائع
4. طلبات الاستثمار
5. التقارير والتحليلات
6. الإعدادات

Update conflicting navigation documentation to match this order.

### DEC-010 — Responsive scope

Responsive behavior is in scope.

- Desktop and laptop are the primary design targets.
- Tablet must be fully usable.
- Mobile must remain functional and readable down to 390px.
- Complex financial tables may transform into cards, stacked rows, drawers, or horizontal scroll where justified.
- Mobile does not require feature reduction, but desktop-level density must not be forced into narrow screens.

Remove statements that exclude mobile entirely.

### DEC-011 — Canonical roles

Use the following canonical executive role name:

- English: `Executive Director of Investment and Treasury Sector`
- Arabic: `المدير التنفيذي لقطاع الاستثمار والخزينة`

Include `Read-only User` / `مستخدم للعرض فقط` in:

- Domain roles.
- Demo users.
- Permission matrix.
- Role-switching scenarios.
- Quality review coverage.

Do not use `Executive Head` or a generic `Executive Director` without the sector name.

### DEC-012 — Canonical statuses

`docs/02-business/statuses-and-transitions.md` is the single source of truth for request and workflow statuses.

- Reuse its codes and exact Arabic labels.
- Correct `معادة للاستكمال` to the canonical `معاد للاستكمال`.
- Do not persist derived presentation states such as `Near Maturity` as domain statuses.
- Do not invent `Completed`, `Broken`, or other states unless they are explicitly defined in the canonical document.
- Deposit maturity warnings must be derived from dates.

### DEC-013 — Execution roadmap boundaries

Rescope the implementation steps as follows:

- Step 02 becomes brand interpretation and design-token planning only. It must not initialize Vite, Tailwind, Router, the app shell, or role switching.
- Step 03 becomes domain-model and mock-data planning/reference only. It must not duplicate Step 07 implementation.
- Step 04 initializes the frontend.
- Step 05 implements the design system and app shell.
- Step 06 implements routing, role context, and permissions.
- Step 07 implements domain types, mock data, and mock services.

Update overlapping prompts so each step has one clear responsibility.

### DEC-014 — Frontend directory structure

Use `src/` as the application root and the nested Vite source directory structure:

```text
src/
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig*.json
├── public/
│   └── brand/
└── src/
    ├── app/
    ├── styles/
    ├── lib/
    ├── domain/
    ├── mock-data/
    ├── services/
    ├── hooks/
    ├── components/
    ├── layouts/
    └── features/
```

Use `domain/`, not a competing top-level `types/` folder, for business entities and rules. Use `mock-data/`, not `mocks/`, for fixtures and generators.

### DEC-015 — Canonical routes and deep links

Use these canonical routes:

```text
/
/tasks
/deposits
/deposits/:depositId
/investment-requests
/investment-requests/new
/investment-requests/:requestId
/investment-requests/:requestId/:section
/reports
/settings
/access-denied
/*
```

The workspace must support section deep links. Define the base request route and the section route explicitly rather than relying on undocumented optional-route behavior.

### DEC-016 — Transaction workspace scope

The investment-request workspace must include the following canonical sections:

1. Overview.
2. Request information.
3. Liquidity information and attachments.
4. Bank RFQ and communications.
5. Received bank offers.
6. Evaluation and recommendation.
7. Approval history.
8. Winning-bank and IBAN information.
9. Investment Support review.
10. Finance review.
11. Accounting execution and transfer evidence.
12. Deposit activation.
13. Attachments.
14. Notes.
15. Activity history.

Apply these scope rules:

- Custodian integration and custodian data are out of scope for this prototype.
- Maturity and reinvestment belong to the active deposit lifecycle and Deposit Portfolio, not the investment-request workspace.
- `Placement and transfer` must be represented through Accounting execution and transfer evidence, not as a competing workspace section.
- Use `Reinvestment` / `إعادة الاستثمار`, not `Rollover`, unless explicitly describing a future capability.

Update `docs/08-design-specifications/04-transaction-workspace.md` and its page prompt accordingly.

### DEC-017 — Business defaults

Use these prototype defaults and centralize them as business-rule constants later:

- Minimum banks contacted before submission: `3`.
- Expected return formula for fixed deposits:

```text
principal × annualRate × tenorDays ÷ 360
```

- Use a 360-day banking basis for prototype calculations.
- Deposit maturity warning window: `14 calendar days` before maturity.
- Approval/task target times:
  - General Manager of Treasury: 2 business days.
  - Executive Director of Investment and Treasury Sector: 2 business days.
  - Investment Support: 1 business day.
  - Finance: 1 business day.
  - Accounting: 1 business day.
  - Deposit activation confirmation: 1 business day.
- The SAR 100 million routing threshold is evaluated from the amount submitted for approval.
- If the amount changes after return and before resubmission, routing is recalculated.
- A returned request resumes at the stage that returned it after the required correction path is completed; the return and resubmission must remain visible in history.
- Every return requires a reason.

### DEC-018 — Mandatory business-document references

Update implementation prompts for Steps 07–15 so that each reads the relevant canonical files under:

- `docs/01-product/`
- `docs/02-business/`
- `docs/03-functional/`
- `docs/04-ui-ux/`
- `docs/05-data/`
- `docs/06-quality/`
- The matching `docs/08-design-specifications/` file.

Do not allow page prompts to rely only on the design-specification folder.

### DEC-019 — Prototype state persistence

Use in-memory state with deterministic seeded initial data.

- Reloading the browser resets the prototype to the deterministic initial dataset.
- Provide an explicit `إعادة ضبط البيانات التجريبية` action for administrators.
- Do not use localStorage, IndexedDB, a backend, or a database unless a later approved decision changes this.

### DEC-020 — Terminology and identifiers

Standardize these terms:

- Investment Request: `طلب استثمار`.
- Deposit Portfolio: `محفظة الودائع`.
- Finance Review: `مراجعة الإدارة المالية`.
- Accounting Execution: `تنفيذ التحويل المحاسبي`.
- Value Date: `تاريخ بدء الوديعة` in user-facing Arabic; `valueDate` in code.
- Reinvestment: `إعادة الاستثمار`.
- Investment request identifier format: `IR-2026-####`.
- Deposit identifier format: `DEP-2026-####`.

Do not mix identifier lengths or competing Arabic labels.

## Required Work

1. Add a Step `01.5` row to `EXECUTION-STATUS.md` titled `Documentation Alignment and Decision Resolution`.
2. Mark Step 01 as `COMPLETED` with review result `APPROVED WITH CONDITIONS`.
3. Make Step 01.5 the active step while working, then mark it `REVIEW REQUIRED` at completion.
4. Add decisions DEC-008 through DEC-020 to the Decision Log.
5. Update the current project state, blockers, and recommended next step.
6. Resolve B-02 through B-06 through documentation and prompt updates.
7. Keep B-01 open until all seven official SVG assets exist in the canonical root asset folders.
8. Correct stale `docs/00-index.md` and `prompts/README.md` so they match the real repository and execution roadmap.
9. Correct all directly affected documents and prompts; avoid broad stylistic rewrites unrelated to the identified conflicts.
10. Create missing brand directories only with `.gitkeep` files and a short `README.md` explaining the required official filenames. Do not create fake SVGs.
11. Record every file created, updated, or deleted in `EXECUTION-STATUS.md`.
12. Do not initialize `/src` and do not install dependencies.

## Required Brand Filenames

The owner must later add these exact official files:

```text
assets/brand/logos/ef-logo-primary-horizontal-ksa-blue.svg
assets/brand/logos/ef-logo-horizontal-blue.svg
assets/brand/logos/ef-logo-horizontal-white.svg
assets/brand/logos/ef-logo-symbol-white.svg
assets/brand/patterns/ef-pattern-primary.svg
assets/brand/patterns/ef-pattern-secondary.svg
assets/brand/graphic-elements/ef-graphic-radial-master.svg
```

## Validation

Before finishing:

- Search the repository for conflicting executive role names.
- Search for `معادة للاستكمال`.
- Search for conflicting main-navigation orders.
- Search for claims that mobile is out of scope.
- Search for `Custodian` and `Rollover` in current-scope workspace specifications and prompts.
- Search for `/requests` routes that should use `/investment-requests`.
- Verify Steps 02 and 03 no longer duplicate implementation Steps 04–07.
- Verify implementation prompts reference canonical business and data documentation.
- Verify no application code or fake brand asset was created.

## Completion Response

Return:

1. A concise summary of resolved contradictions.
2. Remaining blocker(s).
3. Complete list of changed files.
4. Search/validation results.
5. Recommended next step.
6. Confirmation that Step 02 was not started.

Stop after completing this step.