import { Bell, Languages, Menu } from 'lucide-react'
import type { RefObject } from 'react'

import { Icon } from '@/components/ui/Icon'
import { UserSwitcher } from '@/layouts/UserSwitcher'

interface TopHeaderProps {
  currentPageLabel: string
  onOpenMobileNav: () => void
  menuButtonRef: RefObject<HTMLButtonElement | null>
}

/** Compact utility header aligned with the EF internal-portal frame. */
export function TopHeader({
  currentPageLabel,
  onOpenMobileNav,
  menuButtonRef,
}: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-[var(--z-shell)] h-[var(--layout-header-height)] shrink-0 border-b border-divider-soft bg-canvas/95 backdrop-blur-md">
      <div className="mx-auto flex h-full w-full max-w-[var(--layout-content-max-standard)] items-center gap-2.5 px-4 md:px-5 lg:px-0">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="فتح قائمة التنقل"
          aria-haspopup="dialog"
          onClick={onOpenMobileNav}
          className="flex size-11 shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface hover:text-text-primary lg:hidden"
        >
          <Icon icon={Menu} size="md" />
        </button>

        <div className="min-w-0">
          <p className="truncate text-[17px] font-bold leading-7 tracking-[-0.015em] text-text-primary md:text-h3">
            {currentPageLabel}
          </p>
          <p className="hidden text-small text-text-muted lg:block">منصة إدارة الودائع الاستثمارية</p>
        </div>

        <div className="ms-auto flex items-center gap-0.5 sm:gap-1.5">
          <button
            type="button"
            aria-label="تغيير اللغة"
            title="تغيير اللغة"
            className="hidden size-11 items-center justify-center rounded-md border border-transparent text-text-secondary hover:border-border-default hover:bg-surface lg:flex"
          >
            <Icon icon={Languages} size="md" />
          </button>

          <button
            type="button"
            aria-label="الإشعارات"
            title="الإشعارات"
            className="relative flex size-11 items-center justify-center rounded-md border border-transparent text-text-secondary hover:border-border-default hover:bg-surface hover:text-text-primary"
          >
            <Icon icon={Bell} size="md" />
            <span
              aria-hidden="true"
              className="absolute end-2 top-2 size-2 rounded-full bg-danger-border ring-2 ring-canvas"
            />
          </button>

          <div className="sm:border-s sm:border-border-default sm:ps-2">
            <UserSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
