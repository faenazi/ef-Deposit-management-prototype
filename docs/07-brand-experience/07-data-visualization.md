# Data Visualization Standards

## 1. Purpose

Charts in the Investment Deposit Management Platform must support treasury decisions, not decorate dashboards. Every visualization must answer a specific business question and remain understandable in Arabic RTL layouts.

## 2. Decision-first principle

Before adding a chart, define:

- the decision it supports;
- the primary measure;
- the comparison or trend;
- the intended user role;
- the action expected after interpretation.

If a number, table, or short comparison communicates the answer more clearly, do not use a chart.

## 3. Approved chart types

| Chart | Approved use |
|---|---|
| KPI / metric card | single critical value with context |
| Horizontal bar | comparing banks, tenors, statuses, or departments |
| Vertical column | comparing time periods with a limited number of categories |
| Line | trends over time, maturity schedule, return movement |
| Area | cumulative exposure or portfolio trend when the filled area adds meaning |
| Donut | simple part-to-whole with no more than five segments |
| Stacked bar | composition across a limited set of categories |
| Bullet / progress | target versus actual |
| Heatmap | maturity concentration or workload density when labels remain clear |

Avoid pie charts when values are close, categories exceed five, or exact comparison matters.

## 4. Prohibited visualizations

Do not use:

- 3D charts;
- gauges or speedometers;
- decorative radial charts;
- exploded pie charts;
- excessive gradients;
- animated chart loops;
- more than six simultaneous series;
- charts without labels, units, period, or source context;
- green-red comparison without additional labels or icons.

## 5. Brand chart palette

Use official colors in a controlled sequence.

Recommended categorical order:

1. EF primary blue `#2C3A82`
2. EF secondary blue `#0051B1`
3. EF green `#C0CB6C`
4. EF brown `#A18E77`
5. EF navy `#0F1822`
6. approved neutral grey

Do not assign semantic meaning to a brand color unless documented. For example, EF green is not automatically “approved” in every chart.

## 6. Semantic chart colors

Use semantic tokens only for functional meaning:

- positive / achieved;
- warning / approaching maturity;
- negative / rejected or overdue;
- selected / highlighted;
- disabled / unavailable.

Every semantic use must include a text label, icon, pattern, or direct annotation so color is not the only signal.

## 7. Financial number formatting

### Currency

- Currency: Saudi Riyal.
- Arabic UI example: `١٢٥٬٠٠٠٬٠٠٠ ر.س`.
- Compact executive display: `125.0 مليون ر.س` when space is limited.
- Exact values must remain available in tooltip, detail view, or table.

### Rates

- Example: `5.42%`.
- Use two decimal places for bank offers and yield comparisons unless the business documentation specifies otherwise.
- Do not round rates in a way that changes ranking.

### Dates

- Use explicit date labels for maturities.
- Avoid ambiguous purely numeric dates.
- Charts may use concise month labels, while tooltips show the full date.

### Tenors

Use consistent business labels such as:

- شهران;
- 3 أشهر;
- 6 أشهر;
- 9 أشهر;
- 12 شهرًا.

## 8. KPI card anatomy

A KPI card must contain only the elements needed to interpret the metric:

1. concise label;
2. primary value;
3. unit;
4. context or comparison;
5. optional trend;
6. optional action.

Examples of approved KPIs:

- إجمالي محفظة الودائع;
- الودائع النشطة;
- متوسط العائد;
- الاستحقاقات خلال 30 يومًا;
- الطلبات بانتظار الاعتماد;
- أعلى عرض متاح.

Do not place every available measure in a KPI card.

## 9. Chart hierarchy

- Primary chart: supports the main decision and receives the most space.
- Secondary chart: provides comparison or supporting context.
- Tertiary visualization: compact and optional.

A dashboard should not feel like a wall of equally weighted charts.

## 10. Axes and gridlines

- Use light neutral gridlines.
- Start bar and column charts at zero unless a clearly documented analytical exception exists.
- Avoid dual axes except when there is no clearer alternative.
- Use readable Arabic labels and prevent truncation of important bank names.
- Prefer horizontal bars for long Arabic category labels.

## 11. Labels and tooltips

- Provide direct labels when practical.
- Tooltips must include the measure name, exact value, unit, and period/category.
- Tooltips must work by keyboard focus, not hover only.
- Legends should appear near the chart and follow RTL reading order.
- Do not rely on abbreviated labels without explanation.

## 12. Tables versus charts

Use a table when users need:

- exact offer rates;
- bank-by-bank comparison;
- sorting and filtering;
- approval details;
- maturity dates;
- auditability;
- row-level actions.

Use a chart when users need:

- trend recognition;
- concentration detection;
- high-level comparison;
- target tracking;
- executive summary.

Charts must link to or be supported by detailed data when the prototype interaction requires investigation.

## 13. Recommended treasury visualizations

### Portfolio distribution by bank

Use a horizontal bar chart sorted descending. Display amount and percentage of total portfolio.

### Maturity schedule

Use columns or a timeline grouped by month. Highlight the next 30 and 60 days using semantic annotations.

### Deposit return comparison

Use a sorted horizontal bar chart or structured offer table. Rate differences must remain numerically visible.

### Workflow workload

Use compact stacked bars or counts by status. Do not imply performance problems without sufficient context.

### Tenor allocation

Use horizontal bars or a donut only when there are five or fewer tenor groups.

## 14. Responsive behavior

### Desktop

Allow one primary wide chart and supporting visualizations in a structured grid.

### Tablet

Stack charts vertically and preserve labels. Remove low-value annotations before reducing font size.

### Mobile

Prefer KPI cards, compact summaries, and horizontally scrollable data tables. Replace complex multi-series charts with simplified views or summaries.

## 15. Accessibility

Every chart must provide:

- an accessible title;
- a short textual summary;
- a data table or equivalent accessible representation for critical information;
- sufficient contrast;
- non-color indicators;
- keyboard-accessible tooltips where interactive;
- no flashing or continuous animation.

## 16. Implementation governance

The chart library must be selected once during frontend foundation and wrapped in shared components.

Suggested shared components:

```text
FinancialKpi
ChartContainer
ChartLegend
AccessibleChartSummary
PortfolioByBankChart
MaturityScheduleChart
OfferRateComparisonChart
```

Feature code must not define arbitrary chart colors or formatting rules.