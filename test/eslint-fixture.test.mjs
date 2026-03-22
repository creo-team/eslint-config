import { createRequire } from 'module'
import { describe, expect, it } from 'vitest'
import path from 'path'
import { ESLint } from 'eslint'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

/**
 * Creates an ESLint instance using this repo's config with projectService for type-aware linting.
 *
 * @param cwd - Working directory for ESLint.
 * @param extraIgnores - Additional ignore patterns.
 * @returns Configured ESLint instance.
 */
function createTestEslint(cwd, extraIgnores = []) {
	const repoRoot = path.resolve(__dirname, '..')
	const { createConfig } = require(path.join(repoRoot, 'eslint.config.js'))
	const config = createConfig({
		ignores: ['**/node_modules/**', '**/dist/**', '**/*.config.js', ...extraIgnores],
		projectService: true,
	})

	return new ESLint({
		cwd,
		overrideConfig: config,
		overrideConfigFile: true,
	})
}

/**
 * Lints a file and returns all messages (errors + warnings).
 *
 * @param eslint - ESLint instance.
 * @param filePath - File to lint.
 * @returns Array of lint messages.
 */
async function lintFile(eslint, filePath) {
	const results = await eslint.lintFiles([filePath])

	return results.flatMap((r) => r.messages)
}

describe('eslint config', () => {
	it('lints single-repo fixture with zero errors', async () => {
		const root = path.resolve(__dirname, '..')
		const eslint = new ESLint({ cwd: root })
		const fixturePath = path.join(root, 'test', 'fixtures', 'good.ts')
		const results = await eslint.lintFiles([fixturePath])
		const errors = results.flatMap((r) => r.messages.filter((m) => m.severity === 2))
		expect(errors).toHaveLength(0)
	})

	it('lints monorepo fixture with projectService and zero errors', async () => {
		const monorepoRoot = path.resolve(__dirname, 'fixtures', 'monorepo')
		const eslint = createTestEslint(monorepoRoot)
		const results = await eslint.lintFiles(['app/index.ts', 'lib/index.ts'])
		const errors = results.flatMap((r) => r.messages.filter((m) => m.severity === 2))
		expect(errors).toHaveLength(0)
	})

	it('lints examples/monorepo with projectService and zero errors', async () => {
		const repoRoot = path.resolve(__dirname, '..')
		const examplesMonorepo = path.resolve(repoRoot, 'examples', 'monorepo')
		const eslint = createTestEslint(examplesMonorepo)
		const results = await eslint.lintFiles(['app/index.ts', 'lib/index.ts', 'shared/types.ts'])
		const errors = results.flatMap((r) => r.messages.filter((m) => m.severity === 2))
		expect(errors).toHaveLength(0)
	})

	it('lints examples/rule-overrides/naming-convention with UPPER_SNAKE override and zero errors', async () => {
		const repoRoot = path.resolve(__dirname, '..')
		const { createConfig } = require(path.join(repoRoot, 'eslint.config.js'))
		const base = createConfig({ ignores: ['node_modules/**'] })
		const namingOverride = {
			files: ['**/*.ts', '**/*.tsx'],
			rules: {
				'@typescript-eslint/naming-convention': [
					'error',
					{ format: ['camelCase'], selector: 'default' },
					{ format: ['camelCase', 'PascalCase'], selector: 'import' },
					{ format: ['camelCase', 'PascalCase', 'UPPER_CASE'], selector: 'variable' },
					{ format: ['PascalCase'], selector: 'typeLike' },
					{ format: ['PascalCase'], selector: 'enumMember' },
				],
			},
		}
		const config = [...base, namingOverride]
		const exampleDir = path.resolve(repoRoot, 'examples', 'rule-overrides', 'naming-convention')
		const eslint = new ESLint({
			cwd: exampleDir,
			overrideConfig: config,
			overrideConfigFile: true,
		})
		const results = await eslint.lintFiles(['constants.ts'])
		const errors = results.flatMap((r) => r.messages.filter((m) => m.severity === 2))
		expect(errors).toHaveLength(0)
	})
})

describe('violation detection', () => {
	it('catches no-promise-executor-return (error)', async () => {
		const repoRoot = path.resolve(__dirname, '..')
		const eslint = createTestEslint(repoRoot)
		const messages = await lintFile(eslint, 'test/fixtures/violations/promise-executor-return.ts')
		const match = messages.find((m) => m.ruleId === 'no-promise-executor-return')
		expect(match).toBeDefined()
		expect(match.severity).toBe(2)
	})

	it('catches no-await-in-loop (warn)', async () => {
		const repoRoot = path.resolve(__dirname, '..')
		const eslint = createTestEslint(repoRoot)
		const messages = await lintFile(eslint, 'test/fixtures/violations/await-in-loop.ts')
		const match = messages.find((m) => m.ruleId === 'no-await-in-loop')
		expect(match).toBeDefined()
		expect(match.severity).toBe(1)
	})

	it('catches no-console (warn)', async () => {
		const repoRoot = path.resolve(__dirname, '..')
		const eslint = createTestEslint(repoRoot)
		const messages = await lintFile(eslint, 'test/fixtures/violations/console-usage.ts')
		const match = messages.find((m) => m.ruleId === 'no-console')
		expect(match).toBeDefined()
		expect(match.severity).toBe(1)
	})
})
