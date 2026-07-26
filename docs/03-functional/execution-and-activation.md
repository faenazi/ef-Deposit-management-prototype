# Execution and Activation

## Purpose

Document the controlled transition from approved investment request to active deposit.

## Stage 1 — Winning Bank Completion

Performed by the Deposit Specialist after final investment approval.

Required information:

- Winning bank.
- Winning offer.
- Beneficiary account name.
- IBAN.
- SWIFT code when applicable.
- Bank account number.
- Relationship manager.
- Offer confirmation.
- IBAN certificate or supporting evidence.
- Specialist notes.

## Stage 2 — Investment Support Review

Investment Support verifies:

- Approval route is complete.
- Winning offer matches the approved recommendation.
- Beneficiary and IBAN information are complete.
- Mandatory documents are present.
- No unresolved return reason remains.

Actions:

- Approve and forward to Finance.
- Return to Deposit Specialists with a reason.
- Reject only where the configured scenario permits.

## Stage 3 — Finance Review

Finance sees only the information required for financial review and payment readiness:

- Approved amount.
- Winning bank.
- Beneficiary account name.
- IBAN and supporting evidence.
- Approval confirmation.
- Transfer purpose.
- Required finance notes.

Actions:

- Approve for Accounting execution.
- Return to Investment Support with a reason.

## Stage 4 — Accounting Execution

Accounting records:

- Execution date and time.
- Transfer reference.
- Executed amount.
- Debit account.
- Beneficiary account.
- Accounting reference or journal reference.
- Transfer evidence.
- Execution notes.

Actions:

- Confirm execution.
- Return to Finance with a reason.

## Stage 5 — Deposit Activation

The Deposit Specialist confirms that the bank has activated the deposit and records:

- Bank deposit reference.
- Actual value date.
- Actual maturity date.
- Confirmed rate.
- Confirmed amount.
- Deposit certificate.
- Activation confirmation date.
- Notes.

On confirmation, the prototype creates one active deposit linked to the source request.

## Rules

- Each stage is editable only by its responsible role.
- Prior approved sections remain read-only.
- Transfer execution does not automatically create an active deposit until activation is confirmed.
- The created deposit inherits the approved and confirmed financial terms.
- All stage decisions and evidence appear in activity history.
