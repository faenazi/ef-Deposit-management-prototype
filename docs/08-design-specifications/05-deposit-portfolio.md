# Deposit Portfolio Design Specification

## 1. Purpose

The Deposit Portfolio provides a consolidated operational and executive view of all deposits after activation. It must support portfolio monitoring, maturity management, bank exposure review, and direct access to each deposit record.

The screen must feel like a controlled financial portfolio, not a generic list of records.

## 2. Primary user questions

The page must answer quickly:

- What is the current total principal invested?
- How many deposits are active?
- What is maturing soon?
- Which banks hold the largest exposure?
- What is the weighted average return?
- Are there overdue actions or unresolved exceptions?
- Which deposit requires attention next?

## 3. Page hierarchy

Recommended order:

1. Page header and primary filters.
2. Portfolio summary strip.
3. Maturity and exposure insights.
4. Deposit register.
5. Contextual detail drawer or full deposit page.

Avoid filling the top of the page with many equal-sized KPI cards.

## 4. Page header

Include:

- Title: محفظة الودائع.
- Short descriptive subtitle.
- Last updated timestamp.
- Export action.
- Optional portfolio view selector.

No create-deposit button is required because deposits originate from approved and executed investment requests.

## 5. Portfolio summary

Use a composed summary area with no more than five primary metrics:

- Total active principal.
- Number of active deposits.
- Weighted average rate.
- Expected total return.
- Amount maturing within the selected period.

### Metric behavior

- Show currency and unit clearly.
- Use consistent numeric alignment.
- Provide a tooltip or supporting label for weighted calculations.
- Do not use trend arrows unless a valid comparison period exists.
- Do not imply positive or negative performance through decorative colors without a defined benchmark.

## 6. Primary filters

Include:

- Status.
- Bank.
- Maturity date range.
- Tenor.
- Amount range.
- Rate range.
- Currency when needed.
- Search by deposit or request reference.

Use a compact filter bar with a secondary advanced-filter drawer.

Display active filters as removable chips.

## 7. Portfolio views

Support at least these views:

- Active.
- Maturing soon.
- Completed.
- Closed or broken.
- All deposits.

These views may appear as restrained segmented controls or tabs.

The default view should be Active.

## 8. Maturity insight

Provide a maturity distribution view using time buckets such as:

- 0–30 days.
- 31–60 days.
- 61–90 days.
- 91–180 days.
- More than 180 days.

The visualization should be simple and decision-oriented.

Selecting a bucket filters the deposit register.

Do not use a decorative radial chart when a clear bar or timeline communicates the information better.

## 9. Bank exposure insight

Show exposure by bank using:

- Principal amount.
- Percentage of active portfolio.
- Number of deposits.
- Weighted average rate when useful.

Use a horizontal bar chart or ranked list.

The design must distinguish concentration information from risk judgment. Do not label exposure as high risk unless a documented business rule exists.

## 10. Deposit register

The register is the main operational component.

Recommended columns:

- Deposit reference.
- Bank.
- Principal.
- Rate.
- Tenor.
- Value date.
- Maturity date.
- Days remaining.
- Expected return.
- Status.
- Attention indicator.
- Actions.

### Table quality rules

- Keep numeric columns consistently aligned.
- Allow sorting by principal, rate, value date, maturity date, and days remaining.
- Freeze the identifying columns when horizontal scrolling is required.
- Use subtle row dividers rather than heavy borders.
- Maintain comfortable but efficient row height.
- Provide a visible hover and keyboard focus state.
- Do not rely on zebra striping as the primary structure.

## 11. Attention indicators

A deposit may require attention because of:

- Maturity approaching.
- Missing maturity instruction.
- Custodian mismatch.
- Accounting exception.
- Pending rollover decision.
- Broken deposit process.

Show a compact labeled indicator with a tooltip or expandable reason.

Do not use a generic warning icon without explaining the issue.

## 12. Deposit detail access

Selecting a row opens either:

- A full deposit detail page for complex lifecycle management, or
- A wide side drawer for quick review.

The prototype should support a full detail view when the user needs to manage maturity, rollover, accounting, or custodian information.

## 13. Deposit detail composition

The detail view includes:

### Identity summary

- Deposit reference.
- Source investment request.
- Bank.
- Status.
- Owner.

### Financial terms

- Principal.
- Rate.
- Tenor.
- Value date.
- Maturity date.
- Expected return.
- Actual return when completed.

### Lifecycle sections

- Placement and transfer.
- Accounting.
- Custodian confirmation.
- Maturity instruction.
- Rollover or closure.
- Attachments.
- Activity history.

### Source request relationship

Provide a clear link back to the originating investment request.

The deposit must never appear as an unrelated duplicate record.

## 14. Status model

Supported portfolio states include:

- Active.
- Maturing soon.
- Matured pending closure.
- Rolled over.
- Completed.
- Closed.
- Broken.
- Under exception review.

Status labels must be documented and consistently used across the platform.

## 15. Maturity management

For deposits approaching maturity, show:

- Days remaining.
- Required decision date.
- Decision owner.
- Current instruction state.
- Available actions.

Potential actions:

- Redeem at maturity.
- Create rollover request.
- Confirm maturity proceeds.
- Record exception.

The interface must not automatically treat rollover as a simple status update. A rollover should link to the appropriate request or controlled decision flow.

## 16. Empty states

Define purposeful empty states for:

- No active deposits.
- No deposits matching filters.
- No deposits maturing soon.
- No exceptions.

Each state should explain the situation and provide a relevant next step without using decorative illustrations that overpower the enterprise tone.

## 17. Export behavior

Allow export of the currently filtered register.

The export interaction must state:

- Included filters.
- File format.
- Generated timestamp.
- Whether summary data is included.

Do not place multiple unexplained export icons around the page.

## 18. Responsive behavior

### Tablet

- Stack summary and insight panels.
- Keep the register horizontally scrollable with frozen identity columns when possible.
- Move advanced filters into a drawer.

### Mobile

- Prioritize active, maturing soon, and attention-required views.
- Convert table rows into structured deposit cards.
- Show principal, bank, rate, maturity date, days remaining, and status first.
- Move secondary details into an expandable area.

## 19. Loading and error states

Include:

- Summary skeletons.
- Chart skeletons.
- Table row skeletons.
- Partial-load warning when insights fail but the register succeeds.
- Clear retry behavior.
- Export failure state.

Do not block the entire page because one secondary visualization failed.

## 20. Visual quality requirements

The portfolio is accepted only when:

- It looks like a financial portfolio rather than a CRUD table.
- The user can identify maturity pressure and bank concentration quickly.
- Summary metrics are controlled and not excessive.
- Tables remain readable in Arabic RTL.
- Financial values use consistent formatting.
- Status and attention indicators are understandable without color alone.
- The page retains visual calm at high data volumes.