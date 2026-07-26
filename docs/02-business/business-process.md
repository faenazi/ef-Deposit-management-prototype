# End-to-End Business Process

## Process Objective

Manage the complete lifecycle of investing available liquidity in bank deposits with clear ownership, approval controls, supporting evidence, and full traceability.

## High-Level Flow

1. Deposit Specialist creates an investment request.
2. The request remains Draft while all preparation sections are completed.
3. The specialist validates readiness and submits the request.
4. General Manager of Treasury reviews every submitted request.
5. Requests above SAR 100,000,000 require Executive Head of Investment and Treasury approval.
6. After investment approval, the Deposit Specialists group completes the winning bank and beneficiary details.
7. Investment Support performs the completeness and control review.
8. Finance performs financial readiness review.
9. Accounting executes the transfer and records evidence.
10. The Deposit Specialist confirms bank activation.
11. The system creates and links an active deposit in the portfolio.
12. The deposit is monitored until maturity, break, closure, or reinvestment.

## Preparation Phase

The creator progressively completes:

- Request information.
- Liquidity information and evidence.
- Bank RFQ records.
- Received bank offers.
- Offer evaluation.
- Recommendation.
- Mandatory attachments.

The overall request status remains `Draft`. Section-level completion indicators communicate progress without starting the approval workflow.

## Submission Readiness

Before submission, the system must display a readiness checklist and block submission when mandatory requirements are incomplete. The specialist confirms that the request is complete and accurate.

## Approval Phase

### Amount up to and including SAR 100,000,000

Deposit Specialist → General Manager of Treasury → Winning Bank Completion.

### Amount above SAR 100,000,000

Deposit Specialist → General Manager of Treasury → Executive Head of Investment and Treasury → Winning Bank Completion.

## Execution Phase

Winning Bank Completion → Investment Support Review → Finance Review → Accounting Execution → Deposit Activation.

Each stage has a current owner, generated task, permitted actions, and return route.

## Return Principle

A return is a controlled workflow action, not a deletion or restart. Every return requires a reason, preserves prior decisions, and creates a task for the target role.

## Completion Principle

An investment request is completed only after deposit activation. The resulting deposit maintains a permanent reference to its source request, selected offer, approvals, transfer evidence, and activation confirmation.
