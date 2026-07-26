# Documentation Index

This folder is the business, functional, design, data, and quality source of truth for the prototype.

Claude Code prompts must reference only the documents required for the current implementation task.

## 01 — Product

- `01-product/product-overview.md` — product purpose, objectives, users, and prototype boundaries.
- `01-product/scope.md` — in-scope and out-of-scope capabilities.
- `01-product/users-and-personas.md` — business personas and role goals.
- `01-product/glossary.md` — approved Arabic and English terminology.

## 02 — Business

- `02-business/business-process.md` — end-to-end process overview.
- `02-business/investment-request-lifecycle.md` — preparation, approval, execution, and activation lifecycle.
- `02-business/deposit-lifecycle.md` — active deposit, maturity, closure, break, and reinvestment lifecycle.
- `02-business/roles-and-permissions.md` — role-level visibility and actions.
- `02-business/statuses-and-transitions.md` — states, transitions, owners, and return paths.
- `02-business/business-rules.md` — thresholds, validation, and decision rules.

## 03 — Functional

- `03-functional/dashboard.md`
- `03-functional/my-tasks.md`
- `03-functional/investment-requests.md`
- `03-functional/investment-request-file.md`
- `03-functional/bank-rfq.md`
- `03-functional/bank-offers.md`
- `03-functional/evaluation-and-recommendation.md`
- `03-functional/approvals.md`
- `03-functional/execution-and-activation.md`
- `03-functional/deposit-portfolio.md`
- `03-functional/reports-and-analytics.md`
- `03-functional/settings.md`

## 04 — UI/UX

- `04-ui-ux/design-direction.md` — mandatory visual and experience direction.
- `04-ui-ux/information-architecture.md` — navigation and content hierarchy.
- `04-ui-ux/navigation.md` — main and contextual navigation behavior.
- `04-ui-ux/page-patterns.md` — reusable enterprise page structures.
- `04-ui-ux/responsive-behavior.md` — desktop and tablet behavior.
- `04-ui-ux/accessibility.md` — accessibility and interaction requirements.
- `04-ui-ux/prototype-interactions.md` — simulated actions and state changes.

## 05 — Data

- `05-data/domain-model.md` — core business entities and relationships.
- `05-data/mock-data-requirements.md` — volumes, distributions, and realism rules.
- `05-data/demo-users.md` — mock identities and roles.
- `05-data/demo-scenarios.md` — curated end-to-end demonstration scenarios.

## 06 — Quality

- `06-quality/acceptance-criteria.md` — functional and design completion criteria.
- `06-quality/ux-review-checklist.md` — page-level experience review.
- `06-quality/functional-review-checklist.md` — workflow and action review.
- `06-quality/final-readiness-checklist.md` — stakeholder-demo readiness.

## Authoring Rules

- Avoid duplicating the same business rule across multiple files.
- Use cross-references instead of copying long sections.
- Keep each document focused on one concern.
- Use approved Arabic terminology consistently.
- Record unresolved decisions explicitly instead of letting implementation infer them.
