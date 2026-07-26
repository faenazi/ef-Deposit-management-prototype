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

**Overall status:** READY TO START IMPLEMENTATION

**Current phase:** Repository audit and implementation planning

**Current active step:** Step 01 — Repository Audit and Plan

**Next prompt to execute:**

`prompts/00-foundation/01-repository-audit-and-plan.md`

**Last approved step:** Documentation, design specifications, AI governance, and execution prompts preparation

## 4. Execution Roadmap

| Step | Phase | Prompt | Status | Review Result | Notes |
|---|---|---|---|---|---|
| 01 | Foundation | `prompts/00-foundation/01-repository-audit-and-plan.md` | NOT STARTED | Pending | Must not write production code. |
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

No blockers recorded.

## 8. Review Ownership

- **Claude Code:** Executes one approved prompt at a time and updates this file.
- **ChatGPT guide:** Reviews Claude Code output, identifies gaps, and prepares the exact next instruction.
- **Repository owner:** Approves visual and business results before moving to the next major phase.

## 9. Working Rule

Do not execute multiple roadmap steps in one Claude Code request unless this file explicitly records approval to combine them.

At the beginning of every Claude Code session, instruct Claude Code to:

1. Read `CLAUDE.md` completely.
2. Read `EXECUTION-STATUS.md` completely.
3. Execute only the current active step.
4. Update `EXECUTION-STATUS.md` before finishing.
5. Stop and report the result without starting the next step.
