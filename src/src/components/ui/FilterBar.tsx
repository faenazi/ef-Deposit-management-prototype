import type { ReactNode } from 'react'
import { Search, X } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { fieldClass } from '@/components/ui/Input'

interface FilterBarProps {
  children: ReactNode
  className?: string
}

/** Persistent high-frequency filters above content; must not dominate the page. */
export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div role="search" className={cn('flex flex-wrap items-center gap-3', className)}>
      {children}
    </div>
  )
}

interface SearchFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SearchField({ label, value, onChange, className }: SearchFieldProps) {
  return (
    <div className={cn('relative w-64 max-w-full', className)}>
      <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-text-muted">
        <Icon icon={Search} size="sm" />
      </span>
      <input
        type="search"
        aria-label={label}
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(fieldClass, 'h-10 ps-9')}
      />
    </div>
  )
}

interface FilterChipProps {
  label: string
  onRemove: () => void
}

/** Active-filter chip with a remove affordance. */
export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border-default bg-surface px-3 py-1 text-small text-text-primary">
      {label}
      <button
        type="button"
        aria-label={`إزالة عامل التصفية: ${label}`}
        onClick={onRemove}
        className="rounded-full p-0.5 text-text-muted hover:text-text-primary"
      >
        <Icon icon={X} size="xs" />
      </button>
    </span>
  )
}
