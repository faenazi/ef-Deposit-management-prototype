# Roles and Permissions

## Permission Principles

- Access is role-based and stage-aware.
- Visibility does not imply edit permission.
- Only the current responsible role can perform workflow actions.
- Completed stages are read-only.
- Every approval, return, rejection, cancellation, execution, and activation action is logged.
- Drafts are visible only to authorized Treasury users until first submission.

## Deposit Specialist

### Can View

- Own drafts.
- Authorized Treasury requests.
- Requests returned to the Deposit Specialists group.
- Deposit portfolio and related tasks.

### Can Edit

- Own Draft requests.
- Returned preparation sections assigned to the specialist.
- Winning-bank information when the request is at that stage.
- Activation information when assigned.

### Can Act

- Submit Draft.
- Resubmit returned request.
- Submit winning-bank completion.
- Confirm deposit activation.
- Delete own Draft before first submission.
- Cancel a submitted request only when permitted and with reason.

## General Manager of Treasury

### Can View

- All Treasury requests and deposits.
- Full request details, attachments, evaluation, recommendation, and history.

### Can Act

- Approve, reject, or return requests pending GM approval.
- Review executive returns and route corrections through the Treasury hierarchy.

### Cannot

- Modify the specialist's underlying preparation data directly.
- Execute Finance or Accounting actions.

## Executive Head of Investment and Treasury

### Can View

- Requests requiring executive approval.
- Related request history, evaluation, recommendation, and attachments.
- Portfolio-level executive reporting.

### Can Act

- Approve, reject, or return requests above SAR 100,000,000.

## Investment Support Specialist

### Can View

- Approved request information required for control review.
- Winning offer, beneficiary details, approvals, and mandatory attachments.

### Can Edit

- Investment Support checklist, comments, and review evidence.

### Can Act

- Approve, reject, or return to Deposit Specialists group.

## Finance Specialist

### Can View

- Approved amount.
- Beneficiary and bank account information.
- Winning offer summary.
- Investment Support outcome.
- Required financial attachments.

### Can Edit

- Finance checklist, comments, and review evidence.

### Can Act

- Approve, reject, or return to Investment Support.

### Restricted Information

Finance should not receive unnecessary draft-working details or internal bank comparison data unless specifically required.

## Accounting Specialist

### Can View

- Approved payment instruction information.
- Beneficiary details.
- Finance approval.
- Supporting execution documents.

### Can Edit

- Transfer execution details.
- Accounting references.
- Execution attachments.

### Can Act

- Confirm execution or return to Finance.

## System Administrator

### Can Manage

- Prototype users and role assignments.
- Banks and reference data.
- Configurable threshold and warning windows.
- Demo scenarios and reset controls.

### Cannot

- Override workflow decisions during a normal business scenario.

## Read-only User

Can view authorized records and reports but cannot create, edit, upload, approve, reject, return, execute, activate, cancel, or delete.

## Field-Level Editability

Each request section must expose one of these modes according to role and stage:

- Hidden.
- Read-only.
- Editable.
- Actionable.

The frontend must derive these modes from centralized permission rules rather than scattered component conditions.
