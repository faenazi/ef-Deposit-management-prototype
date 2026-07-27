import { LayoutDashboard } from 'lucide-react'

import { BrandPattern } from '@/components/brand/BrandPattern'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/layouts/PageContainer'
import { PageHeader } from '@/layouts/PageHeader'

/**
 * Temporary home placeholder with a restrained brand moment (dashboard brand
 * intensity: medium — 02-brand-application.md). Replaced by the real
 * dashboard in Step 08.
 */
export function HomePage() {
  return (
    <PageContainer>
      <PageHeader
        title="الصفحة الرئيسية"
        description="نظرة عامة على محفظة الودائع والمهام والطلبات الجارية لصندوق البيئة."
      />

      <div className="relative overflow-hidden rounded-md border border-border-default bg-surface-brand-soft p-6 lg:p-8">
        <BrandPattern asset="radial" placement="bottom-start" opacity="soft" scale="corner" />
        <div className="relative max-w-2xl">
          <h2 className="text-h2 font-bold text-text-primary">
            منصة إدارة الودائع الاستثمارية
          </h2>
          <p className="mt-2 text-body-lg text-text-secondary">
            مساحة عمل الخزينة لإعداد طلبات الاستثمار، ومقارنة عروض البنوك، ومتابعة الاعتمادات،
            وإدارة الودائع النشطة حتى تاريخ الاستحقاق.
          </p>
        </div>
      </div>

      <Card padding="none" className="mt-6">
        <EmptyState
          icon={LayoutDashboard}
          title="لوحة المؤشرات قيد الإعداد"
          description="تُبنى مؤشرات المحفظة والمهام العاجلة والاستحقاقات القادمة في الخطوة 08 بعد اكتمال البيانات التجريبية."
        />
      </Card>
    </PageContainer>
  )
}
