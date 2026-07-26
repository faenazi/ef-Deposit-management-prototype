# Pattern System

## 1. Purpose

The Environment Fund patterns are controlled brand assets. They create recognition at selected moments but must never reduce readability or make the platform feel decorative.

Approved assets:

- `ef-pattern-primary.svg`
- `ef-pattern-secondary.svg`
- `ef-graphic-radial-master.svg`

## 2. Core principle

Use patterns as **brand framing**, not as continuous wallpaper.

The platform must remain data-first. Forms, tables, decisions, and financial values always take priority over decorative identity elements.

## 3. Approved use cases

Patterns may be used in:

- login or prototype entry screen;
- restrained page hero or dashboard welcome area;
- executive summary header;
- empty states;
- onboarding or guided-tour panels;
- report cover or export preview;
- footer or about panel;
- selected modal confirmation moments where the content remains clear.

## 4. Prohibited use cases

Do not place patterns:

- behind tables;
- behind forms or input fields;
- behind charts or chart labels;
- behind workflow steps;
- behind approval comments;
- behind long paragraphs;
- inside every card;
- in persistent navigation as a high-contrast texture;
- as repeating full-page wallpaper;
- in warning, error, or destructive states.

## 5. Pattern hierarchy

### Primary pattern

Use for stronger official brand moments such as login, major hero areas, and executive summary headers.

### Secondary pattern

Use for quieter support areas such as empty states, side panels, or report dividers.

### Radial graphic

Use as a cropped atmospheric element. It should appear partially, never as a centered decorative badge.

## 6. Placement rules

- Prefer edge placement: top corner, bottom corner, or side crop.
- Keep the main content area visually clear.
- Crop intentionally; do not show the entire graphic by default.
- In RTL screens, visual weight should normally balance the content rather than compete with the right-side reading start.
- Avoid placing a high-density pattern immediately behind the logo.

## 7. Opacity and contrast

Recommended ranges:

| Context | Opacity guidance |
|---|---:|
| White or warm-grey surface | 4%–10% |
| Primary blue or navy surface | 8%–16% |
| Empty-state accent | 6%–12% |
| Login or hero brand panel | up to 22% when contrast remains safe |

These values are implementation starting points, not permission to reduce legibility. Contrast testing is mandatory.

## 8. Scale rules

- Do not scale patterns so small that they become visual noise.
- Do not enlarge them until strokes appear blurry or pixelated.
- Use SVG assets whenever possible.
- Maintain original aspect ratio.
- Do not distort, rotate arbitrarily, recolor freely, or rebuild the asset.

Suggested display categories:

| Category | Typical occupied area |
|---|---:|
| Subtle corner | 12%–22% of container |
| Hero crop | 25%–45% of container |
| Login brand panel | 35%–65% of panel |
| Empty state | 15%–30% of visual area |

## 9. Color treatment

Use only approved asset colors or controlled monochrome treatments derived from official brand colors.

Do not:

- apply rainbow treatments;
- use gradients inside the pattern;
- recolor the pattern with semantic error or warning colors;
- combine green, blue, and brown at equal dominance;
- add glow, bevel, shadow, or 3D effects.

## 10. Responsive behavior

### Desktop

Patterns may occupy a controlled edge region while preserving generous whitespace.

### Laptop

Reduce visible crop area before reducing content width.

### Tablet

Move decorative elements behind nonessential whitespace or reduce opacity and scale.

### Mobile

Hide large patterns by default. Retain only a small cropped accent when it does not affect content, performance, or readability.

Patterns must never cause horizontal scrolling.

## 11. Accessibility and performance

- Decorative SVGs must use empty alternative text or `aria-hidden="true"`.
- Do not animate patterns continuously.
- Avoid large raster backgrounds when an SVG is available.
- Lazy-load noncritical raster identity assets.
- Respect reduced-motion preferences if any entrance motion is applied.

## 12. Component strategy

Create reusable controlled brand components rather than adding backgrounds ad hoc.

Suggested components:

```text
BrandPattern
BrandRadialAccent
BrandedHeroSurface
BrandedEmptyStateSurface
```

Each component must expose limited approved variants only, such as:

- asset variant;
- corner or edge placement;
- approved opacity level;
- approved scale category;
- light or dark surface mode.

Feature developers must not pass arbitrary colors, rotation angles, or unrestricted opacity values.

## 13. Review questions

Before accepting pattern usage, verify:

1. Does it improve brand recognition?
2. Is the content still the strongest visual element?
3. Could the pattern be removed without harming usability?
4. Is the asset approved and undistorted?
5. Does it remain controlled at all breakpoints?
6. Is it decorative and correctly hidden from assistive technology?