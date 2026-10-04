# Architecture

## Goal

Use architecture to make change safer, not to maximize folders.

## Preferred shape

```text
src/
├── app/                    # Expo Router routes only
├── features/               # domain/feature boundaries
│   └── feature-name/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── schemas/
│       ├── types/
│       └── index.ts        # optional, only when useful
├── components/
│   ├── ui/                 # genuinely reusable primitives
│   ├── layout/
│   └── feedback/
├── lib/                    # cross-cutting infrastructure
├── hooks/                  # genuinely cross-feature hooks only
├── constants/
└── types/
```

## Boundaries

`app/` should primarily compose routes, layouts, providers, and navigation options. Domain behavior should live in features.

A feature owns its UI, data access, validation, hooks, and types when those are specific to that feature.

Shared code should be promoted only after it has a real reuse case or is clearly infrastructure.

## Avoid

- Giant screen components.
- Global `components/` containing every feature component.
- Global `hooks/` containing feature-specific hooks.
- Generic abstractions created for one consumer.
- Circular dependencies between features.
- A `utils.ts` or `services.ts` file that becomes a dumping ground.
- Rewriting the whole repository merely to satisfy a preferred architecture.

## Brownfield rule

When modifying an existing application, preserve stable boundaries. Introduce the preferred architecture at new or substantially modified feature boundaries. Migrate old areas incrementally.

## Component extraction rule

Extract a component when it has at least one of these properties:

- clear independent responsibility;
- meaningful reuse;
- complex conditional UI;
- independently testable behavior;
- list item that benefits from isolation;
- platform-specific implementation.

Do not extract every `View` into a component.
