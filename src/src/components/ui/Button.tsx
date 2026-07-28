import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { Spinner } from '@/components/ui/Spinner'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Replaces the leading icon with a spinner while preserving width. */
  loading?: boolean
  leadingIcon?: LucideIcon
  trailingIcon?: LucideIcon
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold ' +
  'transition-[color,background-color,border-color,box-shadow] duration-[var(--motion-standard)] ' +
  'disabled:cursor-not-allowed select-none whitespace-nowrap'

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-action-primary text-text-inverse shadow-xs hover:bg-action-primary-hover active:bg-action-primary-active ' +
    'focus-visible:outline-white disabled:bg-surface-disabled disabled:text-text-disabled',
  secondary:
    'bg-surface text-action-primary border border-border-strong hover:bg-surface-brand-soft ' +
    'active:bg-surface-brand-soft disabled:bg-surface-disabled disabled:text-text-disabled disabled:border-border-default',
  ghost:
    'bg-transparent text-action-primary hover:bg-surface-brand-soft active:bg-surface-brand-soft ' +
    'disabled:text-text-disabled disabled:hover:bg-transparent',
  danger:
    'bg-surface text-danger-text border border-danger-border hover:bg-danger-bg ' +
    'active:bg-danger-bg disabled:bg-surface-disabled disabled:text-text-disabled disabled:border-border-default',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3 text-small',
  md: 'min-h-10 px-4 text-body',
  lg: 'min-h-11 px-5 text-body-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(base, variantClass[variant], sizeClass[size], className)}
      {...rest}
    >
      {loading ? (
        <Spinner size="sm" />
      ) : (
        leadingIcon && <Icon icon={leadingIcon} size={size === 'sm' ? 'xs' : 'sm'} />
      )}
      {children}
      {trailingIcon && <Icon icon={trailingIcon} size={size === 'sm' ? 'xs' : 'sm'} />}
    </button>
  )
}
