# AI Governance

This folder defines the mandatory operating rules for Claude Code, Codex, and any other AI agent contributing to this repository.

The purpose is to ensure that implementation remains faithful to the documented business process, Environment Fund brand identity, UX specifications, and frontend architecture.

## Mandatory reading order

1. `CLAUDE.md`
2. `docs/09-ai-governance/01-ai-design-principles.md`
3. `docs/09-ai-governance/02-ai-coding-standards.md`
4. `docs/09-ai-governance/03-ai-review-checklist.md`
5. `docs/09-ai-governance/04-ai-definition-of-done.md`
6. Relevant business, brand, and page specification documents

## Authority hierarchy

When sources conflict, use this order:

1. Explicit user instruction
2. Approved business and workflow documentation
3. Brand source of truth
4. Page design specifications
5. AI governance rules
6. Existing implementation patterns

An AI agent must not silently resolve a material conflict. It must report the conflict and choose the safest reversible option.
