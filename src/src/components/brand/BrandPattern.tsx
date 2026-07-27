import { cn } from '@/lib/cn'

/**
 * Controlled brand pattern / radial accent (06-pattern-system.md §12).
 * Only approved variants are exposed: asset, edge placement, approved opacity
 * level, and scale category. Always decorative (aria-hidden), never behind
 * forms, tables, charts, or long text, and hidden on mobile by default.
 */
type BrandPatternAsset = 'pattern-primary' | 'pattern-secondary' | 'radial'
type BrandPatternPlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
/** Opacity levels from 06-pattern-system.md §7. */
type BrandPatternOpacity = 'subtle' | 'soft' | 'hero'
/** Scale categories from 06-pattern-system.md §8. */
type BrandPatternScale = 'corner' | 'hero'

const assetPath: Record<BrandPatternAsset, string> = {
  'pattern-primary': '/brand/patterns/ef-pattern-primary.svg',
  'pattern-secondary': '/brand/patterns/ef-pattern-secondary.svg',
  radial: '/brand/graphic-elements/ef-graphic-radial-master.svg',
}

const opacityClass: Record<BrandPatternOpacity, string> = {
  subtle: 'opacity-[0.06]',
  soft: 'opacity-10',
  hero: 'opacity-[0.16]',
}

const placementClass: Record<BrandPatternPlacement, string> = {
  'top-start': 'top-0 start-0 -translate-y-1/4 rtl:translate-x-1/4 ltr:-translate-x-1/4',
  'top-end': 'top-0 end-0 -translate-y-1/4 rtl:-translate-x-1/4 ltr:translate-x-1/4',
  'bottom-start': 'bottom-0 start-0 translate-y-1/4 rtl:translate-x-1/4 ltr:-translate-x-1/4',
  'bottom-end': 'bottom-0 end-0 translate-y-1/4 rtl:-translate-x-1/4 ltr:translate-x-1/4',
}

const scaleClass: Record<BrandPatternScale, string> = {
  corner: 'w-[22%] min-w-32 max-w-64',
  hero: 'w-[40%] min-w-48 max-w-[28rem]',
}

interface BrandPatternProps {
  asset: BrandPatternAsset
  placement?: BrandPatternPlacement
  opacity?: BrandPatternOpacity
  scale?: BrandPatternScale
  className?: string
}

/** Parent container must be `relative overflow-hidden`. Hidden below `md`. */
export function BrandPattern({
  asset,
  placement = 'bottom-start',
  opacity = 'subtle',
  scale = 'corner',
  className,
}: BrandPatternProps) {
  return (
    <img
      src={assetPath[asset]}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={cn(
        'pointer-events-none absolute hidden select-none md:block',
        placementClass[placement],
        opacityClass[opacity],
        scaleClass[scale],
        className,
      )}
    />
  )
}
