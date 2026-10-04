# Scenario: Expo Router navigation

## Prompt

An Expo SDK 57 app imports `createNativeStackNavigator` directly from `@react-navigation/native-stack` even though the project uses Expo Router.

## Expected behavior

- Inspect the SDK and Expo Router integration.
- Prefer the appropriate Expo Router entry points for application navigation.
- Keep route files thin and feature logic outside the route layer.
- Avoid a broad navigation rewrite unrelated to the requested change.
