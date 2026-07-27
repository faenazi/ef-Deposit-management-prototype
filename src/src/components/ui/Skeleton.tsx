import { cn } from '@/lib/cn'

interface SkeletonProps {
  className?: string
}

/** Calm neutral pulse; compose shapes matching the final layout (08-motion §7). */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('ef-motion-skeleton rounded-sm bg-surface-subtle', className)}
    />
  )
}

/** Layout-matching skeleton for table regions. */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-4" aria-hidden="true">
      <Skeleton className="h-5 w-1/3" />
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  )
}
