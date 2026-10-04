# Images

## Preferred Expo primitive

For Expo applications, prefer `expo-image` for image-heavy interfaces when its capabilities match the requirement. It supports memory/disk caching, placeholders, transitions, and native image implementations.

## Rules

- Know the display dimensions.
- Avoid downloading a huge source for a tiny thumbnail when the backend can provide an appropriately sized asset.
- Use caching intentionally.
- Provide placeholders for important content when appropriate.
- Handle failed image loads.
- Provide meaningful accessibility text for informative images; decorative images should not create unnecessary screen-reader noise.

## Lists

Images inside virtualized lists should be lightweight enough to avoid causing scroll stalls or memory spikes. Consider thumbnail endpoints and cache policy.

## Prefetching

Prefetch only when there is evidence it improves an expected user flow. Do not preload an entire feed into memory.
