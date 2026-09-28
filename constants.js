/**
 * ESLint rule severity levels, naming-convention constants, and common option values.
 * Import from `@creo-team/eslint-config/constants` for consistent rule overrides.
 *
 * @example
 * const { error, off, warn } = require('@creo-team/eslint-config/constants')
 * const { NamingFormat, NamingSelector, namingConvention } = require('@creo-team/eslint-config/constants')
 * module.exports = [
 *   ...createConfig(),
 *   {
 *     rules: {
 *       'no-console': warn,
 *       '@typescript-eslint/naming-convention': [error, ...namingConvention.withUpperCaseVariables],
 *     },
 *   },
 * ]
 */

// `const` keeps literal types (e.g. 'error') in the emitted .d.ts, so severities type-check as ESLint rule levels.
const off = /** @type {const} */ ('off')
const warn = /** @type {const} */ ('warn')
const error = /** @type {const} */ ('error')

const always = /** @type {const} */ ('always')
const never = /** @type {const} */ ('never')
const none = /** @type {const} */ ('none')
const all = /** @type {const} */ ('all')

const NamingFormat = {
	CamelCase: 'camelCase',
	PascalCase: 'PascalCase',
	UpperCase: 'UPPER_CASE',
}

const NamingSelector = {
	Default: 'default',
	EnumMember: 'enumMember',
	Import: 'import',
	TypeLike: 'typeLike',
	Variable: 'variable',
}

const namingConventionDefault = [
	{ format: [NamingFormat.CamelCase], selector: NamingSelector.Default },
	{ format: [NamingFormat.CamelCase, NamingFormat.PascalCase], selector: NamingSelector.Import },
	{ format: [NamingFormat.CamelCase, NamingFormat.PascalCase], selector: NamingSelector.Variable },
	{ format: [NamingFormat.PascalCase], selector: NamingSelector.TypeLike },
	{ format: [NamingFormat.PascalCase], selector: NamingSelector.EnumMember },
]

const namingConventionWithUpperCaseVariables = [
	{ format: [NamingFormat.CamelCase], selector: NamingSelector.Default },
	{ format: [NamingFormat.CamelCase, NamingFormat.PascalCase], selector: NamingSelector.Import },
	{
		format: [NamingFormat.CamelCase, NamingFormat.PascalCase, NamingFormat.UpperCase],
		selector: NamingSelector.Variable,
	},
	{ format: [NamingFormat.PascalCase], selector: NamingSelector.TypeLike },
	{ format: [NamingFormat.PascalCase], selector: NamingSelector.EnumMember },
]

const namingConvention = {
	default: namingConventionDefault,
	withUpperCaseVariables: namingConventionWithUpperCaseVariables,
}

const FilesPattern = {
	TsAndTsx: ['**/*.ts', '**/*.tsx'],
}

const FilenameCase = {
	CamelCase: 'camelCase',
	KebabCase: 'kebabCase',
	PascalCase: 'pascalCase',
}

const AppStructurePreset = {
	Express: 'express',
	NextJs: 'nextjs',
	NextJsAppRouter: 'nextjsAppRouter',
	React: 'react',
	Src: 'src',
}

module.exports = {
	all,
	always,
	AppStructurePreset,
	error,
	FilenameCase,
	FilesPattern,
	namingConvention,
	NamingFormat,
	NamingSelector,
	never,
	none,
	off,
	warn,
}
