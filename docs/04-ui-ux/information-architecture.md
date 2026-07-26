# Information Architecture

## Purpose

Define the product structure, page hierarchy, navigation relationships, and contextual work areas for the investment deposit management prototype.

## Primary Navigation

1. الصفحة الرئيسية
2. مهامي
3. محفظة الودائع
4. طلبات الاستثمار
5. التقارير والتحليلات
6. الإعدادات

## Core Hierarchy

### الصفحة الرئيسية

- Role-based summary
- Treasury and portfolio KPIs
- Pending tasks
- Upcoming maturities
- Recent activity
- Quick actions

### مهامي

- Assigned tasks
- Group tasks
- Returned items
- Overdue tasks
- Completed tasks

### محفظة الودائع

- Active deposits
- Near maturity (derived view)
- Matured
- Closed
- Broken before maturity
- Reinvested

### طلبات الاستثمار

- All requests
- My drafts
- Under review
- Returned for completion
- Approved
- In execution
- Converted to active deposit
- Cancelled

### Investment Request Workspace

The canonical section list (Decision DEC-016):

1. Overview
2. Request information
3. Liquidity information and attachments
4. Bank RFQ and communications
5. Received bank offers
6. Evaluation and recommendation
7. Approval history
8. Winning-bank and IBAN information
9. Investment Support review
10. Finance review
11. Accounting execution and transfer evidence
12. Deposit activation
13. Attachments
14. Notes
15. Activity history

### التقارير والتحليلات

- Portfolio overview
- Returns analysis
- Bank concentration
- Maturity calendar
- Request turnaround
- Workflow performance

### الإعدادات

- Demo users
- Role switcher
- Banks
- Thresholds
- Status configuration
- Reset demo data

## Navigation Principles

- Main navigation represents stable product areas.
- Request workspace navigation represents sections of one business case.
- Breadcrumbs show the user's current context.
- Deep pages must retain a clear route back to their originating list.
- The prototype must preserve state when the user moves between request sections.
- Business actions belong to the current case, not the global navigation.

## Route Model

```text
/
/tasks
/deposits
/deposits/:depositId
/investment-requests
/investment-requests/new
/investment-requests/:requestId
/investment-requests/:requestId/:section
/reports
/settings
/access-denied
/*
```

The workspace must support section deep links through the explicit `:section` route. `/*` is the not-found route.

## Role-Aware Information Architecture

The same route may show different actions or summaries by role. Role changes must not create separate product structures unless access is completely prohibited.

## Context Preservation

- Lists preserve filters, sorting, and pagination when returning from details.
- Request workspaces preserve the selected section.
- Drawers preserve the background list context.
- Role switching must return the user to a valid page for the new role.
