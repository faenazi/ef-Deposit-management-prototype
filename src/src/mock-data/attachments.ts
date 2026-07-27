import type { Attachment, AttachmentCategory } from '@/domain/audit'
import type { SectionKey } from '@/domain/investment-request'
import type { EntityType } from '@/domain/common'
import type { SeededRandom } from '@/mock-data/seed'

/**
 * Attachment fixtures (mock-data-requirements.md — Attachments): realistic
 * Arabic filenames, lightweight local placeholder files only, mandatory
 * categories present wherever a stage gate requires them.
 */

const fileNamePatterns: Record<AttachmentCategory, string> = {
  LIQUIDITY_ANALYSIS: 'تحليل-السيولة',
  RFQ_CORRESPONDENCE: 'مراسلة-طلب-العروض',
  BANK_OFFER: 'عرض-بنكي',
  EVALUATION_MEMO: 'مذكرة-التقييم',
  APPROVAL_EVIDENCE: 'محضر-الاعتماد',
  IBAN_CERTIFICATE: 'شهادة-الآيبان',
  TRANSFER_RECEIPT: 'إيصال-التحويل',
  JOURNAL_EVIDENCE: 'إثبات-القيد-المحاسبي',
  DEPOSIT_CERTIFICATE: 'شهادة-الوديعة',
  MATURITY_CORRESPONDENCE: 'مراسلة-الاستحقاق',
}

const sectionByCategory: Record<AttachmentCategory, SectionKey> = {
  LIQUIDITY_ANALYSIS: 'liquidity',
  RFQ_CORRESPONDENCE: 'bank-rfq',
  BANK_OFFER: 'bank-offers',
  EVALUATION_MEMO: 'evaluation-recommendation',
  APPROVAL_EVIDENCE: 'approval-history',
  IBAN_CERTIFICATE: 'winning-bank',
  TRANSFER_RECEIPT: 'accounting-execution',
  JOURNAL_EVIDENCE: 'accounting-execution',
  DEPOSIT_CERTIFICATE: 'deposit-activation',
  MATURITY_CORRESPONDENCE: 'attachments',
}

const fileTypeByCategory: Partial<Record<AttachmentCategory, string>> = {
  LIQUIDITY_ANALYSIS: 'xlsx',
  RFQ_CORRESPONDENCE: 'pdf',
}

/** Categories whose presence is enforced by a readiness or stage gate. */
const requiredCategories: readonly AttachmentCategory[] = [
  'LIQUIDITY_ANALYSIS',
  'BANK_OFFER',
  'IBAN_CERTIFICATE',
  'TRANSFER_RECEIPT',
  'DEPOSIT_CERTIFICATE',
]

export interface MakeAttachmentArgs {
  readonly nextId: () => string
  readonly rng: SeededRandom
  readonly entityType: EntityType
  readonly entityId: string
  readonly category: AttachmentCategory
  readonly referenceLabel: string
  readonly uploadedByUserId: string
  readonly uploadedDay: string
  readonly ts: (day: string, hour: number) => string
}

export function makeAttachment(args: MakeAttachmentArgs): Attachment {
  const fileType = fileTypeByCategory[args.category] ?? 'pdf'
  return {
    id: args.nextId(),
    entityType: args.entityType,
    entityId: args.entityId,
    category: args.category,
    fileName: `${fileNamePatterns[args.category]}-${args.referenceLabel}.${fileType}`,
    fileType,
    fileSizeBytes: 40_000 + args.rng.int(1, 380) * 1_000,
    fileUrl: `/prototype-documents/${args.entityId}/${args.category.toLowerCase()}.${fileType}`,
    uploadedByUserId: args.uploadedByUserId,
    uploadedAt: args.ts(args.uploadedDay, 10),
    isRequired: requiredCategories.includes(args.category),
    validationStatus: 'VALID',
    sectionKey: args.entityType === 'INVESTMENT_REQUEST' ? sectionByCategory[args.category] : null,
  }
}
