import type { Task, TaskActionCode, TaskPriority } from '@/domain/task'
import type { InvestmentRequestStatus } from '@/domain/investment-request'
import type { RoleCode } from '@/domain/roles'
import type { EntityType } from '@/domain/common'
import { getStageSlaDueDate, responsibleRoleForStatus, stageForStatus } from '@/domain/business-rules'
import type { SystemSettings } from '@/domain/settings'
import { addBusinessDays } from '@/lib/dates'

/**
 * Task fixtures (my-tasks.md): tasks originate only from workflow events —
 * no user-created tasks. Due dates come from the stage SLA (DEC-017 #4);
 * overdue/due-today/upcoming are derived, never persisted.
 */

/** Fixture default for preparation tasks (no SLA is defined for drafting). */
const PREPARATION_DUE_BUSINESS_DAYS = 3

interface WorkflowTaskShape {
  readonly actionCode: TaskActionCode
  readonly title: string
  readonly description: string
  /** Group task for the Deposit Specialists group (no assigned user). */
  readonly groupTask?: boolean
}

const taskShapeByStatus: Partial<Record<InvestmentRequestStatus, WorkflowTaskShape>> = {
  DRAFT: {
    actionCode: 'PREPARE_DRAFT',
    title: 'استكمال إعداد طلب الاستثمار',
    description: 'استكمال أقسام المسودة والتحقق من جاهزية الطلب قبل الإرسال للاعتماد.',
  },
  RETURNED_FOR_COMPLETION: {
    actionCode: 'COMPLETE_RETURNED_REQUEST',
    title: 'معالجة طلب معاد للاستكمال',
    description: 'مراجعة سبب الإعادة، استكمال النواقص، وإعادة إرسال الطلب.',
  },
  PENDING_TREASURY_GM_APPROVAL: {
    actionCode: 'APPROVE_TREASURY_GM',
    title: 'مراجعة واعتماد طلب استثمار',
    description: 'مراجعة التوصية والمقارنة وأثر التركز واتخاذ قرار الاعتماد.',
  },
  PENDING_EXECUTIVE_APPROVAL: {
    actionCode: 'APPROVE_EXECUTIVE',
    title: 'اعتماد تنفيذي لطلب يتجاوز حد الصلاحية',
    description: 'مراجعة طلب يتجاوز 100 مليون ريال واتخاذ القرار التنفيذي.',
  },
  PENDING_WINNING_BANK_COMPLETION: {
    actionCode: 'COMPLETE_WINNING_BANK',
    title: 'استكمال بيانات البنك الفائز',
    description: 'إدخال بيانات البنك الفائز والآيبان وإرفاق الشهادة ثم الإحالة لدعم الاستثمار.',
    groupTask: true,
  },
  PENDING_INVESTMENT_SUPPORT_REVIEW: {
    actionCode: 'REVIEW_INVESTMENT_SUPPORT',
    title: 'مراجعة دعم الاستثمار',
    description: 'التحقق من اكتمال المستندات ومطابقة بيانات البنك الفائز للتوصية المعتمدة.',
  },
  PENDING_FINANCE_REVIEW: {
    actionCode: 'REVIEW_FINANCE',
    title: 'إتمام المراجعة المالية',
    description: 'التحقق من توفر السيولة وبيانات المستفيد والاعتماد لتنفيذ التحويل.',
  },
  PENDING_ACCOUNTING_EXECUTION: {
    actionCode: 'EXECUTE_ACCOUNTING',
    title: 'تنفيذ التحويل المحاسبي',
    description: 'تسجيل مراجع القيد والدفع وإرفاق إيصال التحويل وتأكيد التنفيذ.',
  },
  PENDING_DEPOSIT_ACTIVATION: {
    actionCode: 'CONFIRM_ACTIVATION',
    title: 'تأكيد تفعيل الوديعة',
    description: 'التحقق من مرجع الوديعة وشهادتها لدى البنك وتأكيد التفعيل.',
    groupTask: true,
  },
}

export interface BuildOpenRequestTaskArgs {
  readonly nextId: () => string
  readonly status: InvestmentRequestStatus
  readonly requestId: string
  readonly requestTitle: string
  readonly priority: TaskPriority
  readonly stageEnteredDay: string
  readonly assignedUserId: string | null
  readonly returnReason: string | null
  readonly settings: SystemSettings
  readonly ts: (day: string, hour: number) => string
}

/** The single OPEN workflow task for one in-flight request. */
export function buildOpenRequestTask(args: BuildOpenRequestTaskArgs): Task | null {
  const shape = taskShapeByStatus[args.status]
  const role = responsibleRoleForStatus[args.status]
  if (shape === undefined || role === null) {
    return null
  }
  const stage = stageForStatus[args.status]
  const dueDay =
    getStageSlaDueDate(stage, args.stageEnteredDay, args.settings) ??
    addBusinessDays(args.stageEnteredDay, PREPARATION_DUE_BUSINESS_DAYS)
  return {
    id: args.nextId(),
    type: shape.actionCode,
    title: `${shape.title} — ${args.requestTitle}`,
    description: shape.description,
    entityType: 'INVESTMENT_REQUEST',
    entityId: args.requestId,
    assignedRoleId: role,
    assignedUserId: shape.groupTask === true ? null : args.assignedUserId,
    priority: args.priority,
    status: 'OPEN',
    dueAt: dueDay,
    createdAt: args.ts(args.stageEnteredDay, 9),
    completedAt: null,
    completedByUserId: null,
    actionCode: shape.actionCode,
    returnReason: args.returnReason,
  }
}

export interface BuildCompletedTaskArgs {
  readonly nextId: () => string
  readonly forStatus: InvestmentRequestStatus
  readonly requestId: string
  readonly requestTitle: string
  readonly priority: TaskPriority
  readonly enteredDay: string
  readonly completedDay: string
  readonly completedByUserId: string
  readonly settings: SystemSettings
  readonly ts: (day: string, hour: number) => string
  readonly cancelled?: boolean
}

/** A historical (completed or cancelled) workflow task. */
export function buildClosedRequestTask(args: BuildCompletedTaskArgs): Task | null {
  const shape = taskShapeByStatus[args.forStatus]
  const role = responsibleRoleForStatus[args.forStatus]
  if (shape === undefined || role === null) {
    return null
  }
  const stage = stageForStatus[args.forStatus]
  const dueDay =
    getStageSlaDueDate(stage, args.enteredDay, args.settings) ??
    addBusinessDays(args.enteredDay, PREPARATION_DUE_BUSINESS_DAYS)
  return {
    id: args.nextId(),
    type: shape.actionCode,
    title: `${shape.title} — ${args.requestTitle}`,
    description: shape.description,
    entityType: 'INVESTMENT_REQUEST',
    entityId: args.requestId,
    assignedRoleId: role,
    assignedUserId: args.cancelled === true ? null : args.completedByUserId,
    priority: args.priority,
    status: args.cancelled === true ? 'CANCELLED' : 'COMPLETED',
    dueAt: dueDay,
    createdAt: args.ts(args.enteredDay, 9),
    completedAt: args.cancelled === true ? null : args.ts(args.completedDay, 13),
    completedByUserId: args.cancelled === true ? null : args.completedByUserId,
    actionCode: shape.actionCode,
    returnReason: null,
  }
}

export interface BuildDepositTaskArgs {
  readonly nextId: () => string
  readonly actionCode: Extract<TaskActionCode, 'REVIEW_NEAR_MATURITY' | 'PROCESS_MATURED_DEPOSIT'>
  readonly depositId: string
  readonly depositLabel: string
  readonly priority: TaskPriority
  readonly createdDay: string
  readonly dueDay: string
  readonly assignedUserId: string | null
  readonly ts: (day: string, hour: number) => string
}

/** Maturity follow-up tasks for the Deposit Specialists group. */
export function buildDepositTask(args: BuildDepositTaskArgs): Task {
  const nearMaturity = args.actionCode === 'REVIEW_NEAR_MATURITY'
  return {
    id: args.nextId(),
    type: args.actionCode,
    title: nearMaturity
      ? `مراجعة وديعة تقترب من الاستحقاق — ${args.depositLabel}`
      : `معالجة وديعة مستحقة — ${args.depositLabel}`,
    description: nearMaturity
      ? 'مراجعة الوديعة قبل الاستحقاق وتحديد الإجراء: إغلاق أو إعادة استثمار أو تمديد المراجعة.'
      : 'الوديعة مستحقة وتتطلب تسجيل قرار الاستحقاق واستكمال الإجراء المعتمد.',
    entityType: 'DEPOSIT' satisfies EntityType,
    entityId: args.depositId,
    assignedRoleId: 'deposit-specialist' satisfies RoleCode,
    assignedUserId: args.assignedUserId,
    priority: args.priority,
    status: 'OPEN',
    dueAt: args.dueDay,
    createdAt: args.ts(args.createdDay, 9),
    completedAt: null,
    completedByUserId: null,
    actionCode: args.actionCode,
    returnReason: null,
  }
}
