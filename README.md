# @creo-team/eslint-config

Modern TypeScript/React ESLint configuration with unified stylistic rules. Integrates [ESLint](https://eslint.org/) and [TypeScript ESLint](https://typescript-eslint.io/) for clean, consistent code.

[![npm version](https://img.shields.io/npm/v/@creo-team/eslint-config.svg)](https://www.npmjs.com/package/@creo-team/eslint-config)
[![License](https://img.shields.io/github/license/creo-team/eslint-config)](./LICENSE)

## Install

```bash
npm install @creo-team/eslint-config --save-dev
```

## Usage

Add to your project root:

**ESM** (`eslint.config.mjs` or `eslint.config.js`):

```javascript
import eslintConfig from '@creo-team/eslint-config'
export default eslintConfig
```

**CommonJS** (`eslint.config.js`):

```javascript
const eslintConfig = require('@creo-team/eslint-config')
module.exports = eslintConfig
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "fix": "eslint . --fix"
  }
}
```

## Release flow

Trunk-based. Bump `version` in `package.json`, push `main` → release creates tag, publish pushes to npm. OIDC, no tokens.

## Development

**Test locally** with `npm link`:

```bash
# In eslint-config repo
npm link

# In consuming project
npm link @creo-team/eslint-config
```

**Environment variables** (optional):

- `ESLINT_DEBUG` — enable debug logging
- `ESLINT_TSCONFIG` — override tsconfig file
- `ESLINT_START_DIR` — search start directory

## License

ISC.
