import { Landmark } from 'lucide-react'
import { useParams } from 'react-router'

import { PlaceholderPage } from '@/app/pages/PlaceholderPage'

/**
 * Temporary placeholder validating the `/deposits/:depositId` route (DEC-015).
 * The real deposit details screen is built in Step 12.
 */
export function DepositDetailsPlaceholderPage() {
  const { depositId } = useParams()

  return (
    <PlaceholderPage
        title="تفاصيل الوديعة"
        description={`عرض تفاصيل الوديعة ذات المعرف ${depositId ?? ''} وبيانات الاستحقاق والعوائد.`}
        icon={Landmark}
        stepNote="تُبنى شاشة تفاصيل الوديعة وإدارة الاستحقاق ضمن الخطوة 12."
      />
  )
}
