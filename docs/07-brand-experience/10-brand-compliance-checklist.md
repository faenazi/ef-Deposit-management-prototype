# Brand Compliance Checklist

Use this checklist before approving any screen, component set, page specification, or frontend implementation.

## Identity

- [ ] Only approved Environment Fund colors and documented semantic tokens are used.
- [ ] The correct approved logo asset is used.
- [ ] Logo proportions, clear space, and contrast are preserved.
- [ ] Patterns or radial elements are approved, intentional, and restrained.
- [ ] No unapproved gradient, neon color, glassmorphism, 3D effect, or heavy shadow appears.

## Product character

- [ ] The screen feels institutional, premium, calm, and financially trustworthy.
- [ ] It does not resemble a generic SaaS admin template.
- [ ] Financial information has stronger hierarchy than decoration.
- [ ] The screen supports a real decision, task, or monitoring objective.
- [ ] Color is not used as decoration without meaning.

## Arabic and RTL

- [ ] The page is designed RTL, not merely mirrored.
- [ ] Reading order, navigation, step flow, forms, and tables are correct.
- [ ] Arabic labels are natural, concise, and consistent.
- [ ] Mixed Arabic/English content does not create direction errors.
- [ ] Directional icons are mirrored where required.

## Typography

- [ ] Aktiv Grotesk is referenced with the approved fallback stack.
- [ ] Arabic small text does not use thin weights.
- [ ] Headings, labels, body text, metadata, and financial figures follow the documented hierarchy.
- [ ] Amounts, rates, dates, and primary identifiers are never truncated.
- [ ] Tabular alignment is consistent for monetary values.

## Layout and visual hierarchy

- [ ] The page title and purpose are immediately clear.
- [ ] The primary action is visible and permission appropriate.
- [ ] Status, workflow position, owner, and next step are easy to locate.
- [ ] Spacing is consistent and sufficient.
- [ ] Cards, borders, elevation, and radii are restrained.
- [ ] Dense content is grouped and progressively disclosed.

## Accessibility

- [ ] Text and controls meet accessible contrast expectations.
- [ ] Status is communicated through text, not color alone.
- [ ] Keyboard focus is visible.
- [ ] Interactive targets are sufficiently large.
- [ ] Icons have labels or accessible names where needed.
- [ ] Motion can be reduced and never blocks task completion.

## Responsive behavior

- [ ] The design works on desktop, laptop, and tablet widths.
- [ ] Navigation collapses without losing orientation.
- [ ] Tables have a documented responsive strategy.
- [ ] Sticky actions do not cover content.
- [ ] Critical financial, workflow, and decision information remains visible.
- [ ] No horizontal overflow occurs except inside deliberate data-table containers.

## Functional completeness

- [ ] Loading, empty, error, success, and permission-denied states are designed.
- [ ] Buttons and links have clear outcomes.
- [ ] Role switching produces coherent permissions and content.
- [ ] Mock data is realistic and internally consistent.
- [ ] Audit history and attachments are represented where required.
- [ ] No lorem ipsum, dead action, placeholder chart, or unexplained metric remains.

## Approval rule

A screen is not ready for frontend implementation when any identity, accessibility, RTL, financial hierarchy, or workflow item above remains unresolved.