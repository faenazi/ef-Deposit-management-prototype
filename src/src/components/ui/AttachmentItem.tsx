import { Paperclip } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'

interface AttachmentItemProps {
  /** File display name — never truncated ambiguously. */
  name: string
  /** e.g. "PDF · 1.2 م.ب · رُفع في 14 يوليو 2026". */
  meta?: string
  /** Row actions (download/remove) rendered at the logical end. */
  actions?: ReactNode
  className?: string
}

/** Attachment row primitive shared by liquidity, offers, and execution sections. */
export function AttachmentItem({ name, meta, actions, className }: AttachmentItemProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-sm border border-border-default bg-surface p-3',
        className,
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-surface-subtle text-text-secondary">
        <Icon icon={Paperclip} size="sm" />
      </span>
      <div className="min-w-0 grow">
        <p className="truncate text-body font-medium text-text-primary" title={name}>
          {name}
        </p>
        {meta && <p className="text-small text-text-secondary">{meta}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
    </div>
  )
}
