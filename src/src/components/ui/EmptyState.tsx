import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'

interface EmptyStateProps {
  icon?: LucideIcon
  /** What is absent. */
  title: string
  /** Why that may be expected, and what the user can do next (00-shared §12). */
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-12 text-center', className)}>
      {icon && (
        <div className="mb-4 flex size-16 items-center justify-center rounded-lg bg-surface-subtle text-text-secondary">
          <Icon icon={icon} size="xl" />
        </div>
      )}
      <h3 className="text-h3 font-semibold text-text-primary">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-body text-text-secondary">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
