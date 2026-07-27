# Domain Model

## Purpose

This document defines the core business entities, their responsibilities, and their relationships for the Investment Deposit Management prototype.

The model must remain implementation-agnostic and must not depend on React component structure.

## Core Entities

### User

Represents a prototype user.

Required fields:

- `id`
- `employeeNumber`
- `displayNameAr`
- `displayNameEn`
- `email`
- `jobTitleAr`
- `departmentAr`
- `roleId`
- `avatarUrl`
- `isActive`

### Role

Represents a business role and its permission set.

Required fields:

- `id`
- `code`
- `nameAr`
- `nameEn`
- `description`
- `permissions`
- `dashboardProfile`

Approved prototype roles:

- `deposit-specialist`
- `treasury-general-manager`
- `investment-treasury-executive` — display name: Executive Director of Investment and Treasury Sector / المدير التنفيذي لقطاع الاستثمار والخزينة
- `investment-support`
- `finance-reviewer`
- `accounting-executor`
- `system-admin`
- `read-only-user` — display name: Read-only User / مستخدم للعرض فقط

### Bank

Represents a bank invited to submit deposit offers.

Required fields:

- `id`
- `code`
- `nameAr`
- `nameEn`
- `shortName`
- `logoUrl`
- `relationshipManagerName`
- `relationshipManagerEmail`
- `relationshipManagerPhone`
- `isActive`
- `riskCategory`
- `currentExposureAmount`
- `currentExposurePercentage`

### InvestmentRequest

Represents one investment decision case.

Required fields:

- `id`
- `requestNumber`
- `title`
- `status`
- `currentStage`
- `currentOwnerRoleId`
- `currentOwnerUserId`
- `createdByUserId`
- `createdAt`
- `updatedAt`
- `submittedAt`
- `amount`
- `currency`
- `tenorValue`
- `tenorUnit`
- `investmentDate`
- `expectedMaturityDate`
- `liquiditySummary`
- `liquidityAttachmentIds`
- `invitedBankIds`
- `offerIds`
- `recommendedOfferId`
- `recommendationSummary`
- `recommendationRationale`
- `readinessPercentage`
- `missingRequirementCodes`
- `returnReason`
- `cancellationReason`
- `winningBankDetails`
- `approvalIds`
- `taskIds`
- `attachmentIds`
- `activityIds`
- `sourceDepositId`
- `createdDepositId`

### BankInvitation

Represents an RFQ invitation sent to one bank for one request.

Required fields:

- `id`
- `investmentRequestId`
- `bankId`
- `sentAt`
- `sentByUserId`
- `responseDeadline`
- `communicationChannel`
- `status`
- `responseReceivedAt`
- `notes`
- `attachmentIds`

### BankOffer

Represents one quoted offer from one bank.

Required fields:

- `id`
- `investmentRequestId`
- `bankId`
- `invitationId`
- `offerReference`
- `receivedAt`
- `receivedByUserId`
- `amount`
- `currency`
- `tenorValue`
- `tenorUnit`
- `annualRate`
- `expectedReturnAmount`
- `valueDate`
- `maturityDate`
- `validUntil`
- `isShariaCompliant`
- `productType`
- `specialConditions`
- `status`
- `isRecommended`
- `evaluationScore`
- `attachmentIds`

### EvaluationCriterion

Represents one configurable comparison criterion.

Required fields:

- `id`
- `code`
- `nameAr`
- `weight`
- `isActive`
- `calculationType`

Prototype criteria:

- annual return rate
- expected return amount
- bank concentration impact
- validity period
- tenor alignment
- operational readiness
- special conditions

### OfferEvaluation

Represents the calculated and manually reviewed evaluation of one offer.

Required fields:

- `id`
- `investmentRequestId`
- `offerId`
- `criterionScores`
- `weightedScore`
- `rank`
- `reviewerNotes`
- `evaluatedByUserId`
- `evaluatedAt`

### Approval

Represents one approval decision in the request lifecycle.

Required fields:

- `id`
- `investmentRequestId`
- `stage`
- `approverRoleId`
- `approverUserId`
- `decision`
- `decisionAt`
- `comments`
- `returnToRoleId`
- `sequence`

Approved decisions:

- pending
- approved
- returned
- rejected
- cancelled

### Task

Represents an actionable assignment.

Required fields:

- `id`
- `type`
- `title`
- `description`
- `entityType`
- `entityId`
- `assignedRoleId`
- `assignedUserId`
- `priority`
- `status`
- `dueAt`
- `createdAt`
- `completedAt`
- `actionCode`

### Attachment

Represents a prototype file reference.

Required fields:

- `id`
- `entityType`
- `entityId`
- `category`
- `fileName`
- `fileType`
- `fileSizeBytes`
- `fileUrl`
- `uploadedByUserId`
- `uploadedAt`
- `isRequired`
- `validationStatus`

### Activity

Represents an immutable audit-style event.

Required fields:

- `id`
- `entityType`
- `entityId`
- `activityType`
- `title`
- `description`
- `actorUserId`
- `occurredAt`
- `metadata`

### WinningBankDetails

Represents the operational details required after approval.

Required fields:

- `bankId`
- `beneficiaryName`
- `iban`
- `bankAccountNumber`
- `bankSwiftCode`
- `transferAmount`
- `valueDate`
- `depositReference`
- `ibanCertificateAttachmentId`
- `verifiedByUserId`
- `verifiedAt`

### FinanceReview

Required fields:

- `id`
- `investmentRequestId`
- `reviewerUserId`
- `reviewStatus`
- `budgetAvailabilityConfirmed`
- `cashAvailabilityConfirmed`
- `beneficiaryVerified`
- `comments`
- `reviewedAt`

### AccountingExecution

Required fields:

- `id`
- `investmentRequestId`
- `executorUserId`
- `executionStatus`
- `journalReference`
- `paymentReference`
- `transferDate`
- `transferAmount`
- `transferAttachmentId`
- `comments`
- `executedAt`

### Deposit

Represents an active or historical deposit.

Required fields:

- `id`
- `depositNumber`
- `sourceInvestmentRequestId`
- `bankId`
- `status`
- `principalAmount`
- `currency`
- `annualRate`
- `expectedReturnAmount`
- `actualReturnAmount`
- `valueDate`
- `maturityDate`
- `tenorValue`
- `tenorUnit`
- `depositReference`
- `certificateAttachmentId`
- `daysToMaturity`
- `maturityAction`
- `closedAt`
- `brokenAt`
- `breakReason`
- `reinvestmentRequestId`
- `activityIds`
- `attachmentIds`

### MaturityAction

Required fields:

- `id`
- `depositId`
- `actionType`
- `decisionByUserId`
- `decisionAt`
- `notes`
- `resultingRequestId`

Approved action types:

- close
- reinvest
- extend-review
- break-early

## Relationships

- One `Role` has many `User` records.
- One `InvestmentRequest` is created by one `User`.
- One `InvestmentRequest` can invite many `Bank` records through `BankInvitation`.
- One `InvestmentRequest` can have many `BankOffer` records.
- One `BankOffer` belongs to one `Bank` and one `InvestmentRequest`.
- One `InvestmentRequest` can recommend only one `BankOffer`.
- One `InvestmentRequest` can have many `Approval`, `Task`, `Attachment`, and `Activity` records.
- One approved and executed `InvestmentRequest` creates no more than one `Deposit`.
- One `Deposit` originates from exactly one completed `InvestmentRequest`.
- One `Deposit` may create one new reinvestment `InvestmentRequest`.

## Modeling Rules

- IDs must be stable and deterministic in mock data.
- Display labels must not be used as IDs.
- Statuses and role codes must come from centralized constants.
- Financial values must be stored as numbers, never formatted strings.
- Dates must be stored as ISO strings and formatted only in presentation utilities.
- Derived values such as `daysToMaturity`, readiness, and exposure percentages must be calculated centrally.
- Activity records are append-only in the prototype state.
- UI components must not mutate entity objects directly.
