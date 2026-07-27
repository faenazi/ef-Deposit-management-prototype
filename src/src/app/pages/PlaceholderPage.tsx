import type { LucideIcon } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/layouts/PageContainer'
import { PageHeader } from '@/layouts/PageHeader'

interface PlaceholderPageProps {
  title: string
  description: string
  icon: LucideIcon
  /** Which roadmap step will implement the real page. */
  stepNote: string
}

/**
 * Temporary clean route placeholder used to validate the shell and navigation
 * only (Step 05). Each is replaced by its real page in Steps 08–14.
 */
export function PlaceholderPage({ title, description, icon, stepNote }: PlaceholderPageProps) {
  return (
    <PageContainer>
      <PageHeader title={title} description={description} />
      <Card padding="none">
        <EmptyState
          icon={icon}
          title="هذه الصفحة قيد الإعداد"
          description={`تم إنشاء هذا المسار للتحقق من الهيكل العام والتنقل. ${stepNote}`}
        />
      </Card>
    </PageContainer>
  )
}
