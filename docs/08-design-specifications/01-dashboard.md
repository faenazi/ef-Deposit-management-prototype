# Dashboard Design Specification

## 1. Purpose

The dashboard is the user's decision surface, not a report gallery. It must answer three questions immediately:

1. What requires my attention now?
2. What is the current state of requests and deposits?
3. What financial events or maturities are approaching?

The content must adapt to the selected prototype role.

## 2. Visual direction

The page should feel executive, composed, and data-led. Avoid a wall of equal KPI cards. Use one dominant summary area, one operational focus area, and supporting insights beneath them.

A controlled Environment Fund pattern or radial graphic may appear in the top summary region at low visual intensity. It must never reduce data readability.

## 3. Desktop composition

```text
Page header + role context + primary action
↓
Executive financial overview / portfolio snapshot
↓
My priority tasks                 Upcoming maturities
↓
Requests requiring attention     Portfolio distribution
↓
Recent activity                  Quick actions
```

Suggested grid:

- top summary: full width;
- operational section: 8/4 or 7/5 split;
- supporting insights: balanced two-column layout;
- recent activity: full width or wider column depending on role.

## 4. Page header

Contains:

- title: `الصفحة الرئيسية`;
- concise role-aware greeting or context;
- last data refresh indicator;
- primary action for Specialist: create investment request;
- optional date range or view context only when useful.

Do not place numerous global filters in the header.

## 5. Executive financial overview

This is the strongest visual region.

### Content

- total active deposits;
- total invested principal;
- weighted average return;
- expected return or accrued return where represented by mock data;
- number/value of deposits maturing soon;
- compact comparison with previous period where meaningful.

### Design

- use a refined wide panel rather than five identical oversized cards;
- highlight one or two primary numbers and present others as supporting metrics;
- use clear labels and tabular numerals;
- show SAR explicitly and consistently;
- include a subtle trend or sparkline only when the mock data supports it;
- avoid decorative financial icons.

## 6. My priority tasks

This section is prominent for operational roles.

Each item contains:

- task title;
- related request or deposit identifier;
- current workflow context;
- due date or aging;
- priority;
- one clear action.

Show a maximum of five high-priority tasks with a link to My Tasks.

For executive roles, emphasize approval decisions. For Finance and Accounting, emphasize execution and posting activities.

## 7. Upcoming maturities

Show deposits maturing in meaningful windows such as:

- within 7 days;
- within 30 days;
- within 60 days.

The component may use a compact timeline, ordered list, or calendar-like strip. It must show:

- bank;
- principal;
- maturity date;
- days remaining;
- reinvestment or maturity action status.

Urgency must use label and date, not color alone.

## 8. Requests requiring attention

Show requests that are:

- drafts missing critical data;
- awaiting user action;
- delayed in approval;
- awaiting offers;
- ready for recommendation;
- ready for execution.

Use a compact table or structured list. Avoid duplicating the full Investment Requests page.

## 9. Portfolio distribution

Use one meaningful visualization, not several decorative charts.

Preferred options:

- distribution by bank;
- distribution by tenor;
- maturity ladder;
- principal by status.

The chart must include a readable legend, accessible labels, and a concise takeaway. Avoid 3D charts and excessive pie segments.

## 10. Recent activity

Display meaningful audit events:

- request created;
- offers added;
- recommendation submitted;
- approval completed;
- deposit executed;
- accounting completed;
- deposit activated;
- maturity action recorded.

Each event includes actor, action, entity, and timestamp. Use a quiet timeline or activity list.

## 11. Quick actions

Show only actions relevant to the current role, such as:

- create investment request;
- add bank offers;
- review pending approvals;
- record execution;
- view upcoming maturities;
- export portfolio summary.

Use compact action tiles or buttons. Do not create a separate card for every possible action.

## 12. Role-aware variations

### Specialist

Priority order:

1. drafts and incomplete requests;
2. assigned tasks;
3. requests awaiting offers or recommendation;
4. upcoming maturities;
5. portfolio summary.

### GM Treasury

Priority order:

1. decisions awaiting approval;
2. treasury exposure and portfolio summary;
3. delayed requests;
4. maturities;
5. recent high-value activity.

### Executive Director of Investment and Treasury Sector

Priority order:

1. approvals above threshold;
2. value under decision;
3. portfolio and return overview;
4. concentration and maturity risks;
5. recent decisions.

### Investment Support

Emphasize assigned reviews, supporting documentation, and requests pending support approval.

### Finance

Emphasize pending execution, transfer confirmation, and value awaiting finance action.

### Accounting

Emphasize pending accounting entries, completed postings, and activation dependencies.

### Admin

Show platform usage and configuration health only where useful for prototype demonstration. Do not expose technical infrastructure monitoring.

## 13. Interactions

- Clicking a KPI applies a logical contextual view or navigates to the related list.
- Task rows open the related workspace at the required section.
- Chart segments filter the corresponding list where practical.
- Role switching refreshes the dashboard content without changing documented business data.
- Tooltips explain chart values but are not the only way to access information.

## 14. Loading state

Use skeletons matching:

- the main financial overview;
- task list rows;
- maturity list;
- chart frame;
- recent activity.

Do not use a centered page spinner as the primary loading experience.

## 15. Empty state

Differentiate between:

- no tasks assigned;
- no upcoming maturities;
- no investment requests yet;
- no chart data for the selected context.

A positive empty task state may say that no action is currently required. Do not make all empty states look like errors.

## 16. Error state

If one widget fails, preserve the rest of the dashboard and show a localized retry action. Use a page-level error only when the entire dashboard cannot load.

## 17. Responsive behavior

### Laptop

- reduce spacing slightly;
- preserve top summary hierarchy;
- use 7/5 or 8/4 columns carefully;
- avoid horizontal overflow.

### Tablet

- stack the top summary and operational sections;
- keep important financial metrics in a two-column internal grid where possible;
- transform dense tables into structured lists.

### Mobile

- single-column priority feed;
- show tasks before supporting analytics;
- reduce charts to highly readable summaries;
- place primary action in the page header or accessible sticky area;
- never compress the desktop dashboard into tiny cards.

## 18. Acceptance criteria

The dashboard is accepted only when:

- role switching changes priorities meaningfully;
- the most important action is visible without scrolling on standard laptop screens;
- financial figures are formatted consistently;
- no more than two major visualizations compete for attention;
- the design avoids an equal-card grid appearance;
- loading, empty, error, and responsive states are implemented;
- the page visibly belongs to the Environment Fund while remaining restrained and professional.