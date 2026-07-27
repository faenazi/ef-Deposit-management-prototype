import { SearchX } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/layouts/PageContainer'

export function NotFoundPage() {
  return (
    <PageContainer>
      <EmptyState
        icon={SearchX}
        title="الصفحة غير موجودة"
        description="المسار المطلوب غير متاح. يمكنك العودة إلى الصفحة الرئيسية للمتابعة."
        action={
          <Link to="/">
            <Button variant="secondary">العودة إلى الصفحة الرئيسية</Button>
          </Link>
        }
      />
    </PageContainer>
  )
}
