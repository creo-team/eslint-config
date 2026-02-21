# @creo-team/eslint-config — Claude Code Instructions

## Project Overview

Shared ESLint configuration for **Creo** projects. Used by vecta, photos, creo, and others. Provides TypeScript ESLint (strict type-checked), Prettier, JSDoc, stylistic rules, complexity (max 15), no-magic-numbers (warn), and import/perfectionist plugins. Flat config only. Exports default config and `createConfig(options)` for ignores, tsconfig, and optional **projectService** (recommended for monorepos). Single-repo and per-workspace (e.g. vecta) setups use default; monorepo root with multiple tsconfigs uses `projectService: true`.

## Before Making Changes

1. Read this file for conventions
2. Check [CONTRIBUTING.md](CONTRIBUTING.md) for commands and release flow

## Key Conventions

- **No magic values in rule config** — in `rules.js`, use constants (`error`, `off`, `always`, `maxLinesPerFile`, `maxComplexity`, etc.) for rule severity and options
- **Section headers** — `// ============================================================================` style comments above each rule group
- **Small functions** — keep `utils.js` helpers under 50 lines; early returns
- **Conventional commits** — `feat(scope):`, `fix(scope):`, `refactor(scope):`; one change per commit

## Rule Organization (rules.js)

| Group | Purpose |
|-------|---------|
| `commonjsPreventRules` | Allow CommonJS (require, default export) for config files |
| `prettier` | Prettier options; turn off conflicting stylistic rules |
| `jsDoc` | JSDoc require-* rules for descriptions, params, returns |
| `stylisticTs` | @stylistic/ brace, comma, spacing, etc. |
| `tsEslint` | TypeScript ESLint + import rules; naming, types, max-lines, complexity, no-magic-numbers |
| `rulesToDisable` | Rules that clash (e.g. perfectionist sort-imports) |

Exported `rules` object merges these in order; later spreads override earlier.

## Key File Map

| File | Purpose |
|------|---------|
| `rules.js` | All rule groups; exports `rules`, `jsDoc`, `prettier`, etc. |
| `utils.js` | `getTsConfigFile()`, `debug()`; used by eslint.config.js |
| `eslint.config.js` | Exports default and `createConfig`; flat config; no project-structure |
| `CONTRIBUTING.md` | Setup, lint/fix/build/test, release, OIDC, MCP |
| `test/` | Vitest unit tests (utils), ESLint fixture test |
| `examples/monorepo/` | Monorepo example (root config, projectService) |

## Globals

Config defines `languageOptions.globals`: `console`, `module`, `process`, `require` (all `readonly`) so Node scripts like `utils.js` do not need `/* eslint-disable no-undef */`.

## Verification

From repo root:

```bash
npm test
npm run build
```

Tests run Vitest then lint; build compiles TypeScript to `dist/`.
