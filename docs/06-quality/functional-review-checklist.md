# Functional Review Checklist

## Purpose

Use this checklist to verify workflow correctness, role behavior, state integrity, and cross-page consistency before the prototype is considered functionally complete.

## Review Method

For every scenario and page, record:

- Pass.
- Pass with observation.
- Fail.
- Not applicable.

Any failure affecting workflow routing, permissions, data integrity, or deposit activation is critical.

## Application Foundation

- [ ] The application starts without blocking errors.
- [ ] Primary routes resolve correctly.
- [ ] Unknown routes show a controlled not-found experience.
- [ ] Seed data loads consistently.
- [ ] Reset prototype data restores the original dataset.
- [ ] Local prototype state persists according to the documented behavior.
- [ ] There are no backend, API, authentication, deployment, Docker, or GitHub Actions dependencies.

## Demo User and Role Switching

For each configured demo user:

- [ ] The correct role is shown.
- [ ] The correct navigation items are visible.
- [ ] The dashboard reflects the role.
- [ ] The task list reflects ownership and permissions.
- [ ] The user can access only permitted request and deposit actions.
- [ ] Editable sections match the permission matrix.
- [ ] Restricted actions are hidden or disabled with an explanation.
- [ ] Switching users updates application behavior immediately.

## Dashboard Data Integrity

- [ ] Request counts reconcile with request records.
- [ ] Task counts reconcile with active tasks.
- [ ] Portfolio totals reconcile with deposits.
- [ ] Upcoming maturities reconcile with deposit maturity dates.
- [ ] Approval workload reflects pending approval tasks.
- [ ] Recent activity reflects activity-log records.
- [ ] Charts use the same source data as lists and details.

## My Tasks

- [ ] Tasks are assigned to valid users or role groups.
- [ ] Open task count matches dashboard indicators.
- [ ] Filters return correct task subsets.
- [ ] Opening a task navigates to the correct transaction and section.
- [ ] Completing an action closes or updates the active task.
- [ ] The next workflow task is created correctly.
- [ ] Returned work creates the correct follow-up task.
- [ ] Completed tasks remain available in history when required.

## Investment Request Creation

- [ ] A permitted specialist can create a request.
- [ ] A unique prototype request number is generated.
- [ ] New requests start in Draft.
- [ ] The creator becomes the initial owner.
- [ ] Draft data can be saved and restored.
- [ ] Section-completion indicators do not change the workflow status.
- [ ] The creator may delete a request before first submission.
- [ ] Other roles cannot access unsubmitted drafts unless explicitly permitted.

## Submission Validation

Submission is blocked when any mandatory readiness requirement is missing:

- [ ] Request information.
- [ ] Amount greater than zero.
- [ ] Currency.
- [ ] Tenor.
- [ ] Liquidity information.
- [ ] Required liquidity evidence.
- [ ] Minimum contacted banks or documented exception.
- [ ] At least one valid offer.
- [ ] Completed evaluation.
- [ ] Recommended offer.
- [ ] Recommendation rationale.
- [ ] Mandatory attachments.
- [ ] Specialist completeness confirmation.

When requirements pass:

- [ ] Submission succeeds.
- [ ] First-submission timestamp is recorded.
- [ ] Deletion becomes unavailable.
- [ ] Status and owner update correctly.
- [ ] The appropriate approval task is created.
- [ ] An activity-log event is created.

## Approval Threshold Routing

- [ ] A request of SAR 100,000,000 or less routes to General Manager of Treasury approval.
- [ ] A request above SAR 100,000,000 routes first to General Manager of Treasury.
- [ ] After General Manager approval, above-threshold requests route to the Executive Director.
- [ ] The threshold is read from centralized configuration.
- [ ] Changing the configured threshold changes routing without editing UI components.
- [ ] The submitted amount is the amount used for routing.

## Approval Actions

For each approval step:

- [ ] Only the assigned approver can act.
- [ ] Approve updates the approval record.
- [ ] Approve closes the current task.
- [ ] Approve creates the correct next task or stage.
- [ ] Return requires a reason.
- [ ] Return routes to the documented prior owner or role group.
- [ ] Reject requires a reason.
- [ ] Reject ends the workflow appropriately.
- [ ] The actor, role, timestamp, decision, and comment are recorded.
- [ ] Duplicate action is prevented after completion.

## Return Paths

- [ ] General Manager return routes to the deposit specialist.
- [ ] Executive Director return routes through General Manager of Treasury as documented.
- [ ] Investment Support return routes to the deposit-specialist group.
- [ ] Finance return routes to Investment Support.
- [ ] Accounting return routes to Finance.
- [ ] Return reason is visible in the workspace.
- [ ] Current owner and task reflect the return destination.
- [ ] Resubmission resumes at the correct stage.

## Bank RFQ

- [ ] The user can select multiple active banks.
- [ ] Bank contacts are displayed where available.
- [ ] Contact date and response deadline are captured.
- [ ] RFQ communication may be simulated.
- [ ] Sent status and response status update correctly.
- [ ] Exceptions to minimum-bank requirements can be documented.
- [ ] RFQ records remain linked to the request.

## Bank Offers

- [ ] Offers link to a valid request and bank.
- [ ] Multiple offers for one bank are supported.
- [ ] Rate, amount, tenor, validity, conditions, and attachment are captured.
- [ ] Expected return is calculated consistently.
- [ ] Incomplete offers are not treated as valid.
- [ ] Expired offers are identified.
- [ ] Invalid or expired offers cannot be recommended.
- [ ] Offer comparison uses current offer data.

## Evaluation and Recommendation

- [ ] Evaluation criteria are loaded from centralized data.
- [ ] Scores or qualitative assessments can be recorded.
- [ ] Bank concentration information is available.
- [ ] Recommendation can differ from the highest rate.
- [ ] Exactly one offer is marked recommended at submission.
- [ ] Recommendation rationale is mandatory.
- [ ] Changing the recommended offer updates summary information.
- [ ] Recommendation history remains traceable through activity records.

## Winning Bank and Post-Approval Completion

- [ ] Winning bank derives from the approved recommended offer.
- [ ] Required winning-bank information can be completed by permitted users.
- [ ] Required instructions and attachments are validated.
- [ ] Completion creates the Investment Support review task.
- [ ] The request cannot skip directly to Finance or Accounting.

## Investment Support Review

- [ ] Only permitted Investment Support users can complete the review.
- [ ] Review notes and outcome are recorded.
- [ ] Approval routes to Finance.
- [ ] Return routes to the deposit-specialist group.
- [ ] The activity log and tasks update consistently.

## Finance Review

- [ ] Finance sees only relevant financial and execution information.
- [ ] Finance cannot change treasury recommendation data.
- [ ] Review notes and outcome are recorded.
- [ ] Approval routes to Accounting execution.
- [ ] Return routes to Investment Support.
- [ ] Tasks and ownership update correctly.

## Accounting Execution

- [ ] Only permitted Accounting users can record execution.
- [ ] Transfer date is captured.
- [ ] Transfer reference is captured.
- [ ] Accounting reference is captured where required.
- [ ] Executed amount is validated against the approved amount.
- [ ] Execution evidence can be attached.
- [ ] Return routes to Finance with mandatory reason.
- [ ] Successful execution routes to deposit activation.

## Deposit Activation

- [ ] Activation is available only after completed execution.
- [ ] Mandatory deposit terms are present.
- [ ] Exactly one deposit is created.
- [ ] The deposit links to the source request and winning offer.
- [ ] The request status changes to Activated Deposit or equivalent completed state.
- [ ] The deposit appears in portfolio views.
- [ ] Dashboard and reports update.
- [ ] Duplicate activation is prevented.

## Deposit Portfolio

- [ ] Active deposits are visible.
- [ ] Near-maturity logic uses the configured day threshold.
- [ ] Matured/action-required deposits are identified correctly.
- [ ] Closed deposits remain in history.
- [ ] Broken deposits show break information.
- [ ] Deposit totals reconcile across list, detail, dashboard, and reports.
- [ ] Deposit detail links to the source request.

## Maturity and Reinvestment

- [ ] A maturity decision can be recorded.
- [ ] Close at maturity updates deposit status.
- [ ] Reinvest creates a new Draft request.
- [ ] The new request links to the source deposit.
- [ ] Reinvestment does not overwrite the original request.
- [ ] Activity records are created on both related transactions where appropriate.
- [ ] The original deposit retains its historical data.

## Early Break

- [ ] Only permitted roles can initiate early break.
- [ ] Break date is required.
- [ ] Break reason is required.
- [ ] Financial impact or penalty is represented.
- [ ] Confirmation is required.
- [ ] Deposit status changes to Broken.
- [ ] Portfolio totals and reports update consistently.
- [ ] Activity history records the action.

## Attachments, Comments, and Activity

- [ ] Attachments link to valid entities.
- [ ] Required attachment types are enforced where documented.
- [ ] Mock attachment open/download behavior is clear.
- [ ] Comments record author and timestamp.
- [ ] Activity records are append-only in prototype behavior.
- [ ] Workflow events, approvals, returns, edits, and activation generate activity.
- [ ] Sensitive sections are visible only to permitted roles.

## Reports and Analytics

- [ ] Bank concentration totals reconcile with deposits.
- [ ] Maturity-bucket totals reconcile with maturity dates.
- [ ] Expected return totals reconcile with deposit terms.
- [ ] Pipeline totals reconcile with request statuses.
- [ ] Approval-cycle metrics use approval timestamps.
- [ ] Filters update all related report elements.
- [ ] Simulated exports use the currently filtered context.

## Settings and Configuration

- [ ] Approval threshold is editable only by Admin.
- [ ] Near-maturity threshold is editable only by Admin.
- [ ] Evaluation criteria and lookup data are centrally managed.
- [ ] Changes affect prototype behavior where intended.
- [ ] Reset settings restores default configuration.
- [ ] Non-admin users cannot modify administrative settings.

## Cross-Entity Integrity

- [ ] Every referenced user exists.
- [ ] Every referenced bank exists.
- [ ] Every offer references a valid request and bank.
- [ ] Every recommendation references a valid offer.
- [ ] Every approval references a valid request and actor.
- [ ] Every task references a valid transaction and assignee or role group.
- [ ] Every deposit references a valid source request.
- [ ] Every reinvestment request references a valid source deposit.
- [ ] Current status, current owner, and active task do not conflict.

## Final Functional Decision

Functional review passes only when:

1. All critical workflow paths pass.
2. All ten documented demo scenarios can be executed.
3. No permission breach is found.
4. No cross-page data contradiction is found.
5. Resetting the prototype restores a valid and demonstrable state.
