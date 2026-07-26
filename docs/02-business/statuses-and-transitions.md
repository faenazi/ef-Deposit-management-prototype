# Statuses and Transitions

## Investment Request Statuses

### Preparation

- `DRAFT` — مسودة
- `RETURNED_FOR_COMPLETION` — معاد للاستكمال

### Approval

- `PENDING_TREASURY_GM_APPROVAL` — بانتظار اعتماد مدير عام الخزينة
- `PENDING_EXECUTIVE_APPROVAL` — بانتظار اعتماد رئيس قطاع الاستثمار والخزينة التنفيذي

### Execution

- `PENDING_WINNING_BANK_COMPLETION` — بانتظار استكمال بيانات البنك الفائز
- `PENDING_INVESTMENT_SUPPORT_REVIEW` — بانتظار مراجعة دعم الاستثمار
- `PENDING_FINANCE_REVIEW` — بانتظار مراجعة المالية
- `PENDING_ACCOUNTING_EXECUTION` — بانتظار تنفيذ المحاسبة
- `PENDING_DEPOSIT_ACTIVATION` — بانتظار تفعيل الوديعة

### Terminal

- `CONVERTED_TO_ACTIVE_DEPOSIT` — تم التحويل إلى وديعة نشطة
- `REJECTED` — مرفوض
- `CANCELLED` — ملغي

## Draft Section Completion States

These states do not change the overall request status:

- `NOT_STARTED` — لم يبدأ
- `IN_PROGRESS` — قيد الاستكمال
- `COMPLETE` — مكتمل
- `MISSING_REQUIREMENTS` — توجد نواقص

## Request Transitions

| From | Action | To | Responsible Role |
|---|---|---|---|
| Draft | Submit | Pending Treasury GM Approval | Deposit Specialist |
| Pending Treasury GM Approval | Approve, amount ≤ SAR 100M | Pending Winning Bank Completion | Treasury GM |
| Pending Treasury GM Approval | Approve, amount > SAR 100M | Pending Executive Approval | Treasury GM |
| Pending Treasury GM Approval | Return | Returned for Completion | Treasury GM |
| Pending Treasury GM Approval | Reject | Rejected | Treasury GM |
| Pending Executive Approval | Approve | Pending Winning Bank Completion | Executive Head |
| Pending Executive Approval | Return | Treasury approval path | Executive Head |
| Pending Executive Approval | Reject | Rejected | Executive Head |
| Returned for Completion | Resubmit | Appropriate previous review stage | Assigned responsible role |
| Pending Winning Bank Completion | Submit | Pending Investment Support Review | Deposit Specialist |
| Pending Investment Support Review | Approve | Pending Finance Review | Investment Support |
| Pending Investment Support Review | Return | Returned to Deposit Specialists group | Investment Support |
| Pending Investment Support Review | Reject | Rejected | Investment Support |
| Pending Finance Review | Approve | Pending Accounting Execution | Finance |
| Pending Finance Review | Return | Returned to Investment Support | Finance |
| Pending Finance Review | Reject | Rejected | Finance |
| Pending Accounting Execution | Confirm execution | Pending Deposit Activation | Accounting |
| Pending Accounting Execution | Return | Returned to Finance | Accounting |
| Pending Deposit Activation | Confirm activation | Converted to Active Deposit | Deposit Specialist |

## Deposit Statuses

- `ACTIVE` — نشطة
- `MATURED_ACTION_REQUIRED` — مستحقة وتتطلب إجراء
- `REINVESTED` — معاد استثمارها
- `CLOSED` — مغلقة
- `BROKEN_EARLY` — مكسورة قبل الاستحقاق

`Approaching Maturity` is a derived display condition based on the configured warning window and is not a separate persisted lifecycle status.

## Transition Controls

- Every return, rejection, and cancellation requires a reason.
- Invalid transitions must be blocked centrally.
- A user cannot act on a task assigned to another role.
- The threshold decision uses the approved request amount at submission.
- History entries must record previous status, new status, actor, role, timestamp, action, and comment.
