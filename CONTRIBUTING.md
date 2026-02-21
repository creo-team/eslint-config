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

Trunk-based. Bump `version` in `package.json`, push `main`. [action-release](https://github.com/creo-team/action-release) reads the version, creates a tag and GitHub Release with a changelog, then publishes to npm.

**Flow:** Push to main → action-release creates tag + GitHub Release → `npm run build` → `npm publish --provenance --access public`

**Auth:** Add `NPM_TOKEN` secret (granular publish token). OIDC Trusted Publishing optional: configure `release.yaml` at npmjs.com → Package → Access → Trusted Publisher.

## Verification before submit

```bash
npm test
npm run build
```

## IDE and AI (Cursor / Claude)

- **ESLint MCP:** Use the [ESLint MCP server](https://eslint.org/docs/latest/use/mcp) so Cursor or Claude can lint and fix. Add to `.cursor/mcp.json` or your editor’s MCP config.
- **Project docs:** See [AGENTS.md](./AGENTS.md) and [CLAUDE.md](./CLAUDE.md) for agent instructions.
