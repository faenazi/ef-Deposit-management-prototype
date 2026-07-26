# Product Color System

## 1. Principle

Brand colors establish identity. Semantic colors communicate product meaning. These responsibilities must remain separate.

## 2. Brand tokens

```css
:root {
  --ef-navy-900: #0F1822;
  --ef-primary-700: #2C3A82;
  --ef-secondary-blue-600: #0051B1;
  --ef-green-400: #C0CB6C;
  --ef-brown-400: #A18E77;
  --ef-warm-grey-100: #F1EEE8;
  --ef-white: #FFFFFF;
}
```

## 3. Core interface tokens

```css
:root {
  --color-canvas: #F8F8F7;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #F1EEE8;
  --color-surface-brand-soft: #EAECF8;

  --color-text-primary: #0F1822;
  --color-text-secondary: #646A71;
  --color-text-muted: #95999E;
  --color-text-inverse: #FFFFFF;

  --color-border-default: #E2E3E5;
  --color-border-strong: #C8CACD;

  --color-action-primary: #2C3A82;
  --color-action-primary-hover: #1E285F;
  --color-action-primary-active: #121838;
  --color-action-secondary: #0051B1;
  --color-focus-ring: #0051B1;
}
```

## 4. Functional semantic tokens

The following are product semantics, not official brand additions:

```css
:root {
  --color-success-text: #365314;
  --color-success-bg: #F4F7E6;
  --color-success-border: #C0CB6C;

  --color-warning-text: #7A4D00;
  --color-warning-bg: #FFF7E6;
  --color-warning-border: #D79B29;

  --color-danger-text: #8A1C1C;
  --color-danger-bg: #FFF1F1;
  --color-danger-border: #C93C3C;

  --color-info-text: #003A85;
  --color-info-bg: #EBF4FF;
  --color-info-border: #529DFF;
}
```

Use semantic colors only where the status has operational meaning. Never color an entire page or large financial card red, yellow, or green.

## 5. Workflow state mapping

| State | Visual treatment |
|---|---|
| Draft | neutral grey label with outline |
| Submitted | soft blue label |
| Under review | secondary-blue label |
| Awaiting approval | warm warning label |
| Approved | restrained success label |
| Rejected | danger label |
| Returned for update | warning label with explicit text |
| Executed | primary-blue label |
| Active deposit | primary-blue or success-supported label |
| Matured | neutral dark label |
| Closed | neutral grey label |

Each status must include text and, when useful, an icon. Color alone is insufficient.

## 6. Financial meaning

- Positive yield or completed execution may use success support.
- Negative variance or failed control may use danger.
- Maturity approaching may use warning.
- High monetary value is not automatically danger or success; emphasize it typographically.
- Bank comparison charts use the approved palette and distinguish series with labels, shapes, or patterns where needed.

## 7. Usage balance

Recommended application balance:

- White and light neutral surfaces: dominant.
- Navy and primary blue: identity, typography, navigation, actions.
- Secondary blue: interactions and data visualization.
- Green and brown: controlled accents.
- Functional status colors: minimal and contextual.

## 8. Prohibitions

- No arbitrary Tailwind palette classes in product components.
- No hard-coded colors outside the token layer.
- No gradients unless an approved brand asset contains them.
- No green primary buttons.
- No multicolored KPI grid.
- No low-contrast text on tinted surfaces.