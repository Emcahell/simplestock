# Security

## Never

- Commit secrets.
- Embed private API credentials in a mobile bundle and call them secrets.
- Store sensitive authentication tokens in ordinary AsyncStorage.
- Log credentials, passwords, tokens, payment data, or one-time codes.
- Treat client-side route protection as authorization.
- Trust client validation as the final security boundary.

## Storage

Use platform-secure storage for sensitive credentials where appropriate. Define token lifecycle, logout cleanup, expiration, refresh, and invalidation.

## API keys

Assume anything shipped in a mobile binary can be extracted. Public client identifiers may be embedded when the service explicitly treats them as public; private credentials must remain server-side.

## Authentication

Client authentication state determines UX. The backend must enforce permissions on every protected operation.

## Logging

Use structured, environment-aware logging. Remove or disable sensitive production logs. Never dump complete request headers or auth objects.

## Input

Client-side validation improves UX; server-side validation remains authoritative. Treat all external data as untrusted.
