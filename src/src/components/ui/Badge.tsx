import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'

/**
 * Visual recipes per token plan §5 / 03-color-system.md §5.
 * The exact workflow-status-code → variant mapping is completed in Step 07
 * against docs/02-business/statuses-and-transitions.md; no new colors may be
 * introduced there.
 */
export type BadgeVariant =
  | 'neutral-outline'
  | 'info-soft'
  | 'secondary-blue'
  | 'warning'
  | 'success-restrained'
  | 'danger'
  | 'primary'
  | 'neutral-dark'
  | 'neutral'

const variantClass: Record<BadgeVariant, string> = {
  'neutral-outline': 'text-text-secondary bg-transparent border border-border-strong',
  'info-soft': 'text-info-text bg-info-bg border border-info-border/40',
  'secondary-blue': 'text-action-secondary bg-info-bg border border-transparent',
  warning: 'text-warning-text bg-warning-bg border border-warning-border/40',
  'success-restrained': 'text-success-text bg-success-bg border border-success-border/60',
  danger: 'text-danger-text bg-danger-bg border border-danger-border/40',
  primary: 'text-action-primary bg-surface-brand-soft border border-transparent',
  'neutral-dark': 'text-text-primary bg-canvas border border-border-default',
  neutral: 'text-text-secondary bg-canvas border border-border-default',
}

interface BadgeProps {
  variant?: BadgeVariant
  icon?: LucideIcon
  className?: string
  /** Exact canonical Arabic label — color alone is prohibited. */
  children: ReactNode
}

export function Badge({ variant = 'neutral', icon, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-xs px-2 py-0.5 text-small font-medium whitespace-nowrap',
        variantClass[variant],
        className,
      )}
    >
      {icon && <Icon icon={icon} size="xs" />}
      {children}
    </span>
  )
}

interface CountIndicatorProps {
  count: number
  /** Context for assistive technology, e.g. "إشعارات غير مقروءة". */
  label: string
  className?: string
}

/** Compact, restrained count for navigation and notification affordances. */
export function CountIndicator({ count, label, className }: CountIndicatorProps) {
  if (count <= 0) return null
  return (
    <span
      aria-label={`${label}: ${count}`}
      className={cn(
        'ef-financial inline-flex h-5 min-w-5 items-center justify-center rounded-full',
        'bg-action-primary px-1.5 text-small font-semibold text-text-inverse',
        className,
      )}
    >
      {count > 99 ? '+99' : count}
    </span>
  )
}
