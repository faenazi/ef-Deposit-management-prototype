import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'

interface TimelineProps {
  children: ReactNode
  className?: string
}

/** Vertical activity/approval timeline (traceability primitive, token plan §15). */
export function Timeline({ children, className }: TimelineProps) {
  return <ol className={cn('space-y-0', className)}>{children}</ol>
}

type TimelineTone = 'default' | 'success' | 'warning' | 'danger'

const toneClass: Record<TimelineTone, string> = {
  default: 'bg-surface-brand-soft text-action-primary',
  success: 'bg-success-bg text-success-text',
  warning: 'bg-warning-bg text-warning-text',
  danger: 'bg-danger-bg text-danger-text',
}

interface TimelineItemProps {
  icon: LucideIcon
  tone?: TimelineTone
  /** e.g. the action name. */
  title: string
  /** Actor and timestamp — every important action exposes both (DNA: traceability). */
  meta?: string
  children?: ReactNode
  isLast?: boolean
}

export function TimelineItem({ icon, tone = 'default', title, meta, children, isLast = false }: TimelineItemProps) {
  return (
    <li className="relative flex gap-3 pb-6 last:pb-0">
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute start-[15px] top-8 bottom-0 w-px bg-border-default"
        />
      )}
      <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-full', toneClass[tone])}>
        <Icon icon={icon} size="sm" />
      </span>
      <div className="min-w-0 pt-1">
        <p className="text-body font-medium text-text-primary">{title}</p>
        {meta && <p className="mt-0.5 text-small text-text-secondary">{meta}</p>}
        {children && <div className="mt-2 text-body text-text-secondary">{children}</div>}
      </div>
    </li>
  )
}
