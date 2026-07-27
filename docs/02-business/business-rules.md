# Business Rules

## Request and Deposit Relationship

1. One investment request creates no more than one active deposit.
2. One deposit must originate from one completed investment request.
3. Reinvestment creates a new request and preserves a link to the source deposit.
4. A request cannot be converted into a deposit before transfer execution and activation confirmation.

## Draft Rules

1. The request remains `Draft` until first submission.
2. Section completion indicators must not create workflow transitions.
3. Draft autosave is simulated locally.
4. The creator may delete a Draft before first submission.
5. After first submission, deletion is prohibited; cancellation requires a reason.
6. Finance, Accounting, and Investment Support cannot access unsubmitted Drafts.

## Submission Rules

Submission is blocked until mandatory readiness conditions pass, including:

- Request information is complete.
- Amount is greater than zero.
- Currency and tenor are selected.
- Liquidity information is complete.
- Required liquidity evidence is attached.
- At least the configured minimum number of banks has been contacted (prototype default: 3 — see Prototype Business Defaults) or an exception is documented.
- At least one valid bank offer exists.
- Evaluation and recommendation are complete.
- A recommended offer is identified.
- Mandatory attachments are present.
- The specialist confirms completeness.

## Approval Threshold

1. Requests up to and including SAR 100,000,000 require General Manager of Treasury approval.
2. Requests above SAR 100,000,000 require General Manager of Treasury approval followed by approval by the Executive Director of Investment and Treasury Sector.
3. The threshold must be stored in centralized configuration, not hardcoded in UI components.
4. The amount used for routing is the submitted request amount.
5. If the amount changes after a return, approval routing must be recalculated on resubmission.

## Decision Rules

1. Approval comments may be optional unless configured otherwise.
2. Return, rejection, and cancellation reasons are mandatory.
3. A return must identify the target role and required correction.
4. Previous approval actions remain visible after return and resubmission.
5. A rejected request is terminal and read-only.

## Bank RFQ Rules

1. Each contacted bank has an independent RFQ record.
2. RFQ status may be Not Sent, Sent, Received, Declined, or No Response.
3. Send date, deadline, channel, contact, and attachments must be traceable.
4. No Response and Declined banks remain visible in the request history.

## Bank Offer Rules

1. Each bank offer is a separate record.
2. An offer may be Valid, Expired, Incomplete, Withdrawn, or Rejected.
3. Expired, incomplete, or withdrawn offers cannot be selected as the winning offer.
4. Offer terms include bank, amount, rate, tenor, dates, validity, early-break terms, expected return, notes, and evidence.
5. The winning offer must be one of the evaluated eligible offers.

## Evaluation Rules

The recommendation must consider more than the highest rate. The prototype must support:

- Rate.
- Expected return.
- Tenor.
- Liquidity alignment.
- Early-break conditions.
- Offer validity.
- Bank concentration.
- Previous relationship or operational considerations.

A documented business justification is required for the recommended offer.

## Winning Bank Rules

1. Winning-bank information is completed only after final investment approval.
2. The selected winning offer must match the approved recommendation unless a documented controlled change is captured.
3. IBAN or bank account evidence is mandatory before Investment Support submission.
4. Beneficiary name and bank details must be visible to Finance and Accounting.

## Review and Execution Rules

1. Investment Support must complete its checklist before approval.
2. Finance receives only information required for its review.
3. Accounting cannot execute before Finance approval.
4. Transfer amount must match the approved amount unless an authorized documented variance exists.
5. Accounting execution requires reference details and evidence.
6. Deposit activation cannot occur before accounting execution is confirmed.

## Deposit Rules

1. Activation records actual amount, rate, start date, and maturity date.
2. Differences between approved and actual terms must be highlighted.
3. Active deposits appear in the portfolio immediately after activation.
4. Maturity alerts are generated using a configurable warning window (prototype default: 14 calendar days — see Prototype Business Defaults).
5. Closure, reinvestment, and early break require supporting evidence and activity history.
6. Expected and realized returns must remain distinguishable.

## Prototype Business Defaults

These approved defaults (Decision DEC-017) are the canonical values for the prototype and must be centralized as business-rule constants:

1. Minimum banks contacted before submission: `3`.
2. Expected return formula for fixed deposits: `principal × annualRate × tenorDays ÷ 360`, using a 360-day banking basis.
3. Deposit maturity warning window: `14 calendar days` before maturity. `Approaching Maturity` is derived from dates, never persisted as a status.
4. Approval and task target times:
   - General Manager of Treasury: 2 business days.
   - Executive Director of Investment and Treasury Sector: 2 business days.
   - Investment Support: 1 business day.
   - Finance: 1 business day.
   - Accounting: 1 business day.
   - Deposit activation confirmation: 1 business day.
5. The SAR 100,000,000 routing threshold is evaluated from the amount submitted for approval.
6. If the amount changes after a return and before resubmission, routing is recalculated.
7. A returned request resumes at the stage that returned it after the required correction path is completed; the return and resubmission remain visible in history.
8. Every return requires a reason.

## Audit and Data Integrity Rules

1. Workflow history is append-only in the prototype experience.
2. Every material action records actor, role, timestamp, action, status change, and comment when applicable.
3. Attachments record file name, type, category, uploader, and upload date.
4. Mock identifiers must be stable and deterministic across resets.
5. Business rules must be implemented in centralized domain or service modules, not duplicated across pages.
