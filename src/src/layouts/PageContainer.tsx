import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface PageContainerProps {
  width?: 'standard' | 'wide'
  children: ReactNode
  className?: string
}

/** Responsive EF workspace frame: fluid on laptops and bounded on wide displays. */
export function PageContainer({ width = 'standard', children, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 pb-8 pt-4 md:px-6 md:pb-10 md:pt-6 lg:px-8 lg:pb-12 lg:pt-7 xl:px-6',
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
