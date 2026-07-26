# Accessibility

## Goal

The prototype must provide an accessible keyboard-operable experience and must not depend on color alone to communicate business meaning.

## Keyboard Access

- All interactive elements are keyboard reachable.
- Focus order follows the visual and logical RTL reading sequence.
- Drawers and dialogs trap focus while open and return focus to the trigger on close.
- Skip navigation is available for the main content area.
- Data table actions are accessible without hover.

## Focus Visibility

- Every interactive component has a strong focus-visible state.
- Focus indication must remain visible against all supported surfaces.
- Do not remove browser focus behavior without an accessible replacement.

## Labels and Semantics

- Form controls have programmatic labels.
- Icon-only controls include accessible names.
- Required fields and validation errors are announced clearly.
- Headings use a logical hierarchy.
- Tables use correct header associations.

## Color and Contrast

- Text and controls must meet appropriate contrast levels.
- Statuses combine color with labels or icons.
- Disabled states remain readable.
- Chart series use distinguishable patterns, labels, or direct annotations where needed.

## Errors and Validation

- Show validation near the affected field.
- Provide a validation summary when submission is blocked.
- Move focus to the summary or first invalid field after failed submission.
- Error messages explain how to resolve the issue.

## Motion

- Respect reduced-motion preferences.
- Avoid flashing, rapid movement, or looping decorative animation.

## Direction and Language

- The document root uses Arabic language and RTL direction.
- Mixed-direction identifiers such as IBANs, request numbers, rates, and dates remain readable.
- Screen-reader labels use clear Arabic terminology.

## Prototype Review

Accessibility review must cover:

- Sidebar and top navigation
- Role switcher
- Lists and tables
- Request workspace sections
- Drawers and dialogs
- File upload
- Approval actions
- Toast and status feedback
