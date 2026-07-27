import { FileText } from 'lucide-react'
import { useParams } from 'react-router'

import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/layouts/PageContainer'
import { PageHeader } from '@/layouts/PageHeader'

/**
 * Temporary placeholder validating the request-workspace routes
 * `/investment-requests/:requestId` and `/investment-requests/:requestId/:section`
 * (DEC-015 section deep links). The real case workspace is built in Step 11;
 * section slugs are defined there against the canonical DEC-016 section list.
 */
export function RequestWorkspacePlaceholderPage() {
  const { requestId, section } = useParams()

  return (
    <PageContainer>
      <PageHeader
        title="مساحة عمل طلب الاستثمار"
        description={`ملف المعاملة للطلب ${requestId ?? ''} بجميع أقسامه: البيانات، السيولة، عروض البنوك، التقييم، والاعتمادات.`}
      />
      <Card padding="none">
        <EmptyState
          icon={FileText}
          title="هذه الصفحة قيد الإعداد"
          description={
            section
              ? `تم فتح رابط مباشر إلى القسم «${section}». تُبنى مساحة العمل وأقسامها الخمسة عشر في الخطوة 11.`
              : 'تم إنشاء هذا المسار للتحقق من التوجيه والصلاحيات. تُبنى مساحة العمل وأقسامها الخمسة عشر في الخطوة 11.'
          }
        />
      </Card>
    </PageContainer>
  )
}
