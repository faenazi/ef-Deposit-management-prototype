import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface StickyActionBarProps {
  /** Primary and contextual actions; keep restrained (00-shared §15). */
  children: ReactNode
  className?: string
}

/**
 * Sticky bottom action area for transaction-heavy pages. Restrained elevation
 * (--shadow-sticky) and safe-area padding so it never covers content.
 */
export function StickyActionBar({ children, className }: StickyActionBarProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-[var(--z-sticky)] -mx-4 mt-8 flex flex-wrap items-center justify-end gap-3',
        'border-t border-border-default bg-surface px-4 py-3 shadow-sticky sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
