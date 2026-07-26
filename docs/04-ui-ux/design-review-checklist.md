# Design Review Checklist

## Product Coherence

- The prototype looks like one product, not assembled screens.
- Main navigation and contextual navigation are clearly separated.
- Business terminology is consistent.
- Role changes affect content and actions correctly.

## Visual Quality

- The interface does not resemble a generic admin template.
- The design feels appropriate for an institutional treasury platform.
- Page hierarchy is immediately understandable.
- Color is restrained and intentional.
- Shadows, borders, radii, and spacing are consistent.
- No page is filled with identical decorative cards.
- Arabic typography is polished and readable.
- Financial numbers are aligned and easy to scan.

## Layout

- Page headers are compact and useful.
- Each page has one clear primary action.
- Content density is appropriate to the task.
- Long workflows use contextual sections rather than one long page.
- Sticky elements do not cover content.
- Empty space supports hierarchy and is not wasteful.

## Components

- Shared components are reused.
- Components expose all required states.
- Status badges use approved semantic variants.
- Tables, filters, dialogs, drawers, and forms follow the same design language.
- No feature introduces raw one-off styling without justification.

## Dashboard

- Dashboard content is role-aware.
- Exceptions and decisions are prioritized over decorative metrics.
- KPIs are not presented as an oversized equal-card grid.
- Tasks and upcoming maturities are actionable.
- Charts add information and are not decorative.

## Transaction Workspace

- Request identity, status, owner, and amount are immediately visible.
- Workflow progress is understandable.
- Section completion and validation are visible.
- The summary panel shows the most decision-relevant information.
- Reviewers can make decisions without opening every section.
- Returned requests clearly show the reason and required correction.
- Available actions match role and status.

## RTL and Responsiveness

- Layout is genuinely RTL, not visually mirrored after implementation.
- Mixed Arabic and English data remains readable.
- Laptop and landscape tablet layouts remain usable.
- Tables do not force unreadable column compression.
- No uncontrolled page-level horizontal scrolling exists.

## Accessibility

- Keyboard navigation works.
- Focus states are visible.
- Dialog focus behavior is correct.
- Status meaning does not depend on color alone.
- Form labels and errors are programmatically clear.
- Reduced-motion preferences are respected.

## Interaction Quality

- Every business action provides feedback.
- Loading, empty, no-results, error, and success states are implemented.
- Validation prevents invalid transitions.
- List context is preserved after visiting details.
- Workflow actions update status, assignment, tasks, and activity consistently.

## Rejection Conditions

The UI must be rejected and revised if any of the following occur:

- Generic dashboard-template appearance
- Excessive gradients, shadows, or decorative effects
- Inconsistent layouts between features
- Weak Arabic typography or broken RTL
- Hardcoded business logic inside visual components
- Missing realistic states or interactions
- Role switcher changes labels but not permissions and content
- Pages optimize decoration over business usability
