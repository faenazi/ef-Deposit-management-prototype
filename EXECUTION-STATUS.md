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

**Overall status:** AUDIT COMPLETE — READY WITH CONDITIONS (decisions and brand assets required before Step 02)

**Current phase:** Repository audit and implementation planning

**Current active step:** Step 01 — Repository Audit and Plan (REVIEW REQUIRED)

**Next prompt to execute:**

On hold. Step 02 (`prompts/01-brand-director/01-brand-and-design-system-foundation.md`) must not run until the Step 01 blockers and required decisions below are resolved.

**Last approved step:** Documentation, design specifications, AI governance, and execution prompts preparation

## 4. Execution Roadmap

| Step | Phase | Prompt | Status | Review Result | Notes |
|---|---|---|---|---|---|
| 01 | Foundation | `prompts/00-foundation/01-repository-audit-and-plan.md` | REVIEW REQUIRED | Pending | Audit completed 2026-07-26. No production code written. See Step 01 report below. |
| 02 | Brand foundation | `prompts/01-brand-director/01-brand-and-design-system-foundation.md` | NOT STARTED | Pending | Validate EF identity interpretation before implementation. |
| 03 | Domain foundation | `prompts/02-design-system/01-domain-and-mock-data-foundation.md` | NOT STARTED | Pending | Validate entities, states, roles, thresholds, and mock-data plan. |
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

## 7. Blockers

Recorded by Step 01 (2026-07-26). All block Step 02 unless stated otherwise.

- **B-01 — Brand assets are missing.** `assets/brand/` does not exist and none of the seven approved SVG assets named in `docs/07-brand-experience/00-brand-source-of-truth.md` (logos, patterns, radial graphic) exist anywhere in the repository. The brand rules forbid redrawing or recreating assets, so Step 02 and Step 04 cannot comply until the official files are committed.
- **B-02 — Three conflicting brand-asset locations.** `assets/brand/` (`CLAUDE.md` §9, `README.md`), `src/public/brand/` (`CLAUDE.md` §9, `prompts/01-brand-director/01`, `prompts/04-frontend/01`), and `src/assets/brand/logos|patterns|graphic-elements/` (`docs/07-brand-experience/00-brand-source-of-truth.md` §10). A single canonical reference location and runtime location must be decided.
- **B-03 — Roadmap step overlap.** Step 02 prompt (`prompts/01-brand-director/01`) also configures Vite/Tailwind/Router, builds the app shell, and the mock-user switcher — duplicating Steps 04, 05, and part of 06. Step 03 prompt (`prompts/02-design-system/01`) duplicates Step 07 (`prompts/04-frontend/04`), which itself requires reading the Step 03 prompt. Scope boundaries must be fixed before execution.
- **B-04 — Business documentation is unreachable from the prompt chain.** No roadmap prompt references `docs/01-product/`, `docs/02-business/`, `docs/03-functional/`, `docs/04-ui-ux/`, `docs/05-data/`, or `docs/06-quality/` by path (only a vague clause in the Step 03 prompt). The canonical status codes, transition table, role permissions, return matrix, demo users, and demo scenarios live only there. Blocks Steps 03 and 07–15 as written.
- **B-05 — Mobile scope contradiction.** `docs/04-ui-ux/responsive-behavior.md`, `docs/04-ui-ux/design-direction.md`, `docs/01-product/scope.md`, and both quality checklists exclude mobile; `docs/09-ai-governance/03+04`, `docs/07-brand-experience/09-responsive-strategy.md`, all seven `docs/08-design-specifications` pages, and all page prompts mandate mobile (incl. 390px testing). Affects effort on every page (Steps 05–16).
- **B-06 — Transaction workspace specification conflict.** Four incompatible section lists exist; the one the Step 11 prompt actually reads (`docs/08-design-specifications/04-transaction-workspace.md`) omits Overview, Bank RFQ, Winning bank, Investment Support review, Finance review, and Deposit activation, and adds Placement and transfer, Custodian, and Maturity and rollover — none of which exist in `docs/05-data/domain-model.md`, and Custodian is explicitly out of scope in `docs/01-product/scope.md`. Blocks Step 11 as written.

Stale-reference issues (non-blocking but should be corrected): `prompts/README.md` lists seven prompt folders and one example file that do not exist and contradicts the roadmap in this file; `docs/00-index.md` omits `docs/07`, `docs/08`, `docs/09` and four existing `docs/04-ui-ux` files; decision-log dates below are 2026-07-27, in the future relative to the audit date.

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
