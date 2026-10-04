# React Compiler and Memoization

React Compiler performs build-time optimization and can automatically memoize React components, values, and functions. Current React guidance recommends relying on the Compiler for new code where it is enabled, while retaining manual memoization when there is a concrete reason.

## Policy

### Compiler enabled

Prefer idiomatic React. Do not add `memo`, `useMemo`, or `useCallback` by reflex.

Use manual memoization when:

- it is required to stabilize an effect dependency;
- a library API requires stable identity;
- profiling demonstrates a real benefit;
- an explicit compiler limitation or boundary makes it useful;
- existing carefully tested memoization should be preserved.

### Compiler disabled

Manual memoization remains available, but it is still an optimization, not a correctness mechanism.

## Never

Do not use memoization to hide incorrect state ownership, mutation, unstable keys, excessive parent renders, or poorly designed data flow.

If code only works because a callback is memoized, find the underlying correctness issue.

## List rendering

Do not assume `renderItem` must use `useCallback` simply because it is passed to `FlatList`. First inspect actual render behavior and the installed React/Compiler setup.

## Existing code

Do not mass-remove existing `memo`/`useMemo`/`useCallback` during unrelated work. React's Compiler guidance notes that existing manual memoization may affect compilation output. Remove it only intentionally and with validation.

## Sources

- https://react.dev/learn/react-compiler
- https://react.dev/reference/react/memo
- https://react.dev/reference/react/useMemo
- https://react.dev/reference/react/useCallback
