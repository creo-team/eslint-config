/**
 * Monorepo root ESLint config.
 * Run `npm run lint` from this directory.
 *
 * Uses projectService so each package (app/, lib/, shared/) uses its nearest tsconfig.
 */
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
