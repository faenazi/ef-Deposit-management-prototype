# Prompt 02 — Brand Interpretation and Design-Token Planning

Run only after the repository audit and documentation alignment steps are approved.

---

Act as a senior design-system architect, Arabic product designer, accessibility specialist, and brand governance lead.

This is a planning and interpretation step only (Decision DEC-013). Do not initialize Vite, Tailwind, React Router, the app shell, role switching, or any application code. Frontend initialization happens in Step 04 (`prompts/04-frontend/01-initialize-frontend-project.md`); the design system and app shell are implemented in Step 05 (`prompts/04-frontend/02-build-design-system-and-app-shell.md`).

## Required reading

Read completely:

- `CLAUDE.md`
- `EXECUTION-STATUS.md`
- all files under `docs/09-ai-governance/`
- all files under `docs/07-brand-experience/`
- `docs/08-design-specifications/00-shared-layout-and-components.md`

Inspect the official brand assets under `assets/brand/` before planning. If any of the seven required official SVG files is missing, record it as a blocker; never redraw, approximate, trace, regenerate, or replace a missing official brand asset (Decision DEC-008).

## Objective

Produce a documented brand interpretation and design-token plan that Step 05 can implement without further design decisions.

## Required scope

1. Validate the interpretation of the Environment Fund identity in `docs/07-brand-experience/` against the actual assets in `assets/brand/`.
2. Define the complete design-token plan:
   - EF brand colors;
   - semantic colors;
   - typography;
   - spacing;
   - radius;
   - shadows;
   - motion;
   - layout widths and breakpoints.
3. Define which optimized runtime assets will be copied to `src/public/brand/` in Step 04, and their exact target filenames. Runtime code will reference only `/brand/...` paths (Decision DEC-008).
4. Record any conflict between brand documentation and the shared layout specification instead of resolving it silently.
5. Do not commit licensed font binaries and do not create fake brand assets.

## Deliverable

Update or create planning documentation only (for example under `docs/07-brand-experience/`), and record the outcome in `EXECUTION-STATUS.md`. No files under `src/` may be created or modified in this step.

## Completion response

Report:

- the validated token plan and where it is recorded;
- the runtime asset copy list;
- documented assumptions and open conflicts;
- confirmation that no application code was created.
