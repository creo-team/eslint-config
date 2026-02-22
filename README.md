# @creo-team/eslint-config

ESLint flat config for TypeScript/React: strict type-checking, Prettier, JSDoc, complexity limits, and no magic numbers. One style and one set of rules so code stays consistent and reviewable—and so tools like Cursor and Claude can fix and generate code that matches. Works with the [ESLint MCP server](https://eslint.org/docs/latest/use/mcp).

[![npm version](https://img.shields.io/npm/v/@creo-team/eslint-config.svg)](https://www.npmjs.com/package/@creo-team/eslint-config)
[![License](https://img.shields.io/github/license/creo-team/eslint-config)](./LICENSE)

## Install

```bash
npm install @creo-team/eslint-config --save-dev
```

**Node:** Supports Node 20–24. Prefer Node 24 for best compatibility.

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
const { createConfig } = require('@creo-team/eslint-config')

module.exports = createConfig({
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
    '**/build/**',
    '**/out/**',
    '**/cdk.out/**',
    '**/*.config.js',
    '**/*.config.mjs',
    '**/*.config.ts',
  ],
  projectService: true,
})
```

**Root `package.json`** (npm workspaces):

```json
{
  "workspaces": ["nextjs", "aws/infra", "shared"],
  "scripts": {
    "lint": "eslint .",
    "fix": "eslint . --fix"
  },
  "devDependencies": {
    "@creo-team/eslint-config": "^2.4.1",
    "eslint": "^9.39.3"
  }
}
```

**Requirements:** Each package with TypeScript has a `tsconfig.json` in that directory. No root tsconfig required. See [typescript-eslint project service](https://typescript-eslint.io/blog/project-service).

**Example:** See `examples/monorepo/` in this repo. Run `cd examples/monorepo && npm install && npm run lint` to validate.

### 4. Monorepo — per-workspace config

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
const { error, warn } = require('@creo-team/eslint-config/constants')
const base = require('@creo-team/eslint-config')
module.exports = [...base, { rules: { 'no-console': warn } }]
```

### Customizing rules

Override any rule by spreading the base config and adding your own. Use constants from `@creo-team/eslint-config/constants` — no magic strings.

**1. Naming convention — allow UPPER_SNAKE for constants**

Default: `camelCase` for variables, `PascalCase` for types and enum members. To allow `UPPER_SNAKE` for constants:

```javascript
const { createConfig } = require('@creo-team/eslint-config')
const { error, FilesPattern, namingConvention } = require('@creo-team/eslint-config/constants')

const base = createConfig()

module.exports = [
  ...base,
  {
    files: FilesPattern.TsAndTsx,
    rules: {
      '@typescript-eslint/naming-convention': [error, ...namingConvention.withUpperCaseVariables],
    },
  },
]
```

**2. File naming — enforce kebab-case for `.ts` / `.tsx` files**

Install [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn), then add:

```javascript
const { createConfig } = require('@creo-team/eslint-config')
const { error, FilenameCase, FilesPattern } = require('@creo-team/eslint-config/constants')
const unicorn = require('eslint-plugin-unicorn')

const base = createConfig()

module.exports = [
  ...base,
  {
    files: FilesPattern.TsAndTsx,
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': [error, { case: FilenameCase.KebabCase }],
    },
  },
]
```

**3. Relax JSDoc or no-magic-numbers**

```javascript
const { createConfig } = require('@creo-team/eslint-config')
const { off } = require('@creo-team/eslint-config/constants')

module.exports = [
  ...createConfig(),
  {
    rules: {
      'jsdoc/require-jsdoc': off,
      'no-magic-numbers': off,
    },
  },
]
```

**4. Rule severity and naming constants**

Import from `@creo-team/eslint-config/constants` for consistent, typo-free overrides:

```javascript
const { createConfig } = require('@creo-team/eslint-config')
const { error, off, warn } = require('@creo-team/eslint-config/constants')

module.exports = [
  ...createConfig(),
  {
    rules: {
      'no-console': warn,
      'jsdoc/require-jsdoc': off,
      'some-rule': [error, { option: true }],
    },
  },
]
```

**5. Custom naming convention — build your own**

Use `NamingFormat` and `NamingSelector` for full control:

```javascript
const { createConfig } = require('@creo-team/eslint-config')
const {
  error,
  FilesPattern,
  NamingFormat,
  NamingSelector,
} = require('@creo-team/eslint-config/constants')

const base = createConfig()

module.exports = [
  ...base,
  {
    files: FilesPattern.TsAndTsx,
    rules: {
      '@typescript-eslint/naming-convention': [
        error,
        { format: [NamingFormat.CamelCase], selector: NamingSelector.Default },
        { format: [NamingFormat.PascalCase], selector: NamingSelector.TypeLike },
        { format: [NamingFormat.PascalCase], selector: NamingSelector.EnumMember },
        // ... add more as needed
      ],
    },
  },
]
```

**Examples:** See `examples/rule-overrides/` for working configs and tests.

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

## Optional: lock in project structure

Lock in monorepo workspace dirs and app directory structure. Requires [eslint-plugin-project-structure](https://www.npmjs.com/package/eslint-plugin-project-structure):

```bash
npm install eslint-plugin-project-structure --save-dev
```

### Monorepo — lock workspace dirs

Enforce that only `nextjs`, `aws/infra`, and `shared` exist at the root:

```javascript
const { createConfig } = require('@creo-team/eslint-config')

module.exports = createConfig({
  projectService: true,
  structure: {
    workspaces: ['nextjs', 'aws/infra', 'shared'],
  },
  ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/cdk.out/**', '**/*.config.*'],
})
```

### Monorepo + app structure

Lock workspaces and enforce app layout (e.g. `components`, `lib`, `utils`) inside the `nextjs` package:

```javascript
const { createConfig } = require('@creo-team/eslint-config')

module.exports = createConfig({
  projectService: true,
  structure: {
    workspaces: ['nextjs', 'aws/infra', 'shared'],
    appStructure: 'nextjs',  // preset: app/, components/, lib/, utils/, hooks/, styles/, public/
    appPath: 'nextjs',       // which workspace gets app structure
  },
  ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/cdk.out/**', '**/*.config.*'],
})
```

### Single repo — app structure only

Enforce structure for a single Next.js app:

```javascript
const { createConfig } = require('@creo-team/eslint-config')

module.exports = createConfig({
  structure: {
    appStructure: 'nextjs',  // app/, components/, lib/, utils/, hooks/, styles/, public/
  },
  ignores: ['.next/**', 'node_modules/**'],
})
```

### App structure presets

| Preset | Dirs |
|--------|------|
| `nextjs` | app, components, lib, utils, hooks, styles, public |
| `nextjsAppRouter` | Same + settings |
| `react` | src/{components, lib, utils, hooks, styles}, public |
| `express` | src/{routes, controllers, services, utils, middleware} |
| `src` | src/{components, lib, utils, settings} |

### Custom dirs

Pass an array of dir names instead of a preset:

```javascript
structure: {
  appStructure: ['components', 'lib', 'utils', 'hooks', 'settings'],
}
```


## Constants (`@creo-team/eslint-config/constants`)

Import rule values and presets — no magic strings:

| Export | Use |
|--------|-----|
| `error`, `warn`, `off` | Rule severity |
| `NamingFormat` | `CamelCase`, `PascalCase`, `UpperCase` |
| `NamingSelector` | `Default`, `Import`, `Variable`, `TypeLike`, `EnumMember` |
| `namingConvention` | `default`, `withUpperCaseVariables` presets |
| `FilesPattern` | `TsAndTsx` — `['**/*.ts', '**/*.tsx']` |
| `FilenameCase` | `KebabCase`, `CamelCase`, `PascalCase` (unicorn) |
| `AppStructurePreset` | `NextJs`, `Express`, `React`, etc. |

## What’s included

- **TypeScript ESLint** — recommended + strict type-checked, stylistic
- **Prettier** — formatting (tabs, 120 print width, no semicolons)
- **JSDoc** — require descriptions, params, returns
- **Import** — order, no cycles, resolver TypeScript
- **Perfectionist** — alphabetical sort (imports sort disabled)
- **Quality** — complexity (max 15), max-lines, max-lines-per-function, no-magic-numbers (warn)

## Release flow

Trunk-based. Bump `version` in `package.json`, push `main` → `github-release` creates tag + GitHub Release → `npm-publish` publishes to npm. OIDC Trusted Publishing, no tokens.

## Examples

- **Monorepo:** `examples/monorepo/` — root config with `projectService`, npm workspaces. See [examples/README.md](./examples/README.md).
- **Structure:** `examples/structure/` — lock in workspaces and app dirs with `structure` option. See [examples/structure/README.md](./examples/structure/README.md).

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
