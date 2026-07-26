# Prompt 01 — Dashboard

## Objective
Implement the Arabic RTL dashboard for the Investment Deposit Management prototype.

## Read First
- `CLAUDE.md`
- `docs/07-brand-experience/`
- `docs/08-design-specifications/00-shared-layout-and-components.md`
- `docs/08-design-specifications/01-dashboard.md`
- `docs/09-ai-governance/`

## Scope
Implement only the dashboard route and the shared components strictly required by it.

## Requirements
- Arabic-first, true RTL.
- Use Environment Fund brand tokens and approved assets.
- The dashboard must adapt to the active mock role.
- Prioritize actionable information, not decorative KPIs.
- Include a restrained executive summary, pending tasks, request pipeline, portfolio signals, upcoming maturities, and exceptions where applicable.
- Use realistic Saudi treasury data from the existing mock-data layer.
- Provide clear navigation from cards, rows, and alerts to the relevant page or transaction.
- Include loading, empty, error, and restricted-access states.
- Support desktop, tablet, and mobile layouts.

## Visual Direction
Create a premium financial operations workspace. Use strong hierarchy, generous spacing, professional tables, restrained cards, and meaningful charts only. Do not create a generic admin dashboard or a grid of equal cards.

## Interaction Requirements
- Role switch updates metrics and visible sections.
- Task and request links are functional.
- Filters or time-range controls work locally when present.
- Hover, focus, active, and keyboard states are clear.

## Boundaries
- Do not add backend, APIs, authentication, deployment files, or unrelated pages.
- Do not invent new roles, statuses, workflow rules, or navigation items.
- Do not duplicate business rules or hardcode scattered visual values.

## Validation
Run from `/src`:

```bash
npm run typecheck
npm run lint
npm run build
```

Fix all issues introduced by this implementation.

## Completion Report
Provide:
- files created or changed;
- components reused or added;
- implemented states and interactions;
- validation results;
- any documented ambiguity not implemented.