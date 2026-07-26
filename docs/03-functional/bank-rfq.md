# Bank RFQ

## Purpose

Track the communication sent to selected banks requesting deposit offers.

## RFQ Information

- RFQ reference.
- Request number.
- Send date and time.
- Response deadline.
- Communication channel.
- Email subject.
- Sender.
- Standard message summary.
- Attached RFQ documents.

## Bank Participation Records

For each bank capture:

- Bank name.
- Contact person.
- Contact email.
- Sent status.
- Sent timestamp.
- Response status.
- Response timestamp.
- Decline or no-response reason when available.
- Notes.

## Statuses

- لم يتم الإرسال
- تم الإرسال
- تم استلام الرد
- اعتذر البنك
- لم يرد

## Actions

- Select banks.
- Simulate sending the RFQ.
- Record a response.
- Record a decline.
- Mark no response after the deadline.
- Open received offer records.
- Add communication notes.

## Rules

- RFQ activity belongs to the investment request and does not change the request's main Draft status.
- A bank may provide more than one offer.
- Contacted-bank readiness is evaluated according to centralized business configuration.
- Exceptions to minimum bank participation require a documented reason.

## UX Requirements

Use a clear communication tracker rather than a generic form. Show bank-level status, deadline, and response activity in a scannable layout. Do not simulate real email delivery.
