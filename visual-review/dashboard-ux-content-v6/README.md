# Dashboard UX and Content Refinement v6

Focused redesign after the product-owner review that identified continued
inconsistency in Dashboard content priority and color usage.

## UX audit findings

1. The Deposit Specialist saw portfolio metrics before the work that required action.
2. Urgent counts were repeated across the hero, KPI summary, and alerts.
3. The Dashboard behaved like a report gallery instead of a daily work surface.
4. The deep-navy sidebar felt visually detached from the EF-blue application identity.
5. The active navigation state did not create enough contrast from the sidebar.
6. The canvas and subtle surfaces mixed warm grey, cool grey, and a green-tinted white.
7. The KPI composition still read as several separate cards with equal importance.
8. Operational alerts used generic copy instead of explaining the next action.
9. Pipeline headings did not explain which stages mattered to the selected role.
10. The mobile first viewport showed financial summary cards before urgent work.
11. The hero used an instruction as its main heading rather than establishing user context.
12. Executive and operational roles needed more visibly different content order.

## New UX hierarchy

### Deposit Specialist and operational roles

1. Compact role-aware greeting and permitted primary action.
2. Urgent issues and priority work queue.
3. Consolidated financial context.
4. Upcoming maturities.
5. Role-specific request pipeline and recent activity.

### GM Treasury and Executive Director

1. Compact role-aware greeting.
2. Consolidated financial position.
3. Approval decisions and material risks.
4. Maturities, exposure, and supporting analysis.

### Read-only

1. Greeting and view-only context.
2. Consolidated financial position.
3. Portfolio risks and maturities.
4. Supporting analysis without empty action areas.

## Brand and color direction

- Official EF primary blue `#2C3A82` now anchors the sidebar and mobile drawer.
- The active navigation item uses a white surface, EF-blue text, and a restrained
  official green accent.
- Exact EF warm grey is used for the application canvas.
- Deep navy is reserved for the consolidated financial position.
- Green is limited to return/positive emphasis.
- Semantic warning and danger colors appear only when action is required.
- The official pattern remains limited to the greeting, financial position, and
  lower navigation accent.

## Captures

- Deposit Specialist: 2048×960, 1440×900, 1280×800, 1024×768, 768×1024,
  430×932, 390×844, and 360×800.
- General Manager of Treasury: 1440×900.
- Executive Director: 1440×900.
- Read-only User: 1440×900.
- Mobile drawer open: 390×844.

## Validation

- No horizontal overflow at any captured viewport.
- Role switching changes greeting, copy, task focus, and section order.
- Mobile first viewport contains greeting, primary action, urgent issues, and the
  start of the work queue.
- Drawer opens from the right, locks scrolling, receives focus, closes with
  Escape, and returns focus to its trigger.
- Step 09 and later roadmap work were not started.
