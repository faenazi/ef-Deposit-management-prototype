# Prompt 04 — Transaction Workspace

## Objective
Implement the investment-request transaction workspace as the central financial case workspace of the prototype.

## Read First
- `CLAUDE.md`
- `docs/07-brand-experience/`
- `docs/08-design-specifications/00-shared-layout-and-components.md`
- `docs/08-design-specifications/04-transaction-workspace.md`
- `docs/09-ai-governance/`

## Scope
Implement the request detail/workspace route, its sections, role-based editability, local workflow actions, and supporting dialogs/drawers required for the documented prototype flow.

## Core Rule
This is not one long form and not a restrictive wizard. It is a transaction workspace where one specialist gradually prepares a request while its overall status remains `مسودة` until submission.

## Required Experience
- Persistent request header with request number, amount, status, stage, owner, readiness, and next action.
- Clear section navigation and completion indicators.
- Overview and missing-requirements summary.
- Request information.
- Liquidity information with PDF/XLSX attachment representation.
- Bank communication and received offers.
- Offer comparison, evaluation, and recommendation.
- Approval history and return reasons.
- Winning-bank and IBAN information.
- Investment Support, Finance, Accounting, and activation sections.
- Attachments, notes, and activity history.
- Role- and stage-aware editable/read-only states.

## Workflow Requirements
- Up to and including SAR 100 million: Specialist → GM Treasury.
- Above SAR 100 million: Specialist → GM Treasury → Executive Director.
- After approval: Deposit Specialists → Investment Support → Finance → Accounting → Deposit Specialist activation.
- Every return requires a reason and remains visible in history.
- Returned submitted requests use `معاد للاستكمال`.
- Completion and conversion to an active deposit occur only after activation confirmation.

## Interaction Requirements
- Local save behavior for draft sections.
- Submit readiness validation and missing-item guidance.
- Approve, return, reject where documented and authorized.
- Confirmation dialogs for consequential actions.
- Deep-linkable workspace sections.
- Functional offer selection and recommendation presentation.
- Realistic mock attachments and activity entries.

## Visual Direction
This must be the strongest screen in the prototype: premium, spacious, calm, and financially credible. Use hierarchy, sticky action areas where useful, compact summaries, professional comparison tables, and a clear workflow timeline. Avoid a giant accordion form, crowded cards, and decorative visuals.

## Responsive Requirements
- Desktop: structured multi-region workspace.
- Tablet: reduced secondary panels without losing workflow context.
- Mobile: section-based navigation and accessible bottom actions; never shrink desktop tables blindly.

## States
Include loading, error, missing record, read-only, restricted section, unsaved changes, validation failure, successful save, successful action, and returned-request states.

## Boundaries
Do not add real upload, email, banking, ERP, authentication, or backend integration. Do not invent approval steps or financial rules.

## Validation
Run `npm run typecheck`, `npm run lint`, and `npm run build` from `/src`. Exercise all mock roles and both threshold workflows.

## Completion Report
Report changed files, implemented sections, workflow actions by role, responsive behavior, states, validation results, and any documented ambiguity.