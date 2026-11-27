import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'
import { buildRulesCatalog } from '../scripts/rules-catalog.mjs'

const docs = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs')

describe('rule catalog', () => {
	it('docs/RULES.md and docs/rules.json match the resolved config (run npm run docs:rules)', async () => {
		const { json, markdown } = await buildRulesCatalog()

		expect(readFileSync(path.join(docs, 'RULES.md'), 'utf8')).toBe(markdown)
		expect(readFileSync(path.join(docs, 'rules.json'), 'utf8')).toBe(json)
	})

	it('lists rules that matter, so an empty or broken resolve cannot pass', async () => {
		const { ts } = JSON.parse((await buildRulesCatalog()).json)

		expect(Object.keys(ts).length).toBeGreaterThan(200)
		expect(ts['@typescript-eslint/no-floating-promises'].severity).toBe('error')
		expect(ts['no-magic-numbers'].severity).toBe('warn')
	})
})
