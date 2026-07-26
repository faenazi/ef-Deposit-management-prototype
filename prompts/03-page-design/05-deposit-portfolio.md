# Prompt 05 — Deposit Portfolio

## Objective
Implement the Arabic RTL Deposit Portfolio page as the authoritative view of active, maturing, matured, reinvested, broken, and closed deposits.

## Read First
- `CLAUDE.md`
- `docs/07-brand-experience/`
- `docs/08-design-specifications/00-shared-layout-and-components.md`
- `docs/08-design-specifications/05-deposit-portfolio.md`
- `docs/09-ai-governance/`
- `docs/03-functional/deposit-portfolio.md`
- `docs/02-business/deposit-lifecycle.md` and `docs/02-business/statuses-and-transitions.md` (canonical deposit statuses)
- `docs/02-business/business-rules.md` (maturity warning window and expected-return formula)

## Scope
Implement only the portfolio route, its summary, filters, deposit register, maturity views, and deposit-detail navigation required by the specification.

## Requirements
- Arabic-first, true RTL.
- Present total principal, weighted return, active deposits, upcoming maturities, bank exposure, and exceptions using a restrained executive summary.
- Provide a professional deposit register with deposit/reference number, originating request, bank, principal, rate, tenor, placement date, maturity date, days to maturity, status, and responsible owner where documented.
- Distinguish executed deposit terms from the originally recommended offer.
- Highlight upcoming maturity, overdue follow-up, missing documents, or data exceptions using text and iconography—not color alone.
- Provide search, filters, sorting, result count, and clear-filter behavior.
- Include useful maturity grouping or timeline behavior according to the design specification.
- Clicking a deposit opens its detail/lifecycle view or the originating transaction as documented.
- Use realistic deterministic mock data and Saudi Riyal formatting.
- Include loading, empty, no-results, error, restricted, and read-only states.
- Support desktop, tablet, and purpose-built mobile views.

## Visual Direction
Create a calm institutional investment portfolio, not a sales dashboard. The strongest visual signals should be portfolio value, maturity timing, exposure, yield, and exceptions. Avoid decorative charts, excessive cards, and dense color coding.

## Interaction Requirements
- Filters and sorting work locally.
- Summary figures remain consistent with the visible portfolio dataset.
- Maturity and bank-exposure interactions navigate or filter meaningfully.
- Table and mobile actions are keyboard-accessible.

## Boundaries
Do not add live market data, bank feeds, ERP integration, real calculations beyond documented prototype rules, or undocumented portfolio actions.

## Validation
Run `npm run typecheck`, `npm run lint`, and `npm run build` from `/src`; fix all introduced issues.

## Completion Report
Report changed files, implemented metrics/views, functional interactions, responsive behavior, states, and validation results.