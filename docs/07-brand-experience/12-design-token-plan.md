# Design Token Plan — Step 02 Brand and Design System Foundation

Status: planning deliverable of Step 02 (Decision DEC-013 — planning and interpretation only).
Implementation target: Step 05 (`prompts/04-frontend/02-build-design-system-and-app-shell.md`), after initialization in Step 04.

This document consolidates every design token, component foundation, layout rule, RTL rule, and brand-asset mapping that Step 05 needs, so that Step 05 can implement the design system without making new design decisions. It interprets — it does not replace — the authoritative brand documents `00`–`11` in this folder. When a value here conflicts with `00-brand-source-of-truth.md`, the source of truth wins.

## 1. Brand asset validation result

Inspected on 2026-07-27:

- `assets/brand/logos/`, `assets/brand/patterns/`, `assets/brand/graphic-elements/` exist and contain only `.gitkeep` files.
- `src/public/brand/{logos,patterns,graphic-elements}/` exist and contain only a README.
- None of the seven required official SVG files is present.

**Blocker B-01 remains OPEN.** Per DEC-008, no asset may be redrawn, traced, approximated, or fabricated. Validation of the documented palette, logo variants, and pattern geometry against the real artwork is therefore **deferred** until the owner uploads the official files. All color values in this plan are taken from `00-brand-source-of-truth.md` and `03-color-system.md` and must be re-verified against the delivered SVGs before Step 05 visual sign-off.

What this does not block: Steps 02–04 (this plan, domain planning, frontend initialization). What it blocks: copying runtime assets in Step 04 and final visual completion from Step 05 onward.

## 2. Token architecture

Three layers, strictly ordered. Feature code may consume only layers 2 and 3.

1. **Brand tokens** (`--ef-*`) — official Environment Fund identity values. Never referenced directly by feature components.
2. **Semantic tokens** (`--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--motion-*`, `--layout-*`, `--z-*`, `--chart-*`) — product meaning, defined once, mapped from brand tokens or documented product extensions.
3. **Component tokens** — only where a component family needs a stable variant contract (status badge variants, button variants, icon sizes). Defined with the component, referencing layer 2.

Planned file locations (created in Steps 04–05, per DEC-014 structure):

```text
src/src/styles/tokens.css     — layers 1 and 2 as CSS custom properties
src/src/styles/motion.css     — motion primitives (per 08-motion-system.md §14)
src/src/styles/fonts.css      — font-family stack declaration (no binaries)
```

Tailwind consumes the CSS custom properties through its theme configuration so that utilities and tokens stay in sync. The exact wiring mechanism (Tailwind v4 `@theme` vs. v3 `tailwind.config` `theme.extend`) is decided in Step 04 with the dependency versions; either way, the token names and values below are the contract. Raw HEX values must not appear in feature components (`02-ai-coding-standards.md` §5, `03-color-system.md` §8).

## 3. Brand color tokens (layer 1)

From `00-brand-source-of-truth.md` §3–4 and `03-color-system.md` §2 — final, pending re-verification against official SVGs:

| Token | HEX | Origin |
|---|---|---|
| `--ef-navy-900` | `#0F1822` | primary palette |
| `--ef-primary-700` | `#2C3A82` | primary palette |
| `--ef-white` | `#FFFFFF` | primary palette |
| `--ef-secondary-blue-600` | `#0051B1` | secondary palette |
| `--ef-green-400` | `#C0CB6C` | secondary palette |
| `--ef-brown-400` | `#A18E77` | secondary palette |
| `--ef-warm-grey-100` | `#F1EEE8` | secondary palette |

Usage balance (per `03-color-system.md` §7): white/light neutrals dominant; navy and primary blue for identity, typography, navigation, actions; secondary blue for interactions and charts; green and brown as controlled accents only; green never dominant and never an automatic "success button" color.

## 4. Semantic color tokens (layer 2)

All values below are already documented in `03-color-system.md` §3–4 and are adopted unchanged.

### Surfaces and text

| Token | Value |
|---|---|
| `--color-canvas` | `#F8F8F7` |
| `--color-surface` | `#FFFFFF` |
| `--color-surface-subtle` | `#F1EEE8` (= warm grey) |
| `--color-surface-brand-soft` | `#EAECF8` |
| `--color-text-primary` | `#0F1822` |
| `--color-text-secondary` | `#646A71` |
| `--color-text-muted` | `#95999E` |
| `--color-text-inverse` | `#FFFFFF` |
| `--color-border-default` | `#E2E3E5` |
| `--color-border-strong` | `#C8CACD` |

### Actions and focus

| Token | Value |
|---|---|
| `--color-action-primary` | `#2C3A82` |
| `--color-action-primary-hover` | `#1E285F` |
| `--color-action-primary-active` | `#121838` |
| `--color-action-secondary` | `#0051B1` |
| `--color-focus-ring` | `#0051B1` |

Focus treatment: 2px outline in `--color-focus-ring` with 2px offset on light surfaces; on navy/primary-blue surfaces use a white outline. Focus must always be visible (`00-brand-source-of-truth.md` §7.9).

### Functional status tokens

| Group | Text | Background | Border |
|---|---|---|---|
| success | `#365314` | `#F4F7E6` | `#C0CB6C` |
| warning | `#7A4D00` | `#FFF7E6` | `#D79B29` |
| danger | `#8A1C1C` | `#FFF1F1` | `#C93C3C` |
| info | `#003A85` | `#EBF4FF` | `#529DFF` |

These are product semantics, not brand additions (`00-brand-source-of-truth.md` §9). They may never color a whole page or a large financial card, and color is never the only status signal.

### Disabled

Add one documented extension pair (required by `00-brand-source-of-truth.md` §9's allowed list, not yet valued in `03-color-system.md`):

| Token | Planned value | Rationale |
|---|---|---|
| `--color-text-disabled` | `#95999E` (reuse text-muted) | no new color introduced |
| `--color-surface-disabled` | `#F1F1F0` | neutral derived between canvas and border-default |

If review prefers, `--color-surface-disabled` can alias `--color-canvas`; the token name is the contract.

## 5. Workflow status visual mapping

`docs/02-business/statuses-and-transitions.md` is the single source of truth for status codes and Arabic labels (DEC-012). The badge component must key its variants to those canonical codes; the visual recipes come from `03-color-system.md` §5:

| Visual variant | Recipe | Applies to (per status source of truth) |
|---|---|---|
| `neutral-outline` | grey text, transparent bg, `--color-border-strong` outline | draft-type states (`مسودة`) |
| `info-soft` | info tokens | submitted-type states |
| `secondary-blue` | `--color-action-secondary` text on `#EBF4FF` | under-review states |
| `warning` | warning tokens | awaiting approval, `معاد للاستكمال` (with explicit text), approaching maturity annotations |
| `success-restrained` | success tokens | approved states |
| `danger` | danger tokens | rejected states |
| `primary` | `--color-action-primary` text on `--color-surface-brand-soft` | executed, active deposit |
| `neutral-dark` | `--color-text-primary` on `--color-canvas` | matured |
| `neutral` | `--color-text-secondary` on `--color-canvas` | closed |

Every badge shows the exact canonical Arabic label plus optional icon; color alone is prohibited. The exact status-code → variant table is completed in Step 07 when the domain model is implemented, using this recipe set — no new colors may be introduced there.

## 6. Typography tokens

Family (per `00-brand-source-of-truth.md` §8, `04-typography.md` §1):

```css
--font-family-base: "Aktiv Grotesk", Tahoma, Arial, sans-serif;
```

No font binaries are committed (licensing rule). Until the Environment Fund confirms license terms, the prototype renders with **Tahoma** for Arabic and Latin text. Known limitation: Tahoma ships only regular and bold, so Medium/SemiBold weights will be browser-synthesized; this is acceptable for the prototype and recorded here so it is not treated as a Step 05 defect.

Weights: `--font-weight-regular: 400`, `--font-weight-medium: 500`, `--font-weight-semibold: 600`, `--font-weight-bold: 700`, `--font-weight-xbold: 800`. Thin/Light are prohibited for Arabic UI text.

Type scale (from `04-typography.md` §3, final):

| Token | Size / line height | Weight guidance | Use |
|---|---|---|---|
| `--text-display` | 36px / 44px | bold–xbold | rare executive hero |
| `--text-h1` | 28px / 38px | bold | page title |
| `--text-h2` | 22px / 32px | bold–semibold | major section |
| `--text-h3` | 18px / 28px | semibold | card / workspace section |
| `--text-body-lg` | 16px / 26px | regular | introductions, key summaries |
| `--text-body` | 14px / 22px | regular | default UI text |
| `--text-small` | 12px / 18px | regular–medium | metadata, helper text |

Rules carried into the design system:

- Minimum operational text 12px; tables 13–14px; body text never below 14px responsively.
- Financial values: tabular numerals (`font-variant-numeric: tabular-nums`), currency kept with the value (`125,000,000 ر.س`), consistent thousand separators, KPI weight bold/xbold, compact form (`125 مليون ر.س`) only with full value available in tooltip/detail.
- Never truncate amounts, rates, statuses, dates, or primary identifiers.
- Table typography: header semibold 13–14px, body regular 13–14px, monetary values medium/semibold, metadata 12px.
- Number formatting is centralized in one utility module (planned `src/src/lib/format.ts`) so separators, currency, percent precision (two decimals for offers/yields), and tenor labels stay identical product-wide.

## 7. Spacing tokens

8px vertical rhythm (`00-shared-layout-and-components.md` §2) with a 4px half-step for compact controls. Tailwind's default 4px-based scale is retained; the design system documents the **approved steps**:

| Token | Value | Typical use |
|---|---|---|
| `--space-1` | 4px | icon/text gaps, badge padding |
| `--space-2` | 8px | control internals, tight groups |
| `--space-3` | 12px | form field gaps, table cell padding |
| `--space-4` | 16px | related content groups, mobile page gutter |
| `--space-5` | 20px | card padding (compact), tablet gutter |
| `--space-6` | 24px | card padding (default 20–24px), laptop content padding |
| `--space-8` | 32px | large-screen content padding, section separation |
| `--space-10` | 40px | major section separation |
| `--space-12` | 48px | page-level separation, hero regions |
| `--space-16` | 64px | rare executive/entry moments |

Section-to-section rhythm uses 8px multiples only; 4px appears solely inside components.

## 8. Radius tokens

Brand direction: "moderate and consistent" radii, no oversized rounded cards. Planned scale (new — no prior document assigns values; recorded here as the single source):

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | 4px | badges, chips, small inputs |
| `--radius-sm` | 6px | buttons, inputs, selects |
| `--radius-md` | 8px | cards, table containers, panels (maximum for standard cards) |
| `--radius-lg` | 12px | dialogs, drawers, hero/brand surfaces |
| `--radius-full` | 9999px | pills, avatars, count indicators |

Nothing larger than 12px anywhere in the operational UI.

## 9. Shadow tokens

Heavy shadows are prohibited (`00-brand-source-of-truth.md` §7.5). Elevation is reserved for dialogs, drawers, floating/sticky action areas, and popovers (`00-shared-layout-and-components.md` §7). Planned restrained scale (new — recorded here as the single source):

| Token | Value | Use |
|---|---|---|
| `--shadow-none` | `none` | default for cards (cards use borders, not shadows) |
| `--shadow-xs` | `0 1px 2px rgba(15, 24, 34, 0.05)` | optional subtle lift on clickable cards |
| `--shadow-sm` | `0 2px 8px rgba(15, 24, 34, 0.08)` | dropdowns, popovers, tooltips |
| `--shadow-md` | `0 8px 24px rgba(15, 24, 34, 0.12)` | dialogs, drawers |
| `--shadow-sticky` | `0 -1px 0 #E2E3E5, 0 -4px 12px rgba(15, 24, 34, 0.06)` | sticky bottom action bars |

Shadow color is always derived from navy at low opacity; no colored or glow shadows.

## 10. Motion tokens

Adopted unchanged from `08-motion-system.md` §3–4 — final:

| Token | Value |
|---|---|
| `--motion-instant` | 80ms |
| `--motion-fast` | 120ms |
| `--motion-standard` | 180ms |
| `--motion-emphasis` | 240ms |
| `--motion-slow` | 320ms |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` |

Governance carried into Step 05: no transition above 400ms; no spring/bounce/overshoot; shared primitives for fade, collapse, drawer, dialog, skeleton pulse, spinner in `src/src/styles/motion.css` plus component wrappers; `prefers-reduced-motion: reduce` removes nonessential transforms, shortens fades, and disables chart animation; feature code may not define its own durations or easings.

## 11. Layout, breakpoint, and z-index tokens

### Shell dimensions (from `00-shared-layout-and-components.md` §2)

| Token | Value |
|---|---|
| `--layout-sidebar-expanded` | 264px |
| `--layout-sidebar-collapsed` | 80px |
| `--layout-header-height` | 72px |
| `--layout-content-max-wide` | 1600px (workspace, comparison, dense-data pages) |
| `--layout-content-max-standard` | 1280px (readable maximum for lists/dashboard — "readable maximum width" per responsive strategy §6; exact value may be tuned ±10% in Step 05 visual review) |

Content horizontal padding by viewport (responsive strategy §6): large desktop 32px, desktop/laptop 24px, tablet 20px, mobile 16px. Content never touches viewport edges; dense Arabic tables are not centered inside excessive margins.

### Breakpoints (from `09-responsive-strategy.md` §2)

Tailwind screens configuration, min-width:

| Name | Min width | Category |
|---|---|---|
| `sm` | 480px | large phones (layout refinement only) |
| `md` | 768px | tablet landscape and up |
| `lg` | 1024px | laptop and up |
| `xl` | 1280px | desktop and up |
| `2xl` | 1440px | large desktop |

Below 768px is the single-column task-focused experience; minimum supported width 390px, tested down to 360px (DEC-010, testing viewport list §18). Components respond to container width where practical rather than device labels alone.

### Grid

12-column grid with consistent gutters on `lg`+; 6 columns tablet; 4 columns / single flow mobile. Semantic column spans, not fixed pixel widths.

### Z-index scale (new — recorded here as the single source)

| Token | Value | Layer |
|---|---|---|
| `--z-base` | 0 | page content |
| `--z-sticky` | 10 | sticky table headers, sticky action bars |
| `--z-shell` | 30 | app header and sidebar |
| `--z-overlay` | 40 | drawer/dialog backdrops |
| `--z-drawer` | 50 | drawers |
| `--z-dialog` | 60 | dialogs |
| `--z-popover` | 70 | dropdowns, popovers, menus |
| `--z-toast` | 80 | toasts/notifications |
| `--z-tooltip` | 90 | tooltips |

## 12. Iconography tokens

Adopted from `05-iconography.md` — final: library **Lucide React**, outline style, default stroke 1.75 (2 in compact controls), no emoji/filled/multicolor icons, one library only.

Sizes: `--icon-xs` 14px, `--icon-sm` 16px, `--icon-md` 20px, `--icon-lg` 24px, `--icon-xl` 32px, `--icon-display` 48px.

A central icon wrapper at `src/src/components/ui/icon/` standardizes size, stroke, RTL mirroring, and accessible naming. Navigation and domain icon mappings in `05-iconography.md` §7–8 are the fixed contract (icons never change per role). Directional icons (arrows, chevrons, prev/next, horizontal collapse/expand) mirror in RTL; checkmarks, clocks, calendars, files, banks, charts, and status symbols do not.

## 13. Chart palette tokens

From `07-data-visualization.md` §5–6:

| Token | Value |
|---|---|
| `--chart-cat-1` | `#2C3A82` (EF primary blue) |
| `--chart-cat-2` | `#0051B1` (EF secondary blue) |
| `--chart-cat-3` | `#C0CB6C` (EF green) |
| `--chart-cat-4` | `#A18E77` (EF brown) |
| `--chart-cat-5` | `#0F1822` (EF navy) |
| `--chart-cat-6` | `#95999E` (approved neutral grey) |
| `--chart-grid` | `#E2E3E5` |

Semantic chart states reuse the functional tokens from §4 (success/warning/danger/info) plus `--color-action-secondary` for selection; every semantic use requires a text label, icon, pattern, or annotation. Maximum six simultaneous series. Brand colors carry no automatic semantic meaning in charts (EF green ≠ "approved"). The chart library is selected once in Step 04/05 and wrapped in the shared components listed in `07-data-visualization.md` §16 (`FinancialKpi`, `ChartContainer`, `ChartLegend`, `AccessibleChartSummary`, plus the named treasury charts); feature code never sets chart colors directly.

## 14. RTL implementation rules

- `<html dir="rtl" lang="ar">` is the application default; direction is structural, not a per-component override.
- Use CSS **logical properties** and Tailwind logical utilities (`ms-*`/`me-*`, `ps-*`/`pe-*`, `start`/`end`) everywhere; physical `left/right` utilities are prohibited in feature code except where a physical edge is genuinely intended.
- Primary sidebar sits on the **right**; reading and action priority flow right-to-left (`00-shared-layout-and-components.md` §2).
- Side drawers enter from the **left** (supplementing right-anchored main content, `08-motion-system.md` §5), consistently across the whole product.
- Toasts enter from a consistent RTL-appropriate edge (planned: bottom-left, matching the drawer side; confirmed in Step 05 visual review).
- Directional icon mirroring per §12; the icon wrapper owns this behavior.
- Numerals, percentages, dates, and mixed Arabic/English strings must be directionally safe: isolate Latin/technical fragments (`unicode-bidi: isolate` / `<bdi>`), keep currency attached to its value, never rely on browser auto-direction for financial strings.
- No stretched justification; right-aligned labels, body, navigation, and forms; table alignment per `04-typography.md` §6 and `00-shared-layout-and-components.md` §9.
- Workflow/step indicators, breadcrumbs, and progress bars advance right-to-left.

## 15. Component foundations for Step 05

Required shared foundations (consolidating `02-ai-coding-standards.md` §6, `00-shared-layout-and-components.md`, `06-pattern-system.md` §12, `07-data-visualization.md` §16). Planned locations follow DEC-014.

### Shell and layout (`src/src/layouts/`, `src/src/app/`)

- `AppShell` — RTL shell: top header (72px), right sidebar (264/80px), main region; tablet/mobile drawer navigation.
- `SidebarNav` — fixed six-item navigation (DEC-009 order), logo slot, collapse control, restrained notification counts.
- `TopHeader` — breadcrumb/location, prototype role switcher, notifications, user identity, optional global search.
- `PageHeader` — eyebrow/breadcrumb, title, description, primary action, secondary actions, metadata.
- `PageContainer` — standard vs. wide max-width variants, responsive padding tokens.

### UI primitives (`src/src/components/ui/`)

- `Button` (primary / secondary / ghost / danger; loading preserves width), `IconButton` (mandatory accessible name).
- `Input`, `Select`, `Textarea`, `DateField`, `AmountField` (tabular numerals, SAR formatting), `FormField` (visible label, helper, inline validation), `FormErrorSummary`.
- `Badge` / `StatusBadge` (variants of §5, canonical Arabic labels), `CountIndicator`.
- `Card` (border-first, radius-md, padding 20–24px; elevation prohibited by default), `SectionHeading`.
- `DataTable` family — sticky header, sortable columns, row hover/focus, aligned tabular numerals, pagination, responsive strategy (horizontal scroll → frozen identity column → column priority hiding → row-detail drawer; cards only for record-oriented data), empty/loading/error slots.
- `FilterBar` (persistent filters, active-filter chips, clear action) + `AdvancedFilterDrawer`.
- `Drawer` (left-entering, consistent), `Dialog` (focus-managed; complex forms never forced into small dialogs), `Tooltip` (keyboard-accessible), `Popover`/`Menu`.
- `Toast`/`Banner` feedback, `EmptyState` (what is absent / why / next action; optional restrained brand accent), `Skeleton` (layout-matching), `Spinner`.
- `StickyActionBar` — restrained, never covers content on small screens.
- `Icon` wrapper (§12).

### Financial and workflow components

- `FinancialValue` — the single component for rendering amounts/rates/tenors/dates with the §6 formatting rules.
- `FinancialKpi` — label, value, unit, context/comparison, optional trend and action; number dominant; no walls of identical KPI cards.
- `WorkflowSteps` / `WorkflowTimeline` — RTL stage progression with owner, timestamps, and return visibility.
- `ActivityTimeline`, `AttachmentRow`, `ApprovalHistoryList` — traceability primitives (actor, timestamp, comment, attachment, result).
- Chart wrappers per §13.

### Brand components (`src/src/components/brand/`)

Per `06-pattern-system.md` §12 — `BrandLogo` (variant-aware, asset-based), `BrandPattern`, `BrandRadialAccent`, `BrandedHeroSurface`, `BrandedEmptyStateSurface`. Each exposes only approved variants (asset, edge placement, approved opacity level from §7 of the pattern system, scale category, light/dark surface mode). No arbitrary colors, rotation, or free opacity. All decorative uses render with `aria-hidden="true"`. These components are asset-driven and therefore **blocked by B-01** for visual completion; their APIs and placement rules are not.

Brand intensity per page follows the fixed table in `02-brand-application.md` (entry high-but-controlled → workspace very low → settings minimal).

## 16. Brand asset mapping and runtime copy list

### Source → runtime copy list (executed in Step 04, after B-01 is resolved)

Source of truth: owner-supplied files in `assets/brand/`. Runtime copies are byte-preserving or losslessly optimized (e.g. SVGO with visual-output-identical settings); no recoloring, redrawing, cropping, or restructuring. Filenames are preserved exactly.

| Source (owner-supplied) | Runtime target | Runtime reference |
|---|---|---|
| `assets/brand/logos/ef-logo-primary-horizontal-ksa-blue.svg` | `src/public/brand/logos/ef-logo-primary-horizontal-ksa-blue.svg` | `/brand/logos/ef-logo-primary-horizontal-ksa-blue.svg` |
| `assets/brand/logos/ef-logo-horizontal-blue.svg` | `src/public/brand/logos/ef-logo-horizontal-blue.svg` | `/brand/logos/ef-logo-horizontal-blue.svg` |
| `assets/brand/logos/ef-logo-horizontal-white.svg` | `src/public/brand/logos/ef-logo-horizontal-white.svg` | `/brand/logos/ef-logo-horizontal-white.svg` |
| `assets/brand/logos/ef-logo-symbol-white.svg` | `src/public/brand/logos/ef-logo-symbol-white.svg` | `/brand/logos/ef-logo-symbol-white.svg` |
| `assets/brand/patterns/ef-pattern-primary.svg` | `src/public/brand/patterns/ef-pattern-primary.svg` | `/brand/patterns/ef-pattern-primary.svg` |
| `assets/brand/patterns/ef-pattern-secondary.svg` | `src/public/brand/patterns/ef-pattern-secondary.svg` | `/brand/patterns/ef-pattern-secondary.svg` |
| `assets/brand/graphic-elements/ef-graphic-radial-master.svg` | `src/public/brand/graphic-elements/ef-graphic-radial-master.svg` | `/brand/graphic-elements/ef-graphic-radial-master.svg` |

Runtime code references only `/brand/...` paths and never imports from root `assets/brand/` (DEC-008).

### Usage mapping (from `02-brand-application.md`)

| Asset | Approved application use |
|---|---|
| `ef-logo-horizontal-blue.svg` | standard expanded shell on light surfaces |
| `ef-logo-horizontal-white.svg` | approved dark navy / primary-blue surfaces only |
| `ef-logo-primary-horizontal-ksa-blue.svg` | formal entry screen, about, executive contexts |
| `ef-logo-symbol-white.svg` | favicon, collapsed navigation state, subtle watermark — never replaces the full logo in the expanded shell |
| `ef-pattern-primary.svg` | entry screen, major hero, executive summary header |
| `ef-pattern-secondary.svg` | empty states, side panels, report dividers |
| `ef-graphic-radial-master.svg` | rare cropped atmospheric use: entry screen, executive overview header, major empty state |

Opacity, placement, scale, and responsive reduction follow `06-pattern-system.md` §6–10 exclusively, enforced through the brand components' fixed variants.

### Favicon plan

The favicon uses the official `ef-logo-symbol-white.svg` **unmodified**, composed inside a small primary-blue (`#2C3A82`) rounded container so the white symbol remains visible on light browser chrome. This is composition around the approved asset, not modification of it. Executed in Step 04/05 after B-01.

## 17. Recorded conflicts, decisions, and assumptions

Per the Step 02 prompt, conflicts between brand documentation and the shared layout specification are recorded rather than silently resolved.

### C-01 — Sidebar surface direction (open design choice, recommendation recorded)

`docs/08-design-specifications/00-shared-layout-and-components.md` §3 leaves the sidebar surface open ("light or deep navy institutional surface based on the final shell direction"), while `02-brand-application.md` describes the shell as "a clean light workspace" with dark surfaces reserved for compact prominent areas. **Planned resolution: light sidebar** — `--color-surface` background, `--color-surface-brand-soft` + primary-blue text/icon for the active item, warm-grey hover — using `ef-logo-horizontal-blue.svg`. A deep-navy sidebar is treated as a rejected default (it would conflict with "do not turn the operational application dark" and enlarge the dark-surface footprint). This is a visual (not business) decision; final confirmation happens at the Step 05 visual review gate already defined in the roadmap.

### C-02 — Collapsed-sidebar logo on a light surface (asset gap, recommendation recorded)

The only approved symbol asset is `ef-logo-symbol-white.svg`, which is invisible on the light sidebar chosen in C-01. Redrawing a blue symbol is prohibited (DEC-008). **Planned resolution:** in collapsed mode, render the white symbol inside a compact primary-blue rounded container (the same composition approach as the favicon) — the asset itself remains untouched. Alternative: the owner supplies an official blue symbol variant with the B-01 upload; if one arrives, it replaces the composed treatment.

### C-03 — Digit system for financial values (documentation conflict, needs owner confirmation)

`04-typography.md` §5 mandates "internationally readable digits unless product requirements specify Arabic-Indic digits" and all its examples use Latin digits (`125,000,000 ر.س`), but `07-data-visualization.md` §7 gives an Arabic-Indic example (`١٢٥٬٠٠٠٬٠٠٠ ر.س`). **Planned default: Latin digits (0-9)** product-wide, via `Intl.NumberFormat('ar-SA-u-nu-latn')`-style formatting in the central format utility — consistent with the typography document, tabular-numeral support, and financial scanability. The data-visualization example is treated as illustrative, not normative. Owner confirmation requested; switching later is a one-line change in the central formatter.

### Assumptions (recorded, low risk)

- A-01 — Radius (§8), shadow (§9), z-index (§11), and disabled-color (§4) values are new numeric interpretations of qualitative brand rules ("moderate", "subtle", "restrained"); no document previously assigned values. They are recorded here as the single source and are tunable at the Step 05 visual review without breaking the token contract.
- A-02 — `--layout-content-max-standard: 1280px` interprets "readable maximum width" for list/dashboard pages; the 1600px wide maximum is explicit in the shared layout spec.
- A-03 — Tahoma-only rendering (no Aktiv Grotesk binaries) with synthesized medium/semibold weights is the accepted prototype baseline until the owner resolves font licensing. This is a licensing constraint, not a design deviation.
- A-04 — Toast entry edge (bottom-left) pairs with the documented left-entering drawers; confirmed at Step 05 visual review.

### Blockers

- **B-01 (OPEN)** — the seven official SVGs are missing; see §1. Gates the §16 copy list, brand-component visual completion, favicon, and palette re-verification. Does not gate Steps 02–04.

## 18. Step 05 readiness

Step 05 can implement the design system and app shell from this document plus the referenced brand documents with **no new design decisions**, provided that:

1. tokens are created exactly as specified in §3–§13 in `src/src/styles/`;
2. RTL rules in §14 are applied at the shell level;
3. the component inventory in §15 is used as the build list;
4. C-01/C-02 recommendations are implemented as planned unless the owner overrides them at review;
5. C-03 default (Latin digits) is implemented in the central formatter pending owner confirmation;
6. brand-asset-dependent visuals degrade gracefully (reserved logo slot, no fabricated placeholder artwork) until B-01 is resolved.
