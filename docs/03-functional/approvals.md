# Approvals

## Purpose

Provide a clear, auditable approval experience for Treasury leadership based on the configured amount threshold.

## Approval Route

### Requests up to and including SAR 100,000,000

1. Deposit Specialist submits.
2. General Manager of Treasury reviews and decides.

### Requests above SAR 100,000,000

1. Deposit Specialist submits.
2. General Manager of Treasury reviews and decides.
3. Executive Director of Investment and Treasury Sector reviews and decides.

## Approval Workspace

Approvers must see a decision-focused summary containing:

- Request number and title.
- Amount, currency, and tenor.
- Liquidity position.
- Banks contacted.
- Offers compared.
- Recommended bank and offer.
- Expected return.
- Portfolio concentration context.
- Recommendation rationale.
- Mandatory attachments.
- Previous decisions and comments.

## Actions

- Approve.
- Return for completion.
- Reject.

Return and rejection require a reason. Approval comments may be optional in the prototype.

## Return Behavior

- General Manager of Treasury returns to the Deposit Specialist.
- The Executive Director of Investment and Treasury Sector returns through the Treasury approval path, preserving the hierarchy and full history.
- Returned requests use `معاد للاستكمال` and identify the required corrections.

## Rules

- Approvers cannot directly edit specialist-owned request content.
- Decisions are immutable in history.
- Resubmission creates a new decision cycle while preserving earlier cycles.
- An approver cannot act when the request is not assigned to their role.
- The configured threshold determines whether executive approval is required.

## UX Requirements

- Keep the primary decision actions visible.
- Do not force approvers to navigate every data-entry section.
- Provide direct links to supporting details and attachments.
- Use a vertical approval timeline showing actor, decision, timestamp, and comments.
