# Claude Code Project Instructions

## 1. Project Purpose

This repository contains a high-fidelity interactive prototype for the Environment Fund Investment Deposit Management Platform.

The prototype is intended for:

- Stakeholder demonstrations.
- Business process validation.
- Workflow and approval validation.
- UI/UX validation.
- Requirements discovery before production development.

This is not a production system.

## 2. Mandatory Working Method

Before implementing any prompt:

1. Read this file completely.
2. Read only the documentation explicitly referenced by the execution prompt.
3. Inspect the existing implementation before making changes.
4. Implement only the requested scope.
5. Reuse the existing design system, domain types, services, and components.
6. Do not rewrite unrelated working features.
7. Run TypeScript validation and the production build.
8. Fix all errors introduced by the change.
9. Provide a concise completion summary.

Do not invent missing business requirements. Record material uncertainties in the completion summary.

## 3. Repository Boundaries

The repository root is reserved for:

- Documentation.
- Claude Code execution prompts.
- Project governance.
- Visual identity reference assets.

All frontend code and frontend configuration must be created under:

`/src`

The React application root is `/src`.

Do not place `package.json`, Vite configuration, TypeScript configuration, or frontend source files in the repository root.

Expected local execution:

```bash
cd src
npm install
npm run dev
```

## 4. Deployment Restrictions

Do not add any deployment or production infrastructure during the prototype phase.

Do not add:

- Vercel configuration.
- Netlify configuration.
- GitHub Actions.
- CI/CD pipelines.
- Docker files.
- Kubernetes files.
- Cloud deployment configuration.
- Production environment configuration.
- Backend or serverless functions.

Deployment will be handled separately after prototype approval.

## 5. Planned Technology

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- React Router.
- Feature-based frontend architecture.
- Local state or lightweight client-side state management.
- Local mock services.
- Deterministic mock-data generation using a fixed seed.

Do not introduce:

- A backend.
- A database.
- Real authentication.
- Real APIs.
- Real email or banking integrations.

## 6. Language and Direction

- Arabic is the primary interface language.
- The application must use true RTL layout behavior.
- Financial values, percentages, dates, tables, and identifiers must remain readable.
- Use realistic Saudi treasury, investment, banking, finance, and accounting terminology.
- Use Saudi Riyal values.
- Do not use lorem ipsum.
- Do not use generic placeholder content.

## 7. Design Vision

The prototype must look intentionally designed and suitable for executive and treasury stakeholders.

The intended visual personality is:

- Modern.
- Premium but restrained.
- Clear and professional.
- Enterprise-grade.
- Financially credible.
- Arabic-first.
- Aligned with the Environment Fund visual identity.

The experience should feel closer to a modern financial operations workspace than a generic admin dashboard.

## 8. Design Quality Rules

Do not create a generic AI-generated dashboard appearance.

Do not:

- Fill every page with equal-sized cards.
- Use excessive gradients.
- Use excessive shadows, borders, or decorative colors.
- Introduce a new visual pattern for every feature.
- Overuse rounded cards.
- Use decorative charts without business meaning.
- Sacrifice usability for visual effects.
- create crowded screens.

Every page must have:

- Clear visual hierarchy.
- One obvious primary action.
- Consistent spacing.
- Realistic Arabic content.
- Meaningful status visualization.
- Role-appropriate information density.
- Empty, loading, error, and confirmation states.
- Consistent action placement.

Use:

- Subtle depth.
- Generous spacing.
- Strong typography hierarchy.
- Professional financial tables.
- Purposeful KPI presentation.
- Clear timelines and workflow indicators.
- Sticky action areas only where they improve task completion.
- Lightweight micro-interactions.

## 9. Visual Identity

Use the Environment Fund brand assets available under `assets/brand/` as the visual reference.

When the runtime application needs a brand asset, copy an optimized application-safe version to `src/public/brand/`. Do not reference root assets directly from runtime code.

Create centralized design tokens for:

- Brand colors.
- Semantic colors.
- Typography.
- Spacing.
- Radius.
- Shadows.
- Motion.
- Layout widths.

Do not hardcode inconsistent visual values across features.

## 10. Main Navigation

The main navigation is limited to:

1. الصفحة الرئيسية
2. مهامي
3. محفظة الودائع
4. طلبات الاستثمار
5. التقارير والتحليلات
6. الإعدادات

Do not add main navigation items without an explicit requirement.

## 11. Core Business Principle

An investment request remains in `مسودة` while one Deposit Specialist gradually prepares all required information.

Draft preparation includes:

- Request information.
- Liquidity information.
- Liquidity attachments.
- Bank RFQ communication.
- Received bank offers.
- Offer evaluation.
- Recommendation.
- Supporting attachments.

Do not change the main workflow status while draft sections are being prepared.

Use section completion indicators, readiness checks, missing-requirement summaries, and an overall completion percentage.

The approval workflow begins only when the completed request is submitted.

## 12. Approval Rules

For requests up to and including SAR 100,000,000:

1. Deposit Specialist prepares and submits the request.
2. General Manager of Treasury reviews the request.

For requests above SAR 100,000,000:

1. Deposit Specialist prepares and submits the request.
2. General Manager of Treasury reviews the request.
3. Executive Director of Investment and Treasury Sector reviews the request.

After investment approval:

1. The request returns to the Deposit Specialists group.
2. A specialist completes winning-bank and IBAN information.
3. Investment Support reviews the request.
4. Finance reviews only the information required for financial approval.
5. Accounting executes the transfer and attaches evidence.
6. A Deposit Specialist confirms bank activation.
7. The request is completed and converted into an active deposit.

## 13. Return Rules

- Every return action requires a reason.
- All returns must be preserved in the activity and approval history.
- General Manager of Treasury may return the request to the Deposit Specialist.
- Executive approval returns through the treasury approval path.
- Investment Support may return the request to the Deposit Specialists group.
- Finance may return the request to Investment Support.
- Accounting may return the request to Finance.

A previously submitted request that is returned must use `معاد للاستكمال`, not a plain first-time draft state.

## 14. Request Workspace Pattern

The investment request must be designed as a transaction and case workspace, not one long form and not a restrictive linear wizard.

The workspace may include:

- Overview.
- Request information.
- Liquidity information.
- Bank communications.
- Received offers.
- Evaluation and recommendation.
- Approval history.
- Winning-bank details.
- Investment Support review.
- Finance review.
- Accounting execution.
- Deposit activation.
- Attachments.
- Notes.
- Activity history.

Sections become editable or read-only based on the selected role and workflow stage.

## 15. Prototype Users

The prototype must support switching between mock users and roles.

At minimum:

- Deposit Specialist.
- General Manager of Treasury.
- Executive Director of Investment and Treasury Sector.
- Investment Support Specialist.
- Finance Specialist.
- Accounting Specialist.
- System Administrator.
- Read-only User.

Changing the active mock user must change:

- Available tasks.
- Available actions.
- Visible information.
- Dashboard metrics.
- Approval controls.
- Editable sections.

## 16. Mock Data Standard

The prototype must contain rich and realistic data.

Target minimum:

- 30 investment requests.
- 25 deposits.
- 10 banks.
- At least 100 bank offers.
- At least 40 tasks.
- Multiple approval histories.
- Multiple attachments.
- Returned and rejected requests.
- Deposits approaching maturity.

Include amounts below, equal to, and above SAR 100,000,000.

Do not place all mock data in one large file.

Use:

- Small curated stakeholder demo scenarios.
- Separate entity fixtures.
- Deterministic generators for volume data.
- A fixed seed so demonstrations remain stable.

## 17. Coding Rules

- Use feature-based architecture.
- Keep files focused and reasonably sized.
- Do not place the application in one component.
- Define domain types separately from UI components.
- Separate mock data from mock services.
- Centralize business rules and thresholds.
- Reuse tables, filters, badges, dialogs, drawers, forms, attachments, timelines, and feedback components.
- Avoid `any`.
- Avoid duplicated business rules.
- Preserve working functionality while adding features.
- Prefer clear code over unnecessary abstractions.

## 18. Completion Standard

A feature is not complete unless:

- It is reachable through the router.
- It uses realistic Arabic content.
- RTL works correctly.
- It uses approved mock data or mock services.
- Primary actions work in the prototype state.
- Permissions are respected.
- Empty and error states are represented.
- Validation messages are clear.
- TypeScript validation passes.
- The production build passes.
