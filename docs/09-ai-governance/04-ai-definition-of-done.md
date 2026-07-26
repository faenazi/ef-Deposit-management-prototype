# AI Definition of Done

A task is complete only when all applicable criteria below are satisfied.

## Functional completion

- The documented user journey works from entry to intended outcome.
- Required interactions, filters, tabs, dialogs, drawers, and navigation behave correctly.
- Mock data represents realistic deposit-management scenarios.
- Role-specific information and actions match the documented workflow.

## Design completion

- The result matches the relevant design specification.
- The page has a strong and beautiful visual hierarchy.
- The Environment Fund identity is applied correctly and with restraint.
- Arabic RTL behavior is correct across content and controls.
- Desktop, tablet, and mobile experiences are intentionally designed.
- Loading, empty, error, success, disabled, and permission states are included where applicable.

## Engineering completion

- Type checking passes.
- Linting passes.
- The production build passes.
- No console errors or warnings remain.
- No inaccessible interaction is knowingly left unresolved.
- No placeholder, commented-out code, unexplained TODO, or dead route remains.
- New abstractions are justified and named clearly.

## Documentation completion

- Material assumptions are recorded.
- New reusable patterns are documented when necessary.
- Changes do not contradict existing business, brand, or UX documentation.
- The final task report lists files changed, validations performed, and known limitations.

## Not done

A task is not complete merely because:

- the page renders;
- the happy path works;
- desktop looks acceptable;
- mock data exists;
- the code compiles while the visual result is generic;
- the design is attractive but contradicts the business process;
- the screen has no overflow but is difficult to use on mobile.
