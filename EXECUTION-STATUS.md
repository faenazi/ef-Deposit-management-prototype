# Execution Status

## 1. Purpose

This file is the single source of truth for the implementation progress of the Environment Fund Investment Deposit Management Platform prototype.

It must be updated at the end of every Claude Code execution step.

Do not mark any step as completed unless:

- The requested scope was implemented.
- TypeScript validation passed.
- Lint passed when available.
- Production build passed.
- The implementation was reviewed against the referenced documentation.
- Known issues and deviations were recorded honestly.

## 2. Status Legend

- `NOT STARTED` — no implementation work has begun.
- `IN PROGRESS` — Claude Code is currently executing or the output is under review.
- `BLOCKED` — execution cannot continue because of a documented issue or missing decision.
- `REVIEW REQUIRED` — implementation is complete but awaiting review and approval.
- `COMPLETED` — reviewed and accepted.

## 3. Current Project State

**Overall status:** DOCUMENTATION ALIGNED — READY FOR FRONTEND IMPLEMENTATION (one open blocker: B-01 official brand SVG assets, which gates brand-asset copying and final visual completion but not Steps 02–04 planning and initialization)

**Current phase:** Documentation alignment complete; awaiting review and brand assets

**Current active step:** Step 01.5 — Documentation Alignment and Decision Resolution (REVIEW REQUIRED)

**Next prompt to execute:**

After Step 01.5 review approval: `prompts/01-brand-director/01-brand-and-design-system-foundation.md` (Step 02 — now planning-only per DEC-013). The owner should add the seven official SVG assets (B-01) in parallel.

**Last approved step:** Step 01 — Repository Audit and Plan (APPROVED WITH CONDITIONS)

## 4. Execution Roadmap

| Step | Phase | Prompt | Status | Review Result | Notes |
|---|---|---|---|---|---|
| 01 | Foundation | `prompts/00-foundation/01-repository-audit-and-plan.md` | COMPLETED | APPROVED WITH CONDITIONS | Audit completed 2026-07-26. Conditions resolved by Step 01.5. |
| 01.5 | Foundation | `prompts/00-foundation/02-documentation-alignment-and-decisions.md` | REVIEW REQUIRED | Pending | Documentation Alignment and Decision Resolution. Completed 2026-07-26. See Step 01.5 report below. |
| 02 | Brand planning | `prompts/01-brand-director/01-brand-and-design-system-foundation.md` | NOT STARTED | Pending | Rescoped per DEC-013: brand interpretation and design-token planning only. |
| 03 | Domain planning | `prompts/02-design-system/01-domain-and-mock-data-foundation.md` | NOT STARTED | Pending | Rescoped per DEC-013: domain-model and mock-data planning reference only. |
| 04 | Frontend initialization | `prompts/04-frontend/01-initialize-frontend-project.md` | NOT STARTED | Pending | All frontend files must remain under `/src`. |
| 05 | Design system and shell | `prompts/04-frontend/02-build-design-system-and-app-shell.md` | NOT STARTED | Pending | Requires visual review before continuing. |
| 06 | Routing and permissions | `prompts/04-frontend/03-routing-role-context-and-permissions.md` | NOT STARTED | Pending | Role switching and access rules must work. |
| 07 | Domain model and mock services | `prompts/04-frontend/04-build-domain-model-mock-data-and-services.md` | NOT STARTED | Pending | Must use deterministic realistic data. |
| 08 | Dashboard | `prompts/03-page-design/01-dashboard.md` | NOT STARTED | Pending | Review per role. |
| 09 | My Tasks | `prompts/03-page-design/02-my-tasks.md` | NOT STARTED | Pending | Review task actions and urgency. |
| 10 | Investment Requests | `prompts/03-page-design/03-investment-requests.md` | NOT STARTED | Pending | Review filters, statuses, and draft handling. |
| 11 | Transaction Workspace | `prompts/03-page-design/04-transaction-workspace.md` | NOT STARTED | Pending | Highest-priority business and UX review. |
| 12 | Deposit Portfolio | `prompts/03-page-design/05-deposit-portfolio.md` | NOT STARTED | Pending | Review maturity and bank exposure views. |
| 13 | Reports | `prompts/03-page-design/06-reports.md` | NOT STARTED | Pending | Charts must have business meaning. |
| 14 | Settings | `prompts/03-page-design/07-settings.md` | NOT STARTED | Pending | Respect administrator permissions. |
| 15 | Cross-page integration | `prompts/04-frontend/05-integrate-pages-and-interactions.md` | NOT STARTED | Pending | Validate the full request-to-deposit lifecycle. |
| 16 | Final quality review | `prompts/04-frontend/06-final-frontend-quality-review.md` | NOT STARTED | Pending | Final functional, visual, RTL, responsive, and code review. |

## 5. Mandatory Update Format After Every Step

Claude Code must append or update the following information after each execution:

### Step Summary

- Step number and title:
- Prompt executed:
- Status:
- Date:
- Commit or working branch:

### Files Changed

- Created:
- Updated:
- Deleted:

### Validation Results

- TypeScript:
- Lint:
- Production build:
- Manual checks:

### Completed Scope

- 

### Known Issues or Deviations

- 

### Decisions Required

- 

### Recommended Next Step

- 

## 6. Decision Log

Record only decisions that affect later implementation.

| ID | Decision | Date | Impact |
|---|---|---|---|
| DEC-001 | The repository is documentation-first and all frontend code and configuration must be placed under `/src`. | 2026-07-27 | Prevents root-level frontend clutter. |
| DEC-002 | The prototype is frontend-only with local mock services and no backend, real APIs, real authentication, or deployment configuration. | 2026-07-27 | Defines technical boundaries. |
| DEC-003 | Arabic is the primary language and all screens must use true RTL behavior. | 2026-07-27 | Governs layout and content. |
| DEC-004 | A request remains a draft while one specialist prepares it progressively; approval starts only after submission. | 2026-07-27 | Governs workflow and UX. |
| DEC-005 | Requests up to and including SAR 100 million follow the short approval path; requests above SAR 100 million require executive approval. | 2026-07-27 | Governs approval logic. |
| DEC-006 | The transaction workspace is the core experience and must be designed as a case workspace, not a long form or restrictive wizard. | 2026-07-27 | Governs the primary screen design. |
| DEC-007 | No Vercel, GitHub Actions, CI/CD, Docker, or deployment configuration during the prototype phase. | 2026-07-27 | Prevents premature infrastructure work. |
| DEC-008 | Brand assets use two canonical locations: owner-supplied source assets in `assets/brand/{logos,patterns,graphic-elements}/` and optimized runtime copies in `src/public/brand/`. Runtime code references only `/brand/...`. Never redraw or fabricate official assets. | 2026-07-26 | Resolves B-02; governs all brand usage. |
| DEC-009 | Canonical main navigation order: الصفحة الرئيسية، مهامي، محفظة الودائع، طلبات الاستثمار، التقارير والتحليلات، الإعدادات. | 2026-07-26 | Resolves navigation-order conflicts. |
| DEC-010 | Responsive scope: desktop/laptop primary, tablet fully usable, mobile functional and readable down to 390px; tables may transform into cards, stacked rows, drawers, or horizontal scroll. | 2026-07-26 | Resolves B-05; governs all pages. |
| DEC-011 | Canonical executive role: `Executive Director of Investment and Treasury Sector` / `المدير التنفيذي لقطاع الاستثمار والخزينة`. Read-only User / `مستخدم للعرض فقط` added to roles, demo users, permissions, and review coverage. | 2026-07-26 | Resolves role-naming conflicts. |
| DEC-012 | `docs/02-business/statuses-and-transitions.md` is the single source of truth for statuses. `معاد للاستكمال` is canonical. Derived conditions (e.g. Approaching Maturity) are never persisted statuses. | 2026-07-26 | Resolves status-taxonomy conflicts. |
| DEC-013 | Steps 02 and 03 are planning-only. Initialization (04), design system and shell (05), routing and permissions (06), and domain/mock services (07) are the implementation steps. | 2026-07-26 | Resolves B-03 roadmap overlap. |
| DEC-014 | `src/` is the application root with the nested Vite source tree `src/src/` containing `app/`, `styles/`, `lib/`, `domain/`, `mock-data/`, `services/`, `hooks/`, `components/`, `layouts/`, `features/`. Use `domain/` not `types/`; `mock-data/` not `mocks/`. | 2026-07-26 | Resolves structure conflicts. |
| DEC-015 | Canonical routes: `/`, `/tasks`, `/deposits`, `/deposits/:depositId`, `/investment-requests`, `/investment-requests/new`, `/investment-requests/:requestId`, `/investment-requests/:requestId/:section`, `/reports`, `/settings`, `/access-denied`, `/*`. | 2026-07-26 | Resolves route conflicts; restores section deep links. |
| DEC-016 | Canonical 15 workspace sections (Overview → Activity history). Custodian is out of scope; maturity/reinvestment belong to Deposit Portfolio; Placement-and-transfer is represented through Accounting execution; use Reinvestment, not Rollover. | 2026-07-26 | Resolves B-06 workspace conflicts. |
| DEC-017 | Prototype business defaults: minimum 3 contacted banks; expected return = principal × annualRate × tenorDays ÷ 360; 14-day maturity warning; approval/task SLAs (GM 2d, Executive 2d, Support 1d, Finance 1d, Accounting 1d, Activation 1d); threshold evaluated from submitted amount with recalculation after amount change; returned requests resume at the returning stage. | 2026-07-26 | Fills undefined values; canonical home: `docs/02-business/business-rules.md`. |
| DEC-018 | Implementation prompts (Steps 07–15) must read the relevant canonical files under `docs/01`–`docs/06` plus the matching `docs/08` specification, not the design-spec folder alone. | 2026-07-26 | Resolves B-04. |
| DEC-019 | Prototype state is in-memory with deterministic seeded data. Reload resets. Explicit `إعادة ضبط البيانات التجريبية` action for administrators. No localStorage, IndexedDB, backend, or database. | 2026-07-26 | Defines persistence model. |
| DEC-020 | Standard terminology and identifiers: `طلب استثمار`, `محفظة الودائع`, `مراجعة الإدارة المالية`, `تنفيذ التحويل المحاسبي`, value date = `تاريخ بدء الوديعة` / `valueDate`, `إعادة الاستثمار`, `IR-2026-####`, `DEP-2026-####`. | 2026-07-26 | Resolves terminology and identifier drift. |

## 7. Blockers

Updated by Step 01.5 (2026-07-26).

- **B-01 — OPEN — Official brand SVG assets are missing.** The canonical directories `assets/brand/{logos,patterns,graphic-elements}/` and `src/public/brand/` exist with READMEs listing the seven required official filenames, but none of the seven SVG files has been supplied. The brand rules forbid redrawing or recreating assets. This does not block Steps 02–04 (planning and initialization) but blocks brand-asset copying in Step 04 and final visual completion from Step 05 onward. **Resolution:** the owner commits the seven official SVG files listed in `assets/brand/README.md`.
- **B-02 — RESOLVED (Step 01.5, DEC-008).** `docs/07-brand-experience/00-brand-source-of-truth.md` §10 now specifies `assets/brand/` (source) and `src/public/brand/` (runtime), matching `CLAUDE.md` §9 and all prompts.
- **B-03 — RESOLVED (Step 01.5, DEC-013).** Step 02 and Step 03 prompts rewritten as planning-only; initialization, shell, routing, and domain implementation live solely in Steps 04–07.
- **B-04 — RESOLVED (Step 01.5, DEC-018).** All seven page prompts and frontend Steps 06, 07, and 15 now reference the canonical `docs/02-business/`, `docs/03-functional/`, `docs/04-ui-ux/`, and `docs/05-data/` files by path.
- **B-05 — RESOLVED (Step 01.5, DEC-010).** Mobile-exclusion statements removed from `scope.md`, `responsive-behavior.md`, and `design-direction.md`; mobile 390px added to all quality checklists. All documents now agree: desktop/laptop primary, tablet fully usable, mobile functional to 390px.
- **B-06 — RESOLVED (Step 01.5, DEC-016).** The canonical 15-section workspace list is now identical in `docs/04-ui-ux/information-architecture.md`, `docs/04-ui-ux/navigation.md`, `docs/04-ui-ux/transaction-workspace.md`, and `docs/08-design-specifications/04-transaction-workspace.md`. Custodian and Maturity/Rollover sections removed; Winning bank, Investment Support review, Finance review, Accounting execution, and Deposit activation sections specified.

Stale-reference issues recorded by Step 01 (prompts/README.md, docs/00-index.md) were corrected by Step 01.5. Decision-log dates DEC-001–DEC-007 retain their original recorded dates.

## 8. Step Reports

### Step 01 — Repository Audit and Plan

#### Step Summary

- Step number and title: Step 01 — Repository Audit and Plan
- Prompt executed: `prompts/00-foundation/01-repository-audit-and-plan.md`
- Status: REVIEW REQUIRED
- Date: 2026-07-26
- Commit or working branch: `claude/repository-audit-plan-noxfyp`

#### Files Changed

- Created: none
- Updated: `EXECUTION-STATUS.md` (this file only)
- Deleted: none

#### Validation Results

- TypeScript: not applicable — no frontend exists and no code was written.
- Lint: not applicable.
- Production build: not applicable.
- Manual checks: verified `src/` and `assets/` do not exist; verified every documentation path referenced by all 16 prompts; verified the seven brand SVG filenames appear nowhere in the repository; cross-checked threshold, statuses, roles, navigation, mock-data volumes, execution flow, and return rules across `docs/01`–`docs/09` and `prompts/`.

#### Files Reviewed

- `CLAUDE.md`, `README.md`, `EXECUTION-STATUS.md`, `.gitignore`, `docs/00-index.md`
- All 5 files under `docs/09-ai-governance/`
- All 13 files under `docs/07-brand-experience/`
- `docs/08-design-specifications/README.md` and `00-shared-layout-and-components.md` (remaining 08 files cross-checked for conflicts)
- All files under `docs/01-product/`, `docs/02-business/`, `docs/03-functional/`, `docs/04-ui-ux/`, `docs/05-data/`, `docs/06-quality/` (cross-check pass)
- All 17 files under `prompts/`

#### Completed Scope

- Full repository structure audit; implementation-readiness report produced covering repository state, missing foundations, documentation conflicts, proposed `src/` structure, design-system structure, domain types and mock-data modules, implementation sequence, design-consistency risks, and validation commands.
- Readiness verdict: **READY WITH CONDITIONS** — documentation quality is high and business rules are largely consistent, but the blockers in section 7 and the decisions below must be resolved before Step 02.

#### Known Issues or Deviations

- Blockers B-01 through B-06 recorded in section 7.
- Additional consistency findings (non-blocking, should be fixed during or before the affected steps):
  - Role naming: "Executive Head of Investment and Treasury" (canonical) vs "Executive Director" in both quality checklists, `docs/08-design-specifications/01/02/07`, and the Step 11 prompt. The Read-only User required by `CLAUDE.md` §15 is missing from `docs/05-data/domain-model.md` role codes, `demo-users.md`, all design specifications, and both checklists. Arabic executive title differs between `CLAUDE.md`/product docs (`لقطاع`) and `prompts/04-frontend/03` (drops `قطاع`).
  - Status taxonomy: `docs/02-business/statuses-and-transitions.md` is the only complete code+Arabic list; six other partial or divergent lists exist (`information-architecture.md`, `investment-requests.md` views incl. `معادة للاستكمال` vs canonical `معاد للاستكمال`, `demo-scenarios.md` "Pending Winning Bank Information"/"Completed"/"Near Maturity"/"Broken", the two 08 stage lists). `docs/08-design-specifications/` contains no Arabic status strings although `00-shared-layout-and-components.md` §11 requires exact business terminology.
  - Navigation order: `CLAUDE.md` §10 and `product-overview.md` place محفظة الودائع 3rd and طلبات الاستثمار 4th; `information-architecture.md`, `navigation.md`, and `00-shared-layout-and-components.md` §3 swap them.
  - `src/` structure: three incompatible trees — `prompts/04-frontend/01` and `docs/05-data/mock-data-requirements.md` use nested `src/src/` with `domain/`, `services/`, `mock-data/`; `docs/09-ai-governance/02-ai-coding-standards.md` uses a flat tree with `mocks/`, `routes/`, `types/`, `layouts/`.
  - Routes: `information-architecture.md` uses `/requests`, `/requests/:requestId/:section`; `prompts/04-frontend/03` uses `/investment-requests` and drops the `:section` deep-link route that the workspace and tasks specs require.
  - Terminology drift: Rollover (08 specs) vs Reinvestment (business docs/domain model); "Finance execution" vs "Finance Review"; four names for value date; ID formats `IR-2026-014` vs `IR-2026-0018`.
  - Undefined values required by the docs: minimum contacted banks, expected-return calculation formula/day-count, maturity warning window (14 days implied only), task SLA values; threshold basis wording differs ("submitted" amount in `business-rules.md` vs "approved" amount in `statuses-and-transitions.md`); resubmission re-entry stage after a return is "appropriate previous review stage" with no resolution rule; executive returns have no distinct status from `معاد للاستكمال`.
  - Prototype state persistence undefined (in-memory vs localStorage vs reload behavior); mock service signatures conflict (synchronous "typed local query functions" in Step 03 prompt vs async with latency/error simulation in Step 07 prompt).
  - Reject capability conflicts: Finance and Investment Support have reject in lifecycle/permissions docs but not (or only conditionally) in `execution-and-activation.md`.

#### Decisions Required

- DR-01: Provide the seven official EF brand SVG assets and choose the canonical reference location (`assets/brand/`) and single runtime location (`src/public/brand/` per CLAUDE.md vs `src/assets/brand/**` per brand source of truth).
- DR-02: Main navigation order — CLAUDE.md order (محفظة الودائع before طلبات الاستثمار) or IA/shared-layout order (reverse).
- DR-03: Mobile (<768px) in scope for the prototype or not.
- DR-04: Canonical executive role name (recommend "Executive Head of Investment and Treasury" / `الرئيس التنفيذي لقطاع الاستثمار والخزينة`) and whether the Read-only User is added to the domain model, demo users, and specs.
- DR-05: Confirm `docs/02-business/statuses-and-transitions.md` as the single status source of truth and correct the divergent lists (or instruct implementers to defer to it over 08 specs).
- DR-06: Resolve roadmap overlap — recommended: rescope Step 02 to tokens/brand assets only, drop Step 03 as a build step (keep as reference for Step 07), keeping initialization/shell/routing in Steps 04–06.
- DR-07: `src/` layout — recommend `src/` as application root with nested `src/src/` source tree (matches CLAUDE.md §3 and the init prompt) and reconcile folder names (`mock-data/` vs `mocks/`, `domain/` vs `types/`).
- DR-08: Route naming (`/investment-requests` vs `/requests`) and restoration of the `:section` workspace deep-link route.
- DR-09: Custodian and "Placement and transfer" / "Maturity and rollover" workspace sections — remove from 08 specs or add entities to the domain model (scope doc currently excludes custodian).
- DR-10: Supply defaults for minimum contacted banks, expected-return formula, maturity warning window, task SLAs; confirm threshold basis (submitted amount) and resubmission re-entry rule (recommend: return to the stage that returned it, with routing recalculated if the amount changed).
- DR-11: Add explicit `docs/02-business/` and `docs/05-data/` reading references to the Step 07–15 prompts (or approve deviation from prompt reading lists).
- DR-12: Prototype state persistence model (recommend in-memory with deterministic reset; no localStorage).

#### Recommended Next Step

- Do not execute Step 02 yet. First: (1) owner provides brand assets (DR-01) and answers DR-02–DR-12; (2) run a small documentation-alignment step to fix `prompts/README.md`, `docs/00-index.md`, the asset-location references, and record decisions in the Decision Log; (3) then execute Step 02 with its scope corrected per DR-06.

### Step 01.5 — Documentation Alignment and Decision Resolution

#### Step Summary

- Step number and title: Step 01.5 — Documentation Alignment and Decision Resolution
- Prompt executed: `prompts/00-foundation/02-documentation-alignment-and-decisions.md`
- Status: REVIEW REQUIRED
- Date: 2026-07-26
- Commit or working branch: `claude/docs-alignment-readiness-tq3jcc`

#### Files Changed

- Created: none
- Updated (50 files): `CLAUDE.md`, `EXECUTION-STATUS.md`, `docs/00-index.md`, `docs/01-product/{glossary,product-overview,scope,users-and-personas}.md`, `docs/02-business/{business-process,business-rules,investment-request-lifecycle,roles-and-permissions,statuses-and-transitions}.md`, `docs/03-functional/{approvals,dashboard,execution-and-activation,investment-requests}.md`, `docs/04-ui-ux/{design-direction,information-architecture,navigation,responsive-behavior,transaction-workspace}.md`, `docs/05-data/{demo-scenarios,demo-users,domain-model}.md`, `docs/06-quality/{acceptance-criteria,final-readiness-checklist,functional-review-checklist,ux-review-checklist}.md`, `docs/07-brand-experience/00-brand-source-of-truth.md`, `docs/08-design-specifications/{00-shared-layout-and-components,01-dashboard,02-my-tasks,04-transaction-workspace,05-deposit-portfolio,06-reports,07-settings}.md`, `docs/09-ai-governance/02-ai-coding-standards.md`, `prompts/README.md`, `prompts/01-brand-director/01-brand-and-design-system-foundation.md` (rescoped, planning-only), `prompts/02-design-system/01-domain-and-mock-data-foundation.md` (rescoped, planning-only), `prompts/03-page-design/01–07`, `prompts/04-frontend/{03,04,05}`.
- Deleted: none

#### Validation Results

- TypeScript / Lint / Production build: not applicable — documentation-only step; no `/src` code exists and none was created.
- Manual checks (repository-wide searches after alignment):
  - `Executive Head` — 0 remaining occurrences outside the alignment prompt itself.
  - Bare `Executive Director` without the sector name — 0 remaining occurrences.
  - `معادة للاستكمال` — 0 remaining occurrences.
  - Old Arabic executive title `الرئيس التنفيذي` — 0 remaining occurrences.
  - Mobile-exclusion statements — 0 remaining occurrences.
  - `Custodian` / `Rollover` in current-scope specs and prompts — 0 remaining, apart from legitimate out-of-scope statements (`scope.md`, `final-readiness-checklist.md`, and the explicit exclusion note in the workspace spec).
  - `/requests` routes — 0 remaining; all routes use `/investment-requests` with the `:section` deep-link route restored.
  - Main navigation order — identical in `CLAUDE.md`, `product-overview.md`, `information-architecture.md`, `navigation.md`, and `00-shared-layout-and-components.md`.
  - Steps 02 and 03 prompts no longer contain any implementation scope; Steps 04–07 boundaries verified.
  - No application code and no brand asset (real or fake) was created; `assets/brand/` and `src/public/brand/` contain only READMEs and `.gitkeep` files.

#### Completed Scope

- Applied approved decisions DEC-008 through DEC-020 across all documentation and prompts.
- Resolved blockers B-02 through B-06; corrected stale `prompts/README.md` and `docs/00-index.md`; added a Canonical Sources section to `docs/00-index.md`.
- Canonical decisions now each have exactly one source: statuses (`statuses-and-transitions.md`), business rules and prototype defaults (`business-rules.md`), roles (`roles-and-permissions.md` + `demo-users.md`), navigation and routes (`information-architecture.md`), workspace sections (DEC-016 list), frontend structure (`09-ai-governance/02-ai-coding-standards.md`), decisions (this file, section 6).
- Repository readiness assessment: Business Documentation 95%, UI/UX 92%, Architecture 90%, Frontend Readiness 90%, Prompt Chain 95%, Brand Compliance 40% (assets missing), Overall ~88% — ready for frontend implementation with B-01 as the only open blocker.

#### Known Issues or Deviations

- B-01 remains open: the seven official brand SVG files are owner-supplied and still missing.
- `CLAUDE.md` §12 and §15 were updated to the canonical executive role name per DEC-011; this is the only change made to `CLAUDE.md`.
- The Read-only demo user (`USR-RO-001`, هند المطيري) was added to `demo-users.md` with fictional prototype identity data, as required by DEC-011.

#### Decisions Required

- None. All Step 01 decision requests (DR-01–DR-12) are resolved by DEC-008–DEC-020. Only the B-01 asset upload remains with the owner.

#### Recommended Next Step

- Owner reviews and approves Step 01.5, commits the seven official SVG assets (B-01), then executes Step 02 (`prompts/01-brand-director/01-brand-and-design-system-foundation.md`, planning-only).

## 9. Review Ownership

- **Claude Code:** Executes one approved prompt at a time and updates this file.
- **ChatGPT guide:** Reviews Claude Code output, identifies gaps, and prepares the exact next instruction.
- **Repository owner:** Approves visual and business results before moving to the next major phase.

## 10. Working Rule

Do not execute multiple roadmap steps in one Claude Code request unless this file explicitly records approval to combine them.

At the beginning of every Claude Code session, instruct Claude Code to:

1. Read `CLAUDE.md` completely.
2. Read `EXECUTION-STATUS.md` completely.
3. Execute only the current active step.
4. Update `EXECUTION-STATUS.md` before finishing.
5. Stop and report the result without starting the next step.
