import { SearchX } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/layouts/PageContainer'

export function NotFoundPage() {
  return (
    <PageContainer>
      <Card padding="none" className="mx-auto mt-8 max-w-3xl overflow-hidden shadow-xs">
        <EmptyState
          icon={SearchX}
          title="الصفحة غير موجودة"
          description="لم نتمكن من العثور على المسار المطلوب. تحقق من الرابط أو عد إلى الصفحة الرئيسية للمتابعة."
          action={
            <Link to="/">
              <Button variant="secondary">العودة إلى الصفحة الرئيسية</Button>
            </Link>
          }
        />
      </Card>
    </PageContainer>
  )
}
