import { Landmark } from 'lucide-react'
import { useParams } from 'react-router'

import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/layouts/PageContainer'
import { PageHeader } from '@/layouts/PageHeader'

/**
 * Temporary placeholder validating the `/deposits/:depositId` route (DEC-015).
 * The real deposit details screen is built in Step 12.
 */
export function DepositDetailsPlaceholderPage() {
  const { depositId } = useParams()

  return (
    <PageContainer>
      <PageHeader
        title="تفاصيل الوديعة"
        description={`عرض تفاصيل الوديعة ذات المعرف ${depositId ?? ''} وبيانات الاستحقاق والعوائد.`}
      />
      <Card padding="none">
        <EmptyState
          icon={Landmark}
          title="هذه الصفحة قيد الإعداد"
          description="تم إنشاء هذا المسار للتحقق من التوجيه والصلاحيات. تُبنى شاشة تفاصيل الوديعة في الخطوة 12 بعد اكتمال البيانات التجريبية."
        />
      </Card>
    </PageContainer>
  )
}
