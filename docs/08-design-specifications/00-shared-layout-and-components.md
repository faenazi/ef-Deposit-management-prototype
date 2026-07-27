# Shared Layout and Component Specifications

## 1. Experience objective

The application shell must feel like a purpose-built treasury workspace: composed, premium, efficient, and highly legible. It must not resemble a marketplace template, analytics theme, or conventional admin panel.

The interface should remain visually attractive through disciplined composition rather than decoration.

## 2. Application shell

### Desktop structure

```text
┌──────────────────────────────────────────────────────────────┐
│ Top header                                                   │
├──────────────┬───────────────────────────────────────────────┤
│              │ Page header                                   │
│ RTL sidebar  ├───────────────────────────────────────────────┤
│              │ Main content                                  │
│              │                                               │
└──────────────┴───────────────────────────────────────────────┘
```

Because the application is RTL, the primary sidebar appears on the right. Reading and action priority must flow naturally from right to left.

### Shell dimensions

- Sidebar expanded width: approximately 264 px.
- Sidebar collapsed width: approximately 80 px.
- Top header height: 72 px.
- Main page maximum content width: 1600 px where appropriate.
- Main content padding: 32 px on large screens, 24 px on standard laptop screens.
- Page vertical rhythm: based on an 8 px spacing system.

Dimensions may be adjusted slightly during implementation, but visual proportion must remain calm and balanced.

## 3. Sidebar

### Content order

1. Environment Fund logo.
2. Dashboard.
3. My Tasks.
4. Deposit Portfolio.
5. Investment Requests.
6. Reports.
7. Settings.
8. Collapse control near the bottom.

### Visual treatment

- Prefer a light or deep navy institutional surface based on the final shell direction.
- Active navigation must use a clear background, icon, and text treatment, not color alone.
- Do not place every item inside a separate card.
- Use one icon family consistently.
- Maintain generous spacing between navigation groups.
- Notification counts must be compact and restrained.
- The brand pattern may appear only as a subtle controlled crop in a non-interactive area.

### Interaction

- Hover, active, focus, and disabled states must be distinct.
- Collapsed mode retains tooltips and visible active state.
- Mobile and tablet use an accessible drawer rather than a permanently compressed sidebar.

## 4. Top header

The header contains only high-frequency global actions:

- contextual breadcrumb or product location;
- role switcher for prototype demonstrations;
- notifications;
- user identity and role;
- optional command or global search trigger.

Do not overcrowd the header with page-specific actions.

## 5. Page header pattern

Each page header contains:

- eyebrow or breadcrumb when helpful;
- page title;
- concise supporting description;
- primary action;
- optional secondary actions;
- contextual metadata when relevant.

The title and action block must align cleanly on desktop and stack logically on smaller screens.

## 6. Content composition

### Preferred visual sequence

```text
Page title and intent
↓
Decision-critical summary
↓
Filters or controls
↓
Primary content
↓
Secondary insight or history
```

### Grid principles

- Use asymmetric composition when it improves hierarchy.
- Avoid filling the screen with equally weighted cards.
- One section should clearly lead the page.
- Supportive content must be visually quieter.
- Keep related items close and unrelated items clearly separated.

## 7. Cards

Cards are containers, not decoration.

### Rules

- White or approved soft surface.
- Subtle border preferred over heavy shadow.
- Radius should be moderate and consistent.
- Internal padding generally 20–24 px.
- Do not nest cards repeatedly.
- Do not create cards for simple labels or every metric.
- Use a heading, optional description, content, and contextual action hierarchy.

### Elevated cards

Use elevation only for:

- dialogs;
- drawers;
- floating action areas;
- sticky summaries where separation is necessary.

## 8. KPI and financial summary components

A KPI component must contain:

- concise label;
- primary financial value;
- comparison or supporting context;
- optional trend indicator;
- optional micro-visualization only when meaningful.

Rules:

- The number is visually dominant.
- Use tabular numerals where supported.
- Format currency consistently in SAR.
- Never rely on red or green alone to explain movement.
- Avoid decorative icons unless they add recognition value.
- Do not create six or eight identical large KPI cards by default.

## 9. Tables and data grids

Treasury pages depend heavily on tables. Tables must feel polished and operationally efficient.

### Required features

- clear column hierarchy;
- stable alignment of financial values;
- row hover and keyboard focus;
- sortable columns where useful;
- selection only where bulk actions exist;
- sticky header for long lists;
- pagination or progressive loading;
- configurable density only if justified;
- responsive fallback rather than forced unreadable compression.

### Alignment

- Arabic text: right aligned.
- Dates: consistent alignment.
- Amounts, rates, and numeric values: visually aligned using tabular numerals.
- Actions: placed consistently at the logical row end.

### Row design

The most important identifier must appear as the row's strongest element. Supporting metadata must be smaller and quieter. Do not overload rows with excessive badges.

## 10. Filters

Use a two-level approach:

- persistent high-frequency filters visible above content;
- advanced filters inside a drawer or expandable panel.

Provide:

- search;
- status;
- owner or assignee;
- date or maturity range;
- bank where relevant;
- amount range where relevant;
- clear filters action;
- active filter count.

Filters must not dominate the page visually.

## 11. Status presentation

A status component includes:

- semantic label;
- restrained background or border;
- optional icon;
- accessible text.

Never communicate state using color alone. Status naming must match documented business terminology exactly.

## 12. Empty states

Every empty state should explain:

1. what is absent;
2. why that may be expected;
3. what the user can do next.

Use subtle EF graphic elements only when they improve the experience. Avoid playful consumer illustrations.

## 13. Drawers and dialogs

### Drawer

Use for:

- advanced filters;
- contextual details;
- task preview;
- supporting information that should not interrupt the workflow.

### Dialog

Use for:

- confirmation;
- destructive actions;
- concise decisions requiring explicit acknowledgment.

Complex forms must not be forced into small dialogs.

## 14. Forms

- Group fields by business meaning.
- Keep labels visible; do not rely on placeholders.
- Provide helper text only when needed.
- Mark required fields consistently.
- Use inline validation and an error summary for long forms.
- Preserve entered data across section navigation.
- Use appropriate input widths rather than stretching all fields equally.

## 15. Sticky action bar

Transaction-heavy pages may use a sticky action area containing:

- save draft;
- submit;
- approve or reject;
- contextual next action.

The bar must remain visually restrained and must not cover content on small screens.

## 16. Feedback

Use:

- inline validation for field issues;
- toast for completed non-blocking actions;
- banner for page-level warnings;
- dialog for irreversible decisions;
- skeletons that reflect final layout.

## 17. Accessibility

- Full keyboard operation.
- Visible focus state.
- Accessible names for icon-only controls.
- Proper landmarks and heading hierarchy.
- Minimum target size suitable for touch.
- Meaning preserved without color.
- Respect reduced-motion preferences.

## 18. Beauty review

Before accepting any screen, verify:

- Is there one clear visual focal point?
- Are financial numbers aligned and easy to scan?
- Is whitespace intentional?
- Are surfaces restrained rather than over-carded?
- Does the screen feel designed for treasury professionals?
- Is the Environment Fund identity visible without becoming decorative noise?
- Would removing unnecessary elements improve the composition?

A screen that is functionally complete but visually generic is not considered complete.