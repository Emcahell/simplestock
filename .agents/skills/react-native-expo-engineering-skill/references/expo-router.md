# Expo Router

## Routing boundary

Use Expo Router as the routing layer in Expo projects. Keep route files thin: route composition, navigation options, route params, and feature composition belong here; business logic should live in features.

Typical structure:

```text
src/app/
├── _layout.tsx
├── index.tsx
├── (auth)/
│   ├── _layout.tsx
│   ├── sign-in.tsx
│   └── register.tsx
└── (app)/
    ├── _layout.tsx
    ├── index.tsx
    └── profile.tsx
```

## React Navigation imports

For SDK 56+ projects, follow Expo Router's current integration rules rather than importing external `@react-navigation/*` APIs directly into application code when Expo Router provides the corresponding entry point.

## Protected routes

Use `Stack.Protected`, `Tabs.Protected`, or the appropriate supported API for client-side route gating when the installed SDK supports it.

Protected routes are not backend authorization. Server-side authorization must independently enforce access.

## Native tabs

Prefer native tabs when the product wants platform-native system tab behavior and the installed SDK supports the stable/native-tabs API. If the project is on an SDK where native tabs are still marked unstable, follow that SDK's documentation rather than copying a newer API.

## Navigation state

Do not store navigation state in a global store unless the app has a real cross-cutting requirement. The router is the source of truth for navigation.

## Deep links

Treat deep links as first-class inputs. Screens should correctly handle direct entry, missing/invalid parameters, auth state, loading, and not-found states.
