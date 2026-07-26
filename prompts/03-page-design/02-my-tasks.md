# Prompt 02 — My Tasks

## Objective
Implement `مهامي` as the user's focused operational work queue, not as a generic inbox.

## Read First
- `CLAUDE.md`
- `docs/07-brand-experience/`
- `docs/08-design-specifications/00-shared-layout-and-components.md`
- `docs/08-design-specifications/02-my-tasks.md`
- `docs/09-ai-governance/`

## Scope
Implement only the My Tasks route and shared components strictly required by it.

## Requirements
- Arabic RTL and role-aware content.
- Show tasks requiring the active user's action, grouped or filterable by urgency, workflow stage, due date, request, and task type.
- Distinguish overdue, due soon, returned, approval, execution, accounting, and activation tasks using text, icon, and semantic styling—not color alone.
- Include useful context in each row or card: request number, amount, requester, current stage, received time, due date, and expected action.
- Provide search, filters, sorting, result count, clear-filter behavior, and meaningful empty states.
- Clicking a task opens the relevant transaction workspace and intended section.
- Use realistic mock tasks and respect active-role permissions.
- Include loading, error, no-results, and restricted states.
- Support desktop table/list presentation and a purpose-built mobile task layout.

## Visual Direction
The page must feel calm, precise, and fast to scan. Avoid excessive cards, oversized badges, dense borders, or email-client imitation. Urgency must be visible without making the page visually alarming.

## Interaction Requirements
- Filters and sorting work locally.
- Role switching changes the task set.
- Task counts and tabs remain consistent with visible data.
- Keyboard focus and row actions are accessible.

## Boundaries
Do not add notifications, email integration, backend behavior, new workflow statuses, or unrelated pages.

## Validation
Run `npm run typecheck`, `npm run lint`, and `npm run build` from `/src`, then fix all introduced issues.

## Completion Report
List changed files, implemented states, functional filters/navigation, validation results, and unresolved documented ambiguity.