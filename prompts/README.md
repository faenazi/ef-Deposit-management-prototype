# Claude Code Execution Prompts

This folder contains small, stage-based execution prompts for Claude Code.

## Execution Method

Run one prompt at a time from the repository root.

Example:

```text
Execute the instructions in:
prompts/04-frontend/01-initialize-frontend-project.md
```

After implementation, run a focused review:

```text
Review the implementation against:
prompts/04-frontend/01-initialize-frontend-project.md

Fix only missing requirements, regressions, TypeScript errors, and build errors.
Do not expand the scope.
```

## Folder Structure

- `00-foundation/` — repository review, audit, and documentation alignment prompts.
- `01-brand-director/` — brand interpretation and design-token planning (planning only).
- `02-design-system/` — domain-model and mock-data planning reference (planning only).
- `03-page-design/` — one implementation prompt per product page.
- `04-frontend/` — frontend initialization, design system and shell, routing and permissions, domain and mock services, integration, and final quality review.

## Mandatory Sequence

The canonical execution order is the roadmap in `EXECUTION-STATUS.md`. Summary:

| Step | Prompt |
|---|---|
| 01 | `00-foundation/01-repository-audit-and-plan.md` |
| 01.5 | `00-foundation/02-documentation-alignment-and-decisions.md` |
| 02 | `01-brand-director/01-brand-and-design-system-foundation.md` (planning only) |
| 03 | `02-design-system/01-domain-and-mock-data-foundation.md` (planning only) |
| 04 | `04-frontend/01-initialize-frontend-project.md` |
| 05 | `04-frontend/02-build-design-system-and-app-shell.md` |
| 06 | `04-frontend/03-routing-role-context-and-permissions.md` |
| 07 | `04-frontend/04-build-domain-model-mock-data-and-services.md` |
| 08–14 | `03-page-design/01-dashboard.md` through `03-page-design/07-settings.md` |
| 15 | `04-frontend/05-integrate-pages-and-interactions.md` |
| 16 | `04-frontend/06-final-frontend-quality-review.md` |

Do not start feature pages before the design system (Step 05), routing and permissions (Step 06), and data foundation (Step 07) are stable.

## Prompt Design Rules

Each prompt must:

- Require reading `CLAUDE.md` first.
- Reference the canonical documents needed for the task, including the relevant `docs/02-business/` and `docs/05-data/` files for implementation steps.
- Define a narrow implementation scope with one clear responsibility.
- State explicit non-goals.
- Require inspection of existing code.
- Require TypeScript and production build validation.
- Define concrete acceptance criteria.

## Token Efficiency

- Do not paste the full project context into execution conversations.
- Use document references.
- Do not ask Claude Code to read the entire repository unless the prompt is a repository audit or final quality review.
- Do not request verbose explanations of every generated file.
- Request a concise summary of changes, validation results, and unresolved items.

## Change Control

Claude Code must not:

- Rewrite unrelated features.
- Replace the established design system.
- Add deployment configuration.
- Add backend services.
- Add unapproved navigation items.
- Invent business workflows.
