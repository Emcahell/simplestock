# Android

## Principles

Respect Android system behavior instead of assuming iOS conventions apply everywhere.

Review when relevant:

- edge-to-edge;
- status/navigation bars;
- back gesture/button behavior;
- keyboard/insets;
- permissions;
- notification channels;
- app links/deep links;
- foreground/background lifecycle;
- Android-specific accessibility.

## Back navigation

Do not intercept back navigation globally. Handle it only when the current screen has a clear, user-understandable reason to override the default behavior.

## Permissions

Request permissions in context, explain why they are needed, and handle denial/revocation gracefully.

## Native configuration

Prefer Expo config/config plugins for reproducible configuration when the project uses prebuild. Avoid manual edits to generated files that will be overwritten.
