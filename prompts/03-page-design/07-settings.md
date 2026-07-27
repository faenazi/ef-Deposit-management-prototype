# Prompt 07 — Settings

## Objective
Implement the Arabic RTL Settings page for prototype administration while protecting business rules and brand consistency.

## Read First
- `CLAUDE.md`
- `docs/07-brand-experience/`
- `docs/08-design-specifications/00-shared-layout-and-components.md`
- `docs/08-design-specifications/07-settings.md`
- `docs/09-ai-governance/`
- `docs/03-functional/settings.md`
- `docs/05-data/demo-users.md` and `docs/05-data/demo-scenarios.md` (scenario controls and reset behavior)
- `docs/02-business/roles-and-permissions.md`

## Scope
Implement only the documented settings route and its local prototype controls.

## Requirements
- Arabic-first, true RTL.
- Organize settings into clear categories rather than one long form.
- Support documented prototype administration such as mock users and roles, banks/reference data, workflow display settings, notification preferences, and system information only where specified.
- Use searchable lists or tables for entities such as users and banks.
- Make destructive or consequential actions explicit and confirmed.
- Protect fixed business rules, approval thresholds, official statuses, and brand tokens from casual editing.
- Clearly distinguish editable prototype preferences from read-only system rules.
- Respect Administrator and read-only permissions.
- Include field validation, unsaved-change handling, save confirmation, cancel behavior, loading, empty, error, restricted, and read-only states.
- Support desktop, tablet, and mobile layouts.

## Visual Direction
Settings should feel structured, calm, and institutional. Use category navigation, focused forms, disciplined spacing, and concise help text. Avoid a crowded control panel, excessive toggles, or exposing technical configuration irrelevant to the prototype.

## Interaction Requirements
- Local settings changes update prototype state when appropriate.
- Role/user management controls reflect the documented mock-role model.
- Confirmation dialogs appear for risky actions.
- Keyboard navigation, labels, errors, and focus states are accessible.

## Boundaries
Do not implement real authentication, Entra ID, email, API keys, deployment settings, backend persistence, or undocumented administration capabilities.

## Validation
Run `npm run typecheck`, `npm run lint`, and `npm run build` from `/src`; fix all introduced issues.

## Completion Report
Report changed files, settings categories and permissions, implemented states/interactions, validation results, and any documented ambiguity.