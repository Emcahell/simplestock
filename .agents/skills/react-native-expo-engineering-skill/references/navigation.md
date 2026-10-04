# Navigation

## Principles

- Let Expo Router own route state.
- Keep navigation options close to route/layout definitions.
- Use route groups to express navigation boundaries.
- Handle deep links and missing params.
- Avoid duplicating screens across groups just to change access conditions.

## Native vs JavaScript navigation

Prefer Expo Router's native navigation primitives when they match the UX. Use custom/JS navigation only when product requirements actually need it.

## Modals and sheets

Choose presentation semantics based on the interaction. A modal that represents a distinct task should have clear dismissal and accessibility behavior. A bottom sheet should not become a universal replacement for normal navigation.

## Passing data

Prefer stable route params/IDs over serializing large objects into URLs. Fetch or derive the data at the destination when appropriate.

## Auth

Use protected routes for client-side gating. Do not treat navigation guards as permission enforcement.
