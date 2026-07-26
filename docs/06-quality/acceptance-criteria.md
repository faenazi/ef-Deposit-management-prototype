# Acceptance Criteria

## Purpose

This document defines the minimum business, functional, visual, and prototype-quality conditions required before the Investment Deposit Management Platform prototype is considered complete.

The prototype is accepted only when all mandatory criteria pass. Visual polish alone is not sufficient, and functional behavior alone is not sufficient.

## Product-Level Acceptance

The prototype must:

- Present a credible end-to-end investment deposit management journey.
- Support Arabic RTL as the default experience.
- Reflect Environment Fund brand identity consistently.
- Demonstrate role-based behavior using the configured demo users.
- Use realistic mock data across all major lifecycle stages.
- Avoid backend, authentication, API, deployment, Docker, and GitHub Actions implementation.
- Keep all state and interactions within the frontend prototype and local mock services.

## Navigation Acceptance

- All primary navigation items open valid pages.
- The active navigation item is visually clear.
- Breadcrumbs reflect the actual hierarchy.
- Back navigation does not unexpectedly lose local prototype state.
- Deep links to request and deposit details resolve correctly.
- Role switching updates visible navigation options when permissions differ.

## Dashboard Acceptance

The dashboard must include more than KPI cards. It must provide:

- Portfolio summary.
- Requests requiring attention.
- Upcoming maturities.
- Approval workload.
- Recent activity.
- At least two meaningful visualizations.
- Role-specific content and actions.

Dashboard figures must reconcile with the seeded requests, tasks, offers, and deposits.

## My Tasks Acceptance

- The task list changes when the active demo user changes.
- Filters work for status, due date, task type, priority, and related transaction.
- Opening a task navigates to the correct request or deposit context.
- Completing a simulated action updates the task, workflow status, owner, and activity log.
- Overdue and urgent tasks are visually distinguishable without relying on color alone.

## Investment Requests Acceptance

- The list displays all configured lifecycle statuses.
- Search and filters return correct records.
- Drafts are visible only to permitted roles.
- The creator can create, edit, save, submit, and delete a draft before first submission.
- Submitted requests cannot be deleted.
- Return, rejection, cancellation, and approval actions require the configured information.
- Amount-based routing uses the centralized approval threshold.
- Requests above SAR 100,000,000 include the executive approval step.

## Request Workspace Acceptance

The request workspace must include:

- Request header and identity.
- Workflow progress.
- Section navigation.
- Main work area.
- Sticky summary.
- Sticky action bar where relevant.
- Activity and approval history.
- Attachments and comments.

The workspace must preserve the selected section during ordinary interaction and show clear completion and validation states.

## RFQ and Offers Acceptance

- Multiple banks may be invited.
- Multiple offers may be captured per bank when required.
- Offer validity, tenor, rate, amount, conditions, and source attachment are represented.
- Expired and incomplete offers are clearly identified.
- At least one valid offer is required before recommendation.
- Offer comparison supports sorting and selecting a recommended offer.

## Evaluation and Recommendation Acceptance

- The recommendation is not automatically determined by the highest rate.
- The user can document qualitative and quantitative considerations.
- Bank concentration impact is visible.
- The recommended offer is linked to a valid bank offer.
- Recommendation rationale is mandatory before submission.

## Approval Acceptance

- The correct approval chain is created according to request amount.
- Approve, return, and reject actions update status and ownership.
- Return and rejection require a reason.
- Approval history records actor, role, action, date, and comments.
- Users cannot approve their own request when the role configuration prohibits it.

## Execution and Activation Acceptance

- Winning-bank information is completed before financial review.
- Investment Support and Finance review steps are represented separately.
- Accounting execution includes transfer and accounting reference data.
- Deposit activation is blocked until mandatory execution data is complete.
- Activation creates exactly one deposit linked to the source request.
- The new deposit appears in portfolio totals and maturity views.

## Deposit Portfolio Acceptance

- Portfolio views include active, near maturity, matured/action required, closed, and broken deposits.
- Deposit details link back to the originating request.
- Maturity, expected return, bank, amount, tenor, and status are visible.
- Reinvestment creates a new request linked to the source deposit.
- Breaking a deposit requires reason, date, and impact details.
- Portfolio totals reconcile with seed data and simulated actions.

## Reports Acceptance

- Reports use consistent portfolio and workflow data.
- Filters update report results.
- At minimum, the prototype shows views for bank concentration, maturity distribution, expected returns, request pipeline, and approval cycle.
- Empty and no-result states are implemented.
- Export controls may be simulated but must clearly indicate prototype behavior.

## Role and Permission Acceptance

For every demo role:

- Visible pages are appropriate.
- Editable sections are appropriate.
- Available actions are appropriate.
- Dashboard content is appropriate.
- Task ownership is appropriate.
- Unauthorized actions are hidden or disabled with an explanation.

Changing the active user must produce a meaningful application change, not only a name or avatar change.

## Data Integrity Acceptance

- One request creates no more than one active deposit.
- Every deposit has one source request.
- Every recommendation references a valid offer.
- Every workflow task references a valid transaction.
- Status, current owner, active task, and latest activity remain consistent.
- Dashboard, lists, details, reports, and charts use the same source data.
- Resetting prototype data restores the original seed state.

## Interaction Acceptance

- Loading, empty, error, success, confirmation, and validation states are represented.
- Destructive actions require confirmation.
- Long actions provide visible progress or simulated processing feedback.
- Toast messages are concise and do not replace important inline feedback.
- Keyboard focus is visible.
- Dialogs and drawers can be closed predictably.

## Visual Acceptance

- The UI does not resemble a generic admin template.
- Environment Fund identity is applied consistently.
- Typography, spacing, radii, borders, shadows, and icons follow the design system.
- Status colors are controlled and accessible.
- Pages share a coherent visual language.
- Information hierarchy remains clear on desktop, laptop, and landscape tablet.
- There is no unnecessary visual clutter, decorative gradient overload, or excessive card repetition.

## Technical Acceptance

- React, TypeScript, Vite, and Tailwind are used as defined.
- The source is organized by features.
- Shared components and design tokens are reused.
- Business rules are not duplicated across visual components.
- TypeScript errors are resolved.
- The application builds successfully.
- There are no blocking console errors during the main demo scenarios.

## Acceptance Decision

The prototype may be marked accepted only when:

1. All critical criteria pass.
2. No high-severity issue remains open.
3. All ten demo scenarios can be completed or demonstrated.
4. Visual review passes the UX checklist.
5. Functional review passes the workflow checklist.
6. The final readiness checklist is signed off for stakeholder presentation.
