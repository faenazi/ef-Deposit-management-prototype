import { cn } from '@/lib/cn'
import { formatNumber } from '@/lib/format'

interface CompletionIndicatorProps {
  /** 0–100. Determinate only — never simulate false progress (08-motion §7). */
  percent: number
  label: string
  showValue?: boolean
  className?: string
}

/**
 * RTL completion indicator for draft-preparation readiness
 * (CLAUDE.md §11: section completion and overall completion percentage).
 */
export function CompletionIndicator({
  percent,
  label,
  showValue = true,
  className,
}: CompletionIndicatorProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(percent)))
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-small font-medium text-text-secondary">{label}</span>
        {showValue && (
          <span className="ef-financial text-small font-semibold text-text-primary">
            {formatNumber(clamped)}%
          </span>
        )}
      </div>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-1.5 overflow-hidden rounded-full bg-surface-subtle"
      >
        {/* Progress advances right-to-left with the RTL flow (token plan §14). */}
        <div
          className="h-full rounded-full bg-action-primary transition-[width] duration-[var(--motion-standard)]"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
