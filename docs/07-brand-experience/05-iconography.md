# Iconography System

## 1. Purpose

This document defines the icon language for the Investment Deposit Management Platform. Icons must support comprehension, hierarchy, and action clarity without becoming decoration.

## 2. Approved icon source

Use **Lucide React** as the primary icon library because it provides a consistent outline style, strong React support, and broad functional coverage.

Do not mix icon libraries within the same interface unless an approved brand asset has no equivalent.

## 3. Visual style

- Style: outline.
- Default stroke width: `1.75`.
- Compact controls may use `2` for visual clarity.
- Corners must remain consistent with Lucide defaults.
- Filled icons are reserved for exceptional emphasis such as selected favorites or critical system indicators.
- Do not use emoji as interface icons.
- Do not use 3D, illustrated, multicolor, or skeuomorphic icons.

## 4. Standard sizes

| Token | Size | Use |
|---|---:|---|
| `icon.xs` | 14px | dense metadata, compact badges |
| `icon.sm` | 16px | inputs, table actions, inline labels |
| `icon.md` | 20px | navigation and standard buttons |
| `icon.lg` | 24px | page actions and prominent controls |
| `icon.xl` | 32px | empty states and branded utility areas |
| `icon.display` | 48px | rare hero or major empty-state moments |

Icons inside buttons must not exceed the text line height.

## 5. Color rules

- Default: text-secondary or text-muted.
- Active navigation: EF primary blue.
- Primary button: white.
- Destructive action: semantic danger.
- Success, warning, and workflow icons use semantic tokens only.
- Never use color alone to explain meaning; pair the icon with text or an accessible label.

## 6. RTL behavior

Directional icons must mirror in RTL when their meaning depends on direction.

Mirror:

- arrows;
- chevrons;
- previous and next controls;
- external navigation indicators when visually directional;
- collapse and expand controls tied to horizontal movement.

Do not mirror:

- checkmarks;
- clocks;
- calendars;
- files;
- banks;
- charts;
- status symbols;
- universally recognized objects.

## 7. Navigation icon mapping

Use one stable icon per navigation destination.

| Destination | Preferred icon |
|---|---|
| Dashboard | `LayoutDashboard` |
| My Tasks | `Inbox` |
| Investment Requests | `FileText` |
| Deposit Portfolio | `Landmark` |
| Reports | `ChartNoAxesCombined` |
| Settings | `Settings` |

Do not change navigation icons between roles.

## 8. Domain icon mapping

| Concept | Preferred icon |
|---|---|
| Bank | `Building2` or `Landmark` |
| Liquidity | `WalletCards` |
| Bank offer | `BadgePercent` |
| Rate / return | `Percent` |
| Maturity | `CalendarClock` |
| Approval | `CircleCheckBig` |
| Rejection | `CircleX` |
| Review | `ScanSearch` |
| Execution | `Send` |
| Deposit | `Vault` when available, otherwise `Landmark` |
| Attachment | `Paperclip` |
| Activity | `History` |
| User / role | `UserRound` |
| Audit | `ClipboardList` |

## 9. Action rules

- Every icon-only action must have an accessible name through `aria-label` or visible tooltip.
- Repeated table actions should remain visually compact.
- Destructive icons must never appear adjacent to primary actions without spacing or separation.
- Use a vertical ellipsis menu for low-frequency row actions.
- Do not use icons where a clear text label is more understandable.

## 10. Empty states

Empty-state icons must be simple, single-color, and no larger than 48px. They may sit inside a soft neutral or warm-grey container.

Patterns or illustrations must not replace the semantic empty-state icon.

## 11. Prohibited usage

Do not:

- mix outline and filled icon sets;
- place icons in decorative circles everywhere;
- use arbitrary colors per icon;
- use more than two icons in one button;
- use icons without consistent spacing;
- use brand logos as functional icons;
- use environment-related symbols merely for decoration.

## 12. Implementation guidance

Create a central icon wrapper to standardize size, stroke, direction, and accessibility.

Suggested location:

```text
src/components/ui/icon/
```

All feature code must consume icons through the approved wrapper or directly from the approved library using documented sizes.