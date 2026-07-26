# Deposit Lifecycle

## Deposit Creation

A deposit is created only after a fully approved investment request has been executed and the bank activation has been confirmed.

Each deposit must retain permanent links to:

- Source investment request.
- Winning bank offer.
- Approval history.
- Transfer execution evidence.
- Activation confirmation.

## Deposit Statuses

### Active

The deposit has started and has not yet matured or been broken.

### Approaching Maturity

A derived operational state used when the maturity date falls within the configured warning window. The underlying lifecycle status remains active.

### Matured – Action Required

The maturity date has arrived and the proceeds or next action are not yet confirmed.

### Reinvested

The matured proceeds were used to initiate a new investment request. The new request and resulting deposit must be linked to the source deposit.

### Closed

Principal and applicable return have been received and no further action is required.

### Broken Early

The deposit was terminated before maturity. The reason, effective date, returned amount, realized return, penalties, approvals, and evidence must be recorded.

## Maturity Management

The prototype must support:

- Upcoming maturity warnings.
- Maturity task generation.
- Recording maturity proceeds.
- Choosing closure or reinvestment.
- Linking reinvestment to a new request.
- Comparing expected and realized return.

## Reinvestment Principle

Reinvestment is not an edit to the existing deposit. It creates a new investment request and preserves lineage:

Source Deposit → Reinvestment Request → New Deposit.

## Early Break Principle

An early break is a controlled exceptional process. The prototype must capture:

- Business reason.
- Requested and approved break dates.
- Applicable approval evidence.
- Original expected return.
- Realized return.
- Penalty or reduction.
- Bank confirmation.

## Deposit Detail Record

The deposit details experience must show:

- Core terms.
- Bank and relationship information.
- Source request.
- Financial summary.
- Expected versus realized return.
- Timeline and maturity countdown.
- Attachments.
- Notes and tasks.
- Activity history.
- Related reinvestment or source deposit links.
