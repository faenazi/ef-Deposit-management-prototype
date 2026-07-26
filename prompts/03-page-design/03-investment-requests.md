# Prompt 03 — Investment Requests

## Objective
Implement the Arabic RTL Investment Requests page as the authoritative register for draft, submitted, returned, approved, rejected, execution, and completed requests.

## Read First
- `CLAUDE.md`
- `docs/07-brand-experience/`
- `docs/08-design-specifications/00-shared-layout-and-components.md`
- `docs/08-design-specifications/03-investment-requests.md`
- `docs/09-ai-governance/`
- `docs/03-functional/investment-requests.md`
- `docs/02-business/statuses-and-transitions.md` (canonical statuses and Arabic labels)
- `docs/02-business/roles-and-permissions.md`

## Scope
Implement only the Investment Requests list route, its filtering controls, and the create-request entry action.

## Requirements
- Arabic-first, true RTL.
- Use professional financial-table behavior on desktop and a tailored list/card representation on mobile.
- Show request number, amount, tenor, purpose, owner, status, current stage, last update, completion/readiness where relevant, and next responsible party.
- Keep first-time drafts visually distinct from `معاد للاستكمال`.
- Provide search, status/stage/amount/owner/date filters, sorting, result counts, pagination or controlled local loading, and clear filters.
- Include saved-view behavior only if already supported by the documented shared design.
- Primary action: create a new investment request for authorized roles.
- Row click opens the transaction workspace.
- Use realistic mock data covering amounts below, equal to, and above SAR 100 million.
- Respect active-role permissions and read-only behavior.
- Include loading, empty, no-results, error, and restricted-access states.

## Visual Direction
The page should resemble a modern institutional investment register—not a CRM lead list. Prioritize amount, workflow stage, readiness, and ownership. Avoid excessive badges and card grids.

## Interaction Requirements
- Filters and sorting are functional.
- Query state should remain understandable when returning from a request.
- Create action opens the correct draft workflow.
- Status text, icons, and semantic treatment remain accessible.

## Boundaries
Do not implement the full transaction workspace in this prompt. Do not add backend, APIs, exports, or undocumented bulk actions.

## Validation
Run `npm run typecheck`, `npm run lint`, and `npm run build` from `/src`; fix all introduced issues.

## Completion Report
Report changed files, implemented controls and states, navigation behavior, permission handling, and validation results.