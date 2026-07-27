# Transaction Workspace Design Specification

## 1. Purpose

The Transaction Workspace is the operational heart of the platform. It must allow a user to understand the request, complete the current stage, review all supporting evidence, and identify the next action without navigating across disconnected pages.

The workspace must feel like a premium financial case file, not a long generic form.

## 2. Core experience principles

- Keep the request context visible at all times.
- Make the current workflow stage unmistakable.
- Separate editable work from historical and approved information.
- Reduce cognitive load through progressive disclosure.
- Present financial numbers with strong hierarchy and consistent formatting.
- Keep the primary action visible without making the screen feel aggressive.
- Never hide blocking issues, missing information, or overdue tasks.

## 3. Desktop page anatomy

Use a three-part structure:

1. Sticky context header.
2. Main content workspace.
3. Supporting side panel.

Recommended desktop proportions:

- Main content: approximately 70%.
- Supporting panel: approximately 30%.
- Maximum readable content width must be controlled on large screens.

Do not stretch forms across the full viewport.

## 4. Sticky context header

The header must remain visible while the user scrolls.

It includes:

- Request number.
- Request title.
- Current status badge.
- Current workflow stage.
- Requested investment amount.
- Proposed tenor.
- Last saved timestamp.
- Owner or assigned specialist.
- Primary action.
- Secondary actions menu.

### Primary action behavior

The label changes according to role and stage, for example:

- Save draft.
- Submit request.
- Approve.
- Return for revision.
- Confirm execution.
- Activate deposit.

Only one primary action should dominate visually.

Destructive or irreversible actions must never appear as equal visual peers to the primary action.

## 5. Workflow progress rail

Display the approval path below the context header or at the top of the main workspace.

Stages (aligned with `docs/02-business/statuses-and-transitions.md`):

- Draft preparation.
- Treasury GM review.
- Executive approval when the amount exceeds SAR 100,000,000.
- Winning bank completion.
- Investment Support review.
- Finance review.
- Accounting execution.
- Deposit activation.

Each stage shows:

- Stage name.
- State: upcoming, current, completed, returned, skipped, or rejected.
- Responsible role.
- Completion date when available.
- Short outcome.

The progress rail must not look like a playful consumer stepper. It should be restrained, compact, and institutional.

Color must not be the only state indicator. Use icons, labels, and line treatment.

## 6. Workspace section navigation

Use a sticky in-page navigation or clearly grouped tabs for the canonical sections (Decision DEC-016):

1. Overview.
2. Request information.
3. Liquidity information and attachments.
4. Bank RFQ and communications.
5. Received bank offers.
6. Evaluation and recommendation.
7. Approval history.
8. Winning-bank and IBAN information.
9. Investment Support review.
10. Finance review.
11. Accounting execution and transfer evidence.
12. Deposit activation.
13. Attachments.
14. Notes.
15. Activity history.

Custodian data and maturity/reinvestment management are out of scope for this workspace. Maturity and reinvestment belong to the active deposit lifecycle in the Deposit Portfolio.

The navigation must indicate:

- Current section.
- Completed sections.
- Sections with missing required data.
- Sections unavailable at the current stage.

Avoid horizontal tabs that overflow or become unreadable in Arabic. A vertical local navigation is preferred on wide screens.

## 7. Overview section

Provide a concise case summary for any authorized role:

- Key request figures: amount, tenor, currency, recommended bank when available.
- Current status, stage, and responsible owner.
- Readiness or completion summary with missing-requirement highlights during preparation.
- Next required action.
- Recent significant activity.

The overview must orient the reader in seconds without duplicating full section content.

## 8. Request information section

Include:

- Request title.
- Request date.
- Treasury owner.
- Currency.
- Requested amount.
- Preferred tenor or tenor range.
- Target placement date.
- Business rationale.
- Internal reference.

### Draft mode

The specialist may complete this information gradually.

Show:

- Save status.
- Required field markers.
- Completion percentage only when it is genuinely useful.
- Clear distinction between saved and unsaved changes.

Do not prevent saving a draft because required submission fields are incomplete.

## 9. Liquidity information and attachments section

Purpose: provide the financial context supporting the placement decision.

Include:

- Available liquidity amount.
- Required operating reserve.
- Amount available for investment.
- Forecast period.
- Source date.
- Prepared by.
- Summary notes.
- Uploaded Excel or PDF evidence.

### Visual treatment

Use one restrained financial summary block with strong numeric hierarchy, followed by evidence and notes.

Do not create a card for every figure.

### Attachment handling

Allow:

- Drag and drop.
- File picker.
- File type and size display.
- Upload progress.
- Preview where supported.
- Replace and remove in draft mode.
- Download and view in read-only mode.

## 10. Bank RFQ and communications section

Track each contacted bank as an independent RFQ record (see `docs/03-functional/bank-rfq.md`):

- Bank.
- RFQ status: Not Sent, Sent, Received, Declined, or No Response.
- Send date, response deadline, channel, and contact.
- Related correspondence attachments.

Declined and No Response banks remain visible in the request history. Show progress against the minimum-contacted-banks rule (prototype default: 3) with a documented-exception affordance.

## 11. Received bank offers section

This section must make comparison easy and visually precise.

Use a comparison table with columns such as:

- Bank.
- Offer received date and time.
- Amount.
- Tenor.
- Rate.
- Expected return.
- Maturity date.
- Validity deadline.
- Conditions.
- Offer attachment.
- Recommendation state.

### Comparison behavior

- Allow sorting by rate, expected return, tenor, and validity deadline.
- Highlight the recommended offer with a subtle structural treatment, not a bright decorative color.
- Mark the highest rate only when comparison conditions are equivalent.
- Display expired or incomplete offers clearly.
- Do not imply that the highest rate is automatically the best offer.

### Offer entry

Offer entry may use:

- Inline editable rows for quick entry.
- A side drawer for full details.

The drawer is preferred when conditions or attachments require more context.

## 12. Evaluation and recommendation section

This section must clearly separate factual comparison from professional judgment.

Include:

- Recommended bank.
- Recommended amount.
- Recommended tenor.
- Recommended rate.
- Expected return.
- Recommendation rationale.
- Key risks.
- Exceptions or deviations.
- Supporting comparison summary.

The recommendation summary should appear in a composed executive panel with clear numbers and concise narrative.

Avoid oversized celebratory cards or green success panels.

## 13. Approval history section

Display a chronological approval record.

Each approval item includes:

- Role.
- Approver name.
- Decision.
- Date and time.
- Comment.
- Returned fields or conditions when applicable.

### Approval action panel

For the active approver, show a focused action panel containing:

- Concise request summary.
- Key financial figures.
- Identified exceptions.
- Decision options.
- Mandatory comment when returning or rejecting.

Do not force the approver to scroll through the entire request before seeing the decision panel, but provide direct links to supporting sections.

## 14. Winning-bank and IBAN section

Completed by a Deposit Specialist after final investment approval. Include:

- Selected winning bank matching the approved recommendation.
- Final amount.
- Final negotiated rate.
- Value date (`تاريخ بدء الوديعة`).
- Maturity date.
- Beneficiary name and bank account or IBAN.
- Mandatory IBAN or bank account evidence attachment.
- Notes.

The section must visibly distinguish proposed terms from final agreed terms. A documented controlled change is required when the winning offer differs from the approved recommendation.

## 15. Investment Support review section

Include:

- Review checklist state.
- Reviewer, decision, date, and comments.
- Return action to the Deposit Specialists group with mandatory reason.
- Review evidence attachments.

## 16. Finance review section

Show Finance only the information required for financial approval:

- Approved amount.
- Beneficiary and bank account information.
- Winning offer summary.
- Investment Support outcome.
- Finance checklist, decision, comments, and evidence.
- Return action to Investment Support with mandatory reason.

## 17. Accounting execution and transfer evidence section

Include:

- Execution status.
- Journal or transaction reference.
- Payment or transfer reference.
- Posting date.
- Accountant.
- Mandatory transfer evidence attachment.
- Return action to Finance with mandatory reason.
- Notes.

Use read-only presentation for completed accounting information unless the Accounting role is active in the stage. Any variance between transfer amount and approved amount must be visible as a structured exception, not buried in notes.

## 18. Deposit activation section

Completed by a Deposit Specialist after accounting execution is confirmed. Include:

- Bank deposit reference and certificate or confirmation evidence.
- Actual amount, rate, value date, and maturity date.
- Differences between approved and actual terms, highlighted.
- Activation confirmation action converting the request into an active deposit.

Maturity and reinvestment management happen in the Deposit Portfolio after activation, not in this workspace.

## 19. Attachments and notes sections

- Attachments: a consolidated, categorized register of all files across sections with uploader, date, and section context.
- Notes: contextual notes with author, role, and timestamp; notes never replace mandatory return reasons.

## 20. Supporting side panel

The supporting panel may contain:

- Current task.
- Next required action.
- Blocking issues.
- Request participants.
- Key dates.
- Recent activity.
- Quick attachments.

The panel must stay concise. It is not a duplicate of the main content.

## 21. Activity and audit trail

Use a chronological timeline showing:

- Creation.
- Saves that matter to the workflow.
- Submission.
- Approvals.
- Returns.
- Data changes after submission.
- Execution.
- Accounting.
- Activation.

Do not flood the user with every keystroke or autosave event.

## 22. Read-only and edit states

The same workspace must support:

- Draft editing.
- Submitted read-only review.
- Role-specific partial editing.
- Approval mode.
- Completed historical view.

Editable fields must be visually clear without making read-only content appear disabled or low contrast.

## 23. Validation and blocking issues

Validation must occur at two levels:

- Section-level guidance during draft preparation.
- Submission-level blocking validation.

Show a submission readiness summary listing:

- Missing required information.
- Missing attachments.
- Invalid values.
- Expired offers.
- Unresolved exceptions.

Provide direct navigation to each issue.

## 24. Responsive behavior

### Tablet

- Collapse supporting panel into a drawer or stacked summary.
- Keep context header compact.
- Convert local navigation to a dropdown or horizontal scroll only when usability remains clear.

### Mobile

Mobile is primarily for review, approval, and focused updates.

- Stack financial summaries.
- Convert wide offer tables into comparison cards or a dedicated comparison view.
- Keep the active decision action accessible.
- Avoid exposing a full long-form desktop editing experience without adaptation.

## 25. Loading, empty, and error states

Every section must define:

- Skeleton loading.
- No-data state.
- Partial-data state.
- Upload failure.
- Save failure.
- Permission restriction.
- Version conflict or stale data warning.

## 26. Visual quality requirements

The workspace is accepted only when:

- The user can identify the request, stage, amount, owner, and next action within seconds.
- Financial information is visually prioritized without excessive cards.
- The interface remains calm despite the amount of information.
- Long forms are divided into meaningful sections.
- The page does not resemble a generic CRM record screen.
- Arabic RTL alignment is natural throughout.
- The workflow and financial decision remain the visual focus.