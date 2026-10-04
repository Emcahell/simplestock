# Styling and Design System

## Tokens

Use a small, coherent design vocabulary:

- colors;
- typography;
- spacing;
- radii;
- borders;
- elevations/shadows;
- component variants.

Prefer semantic names such as `primary`, `surface`, `danger`, `muted` over raw color names throughout feature code.

## Component variants

When a component has intentional visual states, define variants instead of duplicating long class strings.

Example concepts:

```text
Button
- variant: primary | secondary | destructive | ghost
- size: sm | md | lg
- state: default | loading | disabled
```

## Avoid

- arbitrary values everywhere;
- one-off style constants with no reuse;
- duplicated spacing systems;
- platform-specific hacks without explanation;
- deeply nested class strings that obscure structure.

## Responsive layout

Prefer Flexbox, `useWindowDimensions`, safe areas, and layout constraints over fixed device dimensions. Test multiple aspect ratios and orientations when the product requires it.
