# @creo-team/eslint-config — Claude Code Instructions

## Project Overview

Shared ESLint configuration for **Creo** projects. Used by vecta, photos, creo, and others. Provides TypeScript ESLint (strict type-checked), Prettier, JSDoc, stylistic rules, complexity (max 15), no-magic-numbers (warn), and import/perfectionist plugins. Flat config only. Exports default config and `createConfig(options)` for ignores, tsconfig, and optional **projectService** (recommended for monorepos). Single-repo and per-workspace (e.g. vecta) setups use default; monorepo root with multiple tsconfigs uses `projectService: true`.

## Before Making Changes

1. Read this file for conventions
2. Check [CONTRIBUTING.md](CONTRIBUTING.md) for commands and release flow

## Key Conventions

- **Never nest** — early returns, flat code. If you're indenting more than once, refactor
- **No narration comments** — code speaks for itself. Only comment non-obvious intent or trade-offs. No section banners
- **No magic values in rule config** — in `rules.js`, use constants (`error`, `off`, `always`, `maxLinesPerFile`, `maxComplexity`, etc.) for rule severity and options
- **Deduplicate ruthlessly** — shared logic in shared modules
- **Simple over clever** — readable beats terse
- **Verb-driven function names** — prefer `get`, `remove`, `create`, `list`, `put`, `update` over `fetch`, `delete`, `post`
- **Types in dedicated files** — interfaces, enums, and types live in `types.ts`
- **Defensive guards** — double-check assumptions with `if` checks and logging before proceeding
- **Small functions** — keep `utils.js` helpers under 50 lines
- **Version bumps** — increment `package.json` version with every push to `main`. Feature branches: one bump before merge
- **Conventional commits** — `feat(scope):`, `fix(scope):`, `refactor(scope):`; one change per commit

### Documentation Standards

- **Concise docs** — markdown files should be scannable, not walls of text. Link to code rather than duplicating it. State tenets, not tutorials
- **Single source of truth** — every fact lives in one place. Don't repeat info across README, CLAUDE.md, and AGENTS.md — reference it
- **Inline links liberally** — link to files, other docs, and sections. README opens with what it is and how to use it; details come after

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
