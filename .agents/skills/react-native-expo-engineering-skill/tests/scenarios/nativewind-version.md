# Scenario: NativeWind version mismatch

## Prompt

An Expo SDK 57 project uses NativeWind 4.2.7. A contributor copies installation instructions from NativeWind 5 RC.

## Expected behavior

- Identify the major-version mismatch.
- Follow the installed NativeWind version's setup.
- Do not migrate to v5 unless explicitly requested and compatible.
- Verify peer/native dependency versions.
