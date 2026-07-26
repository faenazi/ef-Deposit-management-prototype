# Settings and Administration Design Specification

## 1. Purpose

Settings and Administration must provide controlled configuration for the prototype without becoming a collection of unrelated technical forms. The experience should be simple, safe, auditable, and clearly separated from day-to-day treasury work.

## 2. Access model

Only authorized roles may access administration areas.

The interface must distinguish between:

- Personal preferences.
- Business configuration.
- User and role administration.
- Reference data.
- Notification settings.
- Audit information.

Do not show unavailable administrative options as disabled clutter to ordinary users.

## 3. Page structure

Use a clear settings index with grouped categories rather than one long page.

Recommended categories:

1. My preferences.
2. Users and roles.
3. Workflow configuration.
4. Banks and reference data.
5. Notifications.
6. System display settings.
7. Audit and activity.

A two-column layout is preferred on desktop:

- Settings navigation on the right in RTL.
- Focused configuration content on the left.

## 4. My preferences

Include only relevant personal options such as:

- Preferred language when bilingual support exists.
- Number and date display preferences where allowed.
- Notification preferences.
- Default portfolio view.

Do not duplicate browser or operating-system settings unnecessarily.

## 5. Users and roles

The users page should support:

- Search by name or email.
- Filter by role and status.
- View assigned roles.
- View active or inactive state.
- View last access when available.
- Assign or remove roles in the prototype.

### User list columns

- User.
- Email.
- Department or organizational unit.
- Assigned roles.
- Status.
- Last access.
- Actions.

### Role assignment behavior

Use a focused drawer or dialog showing:

- User identity.
- Current roles.
- Available roles.
- Role descriptions.
- Effective permissions summary.

Changing roles must require confirmation and produce an audit entry.

## 6. Role catalogue

Document and display the supported roles:

- Specialist.
- GM Treasury.
- Executive Director of Investment and Treasury Sector.
- Investment Support.
- Finance.
- Accounting.
- Admin.
- Read-only User.

Each role card or row should explain:

- Purpose.
- Main responsibilities.
- Accessible modules.
- Available actions.

Avoid vague labels such as “Power User”.

## 7. Workflow configuration

For the prototype, workflow configuration should be viewable and only minimally editable.

Show the two primary paths:

### Requests up to and including SAR 100 million

Specialist → GM Treasury → Execution.

### Requests above SAR 100 million

Specialist → GM Treasury → Executive Director of Investment and Treasury Sector → Investment Support → Finance → Accounting → Activation.

The screen should use a clean workflow map with role labels and threshold context.

Do not build a complex drag-and-drop workflow designer unless it is an explicit requirement.

## 8. Banks and reference data

Support management of controlled values such as:

- Bank name.
- Short name.
- Active status.
- Contact details when applicable.
- Supported currencies.
- Notes.

Other reference data may include:

- Tenor options.
- Attachment categories.
- Return or rejection reasons.
- Exception categories.

Reference data must use consistent tables and focused edit drawers.

## 9. Notifications

Allow administrators to review notification rules for events such as:

- Request submitted.
- Approval task assigned.
- Request returned.
- Request approved.
- Execution required.
- Deposit activated.
- Maturity approaching.
- Missing maturity instruction.
- Exception recorded.

Each notification rule should show:

- Trigger.
- Recipients by role.
- Channel.
- Enabled state.
- Timing or lead period.

Avoid exposing raw template syntax in the main settings view.

## 10. System display settings

Only include product-level settings that are truly configurable, for example:

- Default maturity warning periods.
- Default page size.
- Default reporting period.
- Financial decimal precision where business-approved.

Brand colors, logo treatment, typography, and core visual identity must not be editable from the application.

## 11. Audit and activity

Provide a searchable administrative audit view for meaningful changes such as:

- Role assignment changes.
- User activation or deactivation.
- Workflow configuration changes.
- Reference data changes.
- Notification rule changes.

Audit entries include:

- Date and time.
- Actor.
- Action.
- Affected entity.
- Previous and new values when relevant.

## 12. Forms and safety

Administrative forms must:

- Use clear labels and help text.
- Separate required and optional fields.
- Validate before saving.
- Warn about business impact.
- Require confirmation for destructive changes.
- Preserve entered data when recoverable errors occur.

Do not use generic browser confirmation prompts.

## 13. Destructive actions

Actions such as deactivation or deletion must:

- Explain the consequence.
- Show the affected record.
- Request a reason where appropriate.
- Prefer deactivation over permanent deletion for controlled business data.
- Never use the primary brand blue for destructive actions.

## 14. Empty and restricted states

Define states for:

- No users matching search.
- No reference data.
- No audit events.
- Insufficient permission.
- Configuration unavailable in prototype mode.

Restricted states must explain why access is unavailable without exposing sensitive permission details.

## 15. Responsive behavior

### Tablet

- Collapse settings navigation into a selectable category list.
- Keep forms single-column when needed.
- Move supporting explanations above fields.

### Mobile

Mobile administration should focus on review and limited safe updates.

- Use stacked forms.
- Move tables into structured cards.
- Avoid complex role or workflow editing.
- Preserve confirmation and audit behavior.

## 16. Visual quality requirements

Settings are accepted only when:

- Categories are organized and easy to scan.
- Administrative screens feel part of the same premium product.
- Forms are calm and not visually dense.
- High-impact changes are clearly differentiated.
- Brand configuration is protected from arbitrary editing.
- The experience does not resemble a raw database administration console.