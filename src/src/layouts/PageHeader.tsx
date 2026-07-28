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
    <div className={cn('mb-6 flex flex-wrap items-start justify-between gap-5 lg:mb-7', className)}>
      <div className="min-w-0 max-w-3xl">
        {eyebrow && (
          <p className="mb-1.5 text-small font-semibold tracking-wide text-action-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="text-h1 font-bold tracking-[-0.02em] text-text-primary">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-body text-text-secondary md:text-body-lg">
            {description}
          </p>
        )}
        {meta && <div className="mt-3 flex flex-wrap items-center gap-2">{meta}</div>}
      </div>
      {(primaryAction || secondaryActions) && (
        <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto">
          {secondaryActions}
          {primaryAction}
        </div>
      )}
    </div>
  )
}
