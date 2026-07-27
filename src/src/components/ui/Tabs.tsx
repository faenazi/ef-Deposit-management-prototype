import { useId, useState, type KeyboardEvent, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface TabItem {
  key: string
  label: string
  content: ReactNode
  disabled?: boolean
}

interface TabsProps {
  items: TabItem[]
  defaultKey?: string
  className?: string
}

/**
 * Accessible tabs with RTL arrow-key navigation. Content changes without
 * horizontal sliding (08-motion-system.md §5).
 */
export function Tabs({ items, defaultKey, className }: TabsProps) {
  const baseId = useId()
  const enabled = items.filter((item) => !item.disabled)
  const [activeKey, setActiveKey] = useState(defaultKey ?? enabled[0]?.key)
  const active = items.find((item) => item.key === activeKey)

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = enabled.findIndex((item) => item.key === activeKey)
    if (index === -1) return
    let next: number | null = null
    // RTL: ArrowLeft advances, ArrowRight goes back.
    if (event.key === 'ArrowLeft') next = (index + 1) % enabled.length
    if (event.key === 'ArrowRight') next = (index - 1 + enabled.length) % enabled.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = enabled.length - 1
    if (next !== null) {
      event.preventDefault()
      setActiveKey(enabled[next].key)
      document.getElementById(`${baseId}-tab-${enabled[next].key}`)?.focus()
    }
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        onKeyDown={onKeyDown}
        className="flex gap-1 overflow-x-auto border-b border-border-default"
      >
        {items.map((item) => {
          const selected = item.key === activeKey
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.key}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.key}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => setActiveKey(item.key)}
              className={cn(
                '-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-body font-medium',
                'transition-colors duration-[var(--motion-fast)]',
                selected
                  ? 'border-action-primary text-action-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary',
                item.disabled && 'cursor-not-allowed text-text-disabled hover:text-text-disabled',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {active && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${active.key}`}
          aria-labelledby={`${baseId}-tab-${active.key}`}
          className="ef-motion-fade-in pt-4"
        >
          {active.content}
        </div>
      )}
    </div>
  )
}
