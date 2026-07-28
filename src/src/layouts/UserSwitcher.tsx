import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, RotateCcw } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { rolePermissions } from '@/domain/permissions'
import { roles } from '@/domain/roles'
import { accessDeniedPath, canAccessRoute } from '@/app/route-access'
import { useUser } from '@/app/user-context'
import { defaultDemoUser, demoUsers, type DemoUser } from '@/mock-data/demo-users'

interface UserSwitcherProps {
  variant?: 'header' | 'drawer'
}

/**
 * Prototype user switcher (demo-users.md): presentation-grade identity control
 * in the top header. Shows the current identity and opens a panel listing the
 * eight primary demo users with name, job title, department, and role, plus a
 * one-click return to the default Deposit Specialist. Switching applies
 * immediately; if the current page is not permitted for the new role, the
 * user is taken to that role's default landing page (information-architecture
 * context rule).
 */
export function UserSwitcher({ variant = 'header' }: UserSwitcherProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { user, role, switchUser, resetToDefaultUser } = useUser()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isDrawer = variant === 'drawer'

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  /**
   * Close the panel and keep the user on a page valid for the new role:
   * leave pages the new role cannot access, and leave the access-denied page
   * itself since its denial no longer applies to the new identity.
   * `flushSync` commits the location change together with the pending user
   * change; otherwise the urgent user update renders first while the location
   * is still the restricted page, and the route guard would redirect to the
   * access-denied page before the deferred navigation lands.
   */
  const finishSwitch = (next: DemoUser) => {
    setOpen(false)
    triggerRef.current?.focus()
    if (
      pathname === accessDeniedPath ||
      !canAccessRoute(rolePermissions[next.roleCode], pathname)
    ) {
      navigate(next.defaultRoute, { replace: true, flushSync: true })
    }
  }

  const applyUser = (next: DemoUser) => {
    switchUser(next.id)
    finishSwitch(next)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`المستخدم التجريبي الحالي: ${user.nameAr} — ${role.nameAr}. تبديل المستخدم`}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'flex min-h-11 items-center gap-2 rounded-md text-start transition-colors',
          isDrawer
            ? 'w-full border border-white/10 bg-white/8 px-3 py-2.5 text-white hover:bg-white/12'
            : 'p-1 sm:px-1.5 hover:bg-surface-subtle',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-full text-body font-semibold',
            isDrawer ? 'bg-white/12 text-white' : 'bg-surface-brand-soft text-action-primary',
          )}
        >
          {user.nameAr.charAt(0)}
        </span>
        <span className={cn('min-w-0 grow', isDrawer ? 'block' : 'hidden lg:block')}>
          <span className={cn('block truncate text-body font-semibold', isDrawer ? 'text-white' : 'text-text-primary')}>
            {user.nameAr}
          </span>
          <span className={cn('block truncate text-small', isDrawer ? 'text-sidebar-text' : 'text-text-secondary')}>
            {role.nameAr}
          </span>
        </span>
        <Icon
          icon={ChevronDown}
          size="sm"
          className={cn(
            'transition-transform',
            open && 'rotate-180',
            isDrawer ? 'text-sidebar-text' : 'hidden text-text-secondary sm:block',
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            'z-[var(--z-popover)] mt-2 rounded-md border',
            isDrawer
              ? 'relative w-full border-white/10 bg-[rgba(15,24,34,0.2)] shadow-none'
              : 'absolute end-0 top-full w-80 max-w-[calc(100vw-2rem)] border-border-default bg-surface shadow-md',
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between gap-2 border-b px-4 py-3',
              isDrawer ? 'border-white/10' : 'border-border-default',
            )}
          >
            <div>
              <p className={cn('text-body font-semibold', isDrawer ? 'text-white' : 'text-text-primary')}>
                تبديل دور العرض
              </p>
              <p className={cn('mt-0.5 text-small', isDrawer ? 'text-sidebar-text' : 'text-text-secondary')}>
                اختر المستخدم لعرض مهامه وصلاحياته
              </p>
            </div>
            {!isDrawer && <Badge variant="primary">وضع العرض التجريبي</Badge>}
          </div>

          <ul
            className={cn('overflow-y-auto p-2', isDrawer ? 'max-h-[min(17rem,42vh)]' : 'max-h-[min(24rem,60vh)]')}
            aria-label="قائمة المستخدمين التجريبيين"
          >
            {demoUsers.map((candidate) => {
              const isCurrent = candidate.id === user.id
              return (
                <li key={candidate.id}>
                  <button
                    type="button"
                    aria-current={isCurrent}
                    onClick={() => applyUser(candidate)}
                    className={cn(
                      'flex min-h-11 w-full items-center gap-3 rounded-sm px-2.5 py-2 text-start',
                      isDrawer
                        ? isCurrent
                          ? 'bg-white/12'
                          : 'hover:bg-white/8'
                        : isCurrent
                          ? 'bg-surface-brand-soft'
                          : 'hover:bg-surface-subtle',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-full text-body font-semibold',
                        isDrawer ? 'bg-white/10 text-white' : 'bg-surface-subtle text-text-secondary',
                      )}
                    >
                      {candidate.nameAr.charAt(0)}
                    </span>
                    <span className="min-w-0 grow">
                      <span className="flex items-center gap-2">
                        <span className={cn('truncate text-body font-semibold', isDrawer ? 'text-white' : 'text-text-primary')}>
                          {candidate.nameAr}
                        </span>
                        <span className={cn('truncate text-small', isDrawer ? 'text-sidebar-text' : 'text-action-primary')}>
                          {roles[candidate.roleCode].nameAr}
                        </span>
                      </span>
                      <span className={cn('block truncate text-small', isDrawer ? 'text-sidebar-text' : 'text-text-secondary')}>
                        {candidate.jobTitleAr} · {candidate.departmentAr}
                      </span>
                    </span>
                    {isCurrent && (
                      <Icon
                        icon={Check}
                        size="sm"
                        className={cn('shrink-0', isDrawer ? 'text-white' : 'text-action-primary')}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className={cn('border-t p-2', isDrawer ? 'border-white/10' : 'border-border-default')}>
            <button
              type="button"
              disabled={user.id === defaultDemoUser.id}
              onClick={() => {
                resetToDefaultUser()
                finishSwitch(defaultDemoUser)
              }}
              className={cn(
                'flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-start text-body',
                user.id === defaultDemoUser.id
                  ? isDrawer
                    ? 'cursor-default text-sidebar-text/50'
                    : 'cursor-default text-text-disabled'
                  : isDrawer
                    ? 'text-sidebar-text hover:bg-white/8 hover:text-white'
                    : 'text-text-secondary hover:bg-surface-subtle hover:text-text-primary',
              )}
            >
              <Icon icon={RotateCcw} size="sm" />
              العودة إلى المستخدم الافتراضي (أخصائي الودائع)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
