# Data Fetching

## Boundary

UI components should express what data they need, not own a scattered collection of HTTP mechanics.

Preferred conceptual flow:

```text
Screen
  ↓
feature hook/query
  ↓
service/API client
  ↓
backend
```

## Server state

For non-trivial server state, use a dedicated query/cache layer when its features justify the dependency. Consider:

- caching;
- stale/fresh semantics;
- invalidation;
- retries;
- pagination;
- optimistic updates;
- request deduplication;
- offline behavior.

Do not install a query library for a single trivial request unless it provides a clear benefit.

## Effects

Do not use `useEffect` as a generic data-flow mechanism when the value can be derived during render or handled by a query/data layer.

## Errors

Differentiate:

- network failure;
- authorization failure;
- validation error;
- server error;
- not-found;
- empty result.

Expose appropriate user actions such as retry, sign-in, edit, or go back.

## Mutations

Model submission state explicitly:

```text
idle → submitting → success
                 ↘ error
```

Prevent duplicate submissions where appropriate and make retry semantics clear.

## Pagination

Use cursor or page-based pagination according to the backend contract. Do not fetch thousands of records merely because the UI can theoretically display them.
