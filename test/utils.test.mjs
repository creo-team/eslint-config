import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import path from 'path'

describe('getTsConfigFile', () => {
	beforeEach(() => {
		delete process.env.ESLINT_TSCONFIG
		delete process.env.ESLINT_FALLBACK_TSCONFIG
		delete process.env.ESLINT_START_DIR
	})

	afterEach(() => {
		delete process.env.ESLINT_TSCONFIG
		delete process.env.ESLINT_FALLBACK_TSCONFIG
		delete process.env.ESLINT_START_DIR
	})

	it('returns a path ending with tsconfig json when target exists in tree', async () => {
		const { getTsConfigFile } = await import('../utils.js')
		const startDir = process.cwd()
		const result = getTsConfigFile('tsconfig.eslint.json', 'tsconfig.json', startDir)
		expect(typeof result).toBe('string')
		expect(result).toMatch(/tsconfig(\.eslint)?\.json$/)
		expect(path.isAbsolute(result)).toBe(true)
	})

	it('returns fallback path when startDir has no target and reaches root', async () => {
		const { getTsConfigFile } = await import('../utils.js')
		const startDir = path.join(process.cwd(), 'test')
		const result = getTsConfigFile('tsconfig.eslint.json', 'tsconfig.json', startDir)
		expect(typeof result).toBe('string')
		expect(result).toMatch(/tsconfig\.(eslint\.)?json$/)
	})
})

describe('debug', () => {
	it('does not call console when ESLINT_DEBUG is unset', async () => {
		const orig = process.env.ESLINT_DEBUG
		delete process.env.ESLINT_DEBUG
		const spy = vi.spyOn(console, 'debug').mockImplementation(() => {})
		const { debug } = await import('../utils.js')

		debug('test')

		expect(spy).not.toHaveBeenCalled()
		spy.mockRestore()
		if (orig !== undefined) process.env.ESLINT_DEBUG = orig
	})

	it('calls console.debug when ESLINT_DEBUG is set', async () => {
		process.env.ESLINT_DEBUG = '1'
		const spy = vi.spyOn(console, 'debug').mockImplementation(() => {})
		const { debug } = await import('../utils.js')

		debug('hello')

		expect(spy).toHaveBeenCalledWith('[Eslint]: hello')
		spy.mockRestore()
		delete process.env.ESLINT_DEBUG
	})
})
