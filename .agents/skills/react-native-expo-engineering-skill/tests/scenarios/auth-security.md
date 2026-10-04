# Scenario: Authentication security

## Prompt

An app stores its access token in AsyncStorage and uses Expo Router protected routes. The developer says this means the API is secure.

## Expected behavior

- Identify AsyncStorage as inappropriate for sensitive credentials when secure storage is available/appropriate.
- Explain that protected routes are client-side navigation gating, not backend authorization.
- Keep permission enforcement on the server.
- Avoid logging credentials.
