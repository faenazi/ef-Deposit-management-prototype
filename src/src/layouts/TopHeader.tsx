import { Bell, Languages, Menu } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { UserSwitcher } from '@/layouts/UserSwitcher'

interface TopHeaderProps {
  currentPageLabel: string
  onOpenMobileNav: () => void
}

/** Compact utility header aligned with the EF internal-portal frame. */
export function TopHeader({ currentPageLabel, onOpenMobileNav }: TopHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-shell)] h-[var(--layout-header-height)] shrink-0',
        'bg-canvas/95 backdrop-blur-sm',
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-[var(--layout-content-max-standard)] items-center gap-3 px-4 md:px-5 lg:px-0">
        <button
          type="button"
          aria-label="فتح قائمة التنقل"
          onClick={onOpenMobileNav}
          className="flex size-10 items-center justify-center rounded-full text-text-secondary hover:bg-surface hover:text-text-primary lg:hidden"
        >
          <Icon icon={Menu} size="md" />
        </button>

        <div className="min-w-0">
          <p className="truncate text-h3 font-bold text-text-primary">{currentPageLabel}</p>
          <p className="hidden text-small text-text-muted sm:block">منصة إدارة الودائع الاستثمارية</p>
        </div>

        <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="تغيير اللغة"
            title="تغيير اللغة"
            className="hidden size-10 items-center justify-center rounded-full border border-transparent text-text-secondary hover:border-border-default hover:bg-surface sm:flex"
          >
            <Icon icon={Languages} size="md" />
          </button>

          <button
            type="button"
            aria-label="الإشعارات"
            title="الإشعارات"
            className="relative flex size-10 items-center justify-center rounded-full border border-transparent text-text-secondary hover:border-border-default hover:bg-surface hover:text-text-primary"
          >
            <Icon icon={Bell} size="md" />
            <span
              aria-hidden="true"
              className="absolute end-2 top-2 size-2 rounded-full bg-danger-border ring-2 ring-canvas"
            />
          </button>

          <div className="border-s border-border-default ps-2 sm:ps-3">
            <UserSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
