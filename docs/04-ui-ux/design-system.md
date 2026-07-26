# Enterprise Design System

## Design Intent

The prototype must feel like a modern institutional treasury platform: calm, precise, premium, data-rich, and intentionally designed.

It must not look like a generic admin template.

## Visual Principles

1. Clarity before decoration.
2. Strong hierarchy with restrained use of color.
3. High information density without visual crowding.
4. Consistency across lists, workspaces, reports, and dialogs.
5. Arabic-first RTL behavior.
6. Executive-grade visual polish.

## Color Roles

Use semantic design tokens rather than raw colors inside components.

Required token groups:

- `brand-primary`
- `brand-primary-strong`
- `brand-accent`
- `surface-page`
- `surface-card`
- `surface-muted`
- `text-primary`
- `text-secondary`
- `text-disabled`
- `border-subtle`
- `border-strong`
- `status-success`
- `status-warning`
- `status-danger`
- `status-info`
- `status-neutral`

The Environment Fund brand reference remains authoritative once assets are added.

## Typography

- Arabic readability is mandatory.
- Use a clear hierarchy for page titles, section headings, labels, values, and helper text.
- Financial amounts require tabular numerals where supported.
- Avoid oversized headings that reduce usable workspace.
- Do not mix several font families.

## Spacing

Use a consistent spacing scale based on a small set of tokens.

Recommended rhythm:

```text
4, 8, 12, 16, 20, 24, 32, 40, 48
```

Pages should feel spacious at the macro level while tables and forms remain efficient.

## Radius and Elevation

- Use moderate radii.
- Avoid excessive pill-shaped containers.
- Use subtle borders before shadows.
- Reserve stronger elevation for drawers, dialogs, and floating action areas.
- Do not give every card a shadow.

## Data Presentation

- Align financial values consistently.
- Separate labels from values with hierarchy, not decorative lines.
- Use status badges sparingly.
- Avoid pie charts when comparison is more important than composition.
- Charts require titles, legends where needed, tooltips, and readable axes.

## Motion

- Motion must be subtle and functional.
- Use short transitions for drawers, dialogs, expandable rows, filters, and status changes.
- Respect reduced-motion preferences.
- Avoid decorative animation loops.

## Density Modes

Default to comfortable enterprise density.

Tables may offer compact density if needed, but page layouts must not switch density unpredictably.

## RTL Rules

- Layout direction is RTL.
- Numeric values, bank codes, IBANs, percentages, dates, and English identifiers retain readable direction.
- Icons that imply direction must mirror where semantically required.
- Charts and timelines must remain understandable in RTL.

## Forbidden Patterns

- Generic template dashboards
- Equal card grids across every page
- Excessive gradients
- Excessive shadows
- Rainbow status colors
- Decorative glassmorphism
- Large empty hero sections
- Unnecessary illustrations
- Different visual language per feature
- Raw hex values inside feature components
