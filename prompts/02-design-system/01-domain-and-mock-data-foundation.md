# Prompt 03 — Domain and Mock-Data Foundation

Run after the brand and design-system foundation is complete.

---

Act as a senior business analyst, treasury domain architect, TypeScript domain modeler, and frontend solution architect.

## Required reading

Read completely:

- `CLAUDE.md`
- all files under `docs/09-ai-governance/`
- relevant business, functional, workflow, data, and quality documents
- all design specifications under `docs/08-design-specifications/`

Inspect the existing `src/` implementation before making changes.

## Objective

Create the typed domain model, centralized business rules, deterministic realistic mock data, and mock services required by all prototype pages.

## Required domain coverage

Include, where supported by documentation:

- users and roles;
- banks;
- investment requests;
- draft section completion;
- liquidity information;
- bank communications and RFQs;
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
- maturity and rollover indicators.

## Business rules

Centralize and test through clear functions:

- the SAR 100,000,000 approval threshold;
- workflow routing by amount;
- draft readiness and section completion;
- returned-request state behavior;
- role-based editability and available actions;
- conversion of a completed request into an active deposit;
- maturity urgency categories.

Do not duplicate these rules inside UI components.

## Mock-data standard

Create:

- small curated demonstration scenarios;
- separate entity fixtures;
- deterministic generators using a fixed seed;
- realistic Arabic names and banking terminology;
- amounts below, equal to, and above SAR 100,000,000;
- successful, returned, rejected, pending, overdue, and nearing-maturity scenarios.

Target at least the volumes documented in `CLAUDE.md`, but keep data modular and maintainable.

## Mock services

Provide typed local query functions that allow pages to retrieve:

- dashboard summaries by active role;
- assigned tasks;
- filtered investment requests;
- request workspace details;
- deposit portfolio data;
- reports and analytics summaries.

No network calls, API clients, database, or backend code.

## Validation

Run type checking, linting, and production build. Verify deterministic data output across repeated runs.

## Completion response

Report:

- domain modules created;
- business rules centralized;
- mock scenarios and volumes;
- validation results;
- any documentation gaps discovered.
