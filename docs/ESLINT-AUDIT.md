# ESLint Audit — v3.0.0

Audit performed March 2026 during the v3.0.0 overhaul. Covers architecture, rules, plugins, performance, and AI-usage.

## Strongest Parts

- **Flat config architecture** — correct modern ESLint 9.x setup with `createConfig()` factory
- **Type-checked linting** — `strictTypeChecked` + `stylisticTypeChecked` catches real bugs
- **`projectService` option** — clean monorepo support without per-workspace configs
- **Named constants** — severity levels and naming conventions in [constants.js](../constants.js), no magic strings
- **Tests** — fixture tests validate single-repo, monorepo, and override scenarios
- **Docs spread** — README (usage), CLAUDE.md (conventions), AGENTS.md (agent quick ref)

## Issues Found and Fixed (v3.0.0)

### Prettier/@stylistic redundancy (fixed)

13 `@stylistic/*` rules duplicated formatting that Prettier already handles via `prettier/prettier`. Removed: `block-spacing`, `brace-style`, `comma-dangle`, `comma-spacing`, `function-call-spacing`, `key-spacing`, `keyword-spacing`, `member-delimiter-style`, `no-extra-parens`, `quote-props`, `semi`, `space-before-blocks`, `space-infix-ops`, `type-annotation-spacing`. Also removed redundant `eol-last`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`.

Kept only `@stylistic/lines-around-comment` and `@stylistic/lines-between-class-members` — Prettier doesn't enforce blank-line structure.

### Missing correctness rules (fixed)

| Rule | Severity | What it catches |
|------|----------|-----------------|
| `no-promise-executor-return` | error | Returning a value from `new Promise(executor)` — always a bug |
| `no-await-in-loop` | warn | Sequential awaits that should be `Promise.all()` |
| `no-console` | warn | Leftover `console.log` (AI code loves these) |
| `@typescript-eslint/no-unnecessary-condition` | warn | Dead branches / impossible conditions |

### Aggressive rules relaxed (fixed)

- `no-inline-comments: error` removed — fought productive coding and AI annotations
- `jsdoc/require-jsdoc` ArrowFunctionExpression changed from `true` to `false` — React/Next.js codebases use arrow functions everywhere

### Duplicate config block (fixed)

`constants.js`/`rules.js` override appeared twice in `eslint.config.js`. The first instance (early in the array) was dead code — overridden by the main rules block. Removed the dead instance, kept the one after the main block.

### `no-misused-spread` duplication (fixed)

`@typescript-eslint/no-misused-spread: off` was set inline in both the main block and TSX block. Moved to `rules.js` so it's part of the base `rules` object.

## Package Decisions

| Package | Action | Rationale |
|---------|--------|-----------|
| `@eslint/js` | 9.39.3 → 9.39.4 | Patch update |
| `eslint` | 9.39.3 → 9.39.4 | Patch update |
| `@stylistic/eslint-plugin` | 5.9.0 → 5.10.0 | Minor update |
| `eslint-plugin-jsdoc` | 62.7.0 → 62.8.0 | Minor update |
| `typescript-eslint` | 8.56.0 → 8.57.1 | Minor update |
| `eslint-plugin-perfectionist` | 4.15.1 — kept | v5 is major; defer |
| `eslint-plugin-import` | 2.32.0 — kept | `import-x` migration deferred to future major |
| `eslint` | Stayed on 9.x | `typescript-eslint@8` doesn't support ESLint 10 yet |
| `vitest` | 3.2.4 — kept | v4 is major; defer |

## Future Upgrades

1. **ESLint 10** — when `typescript-eslint` adds support. The `upgrade:all` script already rejects `eslint|@eslint/js` for this reason
2. **eslint-plugin-import-x** — actively maintained fork of `eslint-plugin-import` with better flat config support. Migration changes rule prefix from `import/` to `import-x/` — breaking for consumers who override import rules. Plan for next major
3. **eslint-plugin-perfectionist v5** — evaluate when ESLint 10 migration happens
4. **eslint-plugin-react-hooks** — consider adding as optional for React projects

## Performance

Type-checked linting (`strictTypeChecked`) is the main performance cost. The `projectService` option mitigates this for monorepos by using the nearest tsconfig per file rather than parsing the entire project.

Removing 13 redundant @stylistic rules reduces rule evaluation overhead slightly. The remaining rule set is lean and justified.
