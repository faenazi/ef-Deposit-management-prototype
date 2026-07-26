# Prompt 01 — Repository Audit and Implementation Plan

Use this prompt as the first Claude Code execution step.

---

Act as a senior frontend architect, product designer, UX architect, and quality engineer.

Do not write application code yet.

## Required reading

Read completely:

- `CLAUDE.md`
- `docs/09-ai-governance/README.md`
- all files under `docs/09-ai-governance/`
- all files under `docs/07-brand-experience/`
- `docs/08-design-specifications/README.md`
- `docs/08-design-specifications/00-shared-layout-and-components.md`

Then inspect the entire repository structure and the current contents of `src/`.

## Task

Produce a concise but complete implementation-readiness report covering:

1. Current repository state.
2. Existing frontend setup and missing foundations.
3. Documentation conflicts, gaps, or ambiguities.
4. Proposed feature-based `src/` structure.
5. Proposed design-system structure.
6. Required domain types and mock-data modules.
7. Recommended implementation sequence.
8. Risks that could cause generic or inconsistent design.
9. Validation commands that will be used after implementation.

## Rules

- Do not invent requirements.
- Do not install dependencies.
- Do not create or modify files.
- Do not add backend, API, authentication, deployment, Docker, GitHub Actions, or Vercel configuration.
- Reference exact documentation paths for every major recommendation.
- Keep the plan optimized for incremental execution by later prompts.

## Output

Return:

- readiness status: ready, ready with conditions, or blocked;
- recommended file tree;
- ordered implementation plan;
- decisions that require confirmation;
- no code changes.
