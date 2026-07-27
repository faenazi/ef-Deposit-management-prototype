# UX Review Checklist

## Purpose

Use this checklist during page-by-page UX review. A page should not be considered complete merely because its controls exist; it must communicate context, priority, ownership, status, and next action clearly.

## Review Method

For each page, record:

- Pass.
- Pass with observation.
- Fail.
- Not applicable.

Any failed critical item blocks completion.

## Global Experience

- [ ] Arabic is the primary interface language.
- [ ] RTL alignment is correct for layout, tables, icons, steppers, forms, and drawers.
- [ ] English identifiers, bank names, dates, and numbers remain readable inside RTL layouts.
- [ ] The active user and role are always visible.
- [ ] Switching users changes permissions and relevant content.
- [ ] The product feels like a financial enterprise application, not a generic admin template.
- [ ] Environment Fund identity is recognizable but not overused.
- [ ] Content density is balanced and suitable for treasury operations.
- [ ] The interface remains understandable without training notes embedded in the UI.

## Layout and Hierarchy

- [ ] Every page has one clear primary purpose.
- [ ] Page title, description, status, and key action are easy to locate.
- [ ] Primary content receives more visual weight than supporting information.
- [ ] Cards are used only when grouping is meaningful.
- [ ] The page is not composed of repetitive equal-sized cards without hierarchy.
- [ ] Sections use consistent spacing and alignment.
- [ ] Long pages use sticky or contextual navigation appropriately.
- [ ] Important totals and warnings appear near the decision context.
- [ ] Empty whitespace supports readability and does not make the page feel unfinished.

## Navigation

- [ ] Primary navigation matches the documented information architecture.
- [ ] The active page is visually distinct.
- [ ] Breadcrumbs accurately represent the current location.
- [ ] Request workspace navigation is separate from primary navigation.
- [ ] Navigation labels use approved terminology.
- [ ] Users can return to the previous operational context without confusion.
- [ ] No orphan page exists without a clear route back.
- [ ] Restricted areas are hidden or clearly explained.

## Page Headers

- [ ] Title and transaction number are visually distinct.
- [ ] Status is visible without dominating the page.
- [ ] Ownership and current workflow stage are visible when relevant.
- [ ] Key actions are prioritized and limited.
- [ ] Secondary actions are placed in a controlled overflow menu when appropriate.
- [ ] Header content does not wrap awkwardly on laptop screens.

## Dashboard

- [ ] The dashboard tells a coherent operational story.
- [ ] KPI cards are limited to meaningful summary measures.
- [ ] Tasks, maturities, approvals, activity, and portfolio insights are visible.
- [ ] Charts answer clear business questions.
- [ ] Chart titles, legends, units, and periods are explicit.
- [ ] Dashboard content changes by role.
- [ ] Urgent matters are visible without relying only on red color.
- [ ] The user can navigate from summary items to their detailed context.

## Lists and Tables

- [ ] Search and filters are easy to discover.
- [ ] Applied filters are visible and removable.
- [ ] Columns reflect user decision needs, not raw data structure.
- [ ] Amounts, dates, rates, and statuses are formatted consistently.
- [ ] Row actions are predictable.
- [ ] Clicking a row and clicking an action do not conflict.
- [ ] Sorting state is visible.
- [ ] Pagination or result count is clear.
- [ ] Empty, filtered-empty, loading, and error states are distinct.
- [ ] Dense tables remain readable on laptop and landscape tablet.

## Forms and Data Entry

- [ ] Labels remain visible after data entry.
- [ ] Required fields are clear before submission.
- [ ] Related fields are grouped meaningfully.
- [ ] Help text is concise and placed close to the field.
- [ ] Validation messages explain how to fix the problem.
- [ ] Numeric fields use appropriate formatting and units.
- [ ] Dates and tenors are represented consistently.
- [ ] Autosave or saved-state feedback is visible for drafts.
- [ ] Users are warned before losing unsaved changes.
- [ ] Read-only and editable fields are visually distinguishable.

## Transaction Workspace

- [ ] The request identity remains visible during scrolling.
- [ ] Workflow position is understandable at a glance.
- [ ] Section navigation shows completion and validation states.
- [ ] The main work area remains the dominant region.
- [ ] Sticky summary content supports the current decision.
- [ ] The action bar contains only actions valid for the current role and state.
- [ ] Return reasons and unresolved issues are highly visible.
- [ ] Activity, comments, approvals, and attachments are accessible without overwhelming the main task.
- [ ] The workspace does not become a single long undifferentiated form.

## Workflow and Status

- [ ] Status labels use approved terminology.
- [ ] Status colors are consistent across all pages.
- [ ] Color is not the only indicator.
- [ ] Current owner and next expected action are visible.
- [ ] Completed, current, skipped, returned, and future workflow steps are distinguishable.
- [ ] Return paths are understandable.
- [ ] Users can identify why an action is unavailable.

## Offers and Evaluation

- [ ] Bank offers can be compared without excessive horizontal scrolling.
- [ ] Recommended offer is clearly identified.
- [ ] Expired, invalid, and incomplete offers are visibly differentiated.
- [ ] Rate, tenor, amount, expected return, and conditions are easy to compare.
- [ ] Qualitative evaluation and concentration considerations are visible.
- [ ] The design does not imply that highest rate always wins.

## Tasks and Notifications

- [ ] Task priority and due date are visible.
- [ ] Overdue state is clear.
- [ ] Task title explains the required action.
- [ ] Opening a task brings the user to the exact required context.
- [ ] Completed tasks disappear from the default active view or are clearly marked.
- [ ] Notification and task concepts are not confused.

## Dialogs, Drawers, and Confirmations

- [ ] Dialog title states the action clearly.
- [ ] Consequences are explained for destructive or workflow-changing actions.
- [ ] Primary and cancel actions are ordered consistently for RTL.
- [ ] Reasons are mandatory for return, reject, cancel, and break-deposit actions.
- [ ] Drawers preserve context and do not hide essential information.
- [ ] Focus remains trapped within open dialogs.
- [ ] Escape and close controls behave predictably.

## Feedback States

- [ ] Loading states preserve layout and prevent sudden shifts.
- [ ] Success feedback confirms the actual result.
- [ ] Errors are actionable and not generic.
- [ ] Inline validation appears close to the source.
- [ ] Toasts are not used for information that must remain visible.
- [ ] Long simulated operations show progress.
- [ ] Disabled controls provide a reason when the reason is not obvious.

## Accessibility

- [ ] Keyboard navigation reaches all interactive controls.
- [ ] Focus order follows the visual and logical order.
- [ ] Focus indicators are clearly visible.
- [ ] Text and controls meet acceptable contrast.
- [ ] Icons used without text have accessible labels.
- [ ] Form fields are associated with labels and errors.
- [ ] Charts provide textual summaries.
- [ ] Motion is subtle and respects reduced-motion preferences.
- [ ] Touch targets are suitable for landscape tablet and mobile use.

## Responsive Review

Review at minimum on:

- [ ] Large desktop.
- [ ] Standard desktop.
- [ ] Laptop.
- [ ] Landscape tablet.
- [ ] Mobile width 390px.

For each size:

- [ ] No essential content is clipped.
- [ ] Sticky elements do not overlap content.
- [ ] Tables remain usable.
- [ ] Side navigation behaves as documented.
- [ ] Actions remain visible and correctly prioritized.
- [ ] Summary panels collapse or relocate logically.
- [ ] Dialogs and drawers fit within the viewport.

## Visual Consistency

- [ ] Typography scale is consistent.
- [ ] Spacing follows shared tokens.
- [ ] Border radius and elevation are consistent.
- [ ] Icons come from one approved family.
- [ ] Buttons follow consistent hierarchy.
- [ ] Status badges follow one shared pattern.
- [ ] Charts share formatting conventions.
- [ ] No page introduces an isolated visual style.
- [ ] No arbitrary hardcoded colors appear outside the design-token system.

## Final UX Decision

A page passes UX review only when:

1. All critical items pass.
2. No unresolved issue prevents the user from understanding context or next action.
3. The page works across required screen sizes.
4. The page is consistent with adjacent pages and shared components.
5. The experience supports the relevant demo scenario without explanation from the presenter.
