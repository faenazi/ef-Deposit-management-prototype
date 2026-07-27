# Final Readiness Checklist

## Purpose

Use this checklist as the final gate before presenting the Investment Deposit Management Platform prototype to stakeholders.

## Repository

- [ ] README explains the prototype and run instructions.
- [ ] CLAUDE.md reflects the current implementation rules.
- [ ] Documentation index is accurate.
- [ ] Product, business, functional, UI/UX, data, and quality documents are complete.
- [ ] Prompt files reference the correct source documents.
- [ ] No obsolete specification creates conflicting instructions.
- [ ] Repository structure matches the agreed documentation-first approach.
- [ ] No backend, deployment, Docker, or GitHub Actions implementation is included.

## Build and Runtime

- [ ] Dependencies install successfully.
- [ ] Development server starts successfully.
- [ ] Production build succeeds.
- [ ] TypeScript checks pass.
- [ ] Main routes and deep links load correctly.
- [ ] No blocking browser-console error appears during the demo.
- [ ] No missing visual asset appears.
- [ ] Resetting the prototype restores the original seed state.

## Visual Quality

- [ ] Environment Fund identity is applied consistently.
- [ ] Arabic RTL behavior is correct.
- [ ] Typography, spacing, icons, borders, radii, and shadows are consistent.
- [ ] The application does not resemble a generic admin template.
- [ ] Dashboard, lists, workspaces, details, and reports look like one product.
- [ ] Status styling is consistent and accessible.
- [ ] No unfinished placeholder content remains.

## Required Screen Sizes

Review the prototype on:

- [ ] Large desktop display.
- [ ] Standard desktop.
- [ ] Laptop.
- [ ] Landscape tablet.
- [ ] Mobile width 390px.

For each size:

- [ ] Navigation remains usable.
- [ ] No important content overlaps or clips.
- [ ] Tables and charts remain legible.
- [ ] Sticky elements behave correctly.
- [ ] Primary actions remain accessible.
- [ ] Dialogs and drawers fit the viewport.

## Seed Data

- [ ] At least 30 investment requests exist.
- [ ] At least 25 deposits exist.
- [ ] At least 10 banks exist.
- [ ] At least 100 bank offers exist.
- [ ] At least 40 tasks exist.
- [ ] Every major request status is represented.
- [ ] Active, near-maturity, matured, closed, and broken deposits are represented.
- [ ] Dashboard and report totals reconcile with the seeded records.
- [ ] Names, dates, comments, amounts, and activities are realistic.

## Demo Users

- [ ] Deposit Specialist user is ready.
- [ ] General Manager of Treasury user is ready.
- [ ] Executive Director of Investment and Treasury Sector user is ready.
- [ ] Read-only User is ready.
- [ ] Investment Support user is ready.
- [ ] Finance user is ready.
- [ ] Accounting user is ready.
- [ ] Admin user is ready.
- [ ] User switching is easy during the presentation.
- [ ] Each role receives correct tasks, permissions, actions, and dashboard content.

## Demo Scenarios

### 1. Submit an SAR 80 Million Request

- [ ] Draft opens with usable data.
- [ ] Offers and recommendation are available.
- [ ] Submission validation works.
- [ ] The request routes to General Manager of Treasury.

### 2. Approve a Request Within the Threshold

- [ ] General Manager sees the task.
- [ ] Approval completes correctly.
- [ ] No executive approval is added.

### 3. Approve an SAR 180 Million Request

- [ ] General Manager approval routes to the Executive Director of Investment and Treasury Sector.
- [ ] Executive approval advances the workflow.

### 4. Return an Incomplete Request

- [ ] Return reason is mandatory.
- [ ] The request returns to the correct owner.
- [ ] The reason is visible and resubmission works.

### 5. Recommend an Offer That Is Not the Highest Rate

- [ ] Offer comparison is clear.
- [ ] Concentration and qualitative factors are visible.
- [ ] Recommendation rationale explains the decision.

### 6. Investment Support and Finance Review

- [ ] Each role sees the correct information.
- [ ] Approve and return paths work.
- [ ] Treasury recommendation fields remain protected.

### 7. Accounting Execution and Deposit Activation

- [ ] Transfer and accounting references can be recorded.
- [ ] Activation creates one linked deposit.
- [ ] Dashboard and portfolio update.

### 8. Near-Maturity Deposit

- [ ] The deposit is easy to locate.
- [ ] Maturity decision is available.
- [ ] Reinvestment creates a linked draft request.

### 9. Early Deposit Break

- [ ] Date, reason, and financial impact are required.
- [ ] Confirmation is clear.
- [ ] Portfolio and reports update.

### 10. Executive Portfolio Review

- [ ] Portfolio value, bank concentration, maturities, and approvals are clear.
- [ ] Drill-down navigation works smoothly.
- [ ] Unauthorized operational actions are not shown.

## Presentation Flow

- [ ] The presenter has a defined sequence.
- [ ] The demo user required for every scenario is known.
- [ ] Demo records are easy to find.
- [ ] No manual data repair is required between scenarios.
- [ ] Reset procedure is tested.
- [ ] A read-only fallback walkthrough is available.
- [ ] Key pages can be reached quickly.

## Content Review

- [ ] Arabic terminology follows the glossary.
- [ ] No Lorem ipsum or developer text remains.
- [ ] Dates, SAR amounts, rates, and percentages use consistent formatting.
- [ ] Comments, activities, return reasons, and attachment names are realistic.
- [ ] Person and bank names remain consistent across pages.

## Quality Sign-Off

- [ ] Acceptance criteria pass.
- [ ] Functional review passes.
- [ ] UX review passes.
- [ ] Design review passes.
- [ ] Accessibility basics pass.
- [ ] No critical workflow, permission, data-integrity, RTL, or visual issue remains.

## Prototype Limitations

The presentation must state clearly that the prototype includes:

- Frontend-only mock behavior.
- Simulated role switching rather than real authentication.
- No real email, ERP, custodian, or banking integration.
- No server-side storage.
- Simulated attachment and export behavior.

## Final Record

Record before presentation:

- Review date.
- Commit SHA or prototype version.
- Reviewers.
- Final outcome: Ready, Ready with minor observations, or Not ready.
- Accepted minor observations.
- Blocking issues, if any.

The prototype is Ready only when it builds successfully, all ten scenarios are demonstrable, quality reviews pass, seeded data reconciles, reset works, and limitations are disclosed accurately.
