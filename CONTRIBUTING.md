# Contributing

## Setup

```bash
npm install
```

## Commands

- `npm run lint` — run ESLint
- `npm run fix` — auto-fix lint issues
- `npm run build` — compile to `dist/`
- `npm test` — same as lint

## Release

Trunk-based. Bump `version` in `package.json`, push `main`. `github-release` creates the tag; `npm-publish` publishes to npm. Runs only when `package.json` changes.

**npm Trusted Publisher:** If using OIDC, configure workflow filename `npm-publish.yaml` at npmjs.com.
