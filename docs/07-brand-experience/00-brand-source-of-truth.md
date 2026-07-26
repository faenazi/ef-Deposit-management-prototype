# Environment Fund Brand Source of Truth

## 1. Purpose

This document converts the official Environment Fund identity into enforceable rules for the Investment Deposit Management Platform prototype.

No designer, developer, AI agent, or prompt may invent replacement colors, logos, patterns, fonts, or visual styles.

## 2. Official source

- Organization: Environment Fund.
- Reference: EF Visual Identity Mini Guideline.
- Version: 01.
- Date: November 2024.
- Primary typeface: Aktiv Grotesk.
- Fallback typeface: Tahoma.
- Product language: Arabic first.
- Default direction: RTL.

## 3. Official primary palette

| Token | HEX | Required use |
|---|---|---|
| `ef.navy` | `#0F1822` | strongest text, executive dark surfaces, high contrast |
| `ef.primaryBlue` | `#2C3A82` | primary actions, headings, identity areas, active navigation |
| `ef.white` | `#FFFFFF` | main surfaces, cards, inverse text |

## 4. Official secondary palette

| Token | HEX | Supporting use |
|---|---|---|
| `ef.secondaryBlue` | `#0051B1` | links, secondary interactions, chart series |
| `ef.green` | `#C0CB6C` | positive accents and selected environmental cues |
| `ef.brown` | `#A18E77` | warm institutional accent and neutral chart series |
| `ef.warmGrey` | `#F1EEE8` | warm backgrounds and soft surfaces |

Secondary colors must not overpower the primary blue, navy, white, and negative space.

## 5. Approved asset names

### Logos

- `ef-logo-primary-horizontal-ksa-blue.svg`
- `ef-logo-horizontal-blue.svg`
- `ef-logo-horizontal-white.svg`
- `ef-logo-symbol-white.svg`

### Patterns

- `ef-pattern-primary.svg`
- `ef-pattern-secondary.svg`

### Graphic element

- `ef-graphic-radial-master.svg`

The application must reference approved assets only. Do not redraw, recolor, distort, stretch, rotate, crop destructively, or recreate the logo with text.

## 6. Brand personality

Every screen must feel:

- official;
- institutional;
- premium;
- calm;
- confident;
- modern;
- financially trustworthy;
- government ready;
- Arabic first;
- environmentally inspired without visual clichés.

## 7. Non-negotiable UI rules

1. Use a clean, spacious, data-first layout.
2. Use primary colors as the dominant identity layer.
3. Use patterns and radial graphics only in controlled brand moments.
4. Do not place patterns behind forms, tables, charts, or long text.
5. Do not use gradients, neon colors, glassmorphism, heavy shadows, or 3D effects.
6. Do not imitate generic SaaS dashboards.
7. Do not use green as the dominant platform color.
8. Do not communicate workflow state by color alone.
9. Ensure accessible contrast and visible keyboard focus.
10. Keep Arabic content natural, concise, and correctly aligned in RTL.

## 8. Font licensing rule

Do not commit Aktiv Grotesk font files to a public repository unless the Environment Fund confirms that the license permits repository distribution.

Frontend fallback stack:

```css
font-family: "Aktiv Grotesk", Tahoma, Arial, sans-serif;
```

## 9. Product-specific extension boundary

The official brand palette defines identity colors. The product may add semantic tokens for error, warning, overdue, focus, disabled, and workflow states only when:

- the token has a functional purpose;
- it passes accessibility checks;
- it does not present itself as a new brand color;
- its use is documented in `03-color-system.md`.

## 10. Required implementation assets

Before visual implementation is considered complete, the repository must contain approved web-ready SVG files under:

```text
src/assets/brand/logos/
src/assets/brand/patterns/
src/assets/brand/graphic-elements/
```

Font binaries are intentionally excluded unless explicitly authorized.