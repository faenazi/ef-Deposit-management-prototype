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
- `04-ui-ux/information-architecture.md` — navigation order, content hierarchy, and canonical routes.
- `04-ui-ux/navigation.md` — main and contextual navigation behavior.
- `04-ui-ux/page-patterns.md` — reusable enterprise page structures.
- `04-ui-ux/responsive-behavior.md` — desktop, tablet, and mobile (390px) behavior.
- `04-ui-ux/accessibility.md` — accessibility and interaction requirements.
- `04-ui-ux/prototype-interactions.md` — simulated actions and state changes.
- `04-ui-ux/transaction-workspace.md` — request workspace experience structure.
- `04-ui-ux/design-system.md` — design-system foundations.
- `04-ui-ux/components.md` — shared component requirements.
- `04-ui-ux/design-review-checklist.md` — design review checklist.

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

## 07 — Brand Experience

- `07-brand-experience/README.md` — folder guide.
- `07-brand-experience/00-brand-source-of-truth.md` — official brand assets and usage rules.
- `07-brand-experience/01-design-philosophy.md` through `11-product-design-dna.md` — design philosophy, brand application, color, typography, iconography, patterns, data visualization, motion, responsive strategy, compliance checklist, and product design DNA.

## 08 — Design Specifications

- `08-design-specifications/README.md` — folder guide.
- `08-design-specifications/00-shared-layout-and-components.md` — shared shell and component specification.
- `08-design-specifications/01-dashboard.md` through `07-settings.md` — one detailed design specification per page.

## 09 — AI Governance

- `09-ai-governance/README.md` — folder guide.
- `09-ai-governance/01-ai-design-principles.md` — design principles for AI-generated work.
- `09-ai-governance/02-ai-coding-standards.md` — canonical frontend structure and coding standards.
- `09-ai-governance/03-ai-review-checklist.md` — AI output review checklist.
- `09-ai-governance/04-ai-definition-of-done.md` — definition of done.

## Canonical Sources

When documents overlap, these files win:

- Statuses and transitions: `02-business/statuses-and-transitions.md`.
- Business rules, thresholds, and prototype defaults: `02-business/business-rules.md`.
- Roles and permissions: `02-business/roles-and-permissions.md`.
- Navigation order and routes: `04-ui-ux/information-architecture.md` (matching `CLAUDE.md` §10).
- Workspace sections: the DEC-016 list in `04-ui-ux/information-architecture.md`.
- Demo identities: `05-data/demo-users.md`.
- Frontend structure: `09-ai-governance/02-ai-coding-standards.md`.
- Decisions log: `EXECUTION-STATUS.md` section 6.

## Authoring Rules

- Avoid duplicating the same business rule across multiple files.
- Use cross-references instead of copying long sections.
- Keep each document focused on one concern.
- Use approved Arabic terminology consistently.
- Record unresolved decisions explicitly instead of letting implementation infer them.
