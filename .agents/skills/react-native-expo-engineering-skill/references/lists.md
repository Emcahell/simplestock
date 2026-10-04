# Lists and Collection Rendering

## Decision table

| Content | Default |
|---|---|
| Small static content | `View` |
| Static scrollable content | `ScrollView` |
| Dynamic flat collection | `FlatList` |
| Dynamic grouped collection | `SectionList` |
| Very performance-sensitive collection | `FlatList` first, then profile |
| FlatList proven insufficient | Evaluate FlashList/LegendList |

React Native documents that `ScrollView` renders all children at once, while `FlatList` virtualizes content. Long dynamic collections should therefore not be implemented as `ScrollView` plus `map()`.

## Required

Use stable item identity:

```tsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
/>
```

Avoid array index keys when a stable identifier exists.

Use `SectionList` when section semantics are real. Do not simulate sections with a giant flat array and manual headers unless there is a concrete reason.

## Item design

List items should be cheap to render:

- avoid expensive synchronous calculations in render;
- avoid unnecessary nested layout trees;
- avoid giant image sources when thumbnails are sufficient;
- keep item state local when possible;
- isolate complex item behavior in a component.

## getItemLayout

Use `getItemLayout` when item dimensions are reliably fixed or otherwise deterministically known. Do not invent fixed dimensions for variable content just to enable the optimization.

## Virtualization tuning

Do not blindly change:

- `windowSize`
- `initialNumToRender`
- `maxToRenderPerBatch`
- `updateCellsBatchingPeriod`
- `removeClippedSubviews`

These are trade-offs between memory, responsiveness, and blank areas. Tune only after identifying a problem and validate on representative devices/builds.

## FlashList / LegendList

They are advanced options, not default dependencies. Start with the platform-provided virtualized lists. If profiling demonstrates a bottleneck, evaluate an alternative against:

- item complexity;
- dynamic heights;
- recycling behavior;
- sticky headers;
- pagination/infinite scroll;
- chat/bidirectional requirements;
- maintenance and Expo/RN compatibility.

## Nested lists

Avoid nested virtualized lists with conflicting scroll ownership. If nesting is necessary, define which list owns vertical scrolling and keep child collections constrained to their own axes or boundaries.

## Pagination

For large server collections, prefer incremental fetching and virtualization over loading the complete dataset into memory. Define loading, refreshing, retry, and end-of-list behavior explicitly.

## Empty/loading/error

A list screen should distinguish:

- initial loading;
- successful empty result;
- successful populated result;
- pagination loading;
- refresh loading;
- recoverable error;
- terminal/authorization error.

## Source references

- React Native ScrollView documentation: https://reactnative.dev/docs/scrollview
- React Native FlatList documentation: https://reactnative.dev/docs/flatlist
- React Native SectionList documentation: https://reactnative.dev/docs/sectionlist
- React Native FlatList optimization: https://reactnative.dev/docs/optimizing-flatlist-configuration
