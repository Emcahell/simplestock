# NativeWind

## Goal

Use Tailwind-style utility classes without sacrificing React Native correctness, maintainability, or platform behavior.

## Version policy

NativeWind versions must match the project's Expo/RN stack. At the time this skill is authored, NativeWind 4.2.7 documents Expo SDK 57 support. NativeWind 5 is handled separately and should not be adopted merely because it is newer or in pre-release status.

Always inspect the installed version and follow its matching installation guide.

## Installation

For an Expo project, follow NativeWind's Expo installation instructions and use Expo's dependency installer for compatible native packages. Do not copy a setup from another major NativeWind version.

## Styling rules

Prefer:

```tsx
<View className="flex-1 px-4 py-6" />
```

over scattered inline style objects when the project has adopted NativeWind.

Prefer semantic design tokens over arbitrary values.

Avoid class strings that become unreadable. Extract a component or variant when a visual pattern has a real reusable identity.

## Dynamic classes

Do not construct arbitrary Tailwind class names from untrusted or uncontrolled runtime strings if the build-time class scanner cannot detect them. Prefer explicit mappings:

```tsx
const colorClasses = {
  primary: 'bg-primary',
  danger: 'bg-danger',
} as const;
```

## Platform differences

Use platform variants or platform-specific components when platform behavior is intentionally different. Do not use Tailwind classes as a substitute for native APIs.

## Tailwind configuration

Keep content paths complete and avoid adding broad filesystem globs that scan generated dependencies unnecessarily.

## Sources

- https://www.nativewind.dev/docs/getting-started/installation
