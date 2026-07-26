# Product Design DNA

## Product statement

A premium Arabic-first treasury workspace that enables Environment Fund teams to prepare, review, approve, execute, and monitor investment deposits with financial clarity and complete governance visibility.

## DNA principles

### Financial data first

Amounts, yields, tenors, maturities, selected bank offers, and expected returns are the visual anchors. Supporting content must not dilute them.

### Workflow always visible

Users should understand the current stage, completed stages, responsible role, pending decision, and next action without searching through the page.

### Decision context before action

Approval and execution actions must appear with the minimum context required to make a responsible decision: request summary, recommendation, comparison, risk, attachments, and audit trail.

### Progressive preparation

An investment request remains a draft while one specialist gradually completes liquidity information, bank RFQ data, offers, evaluation, and recommendation. Approval workflow begins only after explicit submission.

### One request, one activated deposit

The interface must preserve the relationship between an approved investment request and the resulting active deposit. Reinvestment starts a new request and must not overwrite the historical deposit.

### Role-aware relevance

Specialists see preparation and operational detail. Approvers see concise decision summaries. Finance and accounting see execution evidence. Leadership sees portfolio position, return, concentration, maturities, and exceptions.

### Calm institutional identity

Environment Fund identity is present through color, typography, logo, approved patterns, spacing, and restraint. It is never applied as repetitive decoration.

### Traceability by design

Every important action exposes actor, timestamp, comment, attachment, stage, and result. Audit history is a first-class product experience.

### Responsive, not reduced

Tablet and smaller laptop layouts preserve tasks, decisions, financial values, and actions. Responsive behavior may reflow detail but must not hide required governance information.

### Realistic prototype behavior

The prototype must use realistic Saudi treasury data, complete states, role switching, meaningful filters, working navigation, and coherent scenarios. It must not contain lorem ipsum, placeholder charts, dead buttons, or contradictory statuses.

## Signature interaction pattern

The transaction workspace is the central product pattern:

```text
Request header and financial summary
↓
Visible workflow and responsibility
↓
Section navigation
↓
Focused working section
↓
Persistent summary and validation
↓
Permission-aware actions
↓
Activity and audit evidence
```

## Final design test

A screen is aligned with the product DNA only when a treasury user can answer within seconds:

1. What is this request or deposit?
2. What is its financial significance?
3. What stage is it in?
4. Who is responsible now?
5. What requires attention?
6. What action can I take?
7. What evidence supports the decision?