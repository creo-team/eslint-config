# Structure enforcement example

Lock in monorepo workspace dirs and app directory structure using `createConfig({ structure })`.

**Requires:** `eslint-plugin-project-structure` (optional peer — install when using structure).

```bash
npm install eslint-plugin-project-structure --save-dev
```

## Monorepo with workspaces

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

## Monorepo + app structure

```javascript
const { createConfig } = require('@creo-team/eslint-config')

module.exports = createConfig({
  projectService: true,
  structure: {
    workspaces: ['nextjs', 'aws/infra', 'shared'],
    appStructure: 'nextjs',  // app/, components/, lib/, utils/, hooks/, styles/, public/
    appPath: 'nextjs',
  },
  ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/cdk.out/**', '**/*.config.*'],
})
```

## Single repo — app structure

```javascript
const { createConfig } = require('@creo-team/eslint-config')

module.exports = createConfig({
  structure: {
    appStructure: 'nextjs',
  },
  ignores: ['.next/**', 'node_modules/**'],
})
```

## Presets

| Preset | Dirs |
|--------|------|
| `nextjs` | app, components, lib, utils, hooks, styles, public |
| `nextjsAppRouter` | Same + settings |
| `react` | src/{components, lib, utils, hooks, styles}, public |
| `express` | src/{routes, controllers, services, utils, middleware} |
| `src` | src/{components, lib, utils, settings} |

## Custom dirs

```javascript
structure: {
  appStructure: ['components', 'lib', 'utils', 'hooks', 'settings'],
}
```
