import {
  CalendarClock,
  FilePlus2,
  FileText,
  Inbox,
  ChartNoAxesCombined,
  Settings,
} from 'lucide-react'
import { createBrowserRouter } from 'react-router'
// The /dom entry wires ReactDOM.flushSync, required by navigations that use
// the flushSync option (user switching away from a restricted page).
import { RouterProvider } from 'react-router/dom'

import { AppShell } from '@/layouts/AppShell'
import { accessDeniedPath } from '@/app/route-access'
import { RouteAccessBoundary } from '@/app/RouteAccessBoundary'
import { UserProvider } from '@/app/UserProvider'
import { AccessDeniedPage } from '@/app/pages/AccessDeniedPage'
import { DepositDetailsPlaceholderPage } from '@/app/pages/DepositDetailsPlaceholderPage'
import { DesignSystemPreviewPage } from '@/app/pages/DesignSystemPreviewPage'
import { HomePage } from '@/app/pages/HomePage'
import { NotFoundPage } from '@/app/pages/NotFoundPage'
import { PlaceholderPage } from '@/app/pages/PlaceholderPage'
import { RequestWorkspacePlaceholderPage } from '@/app/pages/RequestWorkspacePlaceholderPage'

/**
 * Canonical routes per DEC-015, guarded by RouteAccessBoundary against the
 * central route-access map. The real business pages arrive in Steps 08–14.
 */
const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        element: <RouteAccessBoundary />,
        children: [
          { path: '/', element: <HomePage /> },
          {
            path: '/tasks',
            element: (
              <PlaceholderPage
                title="مهامي"
                description="المهام المسندة إليك بحسب دورك ومرحلة كل طلب."
                icon={Inbox}
                stepNote="تُبنى قائمة المهام وإجراءاتها في الخطوة 09."
              />
            ),
          },
          {
            path: '/deposits',
            element: (
              <PlaceholderPage
                title="محفظة الودائع"
                description="الودائع النشطة والمستحقة وتوزيع التعرض على البنوك."
                icon={CalendarClock}
                stepNote="تُبنى المحفظة وشاشات الاستحقاق في الخطوة 12."
              />
            ),
          },
          { path: '/deposits/:depositId', element: <DepositDetailsPlaceholderPage /> },
          {
            path: '/investment-requests',
            element: (
              <PlaceholderPage
                title="طلبات الاستثمار"
                description="إعداد طلبات الاستثمار ومتابعتها عبر مراحل الاعتماد والتنفيذ."
                icon={FileText}
                stepNote="تُبنى قائمة الطلبات في الخطوة 10 ومساحة العمل في الخطوة 11."
              />
            ),
          },
          {
            path: '/investment-requests/new',
            element: (
              <PlaceholderPage
                title="طلب استثمار جديد"
                description="إنشاء مسودة طلب استثمار جديدة وإعداد أقسامها تدريجيًا."
                icon={FilePlus2}
                stepNote="تُبنى شاشة إنشاء الطلب ومساحة العمل في الخطوتين 10 و11."
              />
            ),
          },
          { path: '/investment-requests/:requestId', element: <RequestWorkspacePlaceholderPage /> },
          {
            path: '/investment-requests/:requestId/:section',
            element: <RequestWorkspacePlaceholderPage />,
          },
          {
            path: '/reports',
            element: (
              <PlaceholderPage
                title="التقارير والتحليلات"
                description="تحليلات المحفظة والعوائد والتعرض البنكي لدعم القرار."
                icon={ChartNoAxesCombined}
                stepNote="تُبنى التقارير والرسوم البيانية في الخطوة 13."
              />
            ),
          },
          {
            path: '/settings',
            element: (
              <PlaceholderPage
                title="الإعدادات"
                description="إدارة البنوك والمستخدمين وقواعد النظام وبيانات العرض التجريبي."
                icon={Settings}
                stepNote="تُبنى الإعدادات وصلاحيات مدير النظام في الخطوة 14."
              />
            ),
          },
          // Temporary component-review route (Step 05); not in the main navigation.
          { path: '/design-system', element: <DesignSystemPreviewPage /> },
        ],
      },
      { path: accessDeniedPath, element: <AccessDeniedPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}
