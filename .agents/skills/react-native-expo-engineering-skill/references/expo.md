# Expo Engineering

## Version awareness

Expo SDK versions map to specific React Native and React versions. Never assume the newest npm package is compatible with the project's SDK.

Inspect:

```bash
npx expo --version
npx expo config --type public
npx expo doctor
```

Also inspect `package.json`, app config, lockfile, and native folders when present.

## Installing dependencies

For Expo/RN dependencies with native compatibility requirements, prefer:

```bash
npx expo install <package>
```

rather than blindly using `npm install <package>@latest`.

## Native dependencies

Before adding one:

1. confirm Expo SDK compatibility;
2. confirm React Native compatibility;
3. check New Architecture support;
4. inspect config-plugin requirements;
5. determine whether prebuild/native rebuild is required;
6. test on relevant platforms.

## Development builds

Expo Go is useful for learning and lightweight prototyping. Applications that depend on native modules or need production-like behavior should use development builds with `expo-dev-client` where appropriate.

## Prebuild

Do not edit generated native files casually if the project is intended to use Expo prebuild/config plugins. Prefer app config and config plugins for reproducible native configuration.

If the project intentionally maintains native projects manually, respect that workflow instead of forcing prebuild.

## Native changes require rebuilds

Changing native dependencies, permissions, config plugins, native SDK settings, or native source generally requires a new native build. JavaScript, styling, and compatible asset-only changes may be eligible for EAS Update depending on project configuration.

## Validation

Use the project's package manager and run the strongest available validation, typically:

```bash
npx expo doctor
npx tsc --noEmit
```

plus lint/tests/build checks defined by the repository.
