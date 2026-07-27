# Prototype Scope

## Purpose

This prototype validates the end-to-end business process, user experience, roles, decision points, and information requirements for the Environment Fund Investment Deposit Management Platform before production development begins.

## In Scope

- Arabic-first RTL user experience.
- Role-based dashboards and task queues.
- Investment request preparation and submission.
- Liquidity information and supporting attachments.
- Bank RFQ tracking.
- Bank offers capture and comparison.
- Evaluation and recommendation.
- Treasury and executive approvals.
- Winning bank and beneficiary information.
- Investment Support review.
- Finance review.
- Accounting execution evidence.
- Deposit activation.
- Deposit portfolio and deposit details.
- Maturity, closure, break, and reinvestment scenarios.
- Reports and analytics using mock data.
- Role switching and realistic end-to-end demo scenarios.
- Local-only prototype state and deterministic mock data.
- Responsive behavior: desktop and laptop are primary, tablet fully usable, and mobile web functional and readable down to 390px.

## Out of Scope

- Production backend or database.
- Real authentication or Microsoft Entra ID integration.
- Exchange, Oracle Fusion Cloud ERP, Advent APX, custodian, or bank integrations.
- Automated bank RFQ transmission.
- Real email delivery.
- Real document storage.
- Real accounting posting.
- Production-grade security controls.
- Vercel, cloud deployment, Docker, CI/CD, or GitHub Actions.
- Mobile-native applications (responsive mobile web is in scope).

## Prototype Boundaries

The prototype must simulate user actions and state transitions locally. It must clearly distinguish simulated actions from real integrations while preserving a realistic enterprise experience.

## Success Criteria

The prototype is successful when stakeholders can:

1. Understand the complete request-to-deposit lifecycle.
2. Validate roles, permissions, handoffs, and approval thresholds.
3. Review all key data fields and attachments.
4. Execute representative scenarios without dead ends.
5. Assess the visual quality and usability of the proposed solution.
6. Identify changes before backend and integration development begins.
