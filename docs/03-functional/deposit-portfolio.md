# Deposit Portfolio

## Purpose

Provide a complete view of active and historical deposits created from approved investment requests.

## Portfolio Summary

Display:

- Total active principal.
- Weighted average rate.
- Expected return.
- Deposits approaching maturity.
- Concentration by bank.
- Distribution by tenor.
- Distribution by maturity period.
- Active, matured, closed, broken, and reinvested counts.

## Deposit List

Required columns:

- Deposit number.
- Source request number.
- Bank.
- Principal amount.
- Rate.
- Tenor.
- Value date.
- Maturity date.
- Expected return.
- Current status.
- Days to maturity.
- Responsible specialist.

## Views and Filters

- Active deposits.
- Approaching maturity.
- Matured and awaiting action.
- Closed.
- Broken before maturity.
- Reinvested.
- By bank.
- By amount range.
- By tenor.
- By maturity window.

## Deposit Details

The detail page must contain:

- Financial summary.
- Bank and account information.
- Source request link.
- Approval and execution evidence.
- Deposit certificate.
- Maturity timeline.
- Notes and tasks.
- Activity history.
- Related reinvestment request when applicable.

## Maturity Actions

Prototype scenarios may support:

- Close at maturity.
- Create a reinvestment request.
- Record maturity proceeds.
- Record early break with reason and financial impact.

## Rules

- A deposit is created only from a completed source request.
- Reinvestment creates a new request rather than editing the original deposit terms.
- Historical financial terms remain immutable.
- Status changes must be reflected in activity history.

## UX Requirements

- Emphasize upcoming maturity decisions.
- Provide concentration context without overwhelming the user.
- Use financial tables and charts with consistent number formatting.
- Make the relationship between request and deposit easy to follow.
