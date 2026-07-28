import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface PageContainerProps {
  /**
   * `standard` — readable maximum (1280px) for lists and dashboards.
   * `wide` — 1600px for workspace, comparison, and dense-data pages.
   */
  width?: 'standard' | 'wide'
  children: ReactNode
  className?: string
}

/** Responsive content container with the documented gutters (token plan §11). */
export function PageContainer({ width = 'standard', children, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 py-5 md:px-5 md:py-7 lg:px-7 lg:py-8 2xl:px-8',
        width === 'standard'
          ? 'max-w-[var(--layout-content-max-standard)]'
          : 'max-w-[var(--layout-content-max-wide)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
