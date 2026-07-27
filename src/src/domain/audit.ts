import type { RoleCode } from '@/domain/roles'
import type { EntityType, IsoDateString, ValueLabels } from '@/domain/common'
import type { InvestmentRequestStatus, SectionKey } from '@/domain/investment-request'

/** Attachment categories (mock-data-requirements.md required categories). */
export const attachmentCategories = [
  'LIQUIDITY_ANALYSIS',
  'RFQ_CORRESPONDENCE',
  'BANK_OFFER',
  'EVALUATION_MEMO',
  'APPROVAL_EVIDENCE',
  'IBAN_CERTIFICATE',
  'TRANSFER_RECEIPT',
  'JOURNAL_EVIDENCE',
  'DEPOSIT_CERTIFICATE',
  'MATURITY_CORRESPONDENCE',
] as const

export type AttachmentCategory = (typeof attachmentCategories)[number]

export const attachmentCategoryLabels: Record<AttachmentCategory, ValueLabels> = {
  LIQUIDITY_ANALYSIS: { ar: 'تحليل السيولة', en: 'Liquidity analysis' },
  RFQ_CORRESPONDENCE: { ar: 'مراسلات طلب العروض', en: 'RFQ correspondence' },
  BANK_OFFER: { ar: 'عرض بنكي', en: 'Bank offer' },
  EVALUATION_MEMO: { ar: 'مذكرة التقييم', en: 'Evaluation memorandum' },
  APPROVAL_EVIDENCE: { ar: 'إثبات الاعتماد', en: 'Approval evidence' },
  IBAN_CERTIFICATE: { ar: 'شهادة الآيبان', en: 'IBAN certificate' },
  TRANSFER_RECEIPT: { ar: 'إيصال التحويل', en: 'Transfer receipt' },
  JOURNAL_EVIDENCE: { ar: 'إثبات القيد المحاسبي', en: 'Journal evidence' },
  DEPOSIT_CERTIFICATE: { ar: 'شهادة الوديعة', en: 'Deposit certificate' },
  MATURITY_CORRESPONDENCE: { ar: 'مراسلات الاستحقاق', en: 'Maturity correspondence' },
}

/**
 * Prototype file reference (domain-model.md — Attachment). Lightweight local
 * placeholder files only; realistic Arabic filenames; the UI labels them as
 * prototype documents.
 */
export interface Attachment {
  readonly id: string
  readonly entityType: EntityType
  readonly entityId: string
  readonly category: AttachmentCategory
  readonly fileName: string
  readonly fileType: string
  readonly fileSizeBytes: number
  readonly fileUrl: string
  readonly uploadedByUserId: string
  readonly uploadedAt: IsoDateString
  readonly isRequired: boolean
  readonly validationStatus: 'VALID' | 'PENDING_REVIEW'
  /** Workspace section context (08-04 §19 attachment register grouping). */
  readonly sectionKey: SectionKey | null
}

/** Note visibility (plan PD-03) — a single tier, extensible later. */
export const noteVisibilities = ['INTERNAL'] as const

export type NoteVisibility = (typeof noteVisibilities)[number]

export const noteVisibilityLabels: Record<NoteVisibility, ValueLabels> = {
  INTERNAL: { ar: 'ملاحظة داخلية', en: 'Internal' },
}

/**
 * Contextual annotation on a request or deposit (plan §4.25 — gap G-01).
 * Append-only; never a substitute for mandatory return reasons.
 */
export interface Note {
  readonly id: string
  readonly entityType: EntityType
  readonly entityId: string
  readonly authorUserId: string
  readonly authorRoleId: RoleCode
  readonly body: string
  readonly visibility: NoteVisibility
  readonly createdAt: IsoDateString
  readonly sectionKey: SectionKey | null
}

/** Activity types (plan §3.16; mock-data-requirements.md activity list). */
export const activityTypes = [
  'REQUEST_CREATED',
  'SECTION_COMPLETED',
  'RFQ_SENT',
  'OFFER_RECEIVED',
  'OFFER_UPDATED',
  'RECOMMENDATION_SUBMITTED',
  'REQUEST_SUBMITTED',
  'REQUEST_APPROVED',
  'REQUEST_RETURNED',
  'REQUEST_REJECTED',
  'REQUEST_CANCELLED',
  'REQUEST_RESUBMITTED',
  'WINNING_BANK_COMPLETED',
  'SUPPORT_REVIEW_COMPLETED',
  'FINANCE_REVIEW_COMPLETED',
  'EXECUTION_RECORDED',
  'DEPOSIT_ACTIVATED',
  'ATTACHMENT_ADDED',
  'NOTE_ADDED',
  'MATURITY_DECISION_RECORDED',
  'DEPOSIT_CLOSED',
  'DEPOSIT_BROKEN',
  'REINVESTMENT_REQUEST_CREATED',
  'DATA_UPDATED',
] as const

export type ActivityType = (typeof activityTypes)[number]

export const activityTypeLabels: Record<ActivityType, ValueLabels> = {
  REQUEST_CREATED: { ar: 'إنشاء الطلب', en: 'Request created' },
  SECTION_COMPLETED: { ar: 'استكمال قسم', en: 'Section completed' },
  RFQ_SENT: { ar: 'إرسال طلب عروض الأسعار', en: 'RFQ sent' },
  OFFER_RECEIVED: { ar: 'استلام عرض بنكي', en: 'Offer received' },
  OFFER_UPDATED: { ar: 'تحديث عرض بنكي', en: 'Offer updated' },
  RECOMMENDATION_SUBMITTED: { ar: 'تسجيل التوصية', en: 'Recommendation submitted' },
  REQUEST_SUBMITTED: { ar: 'إرسال الطلب للاعتماد', en: 'Request submitted' },
  REQUEST_APPROVED: { ar: 'اعتماد الطلب', en: 'Request approved' },
  REQUEST_RETURNED: { ar: 'إعادة الطلب للاستكمال', en: 'Request returned' },
  REQUEST_REJECTED: { ar: 'رفض الطلب', en: 'Request rejected' },
  REQUEST_CANCELLED: { ar: 'إلغاء الطلب', en: 'Request cancelled' },
  REQUEST_RESUBMITTED: { ar: 'إعادة إرسال الطلب', en: 'Request resubmitted' },
  WINNING_BANK_COMPLETED: {
    ar: 'استكمال بيانات البنك الفائز',
    en: 'Winning-bank details completed',
  },
  SUPPORT_REVIEW_COMPLETED: {
    ar: 'إتمام مراجعة دعم الاستثمار',
    en: 'Investment Support review completed',
  },
  FINANCE_REVIEW_COMPLETED: {
    ar: 'إتمام مراجعة الإدارة المالية',
    en: 'Finance review completed',
  },
  EXECUTION_RECORDED: { ar: 'تنفيذ التحويل المحاسبي', en: 'Accounting execution recorded' },
  DEPOSIT_ACTIVATED: { ar: 'تفعيل الوديعة', en: 'Deposit activated' },
  ATTACHMENT_ADDED: { ar: 'إضافة مرفق', en: 'Attachment added' },
  NOTE_ADDED: { ar: 'إضافة ملاحظة', en: 'Note added' },
  MATURITY_DECISION_RECORDED: { ar: 'تسجيل قرار الاستحقاق', en: 'Maturity decision recorded' },
  DEPOSIT_CLOSED: { ar: 'إغلاق الوديعة', en: 'Deposit closed' },
  DEPOSIT_BROKEN: { ar: 'كسر الوديعة قبل الاستحقاق', en: 'Deposit broken early' },
  REINVESTMENT_REQUEST_CREATED: {
    ar: 'إنشاء طلب إعادة استثمار',
    en: 'Reinvestment request created',
  },
  DATA_UPDATED: { ar: 'تعديل بيانات بعد الإرسال', en: 'Post-submission data update' },
}

/**
 * Immutable audit-style event (domain-model.md — Activity). Append-only;
 * every material action writes exactly one entry; history entries record
 * previous status, new status, actor, role, timestamp, and comment
 * (statuses-and-transitions.md Transition Controls).
 */
export interface AuditEntry {
  readonly id: string
  readonly entityType: EntityType
  readonly entityId: string
  readonly activityType: ActivityType
  readonly title: string
  readonly description: string | null
  readonly actorUserId: string
  readonly actorRoleId: RoleCode
  readonly occurredAt: IsoDateString
  readonly previousStatus: InvestmentRequestStatus | null
  readonly newStatus: InvestmentRequestStatus | null
  readonly comment: string | null
  readonly metadata: Readonly<Record<string, string>> | null
}

/** Timeline alias — activity entries feed the workspace timeline directly. */
export type TimelineEvent = AuditEntry

/**
 * Role-directed projection of a workflow event (plan §4.27 — gap G-02).
 * Not a parallel messaging system and never confused with tasks.
 */
export interface AppNotification {
  readonly id: string
  readonly recipientRoleId: RoleCode
  readonly recipientUserId: string | null
  /** Link to the source activity entry. */
  readonly eventActivityId: string
  readonly titleAr: string
  readonly entityType: EntityType
  readonly entityId: string
  readonly createdAt: IsoDateString
  readonly isRead: boolean
}
