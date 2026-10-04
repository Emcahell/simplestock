# Version Policy

## Principle

Never assume `latest` is correct for an Expo project.

Expo SDKs are coupled to specific React Native and React versions. Third-party native packages also have compatibility constraints.

## Before upgrades

Inspect:

```text
package.json
lockfile
app.json / app.config.*
Expo SDK
React Native
React
NativeWind
Reanimated
Worklets
Gesture Handler
Router
```

Then consult the current official migration/changelog documentation.

## Version-aware instructions

When a feature exists only in a newer SDK:

1. identify the minimum SDK;
2. determine whether the current project can use it;
3. if not, offer the compatible alternative;
4. never silently upgrade the entire project just to use a feature.

## Pre-release versions

Do not adopt beta/RC versions merely because they are newer. Use them only when the user explicitly wants them or the project deliberately tracks pre-release software.

## Lockfiles

Respect the repository's lockfile and package manager. Do not regenerate dependency trees unnecessarily.
