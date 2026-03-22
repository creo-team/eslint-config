# ESLint Standards

Architecture and rule philosophy for `@creo-team/eslint-config`.

## Architecture

**ESLint 9.x flat config**, CommonJS format. Exports a default config and `createConfig(options)` factory.

```
eslint.config.js  ← config entry point, createConfig() factory
rules.js          ← rule groups (prettier, jsDoc, stylisticTs, tsEslint, commonjsPreventRules)
constants.js      ← severity levels, naming convention presets
utils.js          ← getTsConfigFile(), debug()
structure.js      ← optional project-structure enforcement
```

### Config block order

1. **Ignores** — `dist/**`, `test/**` (default)
2. **Project structure** — optional, requires `eslint-plugin-project-structure`
3. **ESLint recommended** — base JS rules
4. **TypeScript ESLint** — `recommendedTypeChecked`, `stylisticTypeChecked`, `strictTypeChecked`
5. **Perfectionist** — alphabetical sorting
6. **JS/JSX type-check disable** — turn off type-checked rules for plain JS
7. **Main rules block** — parser, plugins, merged rules, import resolver
8. **TSX overrides** — relaxed naming-convention and no-unsafe-return for React
9. **Config file overrides** — disable naming-convention and sort-objects for `constants.js`, `rules.js`

Later blocks override earlier blocks. The config file override is last so it isn't undone by the main rules block.

## Rule Philosophy

### What linting should catch

- **Correctness bugs** — no-promise-executor-return, no-await-in-loop, import/no-cycle
- **Type safety** — strict type-checked rules, consistent-type-imports/exports
- **Code structure** — complexity (max 15), max-lines (400), max-lines-per-function (200)
- **Import hygiene** — no cycles, no duplicates, no self-import, resolver validation
- **Documentation** — JSDoc on function declarations and methods (not arrow functions)
- **Leftover debug code** — no-console (warn)

### What TypeScript should catch instead

- Type correctness (types, interfaces, generics)
- Null/undefined handling (`strictNullChecks`)
- Unreachable code (`noFallthroughCasesInSwitch`)

### What Prettier should catch instead

- All formatting: indentation, spacing, quotes, semicolons, line length, bracket style
- `prettier/prettier: error` catches every formatting issue Prettier would fix
- No `@stylistic/*` rules for formatting — only blank-line structure rules remain

### What tests should catch instead

- Business logic correctness
- Edge cases and error handling
- Integration behavior

## Rule Groups

| Group | File | Purpose |
|-------|------|---------|
| `prettier` | [rules.js](../rules.js) | Prettier config + disable conflicting rules |
| `jsDoc` | [rules.js](../rules.js) | JSDoc on declarations/methods; params, returns, descriptions |
| `stylisticTs` | [rules.js](../rules.js) | Blank-line structure only (lines-around-comment, lines-between-class-members) |
| `tsEslint` | [rules.js](../rules.js) | TypeScript, import, complexity, quality, new correctness rules |
| `commonjsPreventRules` | [rules.js](../rules.js) | Allow `require()` and default exports in config files |
| `rulesToDisable` | [rules.js](../rules.js) | Disable clashing rules (perfectionist sort-imports) |

## Severity Policy

| Severity | Use for |
|----------|---------|
| `error` | Bugs, correctness issues, structural limits. Blocks CI |
| `warn` | Smell indicators, style suggestions, patterns that are sometimes intentional. Does not block CI by default |
| `off` | Rules disabled because they conflict, are redundant, or don't apply |

## When to Override

Consumers can override any rule. Use constants from `@creo-team/eslint-config/constants`:

```javascript
const { off, warn } = require('@creo-team/eslint-config/constants')
module.exports = [...base, { rules: { 'no-console': off, 'no-magic-numbers': off } }]
```

**Acceptable overrides:**
- `no-console: off` for CLI tools and scripts
- `no-magic-numbers: off` for test files or data-heavy modules
- `jsdoc/require-jsdoc: off` for internal/private modules
- `max-lines-per-function` increase for complex but cohesive functions

**Avoid overriding:**
- `no-promise-executor-return` — always a bug
- `import/no-cycle` — circular deps cause real problems
- `complexity` — high complexity means the function should be split

## Inline Suppressions

Use `eslint-disable-next-line` with a reason:

```javascript
// eslint-disable-next-line no-console -- intentional debug logger
console.debug(`[Debug]: ${message}`)
```

Never use file-level `/* eslint-disable */` without a specific rule and reason.
