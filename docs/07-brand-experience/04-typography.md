# Typography

## 1. Typeface

Primary: `Aktiv Grotesk`.
Fallback: `Tahoma`, then `Arial`, then `sans-serif`.

```css
font-family: "Aktiv Grotesk", Tahoma, Arial, sans-serif;
```

Do not commit licensed font binaries to the public repository without explicit authorization.

## 2. Weight usage

| Purpose | Preferred weight |
|---|---|
| Page title and executive heading | Bold / XBold |
| Section heading | Bold / SemiBold |
| Card and table heading | SemiBold |
| Navigation and form labels | Medium / SemiBold |
| Body and descriptions | Regular |
| Financial KPI | Bold / XBold |

Avoid Thin and Light weights for Arabic UI text and small sizes.

## 3. Product type scale

| Token | Size | Line height | Use |
|---|---:|---:|---|
| Display | 36px | 44px | rare executive hero moments |
| H1 | 28px | 38px | page title |
| H2 | 22px | 32px | major section |
| H3 | 18px | 28px | card or workspace section |
| Body large | 16px | 26px | introductions and key summaries |
| Body | 14px | 22px | default UI text |
| Small | 12px | 18px | metadata and helper text |

Minimum operational text size is 12px. Dense tables may use 13px or 14px but must remain readable.

## 4. Arabic rules

- Arabic is the default interface language and direction is RTL.
- Use right alignment for labels, body content, navigation, and form reading order.
- Do not use stretched justification.
- Use comfortable line height and short paragraphs.
- Avoid mixing multiple weights within one sentence.
- Keep English technical terms isolated and directionally safe.

## 5. Financial numbers

Financial values must be scannable and visually stable.

- Use tabular numerals when supported.
- Keep currency and value together.
- Use Arabic interface labels with internationally readable digits unless product requirements specify Arabic-Indic digits.
- Use consistent thousand separators.
- Display percentages to a meaningful precision only.
- Do not use color as the only indicator of positive or negative performance.

Examples:

```text
125,000,000 ر.س
5.35%
12 شهرًا
31 ديسمبر 2026
```

For compact KPI contexts:

```text
125 مليون ر.س
```

The full amount must remain available in details or a tooltip.

## 6. Table typography

- Header: SemiBold, 13–14px.
- Body: Regular, 13–14px.
- Monetary values: Medium or SemiBold and aligned consistently.
- Metadata: 12px with sufficient contrast.
- Avoid uppercase English labels inside Arabic-first tables.

## 7. Truncation

Do not truncate amounts, rates, statuses, dates, or primary identifiers. Long bank names and descriptions may truncate only when the full value is available through tooltip or expanded view.