# Code Review Checklist

## Correctness
- [ ] No obvious regression.
- [ ] Error paths are handled.
- [ ] Async race conditions considered.

## Architecture
- [ ] Responsibilities have clear owners.
- [ ] No unnecessary abstraction.
- [ ] No circular dependency introduced.

## Performance
- [ ] Dynamic lists virtualized.
- [ ] Images appropriate.
- [ ] Expensive work not repeated unnecessarily.

## Security
- [ ] No secrets or sensitive logs.

## Accessibility
- [ ] Semantics and labels present.

## Dependencies
- [ ] Added packages are justified and compatible.
