import { Bell, Languages, Menu } from 'lucide-react'
import { useLocation } from 'react-router'

import { useUser } from '@/app/user-context'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { UserSwitcher } from '@/layouts/UserSwitcher'

interface TopHeaderProps {
  currentPageLabel: string
  onOpenMobileNav: () => void
}

/** Compact utility header aligned with the EF internal-portal frame. */
export function TopHeader({ currentPageLabel, onOpenMobileNav }: TopHeaderProps) {
  const { pathname } = useLocation()
  const { user } = useUser()
  const isDashboard = pathname === '/'
  const firstName = user.nameAr.split(' ')[0]

  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-shell)] h-[var(--layout-header-height)] shrink-0',
        'border-b border-divider-soft bg-canvas',
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
          <p
            className={cn(
              'truncate font-bold tracking-[-0.02em] text-text-primary',
              isDashboard ? 'text-[26px] leading-9 md:text-[30px] md:leading-10' : 'text-h3',
            )}
          >
            {isDashboard ? `مرحبًا، ${firstName}!` : currentPageLabel}
          </p>
          {!isDashboard && (
            <p className="hidden text-small text-text-muted sm:block">منصة إدارة الودائع الاستثمارية</p>
          )}
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
