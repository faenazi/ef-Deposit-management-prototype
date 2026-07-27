import type { IsoDateString } from '@/domain/common'
import { addDays } from '@/lib/dates'
import { PROTOTYPE_REFERENCE_DAY } from '@/mock-data/reference-date'
import type { RequestSeedSpec } from '@/mock-data/investment-requests'
import { depositSeedSpecs, depositValueDate } from '@/mock-data/deposits'

/**
 * Deterministic per-case event timeline (plan integrity check 11):
 * created ≤ submitted ≤ decisions ≤ execution ≤ activation, derived from
 * each spec's stage age (in-flight, chained backwards) or the deposit
 * value date (historical, chained forwards). Days are date-only strings;
 * `ts()` in the composer adds fixed intra-day hours.
 */
export interface CaseTimeline {
  readonly createdDay: IsoDateString
  /** First submission day (null for never-submitted drafts). */
  readonly submittedDay: IsoDateString | null
  readonly gmDecisionDay: IsoDateString | null
  readonly execDecisionDay: IsoDateString | null
  /** Winning-bank details submitted → Investment Support entered. */
  readonly winningBankDay: IsoDateString | null
  readonly supportDecisionDay: IsoDateString | null
  readonly financeDecisionDay: IsoDateString | null
  readonly executionDay: IsoDateString | null
  readonly activationDay: IsoDateString | null
  /** Return decision day (current return, or the resolved-return history). */
  readonly returnDay: IsoDateString | null
  /** Resubmission day for resolved returns. */
  readonly resubmitDay: IsoDateString | null
  /** Rejection/cancellation day. */
  readonly terminalDay: IsoDateString | null
  /** Current stage entry day (drives SLA aging). */
  readonly stageEnteredDay: IsoDateString
}

const ref = PROTOTYPE_REFERENCE_DAY

export function buildCaseTimeline(spec: RequestSeedSpec, extendedRoute: boolean): CaseTimeline {
  const createdDay = addDays(ref, -spec.createdDaysAgo)
  const stageEnteredDay = addDays(ref, -spec.stageAgeDays)
  const empty: CaseTimeline = {
    createdDay,
    submittedDay: null,
    gmDecisionDay: null,
    execDecisionDay: null,
    winningBankDay: null,
    supportDecisionDay: null,
    financeDecisionDay: null,
    executionDay: null,
    activationDay: null,
    returnDay: null,
    resubmitDay: null,
    terminalDay: null,
    stageEnteredDay,
  }

  // Historical converted requests: chain forwards from the deposit value date.
  if (spec.depositSequence !== undefined) {
    const deposit = depositSeedSpecs.find((d) => d.sequence === spec.depositSequence)
    if (deposit === undefined) {
      throw new Error(`Missing deposit spec ${spec.depositSequence} for IR seed ${spec.sequence}`)
    }
    const valueDate = depositValueDate(deposit)
    return {
      ...empty,
      submittedDay: addDays(valueDate, -20),
      gmDecisionDay: addDays(valueDate, -18),
      execDecisionDay: extendedRoute ? addDays(valueDate, -16) : null,
      winningBankDay: addDays(valueDate, -14),
      supportDecisionDay: addDays(valueDate, -13),
      financeDecisionDay: addDays(valueDate, -12),
      executionDay: addDays(valueDate, -1),
      activationDay: valueDate,
      stageEnteredDay: valueDate,
    }
  }

  const E = stageEnteredDay
  switch (spec.status) {
    case 'DRAFT':
      return empty
    case 'RETURNED_FOR_COMPLETION': {
      // Return decided the day the current preparation stage was entered.
      const fromExecutive = spec.returnEvent?.fromStage === 'EXECUTIVE_APPROVAL'
      return {
        ...empty,
        submittedDay: addDays(E, fromExecutive ? -4 : -2),
        gmDecisionDay: fromExecutive ? addDays(E, -2) : null,
        returnDay: E,
      }
    }
    case 'PENDING_TREASURY_GM_APPROVAL':
      return { ...empty, submittedDay: E }
    case 'PENDING_EXECUTIVE_APPROVAL':
      return { ...empty, submittedDay: addDays(E, -2), gmDecisionDay: E }
    case 'PENDING_WINNING_BANK_COMPLETION': {
      const gmDay = extendedRoute ? addDays(E, -2) : E
      return {
        ...empty,
        submittedDay: addDays(gmDay, -2),
        gmDecisionDay: gmDay,
        execDecisionDay: extendedRoute ? E : null,
      }
    }
    case 'PENDING_INVESTMENT_SUPPORT_REVIEW': {
      const approvalDay = addDays(E, -2)
      const gmDay = extendedRoute ? addDays(approvalDay, -2) : approvalDay
      return {
        ...empty,
        submittedDay: addDays(gmDay, -2),
        gmDecisionDay: gmDay,
        execDecisionDay: extendedRoute ? approvalDay : null,
        winningBankDay: E,
      }
    }
    case 'PENDING_FINANCE_REVIEW': {
      // Optional resolved Finance→Support return cycle before this entry.
      const resolvedFinanceReturn =
        spec.returnEvent?.fromStage === 'FINANCE_REVIEW' && spec.returnEvent.resolved
      const supportDay = E
      const winningBankDay = addDays(supportDay, resolvedFinanceReturn ? -3 : -1)
      const approvalDay = addDays(winningBankDay, -2)
      const gmDay = extendedRoute ? addDays(approvalDay, -2) : approvalDay
      return {
        ...empty,
        submittedDay: addDays(gmDay, -2),
        gmDecisionDay: gmDay,
        execDecisionDay: extendedRoute ? approvalDay : null,
        winningBankDay,
        supportDecisionDay: supportDay,
        returnDay: resolvedFinanceReturn ? addDays(E, -1) : null,
        resubmitDay: resolvedFinanceReturn ? E : null,
      }
    }
    case 'PENDING_ACCOUNTING_EXECUTION': {
      const financeDay = E
      const supportDay = addDays(financeDay, -1)
      const winningBankDay = addDays(supportDay, -1)
      const approvalDay = addDays(winningBankDay, -2)
      const gmDay = extendedRoute ? addDays(approvalDay, -2) : approvalDay
      return {
        ...empty,
        submittedDay: addDays(gmDay, -2),
        gmDecisionDay: gmDay,
        execDecisionDay: extendedRoute ? approvalDay : null,
        winningBankDay,
        supportDecisionDay: supportDay,
        financeDecisionDay: financeDay,
      }
    }
    case 'PENDING_DEPOSIT_ACTIVATION': {
      const executionDay = E
      const financeDay = addDays(executionDay, -1)
      const supportDay = addDays(financeDay, -1)
      const winningBankDay = addDays(supportDay, -1)
      const approvalDay = addDays(winningBankDay, -2)
      const gmDay = extendedRoute ? addDays(approvalDay, -2) : approvalDay
      return {
        ...empty,
        submittedDay: addDays(gmDay, -2),
        gmDecisionDay: gmDay,
        execDecisionDay: extendedRoute ? approvalDay : null,
        winningBankDay,
        supportDecisionDay: supportDay,
        financeDecisionDay: financeDay,
        executionDay,
      }
    }
    case 'REJECTED': {
      // Rejected by the Treasury GM two days after submission.
      const rejectionDay = E
      return {
        ...empty,
        submittedDay: addDays(rejectionDay, -2),
        terminalDay: rejectionDay,
      }
    }
    case 'CANCELLED': {
      // Submitted, returned by the GM, then cancelled by the specialist.
      const cancelDay = E
      return {
        ...empty,
        submittedDay: addDays(cancelDay, -6),
        returnDay: addDays(cancelDay, -4),
        terminalDay: cancelDay,
      }
    }
    case 'CONVERTED_TO_ACTIVE_DEPOSIT':
      throw new Error('Converted requests must carry a depositSequence')
  }
}
