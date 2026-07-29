# Dashboard Visual Cohesion v5

Focused product-owner refinement after the 2026-07-29 wide-screen review.

## Visible issues addressed

1. The 1136px content frame left excessive unused space on wide monitors.
2. The sidebar used a bright interface blue instead of the approved DEC-024 navy treatment.
3. The 240px sidebar and 32px gap carried too much visual weight.
4. The desktop sidebar compressed the workspace at 1024px tablet width.
5. Six nearly identical KPI cards created a repeated card wall.
6. Nested section and metric cards weakened the hierarchy.
7. The primary portfolio value did not have enough financial emphasis.
8. Gray canvas and softened body text reduced EF brand presence and contrast.
9. Section headings, borders, radii, and spacing competed at the same visual weight.
10. Mobile summary cards delayed urgent work too far down the first screen.
11. The mobile drawer did not explicitly lock document scrolling.
12. The default specialist identity did not match the requested stakeholder persona.

## Refinement direction

- Fluid 1600px wide workspace with consistent gutters.
- Official warm neutral canvas, deep navy text, and DEC-024 dark navy sidebar.
- Compact 216px desktop rail; drawer navigation remains active through 1279px.
- One dominant portfolio card combines active principal and weighted return.
- Four lighter supporting metrics replace the equal-weight six-card wall.
- Hero, primary KPI, and operational cards use three deliberate radius levels.
- Operational sections use dark headings; EF blue is reserved for actions and accents.
- Tablet shows four supporting KPIs in one row.
- Mobile keeps the primary KPI dominant while reducing support-card height.
- Default Deposit Specialist is `رغد العريني`.

## Captures

- Deposit Specialist: 2048×960, 1440×900, 1280×800, 1024×768, 768×1024, 430×932, 390×844, 360×800.
- General Manager of Treasury: 1440×900.
- Executive Director: 1440×900.
- Read-only User: 1440×900.
- Mobile drawer open: 390×844.

## Browser validation

- No horizontal overflow at all captured widths.
- Drawer opens from the right, moves focus to Close, locks body/root scrolling, closes with Escape, restores scrolling, and returns focus to the menu trigger.
- Role switching updates the hero title and content for Deposit Specialist, GM Treasury, Executive Director, and Read-only User.

