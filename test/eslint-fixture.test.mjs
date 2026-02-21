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
})
