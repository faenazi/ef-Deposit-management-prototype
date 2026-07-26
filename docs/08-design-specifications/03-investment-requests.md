# Investment Requests Design Specification

## 1. Purpose

The Investment Requests page is the central operational registry for all investment requests before they become active deposits. It must support quick scanning, filtering, ownership, and progression through the documented workflow.

The page must make the distinction clear between:

- a request still being prepared;
- a request under review or approval;
- a request ready for execution;
- a request completed and converted into a deposit;
- a request rejected, cancelled, or otherwise closed.

## 2. Core design principle

The list must feel like a professional treasury register, not a generic CRUD table. The page should foreground request identity, amount, tenor, status, next action, and owner.

## 3. Page structure

```text
Page header + create action
↓
Compact request summary
↓
Search + key filters + saved views
↓
Investment requests register
↓
Pagination / result summary
```

## 4. Page header

Contains:

- title: `طلبات الاستثمار`;
- concise description;
- primary action: `إنشاء طلب استثمار` for authorized roles;
- optional export action;
- no unnecessary dashboard widgets.

The create action must be visually clear but not oversized.

## 5. Compact summary

Use a restrained summary strip showing a small number of useful totals:

- drafts;
- awaiting action;
- under approval;
- ready for execution;
- completed this period.

Selecting a summary item filters the register.

Avoid large equal KPI cards.

## 6. Saved views

Recommended views:

- all requests;
- my drafts;
- requires my action;
- under approval;
- ready for execution;
- completed;
- delayed requests.

The default view should adapt to the selected role.

## 7. Search and filters

### Visible controls

- free-text search by request number, title, bank, or owner;
- status;
- workflow stage;
- owner;
- request date.

### Advanced filters

- requested amount range;
- tenor;
- expected investment date;
- approval threshold category;
- selected bank;
- created by;
- completion or activation state.

Display active filters as concise removable chips or a summarized filter statement. Do not create visual clutter.

## 8. Register columns

Recommended desktop columns:

1. request number and title;
2. amount;
3. tenor;
4. requested investment date;
5. current stage;
6. status;
7. owner or current assignee;
8. last update;
9. next action;
10. row actions.

Optional supporting metadata beneath the identifier:

- liquidity source or purpose;
- selected bank after evaluation;
- linked deposit number after activation.

## 9. Row hierarchy

The row's visual hierarchy should be:

1. request number and meaningful title;
2. amount and current stage;
3. supporting metadata;
4. next action.

Avoid showing every attribute as a badge. Use badges only for status, priority, or exceptional conditions.

## 10. Amount presentation

- Format in SAR.
- Use tabular numerals.
- Keep decimal precision appropriate to the context.
- High-value requests above the documented threshold may include a textual indicator such as `يتطلب مسار اعتماد موسع`.
- Do not rely on color to indicate threshold routing.

## 11. Draft requests

Drafts must remain visually and behaviorally distinct because the same employee prepares information progressively before submission.

Draft rows should show:

- completion percentage or section readiness only if calculated from documented fields;
- last edited timestamp;
- missing critical section indicator;
- action: `متابعة إعداد الطلب`.

Do not start workflow visualization or approval aging until the user submits the request.

## 12. Workflow representation

In the list, show only the current stage and next action. Do not render the full workflow inside every row.

The full workflow appears in the Transaction Workspace.

Suggested stage labels include:

- إعداد الطلب;
- جمع عروض البنوك;
- التقييم والتوصية;
- اعتماد مدير عام الخزينة;
- الاعتماد التنفيذي;
- مراجعة دعم الاستثمار;
- التنفيذ المالي;
- المعالجة المحاسبية;
- التفعيل;
- مكتمل.

Use only stages supported by the business rules for each request value.

## 13. Row interactions

- Clicking the main identifier opens the Transaction Workspace.
- The next-action control opens the relevant section directly.
- Overflow menu may contain view, duplicate as a new draft where supported, export summary, or permitted closure actions.
- Completed requests provide a clear link to the resulting deposit.

## 14. Create request entry

The primary create action opens a new request as a draft.

The entry experience should ask only for the minimum identifying information needed to create the draft, then take the user to the full workspace. Do not force completion of a long form in a modal.

## 15. Empty states

### No requests yet

Explain the purpose of investment requests and provide a create action for authorized users.

### No results for filters

Show a clear filter reset action.

### No requests for selected role

Explain that no records currently require this role's involvement.

## 16. Loading and error states

- Use register-row skeletons.
- Preserve filter and pagination state.
- Use a localized retry if the register fails.
- If summary totals fail but rows load, keep the register usable.

## 17. Responsive behavior

### Desktop

Use the full professional register with sticky column header where needed.

### Laptop

Hide lower-priority columns behind row expansion or a details control while preserving amount, status, stage, and action.

### Tablet

Use a compact structured list with two-column metadata blocks.

### Mobile

Use request cards showing:

- request number and title;
- amount;
- current stage and status;
- owner or assignee;
- next action;
- last update.

Provide one clear primary action. Do not shrink the desktop table into an unreadable horizontal grid.

## 18. Visual quality rules

- Keep the register visually light despite high information density.
- Use strong alignment and spacing instead of borders around every field.
- Use subtle row separators.
- Keep filters on one calm control surface.
- Avoid multiple bright status colors.
- Maintain a clear relationship between request stage and next action.
- Use the Environment Fund identity through typography, navigation, active states, and restrained accents rather than repeated logos or patterns.

## 19. Acceptance criteria

The page is accepted only when:

- drafts are clearly distinguished from submitted requests;
- current stage and next action are immediately understandable;
- requests above and below SAR 100 million follow the correct visible workflow context;
- role-based views and permissions are demonstrated;
- completed requests link to exactly one resulting active deposit where applicable;
- filters, loading, empty, error, and responsive states are complete;
- the page looks like a treasury register designed specifically for the Environment Fund.