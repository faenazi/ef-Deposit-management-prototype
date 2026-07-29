import { ChevronsLeft, ChevronsRight, FlaskConical } from 'lucide-react'
import { NavLink } from 'react-router'

import { useUser } from '@/app/user-context'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { BrandPattern } from '@/components/brand/BrandPattern'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { navigationItems } from '@/layouts/navigation'
import { UserSwitcher } from '@/layouts/UserSwitcher'

interface SidebarNavProps {
  collapsed?: boolean
  onToggleCollapsed?: () => void
  onNavigate?: () => void
  mobile?: boolean
}

/** Environment Fund right navigation rail, adapted from Figma node 54764:53867. */
export function SidebarNav({
  collapsed = false,
  onToggleCollapsed,
  onNavigate,
  mobile = false,
}: SidebarNavProps) {
  const { canAccessPath } = useUser()
  const visibleItems = navigationItems.filter((item) => canAccessPath(item.path))

  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden bg-sidebar-surface text-white',
        !mobile && 'xl:rounded-bl-[28px] xl:rounded-tl-[28px]',
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center justify-center border-b border-sidebar-border bg-white/5 px-4',
          mobile ? 'h-20' : 'h-[5.75rem]',
          collapsed && 'px-2',
        )}
      >
        {collapsed ? (
          <BrandLogo variant="symbol-white" heightClassName="h-9" />
        ) : (
          <BrandLogo variant="horizontal-white" heightClassName="h-[52px]" />
        )}
      </div>

      {onToggleCollapsed && (
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية'}
          title={collapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية'}
          className={cn(
            'absolute -left-3.5 top-20 z-10 flex size-9 items-center justify-center rounded-full',
            'border-[5px] border-canvas bg-surface text-action-primary shadow-xs',
            'transition-transform hover:scale-105 focus-visible:outline-action-primary',
          )}
        >
          <Icon icon={collapsed ? ChevronsLeft : ChevronsRight} size="sm" />
        </button>
      )}

      {!collapsed && (
        <div className={cn('border-b border-sidebar-border px-4 py-4', mobile && 'pb-4')}>
          <p className="text-[13px] font-semibold leading-5 text-white">إدارة الودائع الاستثمارية</p>
          <p className="mt-0.5 text-[11px] leading-5 text-sidebar-text">الإدارة العامة للخزينة</p>
        </div>
      )}

      {mobile && (
        <div className="relative z-[3] px-3 pb-2">
          <UserSwitcher variant="drawer" />
        </div>
      )}

      <nav aria-label="التنقل الرئيسي" className="relative z-[2] min-h-0 overflow-y-auto py-1.5">
        <ul className="space-y-1 px-2">
          {visibleItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.end}
                onClick={onNavigate}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  cn(
                    'group relative flex min-h-12 items-center gap-3 rounded-lg px-3 py-2 text-body font-semibold',
                    'transition-colors duration-[var(--motion-fast)] focus-visible:outline-white',
                    collapsed && 'justify-center px-2',
                    isActive
                      ? 'bg-sidebar-active text-sidebar-active-text shadow-sm'
                      : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-2 right-0 w-1 rounded-l-full bg-sidebar-accent"
                      />
                    )}
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center',
                        isActive ? 'text-sidebar-active-text' : 'text-sidebar-text group-hover:text-white',
                      )}
                    >
                      <Icon icon={item.icon} size="lg" />
                    </span>
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div aria-hidden="true" className="pointer-events-none relative grow overflow-hidden">
        {!collapsed && (
          <BrandPattern
            asset="pattern-secondary"
            placement="bottom-start"
            opacity="subtle"
            scale={mobile ? 'corner' : 'hero'}
            className={cn('max-h-[210px] max-w-[220px]', mobile && '!block max-h-32 max-w-36')}
          />
        )}
      </div>

      {!collapsed && (
        <div className="relative z-[2] px-4 pb-4">
          <div className="rounded-lg border border-sidebar-border bg-white/5 px-3 py-3">
            <div className="flex items-center gap-2 text-sidebar-text-strong">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/8">
                <Icon icon={FlaskConical} size="sm" />
              </span>
              <p className="text-small font-semibold">بيئة عرض تجريبية</p>
            </div>
            {!mobile && (
              <p className="mt-2 text-[11px] leading-5 text-sidebar-text">
                البيانات تجريبية، وتتغير القوائم والمحتوى بحسب الدور المحدد.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
