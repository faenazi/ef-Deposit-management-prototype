# Prompt 02 — Brand and Design-System Foundation

Run only after completing the repository audit prompt.

---

Act as a senior design-system architect, Arabic product designer, accessibility specialist, and React frontend architect.

## Required reading

Read completely:

- `CLAUDE.md`
- all files under `docs/09-ai-governance/`
- all files under `docs/07-brand-experience/`
- `docs/08-design-specifications/00-shared-layout-and-components.md`
- the approved repository audit output

Inspect all existing files before making changes.

## Objective

Create the reusable visual and application foundation under `src/` without implementing the full business pages yet.

## Required scope

1. Configure React, TypeScript, Vite, Tailwind, and React Router under `src/` if not already configured.
2. Establish strict TypeScript settings.
3. Create centralized tokens for:
   - EF brand colors;
   - semantic colors;
   - typography;
   - spacing;
   - radius;
   - shadows;
   - motion;
   - layout widths and breakpoints.
4. Establish true Arabic RTL at the application root.
5. Create the application shell with:
   - right-side navigation;
   - top header;
   - responsive mobile navigation;
   - main content container.
6. Create foundational accessible components required by the documented specifications, including only what is justified now.
7. Create a controlled mock-user switcher foundation for role-based demonstrations.
8. Copy only approved optimized runtime brand assets into `src/public/brand/` when source assets exist.
9. Do not commit licensed font binaries.

## Visual quality requirements

The shell must already feel premium, calm, institutional, and financially credible. It must not look like a generic admin template.

Use whitespace, typography, proportion, restrained surfaces, and precise alignment. Do not overuse cards, shadows, borders, or rounded containers.

## Prohibited work

- Do not implement complete dashboard, tasks, requests, portfolio, reports, or settings pages.
- Do not add backend or real integrations.
- Do not add deployment configuration or GitHub Actions.
- Do not add a UI framework that conflicts with the EF identity.
- Do not invent extra navigation items.

## Validation

Run and fix:

- TypeScript validation;
- linting;
- production build.

Also inspect desktop, tablet, and mobile layouts for RTL correctness and unintended horizontal overflow.

## Completion response

Report:

- files created or changed;
- reusable foundations delivered;
- commands run and results;
- documented assumptions;
- remaining work for page implementation.
