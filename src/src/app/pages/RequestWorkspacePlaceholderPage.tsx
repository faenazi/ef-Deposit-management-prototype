import { FileText } from 'lucide-react'
import { useParams } from 'react-router'

import { PlaceholderPage } from '@/app/pages/PlaceholderPage'

/**
 * Temporary placeholder validating the request-workspace routes
 * `/investment-requests/:requestId` and `/investment-requests/:requestId/:section`
 * (DEC-015 section deep links). The real case workspace is built in Step 11;
 * section slugs are defined there against the canonical DEC-016 section list.
 */
export function RequestWorkspacePlaceholderPage() {
  const { requestId, section } = useParams()

  return (
    <PlaceholderPage
        title="مساحة عمل طلب الاستثمار"
        description={`ملف المعاملة للطلب ${requestId ?? ''} بجميع أقسامه: البيانات، السيولة، عروض البنوك، التقييم، والاعتمادات.`}
        icon={FileText}
        stepNote={
          section
            ? `تم حفظ رابط القسم «${section}»، وتُبنى مساحة العمل في الخطوة 11.`
            : 'تُبنى مساحة العمل وأقسامها التشغيلية في الخطوة 11.'
        }
      />
  )
}
