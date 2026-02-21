import { createRequire } from 'module'
import { describe, expect, it } from 'vitest'
import path from 'path'
import { ESLint } from 'eslint'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

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
		const repoRoot = path.resolve(__dirname, '..')
		const { createConfig } = require(path.join(repoRoot, 'eslint.config.js'))
		const config = createConfig({
			ignores: ['node_modules/**'],
			projectService: true,
		})
		const monorepoRoot = path.resolve(__dirname, 'fixtures', 'monorepo')
		const eslint = new ESLint({
			cwd: monorepoRoot,
			overrideConfig: config,
			overrideConfigFile: true,
		})
		const results = await eslint.lintFiles(['app/index.ts', 'lib/index.ts'])
		const errors = results.flatMap((r) => r.messages.filter((m) => m.severity === 2))
		expect(errors).toHaveLength(0)
	})

	it('lints examples/monorepo with projectService and zero errors', async () => {
		const repoRoot = path.resolve(__dirname, '..')
		const { createConfig } = require(path.join(repoRoot, 'eslint.config.js'))
		const config = createConfig({
			ignores: ['**/node_modules/**', '**/dist/**', '**/*.config.js'],
			projectService: true,
		})
		const examplesMonorepo = path.resolve(repoRoot, 'examples', 'monorepo')
		const eslint = new ESLint({
			cwd: examplesMonorepo,
			overrideConfig: config,
			overrideConfigFile: true,
		})
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
