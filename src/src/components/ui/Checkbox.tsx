import { useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

interface CheckableProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
}

const checkableBase =
  'size-4 shrink-0 cursor-pointer border-border-strong text-action-primary ' +
  'accent-[var(--color-action-primary)] disabled:cursor-not-allowed'

export function Checkbox({ label, description, className, ...rest }: CheckableProps) {
  const id = useId()
  return (
    <div className={cn('flex items-start gap-2', className)}>
      <input id={id} type="checkbox" className={cn(checkableBase, 'mt-1 rounded-xs')} {...rest} />
      <label htmlFor={id} className="cursor-pointer text-body text-text-primary">
        {label}
        {description && <span className="block text-small text-text-secondary">{description}</span>}
      </label>
    </div>
  )
}

export function Radio({ label, description, className, ...rest }: CheckableProps) {
  const id = useId()
  return (
    <div className={cn('flex items-start gap-2', className)}>
      <input id={id} type="radio" className={cn(checkableBase, 'mt-1 rounded-full')} {...rest} />
      <label htmlFor={id} className="cursor-pointer text-body text-text-primary">
        {label}
        {description && <span className="block text-small text-text-secondary">{description}</span>}
      </label>
    </div>
  )
}
