import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { NavLink } from 'react-router'

import { cn } from '@/lib/cn'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { Icon } from '@/components/ui/Icon'
import { navigationItems } from '@/layouts/navigation'

interface SidebarNavProps {
  collapsed?: boolean
  onToggleCollapsed?: () => void
  /** Closes the mobile drawer after navigating. */
  onNavigate?: () => void
}

/**
 * Fixed six-item RTL navigation (DEC-009) on a light surface (DEC-022):
 * surface background, brand-soft active state, horizontal blue logo.
 * Collapsed mode shows the official symbol-tile composition (DEC-023).
 */
export function SidebarNav({ collapsed = false, onToggleCollapsed, onNavigate }: SidebarNavProps) {
  return (
    <div className="flex h-full flex-col bg-surface">
      <div
        className={cn(
          'flex h-[var(--layout-header-height)] shrink-0 items-center border-b border-border-default',
          collapsed ? 'justify-center px-2' : 'px-5',
        )}
      >
        {collapsed ? (
          <BrandLogo variant="symbol-tile" />
        ) : (
          <BrandLogo variant="horizontal-blue" heightClassName="h-9" />
        )}
      </div>

      <nav aria-label="التنقل الرئيسي" className="grow overflow-y-auto p-3">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.end}
                onClick={onNavigate}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-sm px-3 py-2.5 text-body font-medium',
                    'transition-colors duration-[var(--motion-fast)]',
                    collapsed && 'justify-center px-0',
                    isActive
                      ? 'bg-surface-brand-soft text-action-primary'
                      : 'text-text-secondary hover:bg-surface-subtle hover:text-text-primary',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      icon={item.icon}
                      size="md"
                      className={isActive ? 'text-action-primary' : undefined}
                    />
                    {!collapsed && <span>{item.label}</span>}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {onToggleCollapsed && (
        <div className={cn('border-t border-border-default p-3', collapsed && 'flex justify-center')}>
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية'}
            title={collapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية'}
            className={cn(
              'flex items-center gap-3 rounded-sm px-3 py-2 text-body text-text-secondary',
              'transition-colors duration-[var(--motion-fast)] hover:bg-surface-subtle hover:text-text-primary',
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
