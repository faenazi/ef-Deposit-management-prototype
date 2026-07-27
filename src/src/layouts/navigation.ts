import {
  ChartNoAxesCombined,
  FileText,
  Inbox,
  Landmark,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from 'lucide-react'

/**
 * Canonical main navigation: order per DEC-009, routes per DEC-015,
 * icons per 05-iconography.md §7. Icons never change per role.
 */
export interface NavigationItem {
  path: string
  label: string
  icon: LucideIcon
  /** Match nested routes (e.g. /investment-requests/:id). */
  end?: boolean
}

export const navigationItems: NavigationItem[] = [
  { path: '/', label: 'الصفحة الرئيسية', icon: LayoutDashboard, end: true },
  { path: '/tasks', label: 'مهامي', icon: Inbox },
  { path: '/deposits', label: 'محفظة الودائع', icon: Landmark },
  { path: '/investment-requests', label: 'طلبات الاستثمار', icon: FileText },
  { path: '/reports', label: 'التقارير والتحليلات', icon: ChartNoAxesCombined },
  { path: '/settings', label: 'الإعدادات', icon: Settings },
]
