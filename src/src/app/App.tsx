import { CalendarClock, FileText, Inbox, ChartNoAxesCombined, Settings } from 'lucide-react'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { AppShell } from '@/layouts/AppShell'
import { DesignSystemPreviewPage } from '@/app/pages/DesignSystemPreviewPage'
import { HomePage } from '@/app/pages/HomePage'
import { NotFoundPage } from '@/app/pages/NotFoundPage'
import { PlaceholderPage } from '@/app/pages/PlaceholderPage'

/**
 * Canonical routes per DEC-015. Detail/section routes and role-based access
 * arrive in Step 06; the real pages arrive in Steps 08–14.
 */
const router = createBrowserRouter([
  {
    element: <AppShell />,
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
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
