import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/cn'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'display'

const sizePx: Record<IconSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  display: 48,
}

interface IconProps {
  icon: LucideIcon
  /** Sizes per 05-iconography.md §4. Default `md` (20px). */
  size?: IconSize
  /**
   * Directional icons (arrows, chevrons, horizontal collapse/expand) must
   * mirror in RTL. Checkmarks, clocks, calendars, files, and status symbols
   * must not (05-iconography.md §6).
   */
  mirrorInRtl?: boolean
  /** Accessible name. Omit for decorative icons (rendered aria-hidden). */
  label?: string
  /** Compact controls may use stroke 2 (05-iconography.md §3). */
  strokeWidth?: 1.75 | 2
  className?: string
}

/**
 * Central icon wrapper (token plan §12): one library (Lucide), outline style,
 * standardized sizes, RTL mirroring, and accessible naming.
 */
export function Icon({
  icon: LucideComponent,
  size = 'md',
  mirrorInRtl = false,
  label,
  strokeWidth = 1.75,
  className,
}: IconProps) {
  return (
    <LucideComponent
      size={sizePx[size]}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      className={cn('shrink-0', mirrorInRtl && 'rtl:-scale-x-100', className)}
    />
  )
}
