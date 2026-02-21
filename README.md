# @creo-team/eslint-config

ESLint flat config for TypeScript/React: strict type-checking, Prettier, JSDoc, complexity limits, and no magic numbers. One style and one set of rules so code stays consistent and reviewable—and so tools like Cursor and Claude can fix and generate code that matches. Works with the [ESLint MCP server](https://eslint.org/docs/latest/use/mcp).

[![npm version](https://img.shields.io/npm/v/@creo-team/eslint-config.svg)](https://www.npmjs.com/package/@creo-team/eslint-config)
[![License](https://img.shields.io/github/license/creo-team/eslint-config)](./LICENSE)

## Install

```bash
npm install @creo-team/eslint-config --save-dev
```

## Usage patterns

### 1. Single repo (default)

One app or package, one `tsconfig`. Use the preset as-is.

**ESM** (`eslint.config.mjs`):

```javascript
import eslintConfig from '@creo-team/eslint-config'
export default eslintConfig
```

**CommonJS** (`eslint.config.js`):

```javascript
const eslintConfig = require('@creo-team/eslint-config')
module.exports = eslintConfig
```

### 2. Single repo with options

Customize ignores or which tsconfig to use:

```javascript
const { createConfig } = require('@creo-team/eslint-config')

module.exports = createConfig({
  ignores: ['dist/**', 'build/**'],
  tsconfig: 'tsconfig.app.json', // optional; default: getTsConfigFile()
})
```

### 3. Monorepo — one root config (recommended)

Multiple packages (e.g. `app/`, `lib/`, `infra/`), each with its own `tsconfig.json`. Use **projectService** so type-aware rules resolve the nearest tsconfig per file. One `eslint.config.js` at the repo root; run `eslint .` from the root.

```javascript
// eslint.config.js at monorepo root
const { createConfig } = require('@creo-team/eslint-config')

module.exports = createConfig({
  ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/build/**'],
  projectService: true,
})
```

Ensure each package that contains TypeScript has a `tsconfig.json` (or `tsconfig.eslint.json`) in that directory. No `tsconfig.eslint.json` at root is required. See [typescript-eslint project service](https://typescript-eslint.io/blog/project-service).

**Root `package.json` scripts** (e.g. npm workspaces):

```json
{
  "scripts": {
    "lint": "eslint .",
    "fix": "eslint . --fix"
  }
}
```

### 4. Monorepo — per-workspace config (e.g. Vecta-style)

Lint is run **per workspace** (`npm run lint -w nextjs`). Each workspace has its own `eslint.config.js` and its own `tsconfig`. Use the default preset (no `projectService`); the config runs with that workspace as cwd, so `getTsConfigFile()` finds that package’s tsconfig.

- **Root** `package.json`: `"lint": "npm run lint -w nextjs"` (or run each workspace).
- **Workspace** (e.g. `nextjs/eslint.config.js`): use the preset as-is or with `createConfig({ ignores: ['.next/**', ...] })`.

Single-repo and per-workspace configs do **not** need `projectService`.

### Scripts

In any setup, add to the package that runs ESLint:

```json
{
  "scripts": {
    "lint": "eslint .",
    "fix": "eslint . --fix"
  }
}
```

### TypeScript

Type-aware rules need a `tsconfig.json` (or `tsconfig.eslint.json`) that includes your source. With **projectService** (monorepo), each file uses the nearest tsconfig. Without it, one tsconfig is used (see [typed linting](https://typescript-eslint.io/getting-started/typed-linting)).

### Extending

Spread and override:

```javascript
const base = require('@creo-team/eslint-config')
module.exports = [...base, { rules: { 'no-console': 'warn' } }]
```

## Why this config

**Predictable, reviewable code.** The rules are chosen so that style is decided once (Prettier + stylistic), intent is documented (JSDoc), and structure stays within bounds (complexity, line limits, no magic numbers). That reduces pointless formatting debates and makes diffs easier to read.

**Key rules and what they give you:**

| Rule / area | Benefit |
|-------------|--------|
| **Strict type-checked** (typescript-eslint) | Catches type errors and unsafe `any` before runtime. Fewer “works until it doesn’t” bugs. |
| **JSDoc** (params, returns, descriptions) | Public API is self-describing. IDE hints and “go to definition” are useful without opening the implementation. |
| **complexity (max 15)** | Branches and conditionals stay bounded. Functions stay testable and easier to reason about. |
| **max-lines-per-function (200)** | Long functions get split. Easier to name, test, and reuse. |
| **no-magic-numbers (warn)** | Literals become named constants. Changing a threshold or status code happens in one place. |
| **Import rules** (no-cycle, order, resolver) | No circular deps; consistent import order; TypeScript path resolution works. |
| **Prettier** | One formatter. No style churn in code review. |

**LLM- and assistant-friendly.** Cursor, Claude, and other tools behave better when the codebase is consistent and documented. This config enforces one style (so generated code matches), requires JSDoc on public surfaces (so the model has context), and keeps complexity and magic numbers in check (so suggestions stay in the same style and refactors are local). Use the [ESLint MCP server](https://eslint.org/docs/latest/use/mcp) so the assistant can run ESLint and fix violations in your editor.

## Optional: project structure

For folder/file structure enforcement, add [eslint-plugin-project-structure](https://www.npmjs.com/package/eslint-plugin-project-structure) in your project and configure it (e.g. `.projectStructurerc`). This package does not include it by default.

## What’s included

- **TypeScript ESLint** — recommended + strict type-checked, stylistic
- **Prettier** — formatting (tabs, 120 print width, no semicolons)
- **JSDoc** — require descriptions, params, returns
- **Import** — order, no cycles, resolver TypeScript
- **Perfectionist** — alphabetical sort (imports sort disabled)
- **Quality** — complexity (max 15), max-lines, max-lines-per-function, no-magic-numbers (warn)

## Release flow

Trunk-based. Bump `version` in `package.json`, push `main` → `github-release` creates tag → `npm-publish` publishes. OIDC, no tokens. Release runs only when `package.json` changes.

## Development

See [CONTRIBUTING.md](./CONTRIBUTING.md). Test locally with `npm link`:

```bash
# In eslint-config repo
npm link

# In consuming project
npm link @creo-team/eslint-config
```

**Environment variables** (optional):

- `ESLINT_DEBUG` — enable debug logging
- `ESLINT_TSCONFIG` — override tsconfig file
- `ESLINT_FALLBACK_TSCONFIG` — override fallback tsconfig
- `ESLINT_START_DIR` — search start directory

## License

ISC.
