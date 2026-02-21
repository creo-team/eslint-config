# Examples

Example setups for `@creo-team/eslint-config`.

## Monorepo (root config)

**Path:** `monorepo/`

Example layout similar to Creo monorepos (photos, vecta): `app/`, `lib/`, `shared/` with npm workspaces. One `eslint.config.js` at the root; run `eslint .` from the root.

**Setup:**

```bash
cd examples/monorepo
npm install
npm run lint
```

**Key files:**

- `eslint.config.js` — uses `createConfig({ projectService: true })` so each package uses its nearest `tsconfig.json`
- Each package (`app/`, `lib/`, `shared/`) has its own `tsconfig.json`

**Validation:** Run `npm run lint` — should pass with zero errors.

## Rule overrides

**Path:** `rule-overrides/`

Examples of customizing rules:

- **naming-convention/** — allow UPPER_SNAKE for constants
- **kebab-files/** — enforce kebab-case filenames (uses eslint-plugin-unicorn)

See [rule-overrides/README.md](./rule-overrides/README.md).

## Source examples

- `api-route.ts` — API route style
- `vanilla.ts` — plain TypeScript
- `pilot.ts` — example module
- `beekeeper.tsx` — React component

These are linted by the main config when running `npm run lint` from the repo root.
