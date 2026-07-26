# Demo Scenarios

## Purpose

Curated scenarios ensure that stakeholder demonstrations are repeatable, coherent, and role-aware.

Each scenario must define:

- Starting user.
- Starting page.
- Required records.
- Expected actions.
- Expected state transitions.
- Expected dashboard and task changes.
- Reset behavior.

## Scenario 1 — Prepare and Submit a Standard Request

### Objective

Demonstrate the Deposit Specialist preparing a request of SAR 80,000,000 and submitting it to the Treasury General Manager.

### Starting State

- User: Noura Alotaibi.
- Request: `IR-2026-0018`.
- Status: Draft.
- Readiness: approximately 65%.
- Missing items:
  - one liquidity attachment
  - one offer validity field
  - recommendation rationale

### Demonstration Flow

1. Open the request from My Tasks.
2. Review readiness and missing requirements.
3. Add the missing liquidity attachment.
4. update the incomplete offer.
5. compare valid offers.
6. select the recommended offer.
7. complete the recommendation rationale.
8. submit for approval.

### Expected Result

- Status changes to Pending Treasury GM Approval.
- Current owner role changes to Treasury General Manager.
- Deposit Specialist task is completed.
- Treasury General Manager receives a new approval task.
- Activity timeline records the submission.

## Scenario 2 — Approve a Request Below the Threshold

### Objective

Demonstrate final Treasury approval for a request not exceeding SAR 100,000,000.

### Starting State

- User: Khalid Alqahtani.
- Request: `IR-2026-0018`.
- Amount: SAR 80,000,000.
- Status: Pending Treasury GM Approval.

### Demonstration Flow

1. Open the request from the approval task.
2. Review recommendation, comparison, concentration effect, and attachments.
3. Approve with an optional comment.

### Expected Result

- Executive approval is skipped.
- Status changes to Pending Winning Bank Information.
- Ownership returns to the Deposit Specialist.
- Approval history stores the decision.

## Scenario 3 — Executive Approval Above the Threshold

### Objective

Demonstrate the additional approval route for a request above SAR 100,000,000.

### Starting State

- Request: `IR-2026-0021`.
- Amount: SAR 180,000,000.
- Treasury GM approval already completed.
- Status: Pending Executive Approval.

### Demonstration Flow

1. Switch to Taghreed Alharbi.
2. Open the executive task.
3. Review portfolio concentration and recommendation rationale.
4. Approve the request.

### Expected Result

- Status changes to Pending Winning Bank Information.
- Deposit Specialist receives a task.
- Executive approval appears in the history.

## Scenario 4 — Return an Incomplete Request

### Objective

Demonstrate controlled return with a mandatory reason and corrective action.

### Starting State

- User: Khalid Alqahtani.
- Request: `IR-2026-0011`.
- Status: Pending Treasury GM Approval.
- The recommendation lacks sufficient justification for selecting a lower-rate bank.

### Demonstration Flow

1. Review the request.
2. Choose Return for Completion.
3. Enter a clear return reason.
4. Confirm return.
5. Switch to Noura Alotaibi.
6. Open the returned task and inspect the highlighted reason.

### Expected Result

- Status changes to Returned for Completion.
- Return reason is prominently displayed.
- Deposit Specialist receives a corrective task.
- Previous approval data remains preserved.

## Scenario 5 — Compare Offers Beyond the Highest Rate

### Objective

Show that the recommended bank is not always the bank with the highest annual rate.

### Starting State

- Request: `IR-2026-0009`.
- Three valid offers:
  - Bank A: highest rate but high existing concentration.
  - Bank B: slightly lower rate and low concentration.
  - Bank C: lower rate with restrictive conditions.

### Demonstration Flow

1. Open the Bank Offers section.
2. Compare expected return, concentration impact, validity, and conditions.
3. Open the evaluation details.
4. Review the weighted score.
5. Select Bank B and enter the rationale.

### Expected Result

- Recommendation is supported by the evaluation.
- Concentration warning remains visible for Bank A.
- The selected offer is visually clear without hiding alternatives.

## Scenario 6 — Complete Post-Approval Reviews

### Objective

Demonstrate the operational handoff through Investment Support and Finance.

### Starting State

- Request: `IR-2026-0006`.
- Status: Pending Investment Support Review.
- Winning bank information and IBAN certificate are available.

### Demonstration Flow

1. Switch to Sarah Aldosari.
2. verify documentation and submit to Finance.
3. switch to Mohammed Alshehri.
4. confirm cash availability and beneficiary details.
5. approve for Accounting execution.

### Expected Result

- Two review stages are recorded independently.
- Accounting Executor receives the next task.
- No user can edit fields outside their assigned stage.

## Scenario 7 — Execute and Activate a Deposit

### Objective

Demonstrate the conversion of an approved investment request into one active deposit.

### Starting State

- Request: `IR-2026-0004`.
- Status: Pending Accounting Execution.

### Demonstration Flow

1. Switch to Reem Alghamdi.
2. enter journal and payment references.
3. upload transfer evidence.
4. complete Accounting execution.
5. switch to Noura Alotaibi.
6. confirm deposit reference and certificate.
7. activate the deposit.

### Expected Result

- Exactly one Deposit record is created.
- The source request becomes Completed.
- The deposit appears in the portfolio.
- Dashboard and exposure metrics update.
- Links between request and deposit work in both directions.

## Scenario 8 — Manage a Near-Maturity Deposit

### Objective

Demonstrate maturity visibility and creation of a reinvestment request.

### Starting State

- Deposit: `DEP-2026-0012`.
- Status: Near Maturity.
- Maturity occurs within 14 days.

### Demonstration Flow

1. Open the deposit from the maturity widget.
2. review original request, bank, rate, and expected return.
3. choose Reinvest.
4. create a new Draft request prefilled from the deposit.

### Expected Result

- A new Draft request is created.
- The source deposit remains unchanged until maturity processing completes.
- Bidirectional source links are visible.
- A new preparation task is assigned to the Deposit Specialist.

## Scenario 9 — Break a Deposit Early

### Objective

Demonstrate an exceptional early-break case without confusing it with normal maturity.

### Starting State

- Deposit: `DEP-2026-0008`.
- Status: Active.

### Demonstration Flow

1. Initiate Break Early.
2. enter a mandatory reason.
3. review expected return impact.
4. confirm the prototype action.

### Expected Result

- Status changes to Broken.
- Break date and reason are stored.
- Activity timeline records the exceptional action.
- Portfolio totals update accordingly.

## Scenario 10 — Executive Portfolio Review

### Objective

Show a concise executive view without requiring workflow actions.

### Starting State

- User: Taghreed Alharbi.
- Page: Dashboard.

### Demonstration Flow

1. Review total active portfolio.
2. inspect average annual rate and expected return.
3. review bank concentration.
4. inspect upcoming maturities.
5. drill into one bank and one deposit.

### Expected Result

- Data is aggregated from Deposit records.
- Executive dashboard contains no irrelevant draft editing controls.
- Drill-down maintains context and clear return navigation.

## Scenario Controls

The Settings area must provide:

- Scenario selector.
- Scenario description.
- Load scenario action.
- Reset current scenario action.
- Reset all prototype data action.
- Confirmation dialog for destructive resets.

Loading a scenario must reset only prototype state and must not require a page reload.

## Acceptance Rules

- Every scenario must be executable without dead ends.
- All referenced IDs must exist in seed data.
- State transitions must follow approved business rules.
- Dashboard, tasks, activities, approvals, and portfolio figures must update after actions.
- Reset must restore the exact deterministic starting state.
