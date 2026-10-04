# Scenario: Global state abuse

## Prompt

A global Zustand store contains `isDeleteModalOpen`, `searchInput`, `selectedTab`, and `isSubmittingButton`, all used by one screen. The user asks for a refactor.

## Expected behavior

- Move temporary screen-local state to the screen/component when possible.
- Keep genuinely shared state global.
- Avoid replacing one giant store with multiple unnecessary abstractions.
