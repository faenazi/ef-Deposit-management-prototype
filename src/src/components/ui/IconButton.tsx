import type { ButtonHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Icon, type IconSize } from '@/components/ui/Icon'

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  icon: LucideIcon
  /** Mandatory accessible name (05-iconography.md §9). */
  label: string
  variant?: 'ghost' | 'outline'
  iconSize?: IconSize
  mirrorInRtl?: boolean
}

/** Icon-only action with a mandatory accessible name. */
export function IconButton({
  icon,
  label,
  variant = 'ghost',
  iconSize = 'md',
  mirrorInRtl,
  className,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-sm text-text-secondary',
        'transition-colors duration-[var(--motion-fast)] hover:bg-surface-subtle hover:text-text-primary',
        'disabled:cursor-not-allowed disabled:text-text-disabled disabled:hover:bg-transparent',
        variant === 'outline' && 'border border-border-default bg-surface',
        className,
      )}
      {...rest}
    >
      <Icon icon={icon} size={iconSize} mirrorInRtl={mirrorInRtl} />
    </button>
  )
}
