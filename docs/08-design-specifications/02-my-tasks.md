# My Tasks Design Specification

## 1. Purpose

My Tasks is the user's operational inbox. It must make pending work easy to understand, prioritize, and complete without forcing users to interpret the full workflow manually.

The page must answer:

- What is assigned to me?
- What is most urgent?
- Why does it require my action?
- What should I do next?

## 2. Naming

The preferred Arabic navigation label is:

`مهامي`

This is clearer and more action-oriented than `صندوق الوارد` for the current scope. The page may use inbox-like interaction patterns without adopting email terminology.

## 3. Visual structure

```text
Page header + task count
↓
Priority summary strip
↓
Search and core filters
↓
Task list / table
↓
Contextual detail drawer when selected
```

The page should be visually efficient and calm. It is an operational workspace, not a dashboard with numerous decorative cards.

## 4. Page header

Contains:

- title: `مهامي`;
- short description;
- total active task count;
- overdue count where applicable;
- optional refresh action;
- no create-task action, because tasks originate from business workflow.

## 5. Priority summary

Use a compact segmented summary rather than large KPI cards:

- requires action today;
- overdue;
- high priority;
- awaiting approval;
- due this week.

Selecting a segment filters the task list.

## 6. Task list

Recommended columns:

- task and related entity;
- type of action;
- workflow stage;
- request/deposit value where relevant;
- assigned date;
- due date or age;
- priority;
- primary action.

The task title is the strongest row element. The related request identifier and bank or investment context appear beneath it as quieter metadata.

## 7. Task categories

Support filtering by:

- approvals;
- bank offers;
- recommendation;
- investment support review;
- finance execution;
- accounting;
- maturity action;
- missing information;
- administrative configuration when relevant.

Category names must be business-readable and not technical workflow codes.

## 8. Priority and aging

Priority must be based on documented mock data and business context. Do not create arbitrary urgency.

Display aging as understandable text, for example:

- `مستحق اليوم`;
- `متأخر يومين`;
- `متبقٍ 3 أيام`;
- `منذ 5 أيام`.

Always show the exact date where needed. Color is supportive only.

## 9. Filters

Visible filters:

- search;
- task status;
- action type;
- priority;
- due-date window.

Advanced filters:

- request amount;
- workflow stage;
- bank;
- assignment date;
- related entity type.

Users must be able to clear all filters and understand which filters are active.

## 10. Saved views for the prototype

Provide a small number of role-relevant views:

- all active tasks;
- requires my action;
- overdue;
- due this week;
- completed recently.

Do not create a complex saved-view builder unless required later.

## 11. Contextual detail drawer

Selecting a task may open a right-to-left contextual drawer containing:

- task purpose;
- related request summary;
- financial value;
- current workflow stage;
- previous action and actor;
- required next action;
- due date;
- link to open the full workspace.

The drawer is for preview and orientation. Complex approval or data-entry work should open the full Transaction Workspace.

## 12. Row actions

Each row should expose one primary contextual action, such as:

- review request;
- add offers;
- evaluate offers;
- approve;
- record execution;
- complete accounting;
- review maturity.

Secondary actions belong in a restrained overflow menu.

## 13. Completed tasks

Completed tasks are visually quieter and separate from active work. They must show:

- completion date;
- action taken;
- related entity;
- final outcome.

The default page should prioritize active work rather than history.

## 14. Empty states

### No active tasks

Communicate positively that no action is currently required and provide a link to relevant requests or portfolio overview.

### No filtered results

Explain that no tasks match the current filters and provide a clear reset action.

### Role with no task responsibilities

Explain that this role does not currently have assigned workflow actions in the selected scenario.

## 15. Loading and errors

- Use task-row skeletons.
- Preserve filters while refreshing.
- Localize task-list failures and provide retry.
- Avoid clearing existing visible data during a background refresh.

## 16. Responsive behavior

### Desktop and laptop

Use a polished data table with stable numeric alignment and a contextual drawer.

### Tablet

Reduce secondary columns and allow each task to display important metadata on two lines.

### Mobile

Use structured task cards containing:

- task title;
- entity identifier;
- urgency;
- required action;
- value where relevant;
- one full-width primary action.

Do not horizontally scroll the full desktop table on mobile.

## 17. Role examples

### Specialist

Sees draft completion, offer entry, evaluation, recommendation, and maturity preparation tasks.

### GM Treasury

Sees approval decisions, delayed high-value requests, and treasury oversight tasks.

### Executive Director

Sees only requests requiring executive approval and relevant escalations.

### Investment Support

Sees supporting review and endorsement tasks.

### Finance

Sees transfer, execution, and finance confirmation tasks.

### Accounting

Sees accounting-entry and activation dependency tasks.

## 18. Acceptance criteria

The page is accepted only when:

- users can identify the highest-priority task in seconds;
- every task clearly explains the required next action;
- role switching changes the task set meaningfully;
- filters remain compact and understandable;
- tasks link to the correct workspace section;
- active and completed work are visually distinct;
- mobile uses a purpose-designed task card pattern;
- the page feels refined without excessive cards, badges, or colors.