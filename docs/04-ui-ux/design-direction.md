# Design Direction

## Objective

Define the mandatory visual and interaction direction for the Environment Fund Deposit Management Prototype before any page implementation begins.

The prototype must look like a deliberately designed financial operations product, not a generic admin template and not a collection of AI-generated cards.

## Product Personality

The intended personality is:

- Modern.
- Premium but restrained.
- Professional.
- Financially credible.
- Calm and confident.
- Arabic-first.
- Enterprise-grade.
- Suitable for executive presentation.

## Experience Inspiration

The experience may take structural inspiration from modern enterprise financial and case-management products, especially in:

- Transaction workspaces.
- Dense but readable data tables.
- Contextual approval actions.
- Workflow timelines.
- Audit trails.
- Role-based dashboards.

Do not copy another product’s visual identity.

## Core Visual Principles

### 1. Hierarchy Before Decoration

Every screen must clearly answer:

- Where am I?
- What is the current state?
- What needs my attention?
- What is the primary action?
- What information is most important?

### 2. Controlled Information Density

The system contains substantial financial and workflow information. Use:

- Clear section grouping.
- Progressive disclosure.
- Contextual drawers.
- Sticky summaries where useful.
- Compact but readable tables.

Do not solve density by turning every field into a separate card.

### 3. Restrained Brand Use

Use the Environment Fund identity as a system, not as decoration.

Apply brand identity through:

- Central design tokens.
- Typography hierarchy.
- Primary actions.
- Navigation accents.
- Selected states.
- Subtle patterns in limited high-value areas.

Do not cover screens with logos, patterns, or multiple saturated brand colors.

### 4. Financial Credibility

Amounts, rates, tenors, maturity dates, rankings, and approval states must be immediately scannable.

Use:

- Tabular number alignment.
- Strong amount hierarchy.
- Clear percentage formatting.
- Consistent positive, warning, and risk semantics.
- Appropriate Arabic labels with readable Latin identifiers.

### 5. Consistency

Pages must share:

- Header anatomy.
- Action placement.
- Filter behavior.
- Table behavior.
- Status treatment.
- Drawer and dialog patterns.
- Feedback patterns.
- Spacing rhythm.

## Layout Direction

### Application Shell

The shell should include:

- RTL side navigation.
- Compact top application header.
- User and role context.
- Notifications or task indicator.
- Main content area with controlled maximum widths where appropriate.

The shell should feel spacious, but it must not waste space on decorative chrome.

### Page Header

A standard page header may contain:

- Breadcrumb or context label.
- Main title.
- Short descriptive sentence when needed.
- Relevant status.
- Primary action.
- Secondary actions in a controlled menu.

### Content Surfaces

Use a small number of surface levels:

- Application background.
- Main content surface.
- Elevated contextual surface such as a drawer or sticky summary.

Avoid nested cards inside cards.

## Signature Page Patterns

### Dashboard

The dashboard should combine:

- A concise role-aware summary.
- Key financial indicators.
- Requests requiring attention.
- Deposits approaching maturity.
- Portfolio distribution or return movement.
- Recent operational activity.

Do not use a uniform grid of KPI cards as the complete dashboard.

### My Tasks

This is an operational work queue, not a passive inbox.

It should emphasize:

- Priority.
- Waiting time.
- Required action.
- Current stage.
- Amount.
- Due or urgency signals.
- Quick preview.

### Investment Request Workspace

This is the most important page pattern.

It must behave as a case and transaction workspace, not one long form and not a forced linear wizard.

Recommended anatomy:

1. Request header with title, identifier, amount, state, owner, and actions.
2. Workflow or lifecycle strip.
3. Internal section navigation.
4. Main section workspace.
5. Contextual summary or readiness panel.
6. Activity and approval context.
7. Sticky action area when the current stage requires a decision.

During preparation, the request remains `مسودة` while section completion indicators communicate progress.

### Deposit Portfolio

The portfolio should emphasize:

- Total active value.
- Weighted return indicators where applicable.
- Bank concentration.
- Maturity distribution.
- Deposit status.
- Upcoming actions.

It must support drill-down from portfolio overview to a detailed deposit record.

## Components Required Before Feature Pages

The design system foundation should include:

- Typography scale.
- Color and semantic tokens.
- Spacing and radius tokens.
- Buttons.
- Inputs and selection controls.
- Search and filter controls.
- Status badges.
- Tables and data grids.
- Tabs and section navigation.
- Dialogs and drawers.
- Tooltips.
- Toasts and inline feedback.
- Page headers.
- KPI presentation patterns.
- Empty states.
- Skeleton loading states.
- Error states.
- Attachment items.
- Activity feed.
- Approval history.
- Workflow stepper.
- Readiness checklist.

## Motion

Motion must be subtle and functional.

Use motion for:

- Drawer and dialog transitions.
- Loading feedback.
- Successful state updates.
- Expanding detail sections.
- Workflow state changes.

Avoid decorative looping animation and excessive entrance effects.

## RTL Requirements

RTL must be structural, not cosmetic.

Validate:

- Sidebar direction.
- Breadcrumb order.
- Table alignment.
- Icon placement.
- Form label and validation placement.
- Drawer direction.
- Timeline direction.
- Mixed Arabic, English, numeric, and identifier content.
- Saudi Riyal amount formatting.

## Responsive Priority

Primary target:

- Desktop stakeholder demonstration.

Secondary target:

- Tablet landscape and portrait where practical.

Mobile phone optimization is not required for the initial prototype unless explicitly added later.

## Anti-Patterns

Do not:

- Use excessive gradients.
- Use neon or overly saturated colors.
- Use glassmorphism as the dominant visual style.
- Use large decorative illustrations on operational pages.
- Use a different card style for each module.
- Use colored backgrounds behind every status.
- Create oversized navigation.
- Hide critical actions in unclear menus.
- Display charts without labels or business meaning.
- Use placeholder text.
- Use fake metrics that conflict with the mock-data model.

## Visual Acceptance Standard

A page is visually acceptable only when:

- The primary task is obvious within seconds.
- The page uses the shared design system.
- Arabic RTL behavior is correct.
- Information density is balanced.
- Financial values are easy to compare.
- Status and next action are unambiguous.
- Empty, loading, validation, and feedback states are considered.
- The page feels consistent with the rest of the product.
- The result is suitable for presentation to Environment Fund executives and treasury stakeholders.
