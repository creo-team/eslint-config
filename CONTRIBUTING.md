# Contributing

## Setup

```bash
npm install
```

## Commands

- `npm run lint` — run ESLint
- `npm run fix` — auto-fix lint issues
- `npm run build` — compile to `dist/`
- `npm test` — run Vitest then lint
- `npm run test:watch` — Vitest watch mode

## What gets published

Only `dist/` (eslint.config.js, rules.js, utils.js plus `.d.ts` and `.map`) plus `package.json`, `README.md`, and `LICENSE`. Tests, examples, source, and configs are not published. See `files` in `package.json`.

## Release

Trunk-based. Bump `version` in `package.json`, push `main`.

**Flow:** Push to main → `github-release.yaml` creates tag + GitHub Release → `npm-publish.yaml` runs on release and publishes to npm.

**Auth:** OIDC Trusted Publishing. Configure workflow filename `npm-publish.yaml` at npmjs.com → Package → Access → Trusted Publisher. No token needed.

**Dry runs:** Run `GitHub Release` or `npm Publish` manually from Actions with workflow_dispatch for preview.

## Verification before submit

```bash
npm test
npm run build
```

## Validate monorepo example

```bash
cd examples/monorepo
npm install
npm run lint
```

Should pass with zero errors. Uses the published `@creo-team/eslint-config` from npm.

## IDE and AI (Cursor / Claude)

- **ESLint MCP:** Use the [ESLint MCP server](https://eslint.org/docs/latest/use/mcp) so Cursor or Claude can lint and fix. Add to `.cursor/mcp.json` or your editor’s MCP config.
- **Project docs:** See [AGENTS.md](./AGENTS.md) and [CLAUDE.md](./CLAUDE.md) for agent instructions.
