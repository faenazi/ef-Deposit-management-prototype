# Prompt 06 — Reports and Analytics

## Objective
Implement the Arabic RTL Reports and Analytics page as a focused executive and treasury analysis workspace.

## Read First
- `CLAUDE.md`
- `docs/07-brand-experience/`
- `docs/08-design-specifications/00-shared-layout-and-components.md`
- `docs/08-design-specifications/06-reports.md`
- `docs/09-ai-governance/`

## Scope
Implement only the reports route, documented local filters, meaningful charts, summary tables, and prototype export representation if explicitly specified.

## Requirements
- Arabic-first, true RTL.
- Use only decision-relevant analytics: portfolio value and trend, maturity distribution, bank exposure, tenor distribution, weighted return, request throughput, approval cycle indicators, and exceptions where documented.
- Every chart must answer a clear business question and include accessible labels, legends, tooltips, and supporting values.
- Provide global report filters such as period, bank, status, tenor, and amount range when documented.
- Keep filter context consistent across the page.
- Provide table/detail alternatives for important chart data.
- Use realistic deterministic mock data and Saudi Riyal formatting.
- Include loading, empty, insufficient-data, error, and restricted states.
- Support desktop, tablet, and mobile without unreadable charts or horizontal page overflow.

## Visual Direction
Create a refined executive analysis page with a limited number of strong visuals. Use whitespace, clear narrative sequence, and restrained Environment Fund colors. Do not create a wall of charts, decorative gauges, 3D charts, or rainbow series.

## Interaction Requirements
- Filters update the visible report data locally.
- Chart selection or legend interaction behaves meaningfully where implemented.
- Tooltips and focus states are accessible.
- Numbers shown in charts, tables, and summaries remain internally consistent.

## Boundaries
Do not add live BI integration, real file generation, external reporting tools, undocumented KPIs, or predictive analytics.

## Validation
Run `npm run typecheck`, `npm run lint`, and `npm run build` from `/src`; fix all introduced issues.

## Completion Report
Report changed files, implemented analytics, filter behavior, accessibility/responsive handling, states, and validation results.