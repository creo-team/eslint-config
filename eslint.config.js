/* eslint-disable @typescript-eslint/naming-convention */

const eslint = require('@eslint/js')
const pluginStylistic = require('@stylistic/eslint-plugin')
const pluginImport = require('eslint-plugin-import')
const jsdoc = require('eslint-plugin-jsdoc')
const perfectionist = require('eslint-plugin-perfectionist')
const prettier = require('eslint-plugin-prettier')
const projectStructure = require('eslint-plugin-project-structure')
const tsEslint = require('typescript-eslint')

const { rules } = require('./rules.js')
const { getTsConfigFile } = require('./utils.js')

const project = getTsConfigFile()

module.exports = tsEslint.config(
	{ ignores: ['dist/**'] },
	eslint.configs.recommended,
	...tsEslint.configs.recommendedTypeChecked,
	...tsEslint.configs.stylisticTypeChecked,
	...tsEslint.configs.strictTypeChecked,
	perfectionist.configs['recommended-alphabetical'],
	{
		files: ['*.js', '*.jsx'],
		...tsEslint.configs.disableTypeChecked,
	},
	{
		languageOptions: {
			globals: {
				module: 'readonly',
				require: 'readonly',
			},
			parser: tsEslint.parser,
			parserOptions: {
				project,
				sourceType: 'unambiguous',
			},
		},
		plugins: {
			'@stylistic': pluginStylistic,
			import: pluginImport,
			jsdoc,
			prettier,
			'project-structure': projectStructure,
		},
		rules: {
			...rules,
			'@typescript-eslint/no-misused-spread': 'off',
		},
		settings: {
			'import/resolver': {
				typescript: {},
			},
		},
	},
	{
		// React rules temporarily disabled due to plugin compatibility
		files: ['**/*.tsx'],
		languageOptions: {
			parser: tsEslint.parser,
			parserOptions: {
				project,
				sourceType: 'unambiguous',
			},
		},
		rules: {
			...rules,
			'@typescript-eslint/naming-convention': [
				'error',
				{ format: ['camelCase'], selector: 'default' },
				{ format: ['camelCase', 'PascalCase'], selector: 'import' },
				{ format: ['camelCase', 'PascalCase'], selector: 'variable' },
				{ format: ['PascalCase'], selector: 'typeLike' },
				{ format: ['PascalCase'], selector: 'enumMember' },
			],
			'@typescript-eslint/no-misused-spread': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
		},
	},
)
