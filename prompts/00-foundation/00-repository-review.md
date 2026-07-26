# Repository Review

Read `CLAUDE.md` first.

Then read:

- `README.md`
- `docs/00-index.md`
- `docs/01-product/product-overview.md`
- `docs/04-ui-ux/design-direction.md`

## Objective

Review the repository before frontend initialization and confirm that the documentation and folder boundaries are ready for implementation.

## Scope

1. Inspect the existing repository structure.
2. Confirm that the repository root is reserved for documentation, prompts, governance, and reference assets.
3. Confirm that frontend code will be created only under `/src`.
4. Identify missing prerequisite documentation referenced by the next implementation stage.
5. Identify contradictory or duplicated instructions.
6. Verify that deployment, backend, database, Docker, Vercel, and CI/CD configuration have not been introduced.
7. Recommend only blocking corrections required before frontend initialization.

## Restrictions

- Do not initialize React.
- Do not create `package.json`.
- Do not install dependencies.
- Do not add application code.
- Do not add deployment configuration.
- Do not expand the business scope.

## Output

Provide a concise report with:

- Repository readiness status.
- Blocking issues.
- Non-blocking observations.
- Exact files that should be created or corrected next.

Do not make code changes unless explicitly asked after the review.
