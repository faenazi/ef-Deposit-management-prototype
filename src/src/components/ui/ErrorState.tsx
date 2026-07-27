import { CircleAlert } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'

interface ErrorStateProps {
  title?: string
  description?: string
  /** Usually a retry action. */
  action?: ReactNode
  className?: string
}

export function ErrorState({
  title = 'تعذر تحميل البيانات',
  description = 'حدث خطأ غير متوقع أثناء تحميل هذا القسم. يمكنك إعادة المحاولة.',
  action,
  className,
}: ErrorStateProps) {
  return (
    <div role="alert" className={cn('flex flex-col items-center px-6 py-12 text-center', className)}>
      <div className="mb-4 flex size-16 items-center justify-center rounded-lg bg-danger-bg text-danger-text">
        <Icon icon={CircleAlert} size="xl" />
      </div>
      <h3 className="text-h3 font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 max-w-md text-body text-text-secondary">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
