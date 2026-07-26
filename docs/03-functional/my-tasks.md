# My Tasks

## Purpose

Provide each user with an operational work queue containing only items that require their attention or action.

## Core Principle

`مهامي` is not a general inbox. It is a role-aware action center linked directly to business transactions.

## Task Sources

Tasks may be created by:

- Investment request submission.
- Approval assignment.
- Request return.
- Winning-bank information completion.
- Investment Support review.
- Finance review.
- Accounting execution.
- Deposit activation.
- Deposit maturity follow-up.

## Required Task Data

- Task title.
- Related request or deposit number.
- Business stage.
- Current status.
- Priority.
- Assigned user or group.
- Request amount when relevant.
- Created date.
- Due date or elapsed time.
- Return reason when applicable.
- Primary action.

## Views and Filters

- تحتاج إجراء مني.
- متأخرة.
- عالية الأولوية.
- معادة إليّ.
- مكتملة حديثًا.
- By transaction type.
- By stage.
- By amount range.
- By age.

## User Experience

- Use an enterprise data grid as the default view.
- Provide a compact task summary above the grid.
- Allow a quick preview drawer without leaving the page.
- The preview must show enough context to decide whether to open the full transaction.
- The primary action must be explicit, such as `مراجعة واعتماد`, `استكمال النواقص`, or `تنفيذ التحويل`.
- Do not show actions the active role cannot perform.

## Task Completion

A task is completed only when its required business action is completed. Opening or viewing the task does not complete it.

## Group Tasks

Where a task is assigned to a role group, the prototype may allow an eligible user to claim or act on it. Once actioned, the task must appear in the activity history with the actual user identity.
