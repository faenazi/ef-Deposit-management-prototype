# Claude Code Execution Prompts

This folder contains small, stage-based implementation prompts for Claude Code.

## Execution Method

Run one prompt at a time from the repository root.

Example:

```text
Execute the instructions in:
prompts/00-foundation/01-initialize-frontend.md
```

After implementation, run a focused review:

```text
Review the implementation against:
prompts/00-foundation/01-initialize-frontend.md

Fix only missing requirements, regressions, TypeScript errors, and build errors.
Do not expand the scope.
```

## Mandatory Sequence

1. `00-foundation`
2. `01-design-system`
3. `02-data-foundation`
4. `03-core-pages`
5. `04-investment-request`
6. `05-workflow`
7. `06-portfolio-and-reports`
8. `07-quality`

Do not start feature pages before the design system and data foundation are stable.

## Prompt Design Rules

Each prompt must:

- Require reading `CLAUDE.md` first.
- Reference only the documents needed for the task.
- Define a narrow implementation scope.
- State explicit non-goals.
- Require inspection of existing code.
- Require TypeScript and production build validation.
- Define concrete acceptance criteria.

## Token Efficiency

- Do not paste the full project context into execution conversations.
- Use document references.
- Do not ask Claude Code to read the entire repository unless the prompt is a repository audit or final quality review.
- Do not request verbose explanations of every generated file.
- Request a concise summary of changes, validation results, and unresolved items.

## Change Control

Claude Code must not:

- Rewrite unrelated features.
- Replace the established design system.
- Add deployment configuration.
- Add backend services.
- Add unapproved navigation items.
- Invent business workflows.
