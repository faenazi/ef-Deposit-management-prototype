import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface PageHeaderProps {
  /** Optional eyebrow/breadcrumb line above the title. */
  eyebrow?: string
  title: string
  description?: string
  /** One obvious primary action per page (CLAUDE.md §8). */
  primaryAction?: ReactNode
  secondaryActions?: ReactNode
  /** Contextual metadata (status badge, identifiers) under the title. */
  meta?: ReactNode
  className?: string
}

export function PageHeader({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryActions,
  meta,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-6 flex flex-wrap items-start justify-between gap-4 lg:mb-8', className)}>
      <div className="min-w-0">
        {eyebrow && <p className="mb-1 text-small font-medium text-text-secondary">{eyebrow}</p>}
        <h1 className="text-h1 font-bold text-text-primary">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-body-lg text-text-secondary">{description}</p>
        )}
        {meta && <div className="mt-3 flex flex-wrap items-center gap-2">{meta}</div>}
      </div>
      {(primaryAction || secondaryActions) && (
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {secondaryActions}
          {primaryAction}
        </div>
      )}
    </div>
  )
}
