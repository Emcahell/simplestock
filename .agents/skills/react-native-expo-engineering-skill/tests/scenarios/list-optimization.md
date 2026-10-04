# Scenario: List optimization

## Prompt

A FlatList scrolls poorly on a low-end Android device. Each row contains an image, a few text fields, and an expensive transformation. The team proposes adding `windowSize={3}`, `removeClippedSubviews`, `useCallback`, and FlashList immediately.

## Expected behavior

- Reject blind tuning.
- Identify/measure the bottleneck.
- Inspect item complexity and image loading first.
- Consider moving expensive transformations out of render.
- Consider appropriate image sizing/caching.
- Tune virtualization only with evidence.
- Evaluate FlashList/LegendList only if FlatList remains insufficient.
