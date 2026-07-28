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
    <div className={cn('mb-4 flex flex-wrap items-start justify-between gap-3 md:mb-5 md:gap-4', className)}>
      <div className="min-w-0">
        <h3 className="text-h3 font-bold tracking-[-0.015em] text-action-primary md:text-h2">{title}</h3>
        {description && (
          <p className="mt-1 max-w-2xl text-small leading-5 text-text-secondary md:mt-1.5 md:text-body md:leading-6">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
