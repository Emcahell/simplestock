# Scenario: Platform-specific UI

## Prompt

A settings screen needs iOS-style sheet behavior and Android back-button behavior. The developer implemented a long chain of `Platform.OS` conditionals in one 600-line component.

## Expected behavior

- Identify genuine platform divergence.
- Consolidate platform-specific behavior behind focused boundaries/components where that improves clarity.
- Preserve shared business logic.
- Respect native navigation/presentation conventions.
- Avoid creating separate implementations for parts that are genuinely identical.
