# Agent Instructions

Instructions for AI coding agents (Claude Code, Cursor, Copilot, etc.) working in this codebase. For comprehensive project context, see [CLAUDE.md](CLAUDE.md).

## Project

**@creo-team/eslint-config** — shared ESLint configuration for Creo projects. TypeScript/React, Prettier, JSDoc, stylistic rules, complexity, no-magic-numbers. Exports default flat config and `createConfig(options)` for customization. Optional **projectService** for monorepos (one root config, nearest tsconfig per file); single-repo or per-workspace configs use default.

## Required Reading

| Area | Document |
|------|----------|
| All changes | [CLAUDE.md](CLAUDE.md) — single source of truth for conventions |
| Contributing | [CONTRIBUTING.md](CONTRIBUTING.md) — setup, commands, release |

## Core Rules

- **Never nest** — early returns, flat code. If you're indenting more than once, refactor
- **No narration comments** — code speaks for itself. Only comment non-obvious intent or trade-offs. No section banners
- **No magic values in rule config** — use named constants (e.g. `error`, `off`, `maxLinesPerFile`) in `rules.js`
- **Deduplicate ruthlessly** — shared logic in shared modules
- **TypeScript only** — no `.js`/`.jsx` in application code. Strict mode enabled
- **Turbopack** — use `--turbopack` flag for Next.js dev and build (where applicable)
- **Latest stable versions** — stay current with Next.js, React, and dependencies. Adopt new features early
- **Skeleton loading** — every async boundary needs a loading state. Use `loading.tsx`, `Suspense` fallbacks, and skeleton UI. No blank screens
- **Simple over clever** — readable beats terse
- **Verb-driven names** — `get`, `remove`, `create`, `list` over `fetch`, `delete`, `post`
- **Types in `types.ts`** — never scatter type definitions across implementation files
- **Defensive guards** — verify assumptions with `if` checks and logging
- **Small functions** — single purpose, early returns; keep `utils.js` helpers focused
- **Version bumps** — increment `package.json` version with every push to `main`. Feature branches: one bump before merge
- **Conventional commits** — `feat(scope):`, `fix(scope):`, `refactor(scope):`; one change per commit
## Key Files

| File | Purpose |
|------|---------|
| `rules.js` | Rule groups: commonjsPreventRules, prettier, jsDoc, stylisticTs, tsEslint; merged into `rules`; includes complexity, no-magic-numbers |
| `utils.js` | Helpers: `debug()`, `getTsConfigFile()`; Node globals via config |
| `eslint.config.js` | Exports default `createConfig()` and `createConfig`; no project-structure plugin |
| `examples/monorepo/` | Monorepo example (root config, projectService); run `npm install && npm run lint` to validate |

## Verification

Before considering work done:

```bash
npm test
npm run build
```

From repo root. Tests run Vitest then lint; build compiles to `dist/`.
