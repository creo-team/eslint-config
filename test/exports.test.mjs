import { execFileSync } from 'child_process'
import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)

/**
 * Imports the ESM entry in a real Node process, bypassing Vitest's module interop.
 *
 * @returns Shape of the default and named exports as Node sees them.
 */
function getNodeEsmShape() {
	const script = `
		import config, { createConfig } from './index.mjs'
		console.log(JSON.stringify({
			createConfigType: typeof createConfig,
			isArray: Array.isArray(config),
			length: config.length,
			sameCreateConfig: createConfig === config.createConfig,
		}))
	`
	const output = execFileSync(process.execPath, ['--input-type=module', '--eval', script], {
		cwd: repoRoot,
		encoding: 'utf8',
	})

	return JSON.parse(output)
}

describe('entry points', () => {
	it('require returns the default config array with createConfig attached', () => {
		const config = require('../eslint.config.js')

		expect(Array.isArray(config)).toBe(true)
		expect(config.length).toBeGreaterThan(0)
		expect(typeof config.createConfig).toBe('function')
	})

	it('ESM entry exposes the default config and a named createConfig', () => {
		const config = require('../eslint.config.js')

		expect(getNodeEsmShape()).toEqual({
			createConfigType: 'function',
			isArray: true,
			length: config.length,
			sameCreateConfig: true,
		})
	})
})
