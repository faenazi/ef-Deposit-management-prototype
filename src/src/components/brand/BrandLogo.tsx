import { cn } from '@/lib/cn'

/**
 * Official Environment Fund logo (DEC-008): renders the approved runtime
 * assets from /brand/… only. The logo is never redrawn, recolored, or rebuilt.
 *
 * Variant usage per 02-brand-application.md:
 * - `horizontal-blue`  — standard expanded shell on light surfaces.
 * - `horizontal-white` — approved dark navy / primary-blue surfaces only.
 * - `primary-ksa`      — formal entry, about, executive contexts.
 * - `symbol-tile`      — collapsed navigation / favicon contexts: the official
 *   white symbol composed inside an official primary-blue container (DEC-023).
 *   The asset itself is untouched; only the surrounding container is composed.
 */
export type BrandLogoVariant = 'horizontal-blue' | 'horizontal-white' | 'primary-ksa' | 'symbol-tile'

const assetPath: Record<Exclude<BrandLogoVariant, 'symbol-tile'>, string> = {
  'horizontal-blue': '/brand/logos/ef-logo-horizontal-blue.svg',
  'horizontal-white': '/brand/logos/ef-logo-horizontal-white.svg',
  'primary-ksa': '/brand/logos/ef-logo-primary-horizontal-ksa-blue.svg',
}

const ALT_TEXT = 'صندوق البيئة'

interface BrandLogoProps {
  variant: BrandLogoVariant
  /** Rendered height; width follows the asset's intrinsic ratio. */
  heightClassName?: string
  /** Decorative placements may hide the logo from assistive technology. */
  decorative?: boolean
  className?: string
}

export function BrandLogo({
  variant,
  heightClassName = 'h-10',
  decorative = false,
  className,
}: BrandLogoProps) {
  if (variant === 'symbol-tile') {
    return (
      <span
        className={cn(
          'inline-flex size-10 items-center justify-center rounded-sm bg-action-primary p-1.5',
          className,
        )}
      >
        <img
          src="/brand/logos/ef-logo-symbol-white.svg"
          alt={decorative ? '' : ALT_TEXT}
          aria-hidden={decorative || undefined}
          className="size-full object-contain"
        />
      </span>
    )
  }

  return (
    <img
      src={assetPath[variant]}
      alt={decorative ? '' : ALT_TEXT}
      aria-hidden={decorative || undefined}
      className={cn('w-auto object-contain', heightClassName, className)}
    />
  )
}
