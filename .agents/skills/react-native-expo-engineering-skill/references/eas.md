# EAS

## Build profiles

A typical application distinguishes:

- development;
- preview/internal distribution;
- production.

Use the repository's actual profile names if they differ.

## EAS Update

EAS Update can deliver compatible JavaScript, styling, and asset changes without a new native binary. Native dependency/configuration changes generally require a new build.

Never publish an update that requires native code unavailable in the installed binary.

## Environment variables

Separate public configuration from secrets. Do not assume a mobile environment variable is secret merely because it comes from an environment file.

## Release checks

Before production:

- validate the exact build profile;
- verify app identifiers and signing configuration;
- verify runtime/update compatibility;
- verify environment selection;
- test critical flows on representative devices.
