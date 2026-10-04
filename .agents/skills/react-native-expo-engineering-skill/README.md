# React Native Expo Engineering Skills

A portable Agent Skill for production-grade React Native + Expo engineering.

Designed for agents that consume the open `SKILL.md` format, including Codex, Claude Code, OpenCode, and other compatible agents.

## What it teaches

- Modular, feature-oriented architecture without speculative layers.
- Expo + React Native version-aware dependency decisions.
- Expo Router routing and thin route boundaries.
- `ScrollView` vs `FlatList` vs `SectionList` vs FlashList/LegendList decisions.
- Evidence-based performance optimization and React Compiler-aware memoization.
- NativeWind/Tailwind styling with version discipline.
- State, data fetching, forms, animations, images, accessibility, security, testing, Android/iOS behavior, and EAS workflows.
- Anti-pattern and technical-debt detection.

## Install

```bash
npx skills add emcahell/react-native-expo-engineering-skill
```

The skill is also installable from a local checkout:

```bash
npx skills add ./react-native-expo-engineering-skill
```

Use `--agent codex`, `--agent claude-code`, or `--agent opencode` when you want to target a specific supported agent.

## Validate

From the skill directory:

```bash
./scripts/validate.sh
```

The validator checks the frontmatter, referenced files, basic content integrity, and skill size.

## Evaluation scenarios

`tests/scenarios/` contains behavior-oriented scenarios for dynamic lists, memoization, state boundaries, native dependencies, NativeWind versions, auth/security, Expo Router, and platform-specific UI.

These scenarios should be run against real agents with the skill loaded; they are not substitutes for application tests.

## Philosophy

Correctness → maintainability → architecture → performance → accessibility → optimization.

The skill intentionally avoids rules such as “always use FlashList” or “always use useMemo”. Decisions should follow the project's constraints and measurable evidence.

## Sources

See [`SOURCES.md`](SOURCES.md) for the primary official documentation and MiduDev references used during the initial design.
