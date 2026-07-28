import { useState } from 'react'
import { Outlet, useLocation } from 'react-router'

import { cn } from '@/lib/cn'
import { Drawer } from '@/components/ui/Drawer'
import { ToastProvider } from '@/components/ui/Toast'
import { navigationItems } from '@/layouts/navigation'
import { SidebarNav } from '@/layouts/SidebarNav'
import { TopHeader } from '@/layouts/TopHeader'

const contextLabels: Record<string, string> = {
  '/access-denied': 'الوصول غير مصرح به',
  '/design-system': 'نظام التصميم — مراجعة مؤقتة',
}

/**
 * RTL application shell (00-shared §2): right sidebar (264/80px, dark
 * institutional navy per DEC-024), 72px top header and light content region.
 * Tablet/mobile use an accessible navigation drawer that opens from the right
 * (it replaces the right sidebar).
 */
export function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { pathname } = useLocation()

  const currentPageLabel =
    navigationItems.find((item) =>
      item.end ? pathname === item.path : pathname === item.path || pathname.startsWith(`${item.path}/`),
    )?.label ??
    contextLabels[pathname] ??
    'صفحة غير موجودة'

  return (
    <ToastProvider>
      <a
        href="#main-content"
        className="fixed top-2 right-2 z-[var(--z-tooltip)] -translate-y-20 rounded-sm bg-action-primary px-4 py-2 text-body font-semibold text-text-inverse transition-transform focus:translate-y-0"
      >
        تخطي إلى المحتوى الرئيسي
      </a>

      <div className="flex min-h-dvh bg-canvas">
        {/* Desktop sidebar — first flex child renders on the right in RTL. */}
        {/* The navy surface itself separates the sidebar from the light
            content; a light border token on that edge would read as a halo
            (DEC-024). */}
        <aside
          className={cn(
            'sticky top-0 z-[var(--z-shell)] hidden h-dvh shrink-0 lg:block',
            'transition-[width] duration-[var(--motion-standard)]',
          )}
          style={{
            width: collapsed
              ? 'var(--layout-sidebar-collapsed)'
              : 'var(--layout-sidebar-expanded)',
          }}
        >
          <SidebarNav collapsed={collapsed} onToggleCollapsed={() => setCollapsed((value) => !value)} />
        </aside>

        <div className="flex min-w-0 grow flex-col">
          <TopHeader
            currentPageLabel={currentPageLabel}
            onOpenMobileNav={() => setMobileNavOpen(true)}
          />
          <main id="main-content" className="grow overflow-x-clip">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Tablet/mobile navigation drawer (opens from the sidebar's right edge). */}
      <Drawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        title="التنقل"
        side="right"
        tone="dark"
        widthClassName="w-[300px] max-w-[85vw]"
      >
        <div className="-m-5">
          <SidebarNav onNavigate={() => setMobileNavOpen(false)} />
        </div>
      </Drawer>
    </ToastProvider>
  )
}
