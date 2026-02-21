# Monorepo fixture

Example layout for testing `createConfig({ projectService: true })`:

- `app/` and `lib/` each have their own `tsconfig.json`.
- `eslint.config.cjs` uses the parent repo’s built config with `projectService: true` (used when running `eslint .` from this directory after `npm run build` in the repo root).
- The integration test in `test/eslint-fixture.test.mjs` runs ESLint programmatically with the same options; it does not depend on this config file.
