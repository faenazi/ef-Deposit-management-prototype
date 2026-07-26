# Motion System

## 1. Purpose

Motion must improve orientation, feedback, and perceived quality. It must never distract from financial decisions or slow task completion.

The default visual character is calm, precise, and restrained.

## 2. Motion principles

1. Motion explains change.
2. Motion confirms user action.
3. Motion preserves spatial context.
4. Motion must be brief and reversible where relevant.
5. Motion must respect reduced-motion preferences.
6. Motion is not decoration.

## 3. Duration tokens

| Token | Duration | Use |
|---|---:|---|
| `motion.instant` | 80ms | pressed state, very small feedback |
| `motion.fast` | 120ms | hover, focus, icon change |
| `motion.standard` | 180ms | buttons, inputs, cards, dropdowns |
| `motion.emphasis` | 240ms | drawer, dialog, workspace panel |
| `motion.slow` | 320ms | rare page-level or large-layout transition |

Avoid transitions longer than 400ms in normal application flows.

## 4. Easing

Use a small approved set:

- standard: `cubic-bezier(0.2, 0, 0, 1)`;
- enter: `cubic-bezier(0, 0, 0.2, 1)`;
- exit: `cubic-bezier(0.4, 0, 1, 1)`.

Do not introduce arbitrary spring, bounce, elastic, or overshoot effects.

## 5. Component behavior

### Buttons

- Hover: subtle background or border change.
- Press: brief visual compression or tone change without layout movement.
- Loading: replace leading icon with spinner while preserving width.
- Success should not animate excessively; use a short state confirmation.

### Cards

- Standard data cards should not float or scale on hover.
- Clickable cards may use a restrained border, background, or shadow change.
- Avoid vertical translation that makes enterprise dashboards feel unstable.

### Navigation

- Active item transition must be subtle and immediate.
- Collapsing the sidebar may animate width only when content does not jump unpredictably.
- Directional movement must follow RTL spatial logic.

### Dropdowns and popovers

- Use fade plus a very small directional offset.
- Preserve the relationship to the triggering control.
- Do not scale from zero.

### Dialogs

- Backdrop fades in.
- Dialog enters with small opacity and position change.
- Focus must move to the dialog immediately.
- Exit animation must not delay completion of a confirmed action.

### Drawers

- In RTL, side drawers normally enter from the left when they supplement right-to-left main content, unless the information architecture defines otherwise.
- The direction must remain consistent across the product.
- Drawer movement must not exceed `motion.emphasis`.

### Tabs

- Change content with a short fade only when useful.
- Avoid sliding entire page sections horizontally.

### Tooltips

- Short delayed entry is acceptable.
- Exit must be immediate.
- Tooltips must not be required to understand essential information.

## 6. Page transitions

Do not use cinematic route transitions.

Preferred behavior:

- preserve shell and navigation;
- replace page content immediately;
- optionally use a subtle content fade;
- maintain scroll position only when expected;
- show a local skeleton for delayed data.

## 7. Loading states

### Skeletons

Use skeletons when the expected structure is known.

- Match the approximate final layout.
- Avoid excessive shimmer.
- Use a calm neutral pulse.
- Do not skeleton every icon or divider.

### Spinners

Use for:

- button-level actions;
- small isolated loading regions;
- unknown short operations.

Do not show a full-page spinner when a page skeleton can preserve context.

### Progress

Use determinate progress only when the actual percentage is known. Do not simulate false progress.

## 8. Workflow feedback

Transitions between workflow states must emphasize certainty, not celebration.

Approved feedback:

- status badge update;
- timeline step completion;
- concise success message;
- updated action availability;
- short highlight of the changed section.

Avoid confetti, large checkmark animations, or celebratory effects.

## 9. Data update behavior

When filters, role switching, or scenario switching updates data:

- retain layout stability;
- update values with a subtle fade;
- do not animate financial values counting upward by default;
- do not reorder lists without making the sort change clear;
- announce relevant changes to assistive technologies where appropriate.

## 10. Charts

- Initial chart animation should be disabled or minimal.
- Filtering may use short transitions that preserve comparison.
- Do not replay animations whenever the user returns to the page.
- Respect reduced-motion settings.

## 11. Notifications and toasts

- Enter from a consistent edge appropriate to RTL layout.
- Stay visible long enough to read.
- Errors requiring action must not disappear automatically.
- Success messages should be concise and dismissible.
- Multiple notifications must stack without covering primary page actions.

## 12. Reduced motion

Honor `prefers-reduced-motion: reduce`.

When enabled:

- remove nonessential transforms;
- remove parallax and large movement;
- shorten fades;
- disable chart animation;
- keep essential state changes immediate and clear.

The application must remain fully understandable without motion.

## 13. Prohibited motion

Do not use:

- bouncing;
- floating cards;
- continuous decorative movement;
- auto-rotating content;
- parallax inside transaction pages;
- animated gradients;
- number-counting effects for every KPI;
- long route transitions;
- motion that shifts focus or causes layout instability.

## 14. Implementation governance

Define motion tokens centrally in Tailwind configuration or CSS custom properties.

Suggested location:

```text
src/styles/motion.css
```

Reusable primitives should control:

- fade;
- collapse;
- drawer transition;
- dialog transition;
- skeleton pulse;
- loading spinner.

Feature code must not introduce arbitrary durations or easing curves.