import { ChevronsLeft, ChevronsRight, FlaskConical } from 'lucide-react'
import { NavLink } from 'react-router'

import { useUser } from '@/app/user-context'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { BrandPattern } from '@/components/brand/BrandPattern'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { navigationItems } from '@/layouts/navigation'

interface SidebarNavProps {
  collapsed?: boolean
  onToggleCollapsed?: () => void
  onNavigate?: () => void
}

/** Environment Fund right navigation rail, adapted from Figma node 54764:53867. */
export function SidebarNav({ collapsed = false, onToggleCollapsed, onNavigate }: SidebarNavProps) {
  const { canAccessPath } = useUser()
  const visibleItems = navigationItems.filter((item) => canAccessPath(item.path))

  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden bg-sidebar-surface text-white',
        'lg:rounded-bl-[40px] lg:rounded-tl-[40px]',
      )}
    >
      <div
        className={cn(
          'flex h-28 shrink-0 items-center justify-center px-4',
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
            'absolute -left-3.5 top-24 z-10 flex size-9 items-center justify-center rounded-full',
            'border-[5px] border-canvas bg-surface-subtle text-action-primary shadow-xs',
            'transition-transform hover:scale-105 focus-visible:outline-action-primary',
          )}
        >
          <Icon icon={collapsed ? ChevronsLeft : ChevronsRight} size="sm" />
        </button>
      )}

      {!collapsed && (
        <div className="px-5 pb-3">
          <p className="text-small font-semibold text-white">منصة إدارة الودائع الاستثمارية</p>
          <p className="mt-1 text-[11px] leading-5 text-sidebar-text">الإدارة العامة للخزينة</p>
        </div>
      )}

      <nav aria-label="التنقل الرئيسي" className="relative z-[2] overflow-y-auto py-2">
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
                    'group relative flex h-12 items-center gap-3 rounded-lg px-3 text-body font-semibold',
                    'transition-colors duration-[var(--motion-fast)] focus-visible:outline-white',
                    collapsed && 'justify-center px-2',
                    isActive
                      ? 'bg-sidebar-active text-white'
                      : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-2 right-0 w-1 rounded-l-full bg-white"
                      />
                    )}
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center',
                        isActive ? 'text-white' : 'text-sidebar-text group-hover:text-white',
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
            opacity="soft"
            scale="hero"
            className="max-h-[240px] max-w-[260px]"
          />
        )}
      </div>

      {!collapsed && (
        <div className="relative z-[2] px-4 pb-4">
          <div className="rounded-lg border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sidebar-text-strong">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Icon icon={FlaskConical} size="sm" />
              </span>
              <p className="text-small font-semibold">بيئة عرض تجريبية</p>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-sidebar-text">
              البيانات تجريبية، وتتغير القوائم والمحتوى بحسب الدور المحدد.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
