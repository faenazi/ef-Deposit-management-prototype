# Prompt 03 — Domain and Mock-Data Planning Reference

Run after the brand interpretation and design-token planning step is approved.

---

Act as a senior business analyst, treasury domain architect, TypeScript domain modeler, and frontend solution architect.

This is a planning and reference step only (Decision DEC-013). Do not create application code, domain types, mock data, or services. Implementation happens in Step 07 (`prompts/04-frontend/04-build-domain-model-mock-data-and-services.md`), which uses this step's output as its reference plan.

## Required reading

Read completely:

- `CLAUDE.md`
- `EXECUTION-STATUS.md`
- all files under `docs/09-ai-governance/`
- `docs/02-business/` — especially `statuses-and-transitions.md` (canonical statuses), `roles-and-permissions.md`, and `business-rules.md` (canonical thresholds and prototype defaults)
- `docs/05-data/` — `domain-model.md`, `mock-data-requirements.md`, `demo-users.md`, `demo-scenarios.md`
- `docs/03-functional/` for functional field requirements
- all design specifications under `docs/08-design-specifications/`

## Objective

Validate and finalize the domain-model and mock-data plan that Step 07 will implement, so that implementation requires no further business decisions.

## Required planning coverage

Confirm, against the documentation, the planned coverage of:

- users and roles, including the Read-only User (`read-only-user`);
- banks;
- investment requests and draft section completion;
- liquidity information;
- bank RFQs and communications;
- bank offers;
- evaluation and recommendation;
- approval steps and return history;
- winning-bank and IBAN details;
- Investment Support review;
- Finance review;
- Accounting execution;
- deposit activation;
- active and historical deposits;
- tasks;
- attachments;
- notes and activity history;
- derived maturity-warning indicators (14-day window; never persisted as a status).

## Business rules to centralize

Verify the plan centralizes the canonical rules from `docs/02-business/business-rules.md`, including:

- the SAR 100,000,000 approval threshold evaluated from the amount submitted for approval;
- workflow routing by amount, with recalculation when the amount changes after a return;
- draft readiness and section completion;
- returned-request behavior (`معاد للاستكمال`, resuming at the stage that returned it);
- role-based editability and available actions;
- conversion of a completed request into an active deposit;
- the expected-return formula `principal × annualRate × tenorDays ÷ 360`;
- approval/task target times.

## Mock-data plan

Confirm the plan for:

- small curated demonstration scenarios matching `docs/05-data/demo-scenarios.md`;
- separate entity fixtures under `src/src/mock-data/` per `docs/05-data/mock-data-requirements.md`;
- deterministic generators using a fixed seed;
- realistic Arabic names and banking terminology;
- amounts below, equal to, and above SAR 100,000,000;
- returned, rejected, pending, overdue, and nearing-maturity records;
- identifier formats `IR-2026-####` and `DEP-2026-####`.

## Deliverable

Record gaps, corrections, or confirmations in `EXECUTION-STATUS.md` (and documentation updates where a real gap exists). No files under `src/` may be created or modified in this step.

## Completion response

Report:

- confirmed domain coverage and any documentation gaps;
- the canonical rule list Step 07 must centralize;
- the confirmed mock-data volumes and structure;
- confirmation that no application code was created.
