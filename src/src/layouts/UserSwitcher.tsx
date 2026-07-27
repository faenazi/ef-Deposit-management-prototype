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

/**
 * Prototype user switcher (demo-users.md): presentation-grade identity control
 * in the top header. Shows the current identity and opens a panel listing the
 * eight primary demo users with name, job title, department, and role, plus a
 * one-click return to the default Deposit Specialist. Switching applies
 * immediately; if the current page is not permitted for the new role, the
 * user is taken to that role's default landing page (information-architecture
 * context rule).
 */
export function UserSwitcher() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { user, role, switchUser, resetToDefaultUser } = useUser()
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
          'flex items-center gap-2 rounded-sm p-1.5 text-start',
          'hover:bg-surface-subtle',
        )}
      >
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-brand-soft text-body font-semibold text-action-primary"
        >
          {user.nameAr.charAt(0)}
        </span>
        <span className="hidden min-w-0 lg:block">
          <span className="block truncate text-body font-semibold text-text-primary">
            {user.nameAr}
          </span>
          <span className="block truncate text-small text-text-secondary">{role.nameAr}</span>
        </span>
        <Icon icon={ChevronDown} size="sm" className="text-text-secondary" />
      </button>

      {open && (
        <div
          className={cn(
            'absolute end-0 top-full z-[var(--z-popover)] mt-2 w-80 max-w-[calc(100vw-2rem)]',
            'rounded-md border border-border-default bg-surface shadow-md',
          )}
        >
          <div className="flex items-center justify-between gap-2 border-b border-border-default px-4 py-3">
            <div>
              <p className="text-body font-semibold text-text-primary">المستخدمون الأساسيون للعرض</p>
              <p className="mt-0.5 text-small text-text-secondary">
                بدّل المستخدم لتجربة صلاحيات كل دور
              </p>
            </div>
            <Badge variant="primary">وضع العرض التجريبي</Badge>
          </div>

          <ul className="max-h-[min(24rem,60vh)] overflow-y-auto p-2" aria-label="قائمة المستخدمين التجريبيين">
            {demoUsers.map((candidate) => {
              const isCurrent = candidate.id === user.id
              return (
                <li key={candidate.id}>
                  <button
                    type="button"
                    aria-current={isCurrent}
                    onClick={() => applyUser(candidate)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-sm px-2.5 py-2 text-start',
                      isCurrent ? 'bg-surface-brand-soft' : 'hover:bg-surface-subtle',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-body font-semibold text-text-secondary"
                    >
                      {candidate.nameAr.charAt(0)}
                    </span>
                    <span className="min-w-0 grow">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-body font-semibold text-text-primary">
                          {candidate.nameAr}
                        </span>
                        <span className="truncate text-small text-action-primary">
                          {roles[candidate.roleCode].nameAr}
                        </span>
                      </span>
                      <span className="block truncate text-small text-text-secondary">
                        {candidate.jobTitleAr} · {candidate.departmentAr}
                      </span>
                    </span>
                    {isCurrent && (
                      <Icon icon={Check} size="sm" className="shrink-0 text-action-primary" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="border-t border-border-default p-2">
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
                  ? 'cursor-default text-text-disabled'
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
