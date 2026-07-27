import type { MockDataset } from '@/mock-data/index'
import {
  calculateExpectedReturn,
  getDaysToMaturity,
  getReadiness,
  getTenorDays,
  isApproachingMaturity,
  requiresExecutiveApproval,
  responsibleRoleForStatus,
} from '@/domain/business-rules'
import { approverRoleForStage } from '@/mock-data/approvals'
import { rolePermissions } from '@/domain/permissions'

/**
 * Referential-integrity checker (plan §13): executed against the composed
 * baseline as a dev-time assertion — a failing check fails the seed.
 * Returns a list of human-readable issues; empty = consistent.
 */
export function checkDatasetIntegrity(dataset: MockDataset): string[] {
  const issues: string[] = []
  const problem = (message: string) => issues.push(message)

  const userIds = new Set(dataset.users.map((user) => user.id))
  const bankIds = new Set(dataset.banks.map((bank) => bank.id))
  const requestById = new Map(dataset.requests.map((request) => [request.id, request]))
  const depositById = new Map(dataset.deposits.map((deposit) => [deposit.id, deposit]))
  const offerById = new Map(dataset.offers.map((offer) => [offer.id, offer]))
  const invitationsByRequest = groupByRequest(dataset.invitations.map((i) => [i.investmentRequestId, i.id]))

  const entityExists = (entityType: string, entityId: string): boolean => {
    switch (entityType) {
      case 'INVESTMENT_REQUEST':
        return requestById.has(entityId)
      case 'DEPOSIT':
        return depositById.has(entityId)
      case 'BANK':
        return bankIds.has(entityId)
      case 'USER':
        return userIds.has(entityId)
      default:
        return true
    }
  }

  function groupByRequest(pairs: readonly (readonly [string, string])[]): Map<string, string[]> {
    const map = new Map<string, string[]>()
    for (const [key, value] of pairs) {
      const bucket = map.get(key)
      if (bucket === undefined) map.set(key, [value])
      else bucket.push(value)
    }
    return map
  }

  // 1 — every foreign key resolves.
  for (const user of dataset.users) {
    if (!dataset.roles.some((role) => role.id === user.roleId)) {
      problem(`FK: user ${user.id} references unknown role ${user.roleId}`)
    }
  }
  for (const request of dataset.requests) {
    if (!userIds.has(request.createdByUserId)) {
      problem(`FK: request ${request.id} creator ${request.createdByUserId} missing`)
    }
    for (const invitedBankId of request.invitedBankIds) {
      if (!bankIds.has(invitedBankId)) {
        problem(`FK: request ${request.id} invited bank ${invitedBankId} missing`)
      }
    }
    if (request.sourceDepositId !== null && !depositById.has(request.sourceDepositId)) {
      problem(`FK: request ${request.id} source deposit ${request.sourceDepositId} missing`)
    }
  }
  for (const invitation of dataset.invitations) {
    if (!requestById.has(invitation.investmentRequestId)) {
      problem(`FK: invitation ${invitation.id} request missing`)
    }
    if (!bankIds.has(invitation.bankId)) {
      problem(`FK: invitation ${invitation.id} bank missing`)
    }
  }
  for (const offer of dataset.offers) {
    if (!requestById.has(offer.investmentRequestId)) problem(`FK: offer ${offer.id} request missing`)
    if (!bankIds.has(offer.bankId)) problem(`FK: offer ${offer.id} bank missing`)
    if (!dataset.invitations.some((invitation) => invitation.id === offer.invitationId)) {
      problem(`FK: offer ${offer.id} invitation missing`)
    }
  }
  for (const evaluation of dataset.evaluations) {
    if (!offerById.has(evaluation.offerId)) problem(`FK: evaluation ${evaluation.id} offer missing`)
  }
  for (const approval of dataset.approvals) {
    if (!requestById.has(approval.investmentRequestId)) {
      problem(`FK: approval ${approval.id} request missing`)
    }
    if (approval.approverUserId !== null && !userIds.has(approval.approverUserId)) {
      problem(`FK: approval ${approval.id} approver missing`)
    }
  }
  for (const collection of [dataset.tasks, dataset.attachments, dataset.notes, dataset.activities, dataset.notifications] as const) {
    for (const record of collection) {
      if (!entityExists(record.entityType, record.entityId)) {
        problem(`FK: record ${record.id} links to missing ${record.entityType} ${record.entityId}`)
      }
    }
  }

  // 2 — owner and responsible role match the status.
  for (const request of dataset.requests) {
    if (request.currentOwnerRoleId !== responsibleRoleForStatus[request.status]) {
      problem(`Owner: request ${request.id} owner role does not match status ${request.status}`)
    }
  }

  // 3 — approval stages carry stage-appropriate roles.
  for (const approval of dataset.approvals) {
    if (approverRoleForStage[approval.stage] !== approval.approverRoleId) {
      problem(`Approval ${approval.id}: role ${approval.approverRoleId} invalid for ${approval.stage}`)
    }
  }

  // 4 — every offer belongs to a contacted (invited) bank of its request.
  for (const offer of dataset.offers) {
    const request = requestById.get(offer.investmentRequestId)
    if (request !== undefined && !request.invitedBankIds.includes(offer.bankId)) {
      problem(`Offer ${offer.id}: bank ${offer.bankId} was not invited on ${request.id}`)
    }
    if (!(invitationsByRequest.get(offer.investmentRequestId) ?? []).includes(offer.invitationId)) {
      problem(`Offer ${offer.id}: invitation ${offer.invitationId} belongs to another request`)
    }
  }

  // 5 — winning bank references a valid submitted offer of the same request.
  for (const request of dataset.requests) {
    const winning = request.winningBankDetails
    if (winning === null) continue
    const offer = offerById.get(winning.winningOfferId)
    if (offer === undefined || offer.investmentRequestId !== request.id) {
      problem(`Winning bank on ${request.id}: offer ${winning.winningOfferId} invalid`)
      continue
    }
    if (offer.bankId !== winning.bankId) {
      problem(`Winning bank on ${request.id}: bank mismatch with offer ${offer.id}`)
    }
    if (offer.status !== 'VALID') {
      problem(`Winning bank on ${request.id}: offer ${offer.id} is not stored VALID`)
    }
  }

  // 6 — only converted requests have createdDepositId, with execution records.
  for (const request of dataset.requests) {
    const converted = request.status === 'CONVERTED_TO_ACTIVE_DEPOSIT'
    if (converted !== (request.createdDepositId !== null)) {
      problem(`Conversion: ${request.id} createdDepositId inconsistent with status`)
    }
    if (converted) {
      const executed = dataset.accountingExecutions.some(
        (execution) =>
          execution.investmentRequestId === request.id && execution.executionStatus === 'CONFIRMED',
      )
      const activated = dataset.activations.some(
        (activation) => activation.investmentRequestId === request.id,
      )
      if (!executed || !activated) {
        problem(`Conversion: ${request.id} lacks confirmed execution/activation records`)
      }
    }
  }

  // 7 — deposits ↔ converted requests are 1:1 with matching back-links.
  const seenNumbers = new Set<string>()
  for (const deposit of dataset.deposits) {
    if (seenNumbers.has(deposit.depositNumber)) {
      problem(`Duplicate deposit number ${deposit.depositNumber}`)
    }
    seenNumbers.add(deposit.depositNumber)
    const source = requestById.get(deposit.sourceInvestmentRequestId)
    if (source === undefined || source.createdDepositId !== deposit.id) {
      problem(`Deposit ${deposit.id}: source request back-link broken`)
    }
  }
  const requestNumbers = new Set<string>()
  for (const request of dataset.requests) {
    if (requestNumbers.has(request.requestNumber)) {
      problem(`Duplicate request number ${request.requestNumber}`)
    }
    requestNumbers.add(request.requestNumber)
  }

  // 8 — financial arithmetic matches the central formula (R-10).
  for (const offer of dataset.offers) {
    const expected = calculateExpectedReturn(
      offer.amount,
      offer.annualRate,
      getTenorDays(offer.tenorValue, offer.tenorUnit),
      dataset.settings.dayCountBasis,
    )
    if (Math.abs(expected - offer.expectedReturnAmount) > 0.01) {
      problem(`R-10: offer ${offer.id} expected return mismatch`)
    }
  }
  for (const deposit of dataset.deposits) {
    const expected = calculateExpectedReturn(
      deposit.principalAmount,
      deposit.annualRate,
      getTenorDays(deposit.tenorValue, deposit.tenorUnit),
      dataset.settings.dayCountBasis,
    )
    if (Math.abs(expected - deposit.expectedReturnAmount) > 0.01) {
      problem(`R-10: deposit ${deposit.id} expected return mismatch`)
    }
  }
  for (const request of dataset.requests) {
    const liquidity = request.liquidity
    if (
      liquidity !== null &&
      liquidity.amountAvailableForInvestment !==
        liquidity.availableLiquidityAmount - liquidity.requiredOperatingReserve
    ) {
      problem(`Liquidity arithmetic broken on ${request.id}`)
    }
  }
  for (const execution of dataset.accountingExecutions) {
    if (execution.executionStatus !== 'CONFIRMED' || execution.transferAmount === null) continue
    const request = requestById.get(execution.investmentRequestId)
    if (
      request !== undefined &&
      execution.transferAmount !== (request.submittedAmount ?? request.amount) &&
      execution.varianceJustification === null
    ) {
      problem(`R-19: execution ${execution.id} amount variance without justification`)
    }
  }

  // 9 — approval chains match the submitted amount (extended iff > threshold).
  for (const request of dataset.requests) {
    if (request.submittedAmount === null) continue
    const needsExecutive = requiresExecutiveApproval(request.submittedAmount, dataset.settings)
    const hasExecutiveRecord = dataset.approvals.some(
      (approval) =>
        approval.investmentRequestId === request.id && approval.stage === 'EXECUTIVE_APPROVAL',
    )
    if (!needsExecutive && hasExecutiveRecord) {
      problem(`Route: ${request.id} at/below threshold but has executive approval records`)
    }
    if (
      needsExecutive &&
      !hasExecutiveRecord &&
      (request.status === 'CONVERTED_TO_ACTIVE_DEPOSIT' ||
        request.status === 'PENDING_WINNING_BANK_COMPLETION' ||
        request.status === 'PENDING_INVESTMENT_SUPPORT_REVIEW' ||
        request.status === 'PENDING_FINANCE_REVIEW' ||
        request.status === 'PENDING_ACCOUNTING_EXECUTION' ||
        request.status === 'PENDING_DEPOSIT_ACTIVATION')
    ) {
      problem(`Route: ${request.id} above threshold but passed approval without executive record`)
    }
  }

  // 10 — open tasks are assigned to the current responsible role.
  for (const task of dataset.tasks) {
    if (task.status !== 'OPEN' || task.entityType !== 'INVESTMENT_REQUEST') continue
    const request = requestById.get(task.entityId)
    if (request !== undefined && task.assignedRoleId !== responsibleRoleForStatus[request.status]) {
      problem(`Task ${task.id}: assigned role does not match ${request.id} status`)
    }
  }

  // 11 — timestamps follow the lifecycle sequence.
  for (const request of dataset.requests) {
    if (request.submittedAt !== null && request.submittedAt < request.createdAt) {
      problem(`Timeline: ${request.id} submitted before created`)
    }
    const events = dataset.activities.filter(
      (activity) => activity.entityType === 'INVESTMENT_REQUEST' && activity.entityId === request.id,
    )
    for (let index = 1; index < events.length; index += 1) {
      const previous = events[index - 1]
      const current = events[index]
      if (previous !== undefined && current !== undefined && current.occurredAt < previous.occurredAt) {
        problem(`Timeline: ${request.id} activity ${current.id} precedes ${previous.id}`)
      }
    }
  }
  for (const offer of dataset.offers) {
    const invitation = dataset.invitations.find((candidate) => candidate.id === offer.invitationId)
    if (invitation?.sentAt !== null && invitation !== undefined && offer.receivedAt < invitation.sentAt) {
      problem(`Timeline: offer ${offer.id} received before RFQ sent`)
    }
  }

  // 12 — no impossible status combinations (pre-decision scope).
  for (const request of dataset.requests) {
    if (request.status === 'RETURNED_FOR_COMPLETION') {
      const hasReturnedDecision = dataset.approvals.some(
        (approval) =>
          approval.investmentRequestId === request.id && approval.decision === 'RETURNED',
      )
      if (request.returnReason === null || !hasReturnedDecision) {
        problem(`Status: ${request.id} returned without reason and RETURNED decision`)
      }
    }
    if (request.status === 'REJECTED') {
      const hasRejection = dataset.approvals.some(
        (approval) =>
          approval.investmentRequestId === request.id && approval.decision === 'REJECTED',
      )
      if (request.rejectionReason === null || !hasRejection) {
        problem(`Status: ${request.id} rejected without reason and REJECTED decision`)
      }
    }
    if (request.status === 'CANCELLED' && request.cancellationReason === null) {
      problem(`Status: ${request.id} cancelled without reason`)
    }
    const preDecision =
      request.status === 'DRAFT' ||
      request.status === 'RETURNED_FOR_COMPLETION' ||
      request.status === 'PENDING_TREASURY_GM_APPROVAL' ||
      request.status === 'PENDING_EXECUTIVE_APPROVAL'
    if (preDecision) {
      const recommended = dataset.offers.filter(
        (offer) => offer.investmentRequestId === request.id && offer.isRecommended,
      )
      for (const offer of recommended) {
        const expired =
          offer.validUntil !== null && offer.validUntil < dataset.settings.referenceDate.slice(0, 10)
        if (offer.status !== 'VALID' || expired) {
          problem(`Status: ${request.id} recommended offer ${offer.id} not effectively valid`)
        }
      }
      if (request.recommendation !== null) {
        const evaluated = dataset.evaluations.some(
          (evaluation) => evaluation.offerId === request.recommendation?.recommendedOfferId,
        )
        if (!evaluated) {
          problem(`Status: ${request.id} recommendation without evaluation`)
        }
      }
    }
  }
  for (const deposit of dataset.deposits) {
    if (deposit.status === 'ACTIVE' && deposit.closedAt !== null) {
      problem(`Status: active deposit ${deposit.id} carries closedAt`)
    }
    if (deposit.status === 'BROKEN_EARLY' && (deposit.brokenAt === null || deposit.breakReason === null)) {
      problem(`Status: broken deposit ${deposit.id} lacks break date/reason`)
    }
  }

  // 13 — derived maturity indicators match the 14-day rule (exactly 4 inside).
  const approaching = dataset.deposits.filter((deposit) =>
    isApproachingMaturity(deposit, dataset.settings),
  )
  if (approaching.length !== 4) {
    problem(`Maturity window: expected 4 approaching deposits, found ${approaching.length}`)
  }
  for (const deposit of dataset.deposits) {
    if (deposit.status === 'ACTIVE' && getDaysToMaturity(deposit, dataset.settings.referenceDate) < 0) {
      problem(`Maturity: active deposit ${deposit.id} already past maturity`)
    }
  }

  // 14 — the read-only role holds no mutating permissions.
  const readOnlyPermissions = rolePermissions['read-only-user']
  if (readOnlyPermissions.some((permission) => !permission.endsWith('.view'))) {
    problem('Read-only role holds a non-view permission')
  }

  // 15 (reset determinism) is asserted by the store: two independent
  // compositions must be deep-equal — see services/store.ts dev assertion.

  // Preparation-status readiness figures must equal the derived values.
  for (const request of dataset.requests) {
    if (request.status !== 'DRAFT' && request.status !== 'RETURNED_FOR_COMPLETION') continue
    const readiness = getReadiness(
      request,
      {
        invitations: dataset.invitations.filter((i) => i.investmentRequestId === request.id),
        offers: dataset.offers.filter((o) => o.investmentRequestId === request.id),
        evaluations: dataset.evaluations.filter((e) => e.investmentRequestId === request.id),
        attachments: dataset.attachments.filter(
          (a) => a.entityType === 'INVESTMENT_REQUEST' && a.entityId === request.id,
        ),
      },
      dataset.settings,
    )
    if (
      readiness.percentage !== request.readinessPercentage ||
      readiness.missingCodes.join(',') !== request.missingRequirementCodes.join(',')
    ) {
      problem(`Readiness: stored figures on ${request.id} diverge from derived values`)
    }
  }

  return issues
}
