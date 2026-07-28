import { forwardRef, type ButtonHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Icon, type IconSize } from '@/components/ui/Icon'

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  icon: LucideIcon
  /** Mandatory accessible name (05-iconography.md §9). */
  label: string
  variant?: 'ghost' | 'outline'
  /** `dark` renders the approved navy-surface treatment (DEC-024). */
  tone?: 'light' | 'dark'
  iconSize?: IconSize
  mirrorInRtl?: boolean
}

/** Icon-only action with a mandatory accessible name. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({
  icon,
  label,
  variant = 'ghost',
  tone = 'light',
  iconSize = 'md',
  mirrorInRtl,
  className,
  type = 'button',
  ...rest
}, ref) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-md',
        'transition-colors duration-[var(--motion-fast)]',
        tone === 'dark'
          ? 'text-sidebar-text hover:bg-sidebar-hover hover:text-white focus-visible:outline-white'
          : 'text-text-secondary hover:bg-surface-subtle hover:text-text-primary',
        'disabled:cursor-not-allowed disabled:text-text-disabled disabled:hover:bg-transparent',
        variant === 'outline' && 'border border-border-default bg-surface',
        className,
      )}
      {...rest}
    >
      <Icon icon={icon} size={iconSize} mirrorInRtl={mirrorInRtl} />
    </button>
  )
})
