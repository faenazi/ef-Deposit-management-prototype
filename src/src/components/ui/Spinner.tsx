import { cn } from '@/lib/cn'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  /** Accessible loading text. Defaults to a generic Arabic loading label. */
  label?: string
  className?: string
}

const sizeClass = {
  sm: 'size-4 border-2',
  md: 'size-5 border-2',
  lg: 'size-8 border-[3px]',
}

/** Calm circular spinner for button-level and small isolated loading regions. */
export function Spinner({ size = 'md', label = 'جارٍ التحميل', className }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cn('inline-flex', className)}>
      <span
        className={cn(
          'ef-motion-spin inline-block rounded-full border-current border-t-transparent opacity-80',
          sizeClass[size],
        )}
      />
    </span>
  )
}
