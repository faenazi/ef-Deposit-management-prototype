import { Bell, ChevronLeft, Menu } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { UserSwitcher } from '@/layouts/UserSwitcher'

interface TopHeaderProps {
  /** Current location label shown as product context. */
  currentPageLabel: string
  onOpenMobileNav: () => void
}

/**
 * Calm global header: product location, demo-mode label, notifications
 * affordance, and the prototype user switcher (which also carries the
 * current identity).
 */
export function TopHeader({ currentPageLabel, onOpenMobileNav }: TopHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-shell)] flex h-[var(--layout-header-height)] shrink-0 items-center gap-3',
        'border-b border-border-default bg-surface px-4 md:px-5 lg:px-7',
      )}
    >
      <button
        type="button"
        aria-label="فتح قائمة التنقل"
        onClick={onOpenMobileNav}
        className="flex size-10 items-center justify-center rounded-md text-text-secondary hover:bg-surface-subtle hover:text-text-primary lg:hidden"
      >
        <Icon icon={Menu} size="md" />
      </button>

      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-small text-text-secondary">
          <span className="hidden sm:inline">منصة إدارة الودائع الاستثمارية</span>
          <Icon icon={ChevronLeft} size="xs" className="hidden sm:inline-flex" />
          <span className="truncate font-semibold text-text-primary">{currentPageLabel}</span>
        </div>
      </div>

      <div className="ms-auto flex items-center gap-2 md:gap-3">
        <button
          type="button"
          aria-label="الإشعارات"
          title="الإشعارات"
          className="relative flex size-10 items-center justify-center rounded-md border border-transparent text-text-secondary hover:border-border-default hover:bg-surface-raised hover:text-text-primary"
        >
          <Icon icon={Bell} size="md" />
          {/* Demo unread indicator; the notification model arrives in Step 07. */}
          <span
            aria-hidden="true"
            className="absolute end-2 top-2 size-2 rounded-full bg-action-secondary"
          />
        </button>

        <div className="border-s border-border-default ps-2 md:ps-3">
          <UserSwitcher />
        </div>
      </div>
    </header>
  )
}
