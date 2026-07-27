import { Bell, Menu } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { prototypeUsers, type PrototypeUser } from '@/app/prototype-users'

interface TopHeaderProps {
  /** Current location label shown as product context. */
  currentPageLabel: string
  activeUser: PrototypeUser
  onUserChange: (user: PrototypeUser) => void
  onOpenMobileNav: () => void
}

/**
 * Calm global header: product location, prototype role switcher (wired to the
 * real role context in Step 06), demo notifications affordance, user identity.
 */
export function TopHeader({
  currentPageLabel,
  activeUser,
  onUserChange,
  onOpenMobileNav,
}: TopHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-shell)] flex h-[var(--layout-header-height)] shrink-0 items-center gap-3',
        'border-b border-border-default bg-surface px-4 md:px-5 lg:px-6',
      )}
    >
      <button
        type="button"
        aria-label="فتح قائمة التنقل"
        onClick={onOpenMobileNav}
        className="flex size-10 items-center justify-center rounded-sm text-text-secondary hover:bg-surface-subtle hover:text-text-primary lg:hidden"
      >
        <Icon icon={Menu} size="md" />
      </button>

      <div className="min-w-0">
        <p className="truncate text-small text-text-secondary">منصة إدارة الودائع الاستثمارية</p>
        <p className="truncate text-body font-semibold text-text-primary">{currentPageLabel}</p>
      </div>

      <div className="ms-auto flex items-center gap-2 md:gap-3">
        <label className="hidden items-center gap-2 md:flex">
          <span className="text-small text-text-secondary">المستخدم التجريبي</span>
          <select
            aria-label="تبديل المستخدم التجريبي"
            value={activeUser.id}
            onChange={(event) => {
              const user = prototypeUsers.find((candidate) => candidate.id === event.target.value)
              if (user) onUserChange(user)
            }}
            className={cn(
              'h-9 max-w-52 cursor-pointer rounded-sm border border-border-strong bg-surface px-2 text-body',
              'text-text-primary hover:border-text-muted',
            )}
          >
            {prototypeUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} — {user.jobTitle}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          aria-label="الإشعارات"
          title="الإشعارات"
          className="relative flex size-10 items-center justify-center rounded-sm text-text-secondary hover:bg-surface-subtle hover:text-text-primary"
        >
          <Icon icon={Bell} size="md" />
          {/* Demo unread indicator; the notification model arrives in Step 07. */}
          <span
            aria-hidden="true"
            className="absolute end-2 top-2 size-2 rounded-full bg-action-secondary"
          />
        </button>

        <div className="flex items-center gap-2 border-s border-border-default ps-3">
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-full bg-surface-brand-soft text-body font-semibold text-action-primary"
          >
            {activeUser.name.charAt(0)}
          </span>
          <div className="hidden min-w-0 lg:block">
            <p className="truncate text-body font-semibold text-text-primary">{activeUser.name}</p>
            <p className="truncate text-small text-text-secondary">{activeUser.jobTitle}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
