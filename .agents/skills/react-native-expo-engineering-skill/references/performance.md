# Performance

## Performance philosophy

Performance work must have a target and evidence. Do not cargo-cult configuration.

## First classify the bottleneck

- startup;
- JS execution;
- UI/native rendering;
- layout/measurement;
- memory;
- image decoding/loading;
- network/data transformation;
- navigation transitions;
- animation/gesture handling.

## Development vs production

Development builds can distort performance. Validate important performance claims in a production/release-like build on representative hardware.

## Render performance

Prefer:

- small component responsibilities;
- cheap list items;
- stable data flow;
- virtualization;
- appropriately sized images;
- avoiding unnecessary synchronous work in render.

Do not add `memo`, `useMemo`, or `useCallback` automatically. See `react-compiler.md`.

## JS thread

Avoid long synchronous work during interaction or render:

```tsx
// Avoid
const result = hugeArray
  .filter(...)
  .sort(...)
  .map(...)
```

when this executes repeatedly on the hot path.

Instead consider:

- moving transformation to the data layer;
- deriving only what is needed;
- caching expensive calculations when justified;
- pagination/incremental processing;
- reducing data volume;
- profiling before choosing an optimization.

## Animations

Frame-sensitive animations should avoid unnecessary JS-thread dependency. Prefer appropriate native/UI-thread animation tooling such as Reanimated for complex gestures and transitions.

## Images

Large remote images are a common source of memory and scrolling problems. Use appropriate dimensions, caching, placeholders, and thumbnails. See `images.md`.

## Performance review questions

1. What is slow?
2. Can it be reproduced?
3. On which platform/device/build?
4. Is the bottleneck JS, UI/native, memory, network, or data?
5. What measurement supports the hypothesis?
6. What is the smallest safe change?
7. Did the change improve the target?

## Do not optimize by superstition

Avoid rules such as:

- always memoize;
- always use FlashList;
- always reduce `windowSize`;
- always use `removeClippedSubviews`;
- always move everything to a global store.

Each can be correct in a specific context and harmful in another.
