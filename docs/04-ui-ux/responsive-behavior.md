# Responsive Behavior

## Supported Viewports

The prototype is optimized for:

- Large desktop displays
- Standard desktop displays
- Laptops
- Landscape tablets

Mobile phone optimization is not part of the current prototype scope.

## Breakpoint Principles

Breakpoints should be driven by layout needs rather than device names.

Recommended behavior:

### Large Desktop

- Expanded sidebar
- Full workspace navigation
- Main content and sticky summary displayed side by side
- Wide analytical layouts

### Standard Desktop

- Expanded or user-collapsible sidebar
- Slightly reduced page margins
- Full data tables with horizontal prioritization

### Laptop

- Collapsible sidebar
- Reduced summary panel width
- Secondary table columns may be hidden through column controls
- Filters may collapse into an advanced filter panel

### Landscape Tablet

- Icon or overlay sidebar
- Workspace summary moves above or into a drawer
- Tables allow controlled horizontal scrolling
- Sticky action bar remains accessible
- Contextual navigation may become horizontally scrollable or use a section selector

## Component Behavior

### Tables

- Preserve critical columns.
- Never compress values until unreadable.
- Allow controlled horizontal scrolling.
- Use a detail drawer when secondary data cannot fit.

### Forms

- Two-column forms collapse to one column when needed.
- Labels remain close to their fields.
- Currency and percentage fields retain correct alignment.

### Dashboard

- Analytical sections stack by importance.
- KPIs may wrap, but should not become a large grid of identical cards.
- Task and maturity content appears before secondary trends on smaller screens.

### Transaction Workspace

- Contextual navigation remains available.
- Sticky summary panel collapses into an expandable summary.
- Sticky actions remain visible without covering content.

## Quality Rules

- No content clipping.
- No overlapping fixed elements.
- No horizontal page scroll except controlled table regions.
- Dialogs and drawers must fit the viewport.
- Arabic labels must not be truncated where the full meaning is required.
