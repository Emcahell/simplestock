# Dependency Policy

Before adding a dependency, answer:

1. Is there a React Native primitive for this?
2. Is there an Expo module for this?
3. Is the functionality already present in the repository?
4. Does the package support the installed Expo SDK/RN version?
5. Does it support the project's architecture (including New Architecture where applicable)?
6. Does it require native configuration or a config plugin?
7. Is it maintained and documented?
8. What is the native binary/bundle/startup cost?
9. Can the project reasonably remove it later?

## Preferred installation

Use Expo's dependency installer for Expo-compatible native packages:

```bash
npx expo install package-name
```

Use the project's existing package manager conventions.

## Avoid dependency duplication

Do not install multiple libraries solving the same problem unless the use cases genuinely differ.

## Native dependencies

Document native rebuild implications when adding or upgrading native packages.
