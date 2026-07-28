import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface PageContainerProps {
  width?: 'standard' | 'wide'
  children: ReactNode
  className?: string
}

/** Content frame aligned to the 1136px EF Figma workspace. */
export function PageContainer({ width = 'standard', children, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 pb-8 pt-5 md:px-5 md:pb-10 md:pt-7 lg:px-0 lg:pb-12 lg:pt-8',
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
