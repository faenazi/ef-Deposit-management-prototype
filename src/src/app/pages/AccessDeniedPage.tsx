import { ShieldAlert } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/layouts/PageContainer'
import { useUser } from '@/app/user-context'

/**
 * Branded access-denied page (DEC-015 route `/access-denied`). Reached when a
 * route requires a permission the current demo role does not hold.
 */
export function AccessDeniedPage() {
  const { user, role } = useUser()
  const { state } = useLocation()
  const deniedPath = (state as { deniedPath?: string } | null)?.deniedPath

  return (
    <PageContainer>
      <Card padding="none" className="mx-auto mt-8 max-w-3xl overflow-hidden shadow-xs">
        <EmptyState
          icon={ShieldAlert}
          title="الوصول غير مصرح به"
          description={`لا يملك دورك الحالي «${role.nameAr}» صلاحية الوصول إلى هذه الصفحة. يمكنك تبديل المستخدم التجريبي من الشريط العلوي لتجربة صلاحيات دور آخر.`}
          action={
            <div className="flex flex-col items-center gap-3">
              {deniedPath && (
                <p className="rounded-sm bg-surface-subtle px-3 py-1 text-small text-text-muted" dir="ltr">
                  {deniedPath}
                </p>
              )}
              <Link to={user.defaultRoute}>
                <Button variant="secondary">العودة إلى صفحتك الرئيسية</Button>
              </Link>
            </div>
          }
        />
      </Card>
    </PageContainer>
  )
}
