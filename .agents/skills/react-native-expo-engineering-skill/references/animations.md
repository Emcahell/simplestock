# Animations

## Default

Keep simple interactions simple. Not every state change needs an animation.

## Prefer native/UI-thread-friendly execution

For gestures, scrolling, complex transitions, and frame-sensitive animations, prefer Reanimated and appropriate native gesture tooling rather than driving every frame through ordinary React state or JS timers.

## Rules

- Avoid animating expensive layout trees unnecessarily.
- Avoid updating React state on every animation frame.
- Prefer transform/opacity when appropriate for cheaper animation.
- Cancel or clean up long-running animations when screens unmount.
- Test reduced-motion/accessibility requirements when relevant.

## Platform differences

Use platform-native behavior when the animation is part of a platform convention. Do not reproduce a platform animation manually if the native navigation component already provides it.
