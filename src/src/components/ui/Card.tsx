import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'default' | 'compact' | 'none'
  children: ReactNode
}

/** Primary operational surface used by EF internal modules. */
export function Card({ padding = 'default', className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-divider-soft bg-surface shadow-xs',
        padding === 'default' && 'p-5 md:p-6',
        padding === 'compact' && 'p-4 md:p-5',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

interface SectionHeadingProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function SectionHeading({ title, description, action, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-4 flex flex-wrap items-start justify-between gap-3', className)}>
      <div className="min-w-0">
        <h3 className="text-h3 font-bold tracking-[-0.01em] text-action-primary">{title}</h3>
        {description && <p className="mt-1 text-body text-text-secondary">{description}</p>}
      </div>
      {action}
    </div>
  )
}
