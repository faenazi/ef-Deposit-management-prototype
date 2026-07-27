import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { NavLink } from 'react-router'

import { cn } from '@/lib/cn'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { BrandPattern } from '@/components/brand/BrandPattern'
import { Icon } from '@/components/ui/Icon'
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
  return (
    <div className="flex h-full flex-col bg-sidebar-surface">
      <div
        className={cn(
          'flex h-[var(--layout-header-height)] shrink-0 items-center border-b border-sidebar-border',
          collapsed ? 'justify-center px-2' : 'px-5',
        )}
      >
        {collapsed ? (
          <BrandLogo variant="symbol-white" heightClassName="h-8" />
        ) : (
          <BrandLogo variant="horizontal-white" heightClassName="h-9" />
        )}
      </div>

      <nav aria-label="التنقل الرئيسي" className="overflow-y-auto p-3">
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
                    'relative flex items-center gap-3 rounded-sm px-3 py-2.5 text-body font-medium',
                    'transition-colors duration-[var(--motion-fast)] focus-visible:outline-white',
                    collapsed && 'justify-center px-0',
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
                        className="absolute inset-y-2 start-0 w-[3px] rounded-e-full bg-white"
                      />
                    )}
                    <Icon icon={item.icon} size="md" />
                    {!collapsed && <span>{item.label}</span>}
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

      {onToggleCollapsed && (
        <div className={cn('border-t border-sidebar-border p-3', collapsed && 'flex justify-center')}>
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية'}
            title={collapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية'}
            className={cn(
              'flex items-center gap-3 rounded-sm px-3 py-2 text-body text-sidebar-text',
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
