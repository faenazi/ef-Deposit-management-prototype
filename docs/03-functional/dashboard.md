# Dashboard

## Purpose

Provide a role-aware operational overview of the deposit investment process and active deposit portfolio.

## Design Principle

The dashboard must not be a generic collection of equal-sized cards. It must present a clear hierarchy of financial position, operational urgency, portfolio health, and recent activity.

## Role-Aware Content

### Deposit Specialist
- Draft requests owned by the user.
- Requests returned for completion.
- Requests awaiting winning-bank completion.
- Deposits requiring activation confirmation.
- Deposits approaching maturity.
- Quick actions: create request, resume draft, review returned request.

### General Manager of Treasury
- Requests awaiting approval.
- Total value awaiting approval.
- Requests delayed beyond the configured SLA.
- Portfolio concentration by bank.
- Deposits approaching maturity.

### Executive Head of Investment and Treasury
- High-value requests awaiting approval.
- Total high-value exposure.
- Portfolio allocation and concentration.
- Expected return trend.
- Critical maturity decisions.

### Investment Support
- Requests awaiting review.
- Returned items.
- Missing-document cases.
- Average review age.

### Finance
- Requests awaiting finance review.
- Total pending transfer value.
- Beneficiary validation issues.
- Requests returned from Accounting.

### Accounting
- Requests awaiting transfer execution.
- Transfers completed today.
- Items missing execution evidence.
- Oldest pending execution.

## Main Sections

1. Role-specific greeting and summary.
2. Primary KPIs.
3. Tasks requiring immediate action.
4. Portfolio distribution.
5. Deposits approaching maturity.
6. Expected return trend.
7. Recent activity.
8. Role-specific quick actions.

## Interaction Requirements

- KPI blocks must link to filtered operational lists.
- Urgent tasks must open the related transaction file.
- Maturity items must open deposit details.
- Charts must support tooltips and readable Arabic labels.
- Switching the mock user must immediately refresh all dashboard content.

## Empty States

Each role must have a meaningful empty state explaining that no action is currently required, rather than showing zero-filled generic cards.
