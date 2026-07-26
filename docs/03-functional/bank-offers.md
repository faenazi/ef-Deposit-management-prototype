# Bank Offers

## Purpose

Capture, compare, and validate all deposit offers received from participating banks.

## Offer Data

Each offer must contain:

- Bank.
- Offer reference.
- Offered amount.
- Currency.
- Annual rate.
- Tenor.
- Value date.
- Maturity date.
- Expected return.
- Offer validity date and time.
- Early-break terms.
- Partial-break availability when applicable.
- Special conditions.
- Source attachment.
- Receipt date and time.
- Validation status.
- Notes.

## Offer Conditions

Prototype records must include:

- Valid offers.
- Expired offers.
- Incomplete offers.
- Offers outside the requested amount.
- Offers with restrictive early-break conditions.
- Multiple offers from the same bank.

## Calculated Values

Expected return must be calculated consistently from the documented prototype formula and displayed as a decision aid. Calculated values must be clearly distinguished from bank-provided values.

## Actions

- Add a received offer.
- Edit an offer while the request is editable.
- Attach the source document.
- Mark an offer incomplete with a reason.
- Exclude an offer from evaluation with justification.
- Select offers for comparison.
- Open the evaluation view.

## Comparison Experience

- Support side-by-side comparison.
- Keep the rate, expected return, tenor, validity, and break terms visible.
- Highlight the recommended offer only after recommendation is recorded.
- Do not automatically equate the highest rate with the best offer.

## Validation

- Rate must be positive.
- Amount and currency are mandatory.
- Dates must be logically ordered.
- Expired offers cannot be recommended unless the prototype scenario explicitly records a renewed validity.
- Missing mandatory offer data must block completion of that offer record.
