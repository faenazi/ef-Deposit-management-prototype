# Prototype Interactions

## Purpose

Define realistic simulated behavior so the prototype demonstrates the complete business journey without a backend.

## Global Interaction Rules

- Every action produces immediate visual feedback.
- Loading states are brief but visible where useful.
- Successful actions update the local prototype state.
- Failed validation does not navigate away.
- All workflow actions create activity-log entries.

## Draft Editing

- Field changes update local state.
- Autosave is simulated with a visible `تم الحفظ` state.
- Unsaved changes briefly show `جارٍ الحفظ`.
- Section completion updates without changing the workflow status.
- Submission is blocked until readiness rules pass.

## Workflow Actions

Supported simulated actions include:

- Submit for approval
- Approve
- Return for completion
- Reject
- Cancel
- Confirm investment support review
- Confirm finance review
- Record accounting execution
- Activate deposit
- Close deposit
- Break deposit
- Create reinvestment request

Each action must:

1. Validate role and current status.
2. Require comments when business rules require them.
3. Display a confirmation for consequential actions.
4. Update status and assignment.
5. Add a timeline and activity entry.
6. Display a success message.

## Role Switching

The role switcher changes:

- Current identity
- Accessible navigation
- Dashboard content
- Visible tasks
- Available actions
- Editable sections

The prototype must prevent the new role from remaining on an unauthorized page.

## Filters and Lists

- Search and filters update results immediately.
- Active filters are visible and removable.
- Clear-all resets the current view.
- Saved views may be simulated locally.
- Returning from a record preserves filters and sorting.

## Drawers

Use drawers for:

- Task preview
- Offer preview
- Attachment preview
- Activity detail

Drawers must preserve the background page and support keyboard dismissal.

## Dialogs

Use dialogs for:

- Approval confirmation
- Return reason
- Rejection reason
- Cancellation
- Deposit break confirmation
- Demo reset

## Feedback States

Required states:

- Success toast
- Error toast
- Inline validation
- Loading skeleton
- Empty state
- No search results
- Read-only state
- Disabled action with explanation

## Demo Controls

Settings provide:

- Reset all demo data
- Load curated scenario
- Switch role
- Restore default filters

Resetting data requires explicit confirmation.
