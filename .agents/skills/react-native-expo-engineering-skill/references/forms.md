# Forms

## Principles

- Define a schema for non-trivial validation.
- Keep form state separate from server state.
- Validate at the correct boundary: client for UX, server for authority.
- Preserve entered values when a recoverable request fails.
- Disable or otherwise guard duplicate submission when necessary.
- Show field-level and form-level errors distinctly.

## Keyboard

Forms must consider:

- keyboard overlap;
- scrolling to focused fields;
- submit actions;
- keyboard dismissal;
- safe areas;
- dynamic content height.

Do not hard-code offsets for one device.

## Accessibility

Every input needs an understandable accessible name and appropriate input semantics. Error messages should be associated with the affected field and be discoverable by assistive technologies when practical.

## Security

Never log passwords, tokens, one-time codes, or other secrets. Treat screenshots and debug output as potential data leaks too.
