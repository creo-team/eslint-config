# @creo-team/eslint-config — Claude Code Instructions

## Project Overview

Shared ESLint configuration for **Creo** projects. Used by vecta, photos, creo, and others. Provides TypeScript ESLint (strict type-checked), Prettier, JSDoc, stylistic rules, async correctness, complexity (max 15), no-magic-numbers (warn), and import/perfectionist plugins. Flat config only. Exports default config and `createConfig(options)` for ignores, tsconfig, and optional **projectService** (recommended for monorepos). Single-repo and per-workspace (e.g. vecta) setups use default; monorepo root with multiple tsconfigs uses `projectService: true`.

## Before Making Changes

1. Read this file for conventions
2. Check [CONTRIBUTING.md](CONTRIBUTING.md) for commands and release flow
3. Review [docs/ESLINT-STANDARDS.md](docs/ESLINT-STANDARDS.md) for rule philosophy

## Key Conventions

- **Never nest** — early returns, flat code. If you're indenting more than once, refactor
- **No narration comments** — code speaks for itself. Only comment non-obvious intent or trade-offs. No section banners
- **No magic values in rule config** — in `rules.js`, use constants (`error`, `off`, `always`, `maxLinesPerFile`, `maxComplexity`, etc.) for rule severity and options
- **Deduplicate ruthlessly** — shared logic in shared modules
- **TypeScript only** — no `.js`/`.jsx` in application code. Strict mode enabled
- **Turbopack** — use `--turbopack` flag for Next.js dev and build (where applicable)
- **Latest stable versions** — stay current with Next.js, React, and dependencies. Adopt new features early
- **Skeleton loading** — every async boundary needs a loading state. Use `loading.tsx`, `Suspense` fallbacks, and skeleton UI. No blank screens
- **Simple over clever** — readable beats terse
- **Verb-driven function names** — prefer `get`, `remove`, `create`, `list`, `put`, `update` over `fetch`, `delete`, `post`
- **Types in dedicated files** — interfaces, enums, and types live in `types.ts`
- **Named imports** — prefer `{ thing } from 'thing'` over `import *`. Never use `import *` when named imports exist
- **Named exports** — prefer named exports over `export default`. Exception: framework-convention files where default is required
- **Defensive guards** — double-check assumptions with `if` checks and logging before proceeding
- **Small functions** — keep `utils.js` helpers under 50 lines
- **Version bumps** — increment `package.json` version with every commit. Patch for fixes, minor for features, major for breaking changes
- **Conventional commits** — `feat(scope):`, `fix(scope):`, `refactor(scope):`; one change per commit

### Documentation Standards

- **Concise docs** — markdown files should be scannable, not walls of text. Link to code rather than duplicating it. State tenets, not tutorials
- **Single source of truth** — every fact lives in one place. Don't repeat info across README, CLAUDE.md, and AGENTS.md — reference it
- **Inline links liberally** — link to files, other docs, and sections. README opens with what it is and how to use it; details come after

## Rule Organization ([rules.js](rules.js))

| Group | Purpose |
|-------|---------|
| `commonjsPreventRules` | Allow CommonJS (require, default export) for config files |
| `prettier` | Prettier options; turn off conflicting stylistic rules |
| `jsDoc` | JSDoc require-* rules for descriptions, params, returns (not arrow functions) |
| `stylisticTs` | @stylistic/ blank-line structure only (lines-around-comment, lines-between-class-members) |
| `tsEslint` | TypeScript ESLint + import rules; naming, types, max-lines, complexity, no-magic-numbers, async correctness, no-console |
| `rulesToDisable` | Rules that clash (e.g. perfectionist sort-imports) |

Exported `rules` object merges these in order; later spreads override earlier.

### v3.0.0 Rule Changes

**Added:** `no-promise-executor-return` (error), `no-await-in-loop` (warn), `no-console` (warn), `@typescript-eslint/no-unnecessary-condition` (warn), `@typescript-eslint/no-misused-spread` (off, moved from inline to rules.js)

**Removed:** 13 `@stylistic/*` rules redundant with Prettier, `no-inline-comments`, `eol-last`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`

**Relaxed:** `jsdoc/require-jsdoc` ArrowFunctionExpression changed from required to exempt

**Config fix:** Removed dead duplicate config block in eslint.config.js

### Prettier/@stylistic Boundary

Prettier handles ALL formatting via `prettier/prettier: error`. The `@stylistic/*` plugin is only used for blank-line structure rules that Prettier doesn't cover. Never add `@stylistic/*` formatting rules — Prettier catches them.

## Key File Map

| File | Purpose |
|------|---------|
| [rules.js](rules.js) | All rule groups; exports `rules`, `jsDoc`, `prettier`, etc. |
| [utils.js](utils.js) | `getTsConfigFile()`, `debug()`; used by eslint.config.js |
| [eslint.config.js](eslint.config.js) | Exports default and `createConfig`; flat config; no project-structure |
| [constants.js](constants.js) | Severity levels, naming convention presets |
| [structure.js](structure.js) | Optional project-structure enforcement |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Setup, lint/fix/build/test, release, OIDC, MCP |
| [test/](test/) | Vitest unit tests (utils), ESLint fixture test |
| [examples/monorepo/](examples/monorepo/) | Monorepo example (root config, projectService) |
| [docs/](docs/) | ESLINT-AUDIT, ESLINT-STANDARDS, AI-CODE-STANDARDS |

## Globals

Config defines `languageOptions.globals`: `console`, `module`, `process`, `require` (all `readonly`) so Node scripts like `utils.js` do not need `/* eslint-disable no-undef */`.

## Package Update Policy

- `eslint` and `@eslint/js` are rejected from auto-upgrade (`upgrade:all` script) — `typescript-eslint@8` doesn't support ESLint 10 yet
- `eslint-plugin-import` stays at v2 — `eslint-plugin-import-x` migration planned for next major
- `eslint-plugin-perfectionist` stays at v4 — v5 upgrade planned with ESLint 10 migration

## Verification

From repo root:

```bash
npm test
npm run build
```

Tests run Vitest then lint; build compiles TypeScript to `dist/`.
