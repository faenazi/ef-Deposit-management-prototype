# Information Architecture

## Purpose

Define the product structure, page hierarchy, navigation relationships, and contextual work areas for the investment deposit management prototype.

## Primary Navigation

1. الصفحة الرئيسية
2. مهامي
3. طلبات الاستثمار
4. محفظة الودائع
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

### طلبات الاستثمار

- All requests
- My drafts
- Under review
- Returned for completion
- Approved
- In execution
- Completed
- Cancelled

### Investment Request Workspace

- Overview
- Request information
- Liquidity
- Bank communication
- Bank offers
- Evaluation and recommendation
- Approvals
- Winning bank
- Investment support review
- Finance review
- Accounting execution
- Deposit activation
- Attachments
- Activity log

### محفظة الودائع

- Active deposits
- Near maturity
- Matured
- Closed
- Broken before maturity
- Reinvested

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
/requests
/requests/:requestId
/requests/:requestId/:section
/deposits
/deposits/:depositId
/reports
/settings
```

## Role-Aware Information Architecture

The same route may show different actions or summaries by role. Role changes must not create separate product structures unless access is completely prohibited.

## Context Preservation

- Lists preserve filters, sorting, and pagination when returning from details.
- Request workspaces preserve the selected section.
- Drawers preserve the background list context.
- Role switching must return the user to a valid page for the new role.
