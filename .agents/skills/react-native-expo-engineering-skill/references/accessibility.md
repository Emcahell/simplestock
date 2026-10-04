# Accessibility

Accessibility is part of Definition of Done.

## Interactive elements

Prefer semantic native primitives such as `Pressable` for interactive areas. Provide:

- `accessibilityRole`;
- `accessibilityLabel`;
- `accessibilityHint` when useful;
- `accessibilityState` for disabled/selected/checked states;
- adequate touch target size.

Do not label a button with implementation details such as `openIconButton`.

## Icon-only controls

An icon without a meaningful accessible name is not sufficient. Provide a human-readable action label.

## Images

Informative images need meaningful alternative text. Decorative imagery should not distract assistive technologies.

## Lists

Ensure item actions have clear labels and that dynamic updates do not make navigation impossible for screen-reader users.

## Text scaling

Do not assume one fixed font size or line height is sufficient. Avoid clipping important text when dynamic type or larger accessibility font settings are used.

## Testing

At minimum, manually inspect important flows with VoiceOver on iOS and TalkBack on Android when the product's accessibility requirements justify it.
