# State Management

## Classify first

### Local UI state

Examples: modal open state, selected item on a screen, temporary toggle. Keep local.

### Server state

Examples: users, products, orders fetched from an API. Treat caching, freshness, invalidation, retries, and synchronization as data-layer concerns.

### Form state

Keep field values, validation, touched/dirty state, and submission state together. Use a form library when form complexity justifies it.

### Persistent state

Separate ordinary preferences from secrets. Sensitive values require secure storage.

### Global client state

Use a global store only when multiple unrelated parts of the application genuinely need the same mutable client state.

## Context

Context is useful for relatively stable cross-tree dependencies such as themes, localization, or session providers. Do not use one giant context as a replacement for a state architecture.

## Store design

Keep stores feature-oriented. Avoid a single global store containing every screen's temporary state.

## Derived state

Prefer deriving values from source state instead of storing redundant copies.

Bad:

```text
items
filteredItems
sortedItems
visibleItems
```

when these can be deterministically derived from `items` and filters.

## Persistence

Define hydration, migration, expiration, logout cleanup, and versioning for persistent state. Do not assume persisted state is valid forever.
