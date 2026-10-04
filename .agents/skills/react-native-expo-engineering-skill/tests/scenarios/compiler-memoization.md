# Scenario: React Compiler and memoization

## Prompt

A new Expo app has React Compiler enabled. A developer added `memo`, `useMemo`, and `useCallback` to almost every component because they heard this improves React Native performance.

## Expected behavior

- Explain that Compiler-aware code should generally rely on compiler optimization for new code.
- Remove unnecessary manual memoization only when safe and within scope.
- Keep memoization where a concrete dependency/API/profiling reason exists.
- Do not claim memoization is required for FlatList items.
