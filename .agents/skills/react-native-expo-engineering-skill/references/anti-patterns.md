# Anti-patterns and Technical Debt Signals

## High-priority smells

### ScrollView + map for dynamic collections

Replace with the appropriate virtualized list.

### Giant component

If a screen owns navigation, data fetching, forms, complex state, business rules, and hundreds of lines of JSX, split responsibilities by feature/component boundary.

### God hook

A hook that performs API calls, navigation, persistence, analytics, form logic, and UI state for unrelated concerns should be decomposed.

### God store

A single store containing temporary UI state for unrelated screens is usually a boundary problem.

### Business logic in JSX

Move meaningful transformations and rules into functions/services/hooks that can be tested.

### API calls in every component

Centralize API contracts and query behavior.

### Global state for local state

Keep temporary UI state local.

### Manual memoization everywhere

Use the React Compiler policy and profiling guidance.

### Arbitrary Tailwind values everywhere

Promote real design tokens and variants.

### Platform checks scattered everywhere

Consolidate true platform divergence behind platform-specific components or focused adapters.

### Secrets in AsyncStorage

Move sensitive credentials to secure storage and keep authorization server-side.

### `index` as key when IDs exist

Use stable identity.

### Unbounded image sources

Use appropriate image dimensions, caching, and thumbnails.

### Dependency for trivial functionality

Prefer built-in APIs or existing dependencies.

### Big-bang refactor

Prefer incremental migration.

### Generated native files edited manually

If using prebuild/config plugins, make configuration reproducible in app config/config plugins.

## Review severity

Classify findings as:

- Blocker — correctness/security/build failure.
- High — likely production regression or serious debt.
- Medium — meaningful maintainability/performance concern.
- Low — style or future improvement.

Do not inflate severity merely to make a review look thorough.
