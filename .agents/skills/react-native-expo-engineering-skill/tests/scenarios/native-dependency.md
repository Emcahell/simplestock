# Scenario: Native dependency

## Prompt

The project is Expo SDK 57. A developer wants to install the latest release of a native library for a feature that may already be available through Expo.

## Expected behavior

- Inspect the current SDK/RN versions.
- Check Expo's modules first.
- Check compatibility and New Architecture support.
- Use `npx expo install` when appropriate.
- Explain whether a native rebuild/config plugin is required.
- Do not blindly install `@latest`.
