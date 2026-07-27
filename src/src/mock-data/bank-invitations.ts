import type { BankInvitation } from '@/domain/offer'
import type { Bank } from '@/domain/bank'
import type { SeededRandom } from '@/mock-data/seed'
import { addDays } from '@/lib/dates'
import { rfqDeclineReasons, rfqMessageSummaries, rfqSubjects } from '@/mock-data/phrases'

/**
 * RFQ invitation builder — one independent record per contacted bank per
 * request (business-rules.md Bank RFQ Rules). Responding banks precede
 * declined/no-response banks; only active banks are ever invited.
 */

export interface BuildInvitationsArgs {
  readonly requestId: string
  readonly rng: SeededRandom
  readonly nextId: () => string
  readonly banks: readonly Bank[]
  /** Banks that will submit offers, in order — first is the recommended bank. */
  readonly respondingBankIds: readonly string[]
  /** Total invited banks (extras become declined / no response). */
  readonly invitedCount: number
  readonly sentDay: string
  readonly sentByUserId: string
  /** Early-stage drafts: non-responding banks stay SENT (awaiting reply). */
  readonly awaitingResponses?: boolean
  readonly ts: (day: string, hour: number) => string
}

export function buildInvitations(args: BuildInvitationsArgs): BankInvitation[] {
  const activeBanks = args.banks.filter((bank) => bank.isActive)
  const invitedBankIds: string[] = [...args.respondingBankIds]
  for (const bank of activeBanks) {
    if (invitedBankIds.length >= args.invitedCount) break
    if (!invitedBankIds.includes(bank.id)) {
      invitedBankIds.push(bank.id)
    }
  }

  const subject = args.rng.pick(rfqSubjects)
  const summary = args.rng.pick(rfqMessageSummaries)
  const deadline = addDays(args.sentDay, 5)

  return invitedBankIds.map((bankId, index) => {
    const bank = args.banks.find((candidate) => candidate.id === bankId)
    const responded = index < args.respondingBankIds.length
    const awaiting = !responded && args.awaitingResponses === true
    const declined = !responded && !awaiting && index % 2 === 0
    return {
      id: args.nextId(),
      investmentRequestId: args.requestId,
      bankId,
      sentAt: args.ts(args.sentDay, 10),
      sentByUserId: args.sentByUserId,
      responseDeadline: deadline,
      communicationChannel: index === 0 ? 'EMAIL' : args.rng.pick(['EMAIL', 'OFFICIAL_LETTER'] as const),
      status: responded ? 'RESPONSE_RECEIVED' : awaiting ? 'SENT' : declined ? 'DECLINED' : 'NO_RESPONSE',
      responseReceivedAt: responded ? args.ts(addDays(args.sentDay, 2), 11) : null,
      contactPersonName: bank?.relationshipManagerName ?? '',
      contactEmail: bank?.relationshipManagerEmail ?? '',
      emailSubject: subject,
      messageSummary: summary,
      declineOrNoResponseReason: declined ? args.rng.pick(rfqDeclineReasons) : null,
      notes: null,
      attachmentIds: [],
    }
  })
}
