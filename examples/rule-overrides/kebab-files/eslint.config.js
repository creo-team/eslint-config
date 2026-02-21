/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Example: enforce kebab-case for .ts/.tsx filenames.
 */
const { createConfig } = require('@creo-team/eslint-config')
const unicorn = require('eslint-plugin-unicorn')

const base = createConfig({ ignores: ['node_modules/**'] })

module.exports = [
	...base,
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: { unicorn },
		rules: {
			'unicorn/filename-case': ['error', { case: 'kebabCase' }],
		},
	},
]
