# Responsive Strategy

## 1. Purpose

The platform is designed primarily for treasury work on enterprise desktop and laptop screens, while remaining fully usable on tablets and smaller screens. Responsive behavior must preserve business priority, readability, and task completion rather than merely shrinking the desktop layout.

## 2. Supported viewport strategy

| Category | Width guidance | Primary behavior |
|---|---:|---|
| Large desktop | 1440px and above | full navigation, wide workspace, multi-column summaries |
| Desktop | 1280px–1439px | full navigation, optimized content grid |
| Laptop | 1024px–1279px | compact spacing, controlled two-column layouts |
| Tablet landscape | 768px–1023px | collapsible navigation, stacked secondary content |
| Small tablet / mobile | below 768px | single-column task-focused experience |

These ranges guide layout decisions. Components must respond to available container width rather than relying only on device labels.

## 3. Desktop-first business priority

The core prototype must be strongest on desktop and laptop because users will compare offers, review documents, approve requests, and analyze deposits in data-dense workspaces.

Mobile support must prioritize:

- viewing assigned tasks;
- checking request status;
- reviewing summaries;
- performing simple approvals when suitable;
- reading notifications and maturity alerts.

Complex bank-offer comparison and dense reporting may use simplified mobile views while retaining access to full data.

## 4. Application shell

### Large desktop and desktop

- Persistent right-side navigation for RTL.
- Header remains stable.
- Main content uses a controlled maximum width where appropriate.
- Transaction workspaces may use the full available width.

### Laptop

- Navigation width may reduce.
- Labels remain visible unless space becomes insufficient.
- Reduce decorative whitespace before reducing readable text size.

### Tablet

- Navigation becomes an overlay drawer or compact rail.
- Header actions move into grouped menus when necessary.
- The main page remains one clear reading column with selected two-column sections.

### Mobile

- Navigation opens as an accessible drawer.
- Page title and primary action remain visible.
- Secondary actions move to an overflow menu or bottom action area.
- No permanent side summary panel.

## 5. Grid system

Use a 12-column grid for large screens with consistent gutters.

Recommended behavior:

- Large desktop: 12 columns.
- Desktop: 12 columns.
- Laptop: 8 or 12 responsive columns.
- Tablet: 6 columns.
- Mobile: 4 columns or single-flow layout.

Components should use semantic spans rather than fixed pixel widths.

## 6. Page container rules

- Standard list and dashboard pages may use a readable maximum width.
- Data comparison and transaction workspace pages may expand wider.
- Maintain minimum page gutters at every breakpoint.
- Do not center dense Arabic tables inside excessive empty margins.
- Do not allow content to touch viewport edges.

Suggested minimum horizontal padding:

| Viewport | Padding |
|---|---:|
| Large desktop | 32px |
| Desktop / laptop | 24px |
| Tablet | 20px |
| Mobile | 16px |

## 7. Typography responsiveness

- Preserve body text readability; do not reduce standard body text below 14px.
- Financial values may scale down one step on smaller screens.
- Page titles may wrap naturally.
- Avoid aggressive fluid typography that makes enterprise pages inconsistent.
- Keep table and form labels readable without horizontal compression.

## 8. Dashboard behavior

### Desktop

- Use a clear KPI row.
- One primary insight area.
- Supporting tasks, maturities, and activity in balanced columns.

### Laptop

- KPI cards may wrap from four to two per row.
- Primary chart retains full readable width.
- Secondary panels may stack.

### Tablet

- KPIs use two columns.
- Charts stack vertically.
- Task and maturity lists become full-width sections.

### Mobile

- KPIs use one or two columns depending on content.
- Show concise summaries before charts.
- Hide low-value decorative chart detail.
- Keep urgent tasks and maturities first.

## 9. Transaction workspace behavior

The standard desktop workspace consists of:

1. page header;
2. workflow progress;
3. section navigation;
4. main workspace;
5. summary panel;
6. sticky actions.

### Desktop

- Main workspace and summary panel may appear side by side.
- Section navigation remains visible when useful.
- Sticky action area remains accessible without covering content.

### Laptop

- Summary panel narrows or becomes collapsible.
- Main workspace receives priority.
- Workflow labels may shorten while preserving step meaning.

### Tablet

- Summary panel moves above or below the active section.
- Section navigation becomes horizontally scrollable tabs or a dropdown.
- Workflow becomes a compact step summary with expandable details.

### Mobile

- Use a single content column.
- Show current workflow stage prominently and provide a details expansion.
- Place primary action in a sticky bottom action bar when appropriate.
- Move secondary actions into an overflow menu.
- Do not use a desktop side summary squeezed into the page.

## 10. Tables

Tables are essential and must not be converted blindly into cards.

Responsive options in priority order:

1. Keep the table and allow controlled horizontal scrolling.
2. Freeze the most important identifying column when practical.
3. Hide optional columns through a documented priority system.
4. Provide a row-detail drawer for secondary data.
5. Use cards only when the data is naturally record-oriented and comparison is not the primary task.

Every responsive table must retain:

- row identity;
- key amount or rate;
- status;
- primary action;
- access to full detail.

## 11. Forms

### Desktop

- Use two columns only for logically paired short fields.
- Long inputs, comments, and attachments remain full width.

### Tablet and mobile

- Stack fields in one column.
- Keep labels above controls.
- Maintain sufficient touch targets.
- Do not place two critical financial inputs side by side on narrow screens.
- Validation messages appear directly below the related field.

## 12. Filters and search

### Desktop

- Primary filters may remain inline.
- Advanced filters open in a controlled panel or drawer.

### Tablet and mobile

- Keep search immediately accessible.
- Move filters into a modal sheet or drawer.
- Display active filters as removable chips.
- Preserve filter state when the panel closes.

## 13. Charts

- Resize based on container width.
- Preserve minimum chart height.
- Stack legends when necessary.
- Simplify series and labels before shrinking text.
- Use a summary or accessible table for charts that become too dense.
- Never require horizontal page scrolling for a chart.

## 14. Modals and drawers

- Desktop dialogs should remain appropriately sized and not occupy the full screen without need.
- Tablet dialogs may become wider.
- Mobile dialogs should become full-screen sheets for complex forms.
- Side drawers must use a consistent side in RTL.
- Focus management and close controls remain accessible at every size.

## 15. Touch and interaction

For tablet and mobile:

- Minimum interactive target: approximately 44×44px.
- Do not rely on hover.
- Tooltips cannot contain essential-only information.
- Row actions must be discoverable by tap.
- Drag interactions require an alternative control.

## 16. Content priority rules

When space decreases, remove or relocate content in this order:

1. decorative identity accents;
2. redundant helper text;
3. secondary metadata;
4. tertiary actions;
5. optional chart annotations.

Never remove:

- request or deposit identity;
- financial amount;
- current status;
- workflow stage;
- maturity date where relevant;
- primary task or approval action;
- critical validation or warning.

## 17. Responsive acceptance criteria

A page is not responsive merely because it does not overflow. It must satisfy all of the following:

- no unintended horizontal page scroll;
- Arabic text remains readable and correctly aligned;
- primary action remains discoverable;
- financial data is not truncated ambiguously;
- tables retain useful comparison or access to full detail;
- navigation works by keyboard and touch;
- sticky elements do not cover content;
- patterns and decoration reduce or disappear appropriately;
- all loading, empty, error, and validation states work at each breakpoint;
- role switching and demo controls remain usable.

## 18. Testing viewports

At minimum, manually review:

```text
1600 × 1000
1440 × 900
1280 × 800
1024 × 768
820 × 1180
768 × 1024
390 × 844
360 × 800
```

Testing must include Arabic content with realistic long labels, large financial values, tables, dialogs, drawers, charts, and sticky action areas.