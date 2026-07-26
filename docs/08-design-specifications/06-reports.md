# Reports and Analytics Design Specification

## 1. Purpose

Reports and Analytics must support treasury oversight, management reporting, portfolio analysis, and decision preparation without turning the prototype into a business intelligence tool detached from the operational platform.

The experience should be concise, credible, exportable, and visually consistent with the deposit portfolio.

## 2. Design principles

- Lead with the business question, not the chart type.
- Use a small number of high-value visualizations.
- Keep filters visible and understandable.
- Allow users to move from summary to supporting deposits or requests.
- Explain calculation scope and reporting period.
- Avoid decorative dashboards and chart overload.
- Use tables when exact values matter more than visual shape.

## 3. Page structure

Recommended structure:

1. Report header.
2. Reporting period and global filters.
3. Executive summary.
4. Analytical sections.
5. Detailed supporting register.
6. Export and report metadata.

## 4. Global filters

Include:

- Reporting period.
- Portfolio status.
- Bank.
- Tenor.
- Amount range.
- Maturity range.
- Request or deposit owner when useful.

Filters must apply consistently across all visible metrics and charts.

Show the active reporting context near the page title, for example:

- As of date.
- Included statuses.
- Selected banks.
- Currency scope.

## 5. Report catalogue

The prototype should include focused report views rather than one crowded page.

Recommended reports:

1. Portfolio overview.
2. Maturity profile.
3. Bank exposure.
4. Return analysis.
5. Investment request performance.
6. Workflow and approval performance.
7. Exceptions and overdue actions.

## 6. Portfolio overview

Show:

- Active principal.
- Number of active deposits.
- Weighted average rate.
- Expected return.
- Amount maturing in the selected period.
- Distribution by bank.
- Distribution by tenor.

The summary should remain consistent with the Deposit Portfolio page.

## 7. Maturity profile report

Show:

- Maturity value by month or selected interval.
- Number of deposits maturing.
- Upcoming decision deadlines.
- Deposits without maturity instructions.
- Reinvestment decisions initiated.

Preferred visualizations:

- Column chart for maturity amount over time.
- Supporting table for exact deposit details.

Allow users to select a period and drill into the matching deposits.

## 8. Bank exposure report

Show:

- Principal by bank.
- Percentage of total active portfolio.
- Deposit count.
- Weighted average rate.
- Nearest maturity.

Use a ranked horizontal bar chart and a detailed table.

Do not use risk labels unless formal exposure limits are documented.

## 9. Return analysis report

Show:

- Expected return by bank.
- Expected return by tenor.
- Weighted average rate over time.
- Actual versus expected return for completed deposits when data exists.
- Rate distribution.

### Interpretation rule

Any comparison must clearly state:

- Comparison period.
- Included population.
- Whether values are expected or actual.
- Whether calculations are weighted.

Do not imply performance improvement from a rate increase without considering tenor and portfolio composition.

## 10. Investment request performance report

Show:

- Requests created.
- Requests submitted.
- Requests approved.
- Requests returned.
- Requests rejected.
- Requests executed.
- Average amount per request.
- Conversion from request to active deposit.

Use a restrained funnel or stage table only if it accurately reflects the workflow.

## 11. Workflow and approval performance

Show:

- Average cycle time from draft submission to decision.
- Average time by approval stage.
- Requests exceeding target duration.
- Return-for-revision frequency.
- Current workload by role.

Do not rank individuals publicly unless this is an approved business requirement.

## 12. Exceptions and overdue actions

Show:

- Deposits with unresolved exceptions.
- Overdue approval tasks.
- Missing accounting records.
- Maturity decisions not completed by the required date.

The report should support direct navigation to the affected record.

## 13. Chart standards

All charts must follow `docs/07-brand-experience/07-data-visualization.md`.

Additional rules:

- Keep chart titles as business statements or questions.
- Show units in titles or axes.
- Avoid legends when direct labeling is clearer.
- Use tooltips for supporting detail, not essential information.
- Do not use 3D charts.
- Do not use doughnut charts for many categories.
- Do not use more colors than required to distinguish the data.
- Preserve readable Arabic labels and correct RTL behavior.

## 14. Detailed tables

Every report requiring auditability must include a supporting table or drill-through view.

Tables should provide:

- Clear column definitions.
- Sorting.
- Filtering.
- Pagination or virtualized loading for larger sets.
- Export of the current filtered scope.

## 15. Export and printable report behavior

Support:

- Excel export for detailed data.
- PDF export for management-ready summaries when implemented.
- Clear generated timestamp.
- Applied filters.
- Report title and period.
- Environment Fund identity without excessive decoration.

Exported reports must not depend on hover states or hidden tooltips to be understood.

## 16. Data freshness and trust

Show:

- Last refresh time.
- Reporting as-of date.
- Data scope.
- Partial-data warning when relevant.

If data is simulated in the prototype, label it clearly in development documentation without cluttering every screen.

## 17. Empty and insufficient-data states

Define states for:

- No data in selected period.
- Data exists but is insufficient for a trend.
- Filters return no matching records.
- A report section is unavailable.

Do not show misleading zero trends when the underlying data is absent.

## 18. Responsive behavior

### Tablet

- Stack report sections.
- Keep key filters accessible.
- Allow charts to use full available width.
- Move detailed tables below visual summaries.

### Mobile

- Prioritize executive summary and exception reports.
- Show one chart per section.
- Replace large comparison tables with ranked cards or focused lists.
- Preserve access to export only when the format is useful on mobile.

## 19. Visual quality requirements

Reports are accepted only when:

- Each visualization answers a clear treasury question.
- The page is not crowded with charts.
- Exact financial values remain available.
- Reporting context and calculation scope are visible.
- Charts and tables use consistent terminology with the operational pages.
- The experience appears executive and institutional rather than like a generic analytics template.