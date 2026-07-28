import { ChevronsLeft, ChevronsRight, LockKeyhole } from 'lucide-react'
import { NavLink } from 'react-router'

import { cn } from '@/lib/cn'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { BrandPattern } from '@/components/brand/BrandPattern'
import { Icon } from '@/components/ui/Icon'
import { useUser } from '@/app/user-context'
import { navigationItems } from '@/layouts/navigation'

interface SidebarNavProps {
  collapsed?: boolean
  onToggleCollapsed?: () => void
  /** Closes the mobile drawer after navigating. */
  onNavigate?: () => void
}

/**
 * Fixed six-item RTL navigation (DEC-009) on the dark institutional navy
 * surface (DEC-024, supersedes DEC-022): navy background, white horizontal
 * logo expanded, official white symbol collapsed, primary-blue active item
 * with white label and a slim start-edge indicator, low-opacity white hover
 * and borders. One cropped secondary-pattern moment sits in the flexible
 * empty space above the collapse control in expanded mode only
 * (06-pattern-system.md §7, navy-surface opacity range).
 */
export function SidebarNav({ collapsed = false, onToggleCollapsed, onNavigate }: SidebarNavProps) {
  // Navigation reflects the current role's permissions (same central
  // route-access map as the route guard, so hidden ≠ merely hidden).
  const { canAccessPath } = useUser()
  const visibleItems = navigationItems.filter((item) => canAccessPath(item.path))

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-sidebar-surface">
      <div
        className={cn(
          'flex h-[var(--layout-header-height)] shrink-0 items-center border-b border-sidebar-border',
          collapsed ? 'justify-center px-2' : 'px-6',
        )}
      >
        {collapsed ? (
          <BrandLogo variant="symbol-white" heightClassName="h-7" />
        ) : (
          <BrandLogo variant="horizontal-white" heightClassName="h-8" />
        )}
      </div>

      {!collapsed && (
        <div className="px-6 pb-3 pt-5">
          <p className="text-small font-semibold text-white">إدارة الودائع الاستثمارية</p>
          <p className="mt-1 text-small text-sidebar-text">مساحة عمل الخزينة</p>
        </div>
      )}

      <nav aria-label="التنقل الرئيسي" className="overflow-y-auto px-3 py-2">
        {!collapsed && (
          <p className="mb-2 px-3 text-[11px] font-semibold tracking-wide text-sidebar-text">
            القائمة الرئيسية
          </p>
        )}
        <ul className="space-y-1.5">
          {visibleItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.end}
                onClick={onNavigate}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  cn(
                    'group relative flex min-h-11 items-center gap-3 rounded-md px-3 text-body font-medium',
                    'transition-colors duration-[var(--motion-fast)] focus-visible:outline-white',
                    collapsed && 'justify-center px-0',
                    isActive
                      ? 'bg-sidebar-active text-white shadow-sm'
                      : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-2 start-0 w-[3px] rounded-e-full bg-white"
                      />
                    )}
                    <Icon icon={item.icon} size="md" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Flexible empty space carrying the single controlled identity moment.
          It collapses to zero height when vertical space runs out (the crop
          simply disappears), stays out of the drawer's content flow, and is
          omitted entirely in collapsed mode. */}
      <div aria-hidden="true" className="pointer-events-none relative grow overflow-hidden">
        {!collapsed && (
          <BrandPattern
            asset="pattern-secondary"
            placement="bottom-start"
            opacity="soft"
            scale="corner"
          />
        )}
      </div>

      {!collapsed && (
        <div className="mx-3 mb-2 rounded-md border border-sidebar-border bg-sidebar-hover px-3 py-3">
          <div className="flex items-center gap-2 text-small font-semibold text-white">
            <Icon icon={LockKeyhole} size="sm" />
            بيئة عرض تجريبية
          </div>
          <p className="mt-1 text-[11px] leading-5 text-sidebar-text">
            البيانات محلية ومخصصة لاستعراض تجربة الأدوار.
          </p>
        </div>
      )}

      {onToggleCollapsed && (
        <div className={cn('border-t border-sidebar-border p-3', collapsed && 'flex justify-center')}>
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية'}
            title={collapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية'}
            className={cn(
              'flex min-h-10 items-center gap-3 rounded-md px-3 text-body text-sidebar-text',
              'transition-colors duration-[var(--motion-fast)] hover:bg-sidebar-hover hover:text-white',
              'focus-visible:outline-white',
              collapsed && 'justify-center px-2',
            )}
          >
            {/* The sidebar sits on the physical right; collapse moves toward it. */}
            <Icon icon={collapsed ? ChevronsLeft : ChevronsRight} size="md" />
            {!collapsed && <span>طي القائمة</span>}
          </button>
        </div>
      )}
    </div>
  )
}
