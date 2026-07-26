# Investment Request Lifecycle

## Lifecycle Principle

One investment request represents one proposed placement with one eventually selected bank. After successful execution and activation, it creates one active deposit.

## 1. Draft

### Owner

Deposit Specialist who created the request.

### Allowed Actions

- Edit all preparation sections.
- Add, update, and remove RFQ records and offers.
- Add attachments and notes.
- Save and continue later.
- Delete the request before first submission.
- Submit when readiness validation passes.

### Important Rule

The request remains `Draft` throughout preparation. Section completion states do not change the overall workflow status.

## 2. Pending General Manager of Treasury Approval

### Owner

General Manager of Treasury.

### Allowed Actions

- Approve.
- Reject with reason.
- Return to Deposit Specialist with reason.

### Outcome

- Amount up to and including SAR 100,000,000: move to Winning Bank Completion.
- Amount above SAR 100,000,000: move to Executive Approval.

## 3. Pending Executive Approval

### Owner

Executive Head of Investment and Treasury.

### Allowed Actions

- Approve.
- Reject with reason.
- Return through the treasury approval path with reason.

### Return Behavior

The request returns to General Manager of Treasury, who may review the executive feedback and return it to the Deposit Specialist when correction is required. The hierarchy and decision history must remain visible.

## 4. Pending Winning Bank Completion

### Owner

Deposit Specialists group.

### Required Information

- Winning bank.
- Winning offer.
- Beneficiary name.
- IBAN.
- SWIFT/BIC when applicable.
- Bank account evidence.
- Relationship manager details.
- Final offer and related documents.

### Outcome

Submit to Investment Support Review.

## 5. Pending Investment Support Review

### Owner

Investment Support Specialist.

### Allowed Actions

- Approve.
- Reject with reason.
- Return to Deposit Specialists group with reason.

## 6. Pending Finance Review

### Owner

Finance Specialist.

### Allowed Actions

- Approve.
- Reject with reason.
- Return to Investment Support with reason.

Finance sees only the information required to validate financial readiness and beneficiary details.

## 7. Pending Accounting Execution

### Owner

Accounting Specialist.

### Required Outputs

- Transfer date.
- Transfer amount.
- Bank/payment reference.
- Accounting reference.
- Execution evidence attachment.

### Allowed Actions

- Confirm execution.
- Return to Finance with reason.

## 8. Pending Deposit Activation

### Owner

Deposit Specialists group.

### Required Outputs

- Bank activation confirmation.
- Actual start date.
- Actual maturity date.
- Final rate and amount.
- Deposit certificate when available.

### Outcome

Confirm activation and create the linked active deposit.

## 9. Converted to Active Deposit

Terminal request status. The request becomes read-only except for authorized notes and attachment viewing. The linked deposit continues its independent portfolio lifecycle.

## Terminal Outcomes

- Rejected.
- Cancelled.
- Converted to Active Deposit.

After first submission, the request must not be deleted. Cancellation requires a reason and remains in the audit history.
