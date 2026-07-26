# Settings

## Purpose

Provide controlled prototype configuration and demonstration utilities without introducing real administration or authentication.

## Configuration Areas

### Business Rules

- Approval threshold.
- Minimum contacted banks.
- Maturity warning periods.
- Task SLA values.
- Allowed currencies.
- Standard tenors.

### Reference Data

- Banks.
- Bank contacts.
- Deposit specialists.
- Role assignments.
- Status labels.
- Attachment categories.

### Prototype Users

- View mock users.
- Switch the active mock user.
- Show each user's role and business unit.
- Explain that user switching is a prototype-only capability.

### Demo Management

- Reset the prototype state.
- Load a curated demonstration scenario.
- Restore deterministic seed data.

## Permissions

- System Administrator can access all settings.
- Other roles may access only the user switcher when enabled for demonstrations.
- Business configuration is read-only for normal prototype users.

## Rules

- Configuration must be centralized and consumed by business logic.
- Do not hardcode approval thresholds or SLA values in page components.
- Reset actions require confirmation.
- Resetting the demo restores the documented baseline data.
- No real user provisioning, identity integration, or security administration is included.

## UX Requirements

Use a clear settings navigation with concise descriptions. Avoid exposing low-level technical options that have no stakeholder value.
