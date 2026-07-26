# Component Library

## Purpose

Define the reusable UI components required before feature pages are implemented.

## Foundation Components

- Button
- Icon button
- Link
- Badge
- Avatar
- Divider
- Tooltip
- Popover
- Dropdown menu
- Tabs
- Accordion
- Scroll area

## Form Components

- Text input
- Number input
- Currency input
- Percentage input
- Date picker
- Date range picker
- Select
- Multi-select
- Radio group
- Checkbox
- Textarea
- File upload
- Form field wrapper
- Inline validation message
- Read-only value field

## Data Components

- Data table
- Sort control
- Filter bar
- Saved view selector
- Pagination
- Column visibility control
- Density selector
- Summary row
- Empty state
- No-results state
- Skeleton table

## Business Components

- Request status badge
- Deposit status badge
- Workflow stepper
- Approval timeline
- Activity feed
- Task card
- KPI block
- Financial metric
- Bank offer comparison row
- Offer ranking indicator
- Portfolio concentration indicator
- Maturity indicator
- Attachment card
- Completion checklist
- Validation summary
- Role switcher

## Overlay Components

- Dialog
- Confirmation dialog
- Drawer
- Side sheet
- Toast
- Command palette or global search dialog

## Layout Components

- Application shell
- Sidebar
- Top bar
- Page header
- Section header
- Content container
- Two-column workspace
- Three-zone transaction workspace
- Sticky summary panel
- Sticky action bar

## Required States

Each interactive component must define:

- Default
- Hover
- Focus visible
- Active
- Disabled
- Loading
- Error where applicable
- Read-only where applicable

## Composition Rules

- Feature pages compose shared components instead of rebuilding them.
- Business-specific behavior may wrap primitives but must not fork their visual rules.
- Components accept semantic variants, not arbitrary style strings.
- All components must support RTL.
- Accessibility attributes are required from initial implementation.
