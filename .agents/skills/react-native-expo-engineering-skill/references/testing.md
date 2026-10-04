# Testing

## Test pyramid

### Unit

Use for deterministic business logic, parsers, formatters, selectors, and pure utilities.

### Component

Use for user-visible behavior, interaction, accessibility semantics, loading/error/empty states, and component contracts.

### Integration

Use when multiple feature layers must work together, such as query + form + navigation.

### E2E

Reserve for critical flows: authentication, onboarding, checkout/payment, important CRUD flows, deep-link entry, and other high-value journeys.

## Avoid

- tests that merely prove a component renders a `View`;
- implementation-detail assertions everywhere;
- snapshots as the only test strategy;
- artificial coverage goals that incentivize meaningless tests.

## Regression testing

When fixing a bug, prefer a test that fails before the fix and passes after it when the behavior is practical to automate.

## Native behavior

Some issues only appear on device/simulator. Do not claim a native/platform behavior is tested if only static TypeScript or unit tests were run.
