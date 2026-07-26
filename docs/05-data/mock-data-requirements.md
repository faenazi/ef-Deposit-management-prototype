# Mock Data Requirements

## Purpose

The prototype must use realistic, deterministic, and internally consistent data that demonstrates the complete investment request and deposit lifecycle.

Mock data is not decorative filler. It must support filters, dashboards, calculations, permissions, workflow actions, reports, and end-to-end demonstrations.

## Target Volumes

The baseline seed must include at least:

- 30 investment requests
- 25 deposits
- 10 banks
- 100 bank offers
- 40 open and completed tasks
- 7 primary demo users
- 15 additional supporting users
- 80 attachments
- 150 activity records
- 35 approval decisions

## Distribution of Investment Requests

The 30 investment requests must cover:

- 5 Draft requests
- 3 Returned for Completion requests
- 4 Pending Treasury General Manager approval
- 3 Pending Executive approval
- 3 Pending winning-bank information
- 3 Pending Investment Support review
- 3 Pending Finance review
- 2 Pending Accounting execution
- 2 Pending Deposit activation
- 1 Cancelled request
- 1 Rejected request

At least:

- 10 requests must be SAR 100,000,000 or below.
- 10 requests must exceed SAR 100,000,000.
- 5 requests must contain incomplete readiness conditions.
- 4 requests must have return reasons.
- 3 requests must originate from deposit reinvestment.

## Distribution of Deposits

The 25 deposits must cover:

- 14 Active deposits
- 4 Near maturity deposits
- 2 Matured and awaiting action deposits
- 3 Closed deposits
- 1 Reinvested deposit
- 1 Broken deposit

The data must demonstrate:

- Multiple banks.
- Different tenors.
- Different annual rates.
- Different maturity months.
- Bank concentration risk.
- A realistic spread of principal amounts.

## Banks

Use ten fictional but realistic Saudi-market bank records. Do not use misleading legal claims or confidential information.

Each bank must include:

- Arabic and English names.
- Short name.
- Relationship manager contact.
- Risk category.
- Current portfolio exposure.
- Active or inactive status.
- A locally stored placeholder logo or text-based monogram.

At least:

- 2 banks have high existing exposure.
- 2 banks have low exposure.
- 1 bank is inactive and excluded from new RFQs.

## Bank Offers

Offers must be internally consistent with their requests.

Rules:

- Offer amount must not exceed the request amount unless marked as partial or alternative.
- Maturity date must follow the offer value date and tenor.
- Expected return must be calculated centrally.
- Expired offers must have `validUntil` before the prototype reference date.
- Each request with offers must have at least two comparable offers unless an exception is documented.
- Some banks may provide multiple offers with different tenors.
- Recommended offers must have a corresponding evaluation and recommendation rationale.

The 100 offers should include:

- valid offers
- expired offers
- incomplete offers
- withdrawn offers
- recommended offers
- non-recommended high-rate offers affected by concentration or operational constraints

## Tasks

Tasks must reflect role-specific work.

Examples:

- Complete missing liquidity attachment.
- Review investment request.
- Enter winning bank details.
- Verify IBAN certificate.
- Complete finance review.
- Record payment reference.
- Confirm deposit activation.
- Review near-maturity deposit.

Task distribution must include:

- Critical
- High
- Medium
- Low priorities
- Overdue tasks
- Due today tasks
- Upcoming tasks
- Completed tasks

## Attachments

Mock attachments must use realistic Arabic filenames and categories.

Required categories:

- liquidity analysis
- RFQ correspondence
- bank offer
- evaluation memorandum
- approval evidence
- IBAN certificate
- transfer receipt
- journal evidence
- deposit certificate
- maturity correspondence

Files may be lightweight placeholder PDFs, spreadsheets, or images. The UI must clearly label them as prototype documents where appropriate.

## Activities

Activity history must include:

- request creation
- section completion
- invitation sent
- offer received
- offer updated
- recommendation submitted
- approval
- return
- finance review
- accounting execution
- activation
- maturity decision
- closure
- reinvestment

Activity timestamps must follow the lifecycle sequence.

## Financial Realism

- Currency is SAR for the baseline prototype.
- Principal amounts should range approximately from SAR 10,000,000 to SAR 300,000,000.
- Rates must be plausible but explicitly treated as fictional prototype data.
- Expected return amounts must match amount, rate, and tenor calculations.
- Dashboard totals must reconcile with deposit records.
- Bank exposure totals must reconcile with active deposits.

## Date Strategy

Use a centralized prototype reference date.

Requirements:

- Seed dates must be deterministic.
- Do not call the system clock directly in seed generation.
- Maturity indicators must derive from the reference date.
- The reference date may be changed from one configuration file to demonstrate future or past scenarios.

## Data Quality Rules

- No orphan foreign keys.
- No duplicate request or deposit numbers.
- No recommended offer without an evaluation.
- No active deposit without a completed source request.
- No approval by a role that is not authorized for the stage.
- No task assigned to an incompatible role.
- No future activity preceding an earlier lifecycle event.
- All dashboard and report metrics must be derived from entity records.

## Seed Organization

Mock data should be separated by concern:

```text
src/src/mock-data/
├── reference-date.ts
├── users.ts
├── roles.ts
├── banks.ts
├── investment-requests.ts
├── bank-invitations.ts
├── bank-offers.ts
├── evaluations.ts
├── approvals.ts
├── tasks.ts
├── attachments.ts
├── activities.ts
├── deposits.ts
└── index.ts
```

Do not place all mock data in one large file.
