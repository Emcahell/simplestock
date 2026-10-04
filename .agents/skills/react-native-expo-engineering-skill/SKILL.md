---
name: react-native-expo-engineering-skill
description: Production-grade React Native and Expo engineering guidance for building, reviewing, refactoring, debugging, testing, and optimizing mobile applications with TypeScript, Expo Router, NativeWind, modern React, and native platform capabilities. Use when creating or modifying React Native/Expo projects, screens, components, navigation, lists, state, data fetching, styling, animations, accessibility, security, performance, dependencies, or EAS workflows. Do not use for React web-only projects that do not use React Native/Expo.
---

# React Native Expo Engineering

Build production-grade React Native + Expo applications with the simplest architecture that satisfies the product requirements and remains healthy as the app grows.

## Core rules

### REQUIRED

- Inspect the existing project, package manager, Expo SDK, React Native, React, router, styling, and native dependencies before changing architecture or installing packages.
- Respect the installed Expo/RN compatibility matrix. Never use `@latest` blindly in an Expo project.
- Use `npx expo install` for Expo/RN native dependencies when applicable.
- Use virtualized lists for dynamic or potentially growing collections. Do not use `ScrollView` + `.map()` for large/growing collections.
- Use stable item identity for list keys when available.
- Do not store sensitive credentials or tokens in AsyncStorage.
- Do not treat client-side protected routes as backend authorization.
- Keep route files and presentational components focused; business logic belongs in appropriate feature/data boundaries.
- Validate TypeScript, linting, and relevant tests after substantial changes. Never claim a check passed if it was not run.
- Handle loading, error, and empty states for asynchronous user-facing data when applicable.
- Preserve intentional iOS/Android differences.
- Do not add a dependency without checking whether React Native/Expo or an existing dependency already solves the problem and whether the package is compatible.

### PREFERRED

- Feature-oriented architecture with thin Expo Router route files.
- Expo Router for routing in Expo applications.
- `FlatList` for dynamic collections and `SectionList` for grouped collections.
- `expo-image` for image-heavy Expo applications when appropriate.
- React Compiler for supported projects; write idiomatic React before adding manual memoization.
- NativeWind when Tailwind-style styling is adopted, using the project's installed/compatible version.
- Development builds for projects that need native modules or production-like native behavior.
- Reanimated/native UI-thread-friendly animation for frame-sensitive interactions.
- Safe-area APIs instead of hard-coded inset values.
- Local state before global state; dedicated server-state tooling only when its capabilities justify the dependency.

### OPTIONAL / EVIDENCE-BASED

- FlashList or LegendList after profiling shows FlatList is insufficient.
- Manual `memo`, `useMemo`, or `useCallback` when profiling, dependency identity, effect dependencies, or a library contract justifies them.
- `getItemLayout` when item dimensions are reliably known.
- Platform-specific files when platform divergence is substantial enough to improve clarity.

## Decision rules

- Static small content → `View`.
- Static scrollable content → `ScrollView`.
- Dynamic flat collection → `FlatList`.
- Dynamic grouped collection → `SectionList`.
- Performance-sensitive collection → start with `FlatList`, measure, then evaluate alternatives.
- React Compiler enabled → rely on compiler memoization for new code unless a concrete reason requires manual control.
- Existing manual memoization → do not remove casually; preserve it unless intentionally refactoring and validating behavior.
- Shared state → classify it first. Use local state for local UI, server/query state for remote data, form state for complex forms, secure storage for sensitive persistence, and a global store only for genuinely shared client state.
- Platform divergence → share code by default; isolate real platform differences behind focused boundaries.
- New native dependency → check Expo compatibility, New Architecture support, config-plugin/native configuration needs, and rebuild requirements before implementation.

## Workflow

- **BUILD:** inspect → load relevant references → choose the smallest architecture → implement → validate → review performance/native impact.
- **REVIEW:** correctness/regressions → architecture → state/data → performance → accessibility → security → dependencies/native compatibility → testing.
- **DEBUG:** reproduce → isolate → inspect JS/native/config/navigation state → fix root cause → regression test when practical → revalidate.
- **OPTIMIZE:** measure/evidence → classify bottleneck → targeted change → measure again → keep only improvements with acceptable trade-offs.
- **MIGRATE:** inspect versions/config → read current migration guidance → check compatibility → migrate incrementally → validate → rebuild when native inputs changed.

## Reference loading

Load only the references relevant to the task:

- Architecture → `references/architecture.md`
- Expo/dependencies/releases → `references/expo.md`, `references/dependencies.md`, `references/eas.md`, `references/version-policy.md`
- Routing → `references/expo-router.md`, `references/navigation.md`
- Lists/performance → `references/lists.md`, `references/performance.md`, `references/react-compiler.md`
- Styling → `references/nativewind.md`, `references/styling.md`
- State/data/forms → `references/state-management.md`, `references/data-fetching.md`, `references/forms.md`
- Native UI → `references/animations.md`, `references/images.md`, `references/android.md`, `references/ios.md`
- Security/accessibility/testing/debt → `references/security.md`, `references/accessibility.md`, `references/testing.md`, `references/anti-patterns.md`

Use the matching checklist under `checklists/` for project, feature, screen, performance, security, accessibility, review, or release work.

## Source hierarchy

When guidance conflicts, prefer current official React Native/Expo/React/NativeWind documentation and compatibility data over community advice. MiduDev and other community sources are secondary practical references. If web access is unavailable, inspect installed package versions, local changelogs/docs, and lockfiles rather than inventing current compatibility.

## Definition of done

Apply the relevant checks: types pass, lint passes, relevant tests pass, dependencies are compatible, navigation works, async states are handled, dynamic collections are appropriately virtualized, accessibility/security were reviewed, platform differences are intentional, no unnecessary dependency/abstraction was introduced, performance-sensitive code was reviewed, and native rebuild requirements were considered.
