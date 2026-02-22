/* eslint-disable @typescript-eslint/naming-convention */

const eslint = require('@eslint/js')
const pluginStylistic = require('@stylistic/eslint-plugin')
const pluginImport = require('eslint-plugin-import')
const jsdoc = require('eslint-plugin-jsdoc')
const perfectionist = require('eslint-plugin-perfectionist')
const prettier = require('eslint-plugin-prettier')
const tsEslint = require('typescript-eslint')

const { namingConvention, off } = require('./constants.js')
const { rules } = require('./rules.js')
const { buildStructureConfig } = require('./structure.js')
const { getTsConfigFile } = require('./utils.js')

const DEFAULT_IGNORES = ['dist/**', 'test/**']

/**
 * Creates the ESLint flat config. Call with no args for default behavior, or pass options to customize.
 *
 * @param options - Optional configuration.
 * @param options.ignores - Extra ignore patterns (merged with default `['dist/**', 'test/**']`). Pass a full array to replace.
 * @param options.projectService - If true, use type-checked linting per file from nearest tsconfig (recommended for monorepos). When false/omitted, use a single tsconfig.
 * @param options.tsconfig - Path to tsconfig for type-aware linting. Ignored when projectService is true. If omitted, uses getTsConfigFile() (env vars supported).
 * @param options.structure - Optional folder structure enforcement. Requires eslint-plugin-project-structure. Use { workspaces: ['nextjs','aws/infra','shared'], appStructure: 'nextjs', appPath: 'nextjs' } for monorepos.
 * @returns Flat config array for use with ESLint.
 */
function createConfig(options = {}) {
	const {
		ignores = DEFAULT_IGNORES,
		projectService = false,
		structure: structureOpts = null,
		tsconfig = getTsConfigFile(),
	} = options

	const parserOptions = projectService
		? { projectService: true, sourceType: 'unambiguous' }
		: { project: tsconfig, sourceType: 'unambiguous' }

	let projectStructureBlock = null
	if (structureOpts) {
		try {
			const {
				createFolderStructure,
				projectStructureParser,
				projectStructurePlugin,
			} = require('eslint-plugin-project-structure')
			const folderConfig = buildStructureConfig(structureOpts)
			if (folderConfig) {
				projectStructureBlock = {
					files: ['**'],
					ignores: ['projectStructure.cache.json'],
					languageOptions: { parser: projectStructureParser },
					plugins: { 'project-structure': projectStructurePlugin },
					rules: {
						'project-structure/folder-structure': ['error', createFolderStructure(folderConfig)],
					},
				}
			}
		} catch {
			throw new Error(
				'@creo-team/eslint-config: structure option requires eslint-plugin-project-structure. Run: npm install eslint-plugin-project-structure --save-dev',
			)
		}
	}

	const configBlocks = [
		{ ignores },
		{
			files: ['constants.js', 'rules.js'],
			rules: {
				'@typescript-eslint/naming-convention': off,
				'perfectionist/sort-objects': off,
			},
		},
		...(projectStructureBlock ? [projectStructureBlock] : []),
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
					console: 'readonly',
					module: 'readonly',
					process: 'readonly',
					require: 'readonly',
				},
				parser: tsEslint.parser,
				parserOptions,
			},
			plugins: {
				'@stylistic': pluginStylistic,
				import: pluginImport,
				jsdoc,
				prettier,
			},
			rules: {
				...rules,
				'@typescript-eslint/no-misused-spread': off,
			},
			settings: {
				'import/resolver': {
					typescript: {},
				},
			},
		},
		{
			files: ['**/*.tsx'],
			languageOptions: {
				parser: tsEslint.parser,
				parserOptions,
			},
			rules: {
				...rules,
				'@typescript-eslint/naming-convention': ['error', ...namingConvention.default],
				'@typescript-eslint/no-misused-spread': off,
				'@typescript-eslint/no-unsafe-return': off,
			},
		},
		{
			files: ['constants.js', 'rules.js'],
			rules: {
				'@typescript-eslint/naming-convention': off,
				'perfectionist/sort-objects': off,
			},
		},
	]

	return tsEslint.config(...configBlocks)
}

module.exports = createConfig({ ignores: ['dist/**', 'test/**', 'examples/**'] })
module.exports.createConfig = createConfig
