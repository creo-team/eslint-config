/* eslint-disable @typescript-eslint/naming-convention */

const { all, always, error, never, none, off, warn } = require('./constants.js')

const { camelCase, pascalCase } = {
	camelCase: 'camelCase',
	pascalCase: 'PascalCase',
}

const maxClasses = 1
const maxComplexity = 15
const maxLinesPerFile = 400
const maxLinesPerFunction = 200
const maxConsecutiveEmptyLines = 1
const printWidth = 120
const tabWidth = 4
const newlineCount = 1

/*
 * JSDoc rules.
 * https://github.com/gajus/eslint-plugin-jsdoc/tree/main/docs/rules
 */
const jsDoc = {
	'jsdoc/require-description-complete-sentence': error,
	'jsdoc/require-hyphen-before-param-description': error,
	'jsdoc/require-jsdoc': [
		error,
		{
			require: {
				ArrowFunctionExpression: true,
				ClassDeclaration: false,
				ClassExpression: true,
				FunctionDeclaration: true,
				FunctionExpression: true,
				MethodDefinition: true,
			},
		},
	],
	'jsdoc/require-param': error,
	'jsdoc/require-param-description': error,
	'jsdoc/require-param-name': error,
	'jsdoc/require-property': off,
	'jsdoc/require-property-description': off,
	'jsdoc/require-property-name': off,
	'jsdoc/require-returns': error,
	'jsdoc/require-yields': error,
}

/*
 * Prettier handles formatting, especially things like max line length.
 * https://prettier.io/docs/en/options.html
 */
const prettier = {
	'@stylistic/indent': off,
	'@stylistic/quotes': off,
	'@stylistic/space-before-function-paren': off,
	'max-len': off,
	'prettier/prettier': [
		error,
		{
			arrowParens: always,
			bracketSameLine: false,
			bracketSpacing: true,
			jsxSingleQuote: false,
			printWidth,
			quoteProps: 'as-needed',
			semi: false,
			singleQuote: true,
			tabWidth,
			trailingComma: all,
			useTabs: true,
		},
	],
}

/*
 * Unified "@stylistic/" rules (replaces deprecated @stylistic/ts)
 * Modern stylistic rules with better React/Next.js support
 * For more details, check: https://eslint.style/packages/default
 */
const stylisticTs = {
	'@stylistic/block-spacing': [error, always],
	'@stylistic/brace-style': [error, '1tbs'],
	'@stylistic/comma-dangle': [error, 'always-multiline'],
	'@stylistic/comma-spacing': [error, { before: false }],
	'@stylistic/function-call-spacing': [error, never],
	'@stylistic/key-spacing': [
		error,
		{
			afterColon: true,
			beforeColon: false,
		},
	],
	'@stylistic/keyword-spacing': [
		error,
		{
			after: true,
			before: true,
		},
	],
	'@stylistic/lines-around-comment': [
		error,
		{
			allowArrayStart: true,
			allowBlockStart: true,
			allowClassStart: true,
			allowObjectStart: true,
			applyDefaultIgnorePatterns: true,
			beforeBlockComment: true,
			beforeLineComment: true,
		},
	],
	'@stylistic/lines-between-class-members': [
		error,
		{
			enforce: [
				{ blankLine: always, next: 'method', prev: '*' },
				{ blankLine: always, next: '*', prev: 'method' },
				{ blankLine: never, next: 'field', prev: 'field' },
			],
		},
		{ exceptAfterSingleLine: true },
	],
	'@stylistic/member-delimiter-style': [
		error,
		{
			multiline: { delimiter: none },
		},
	],
	'@stylistic/no-extra-parens': [error, 'functions'],
	'@stylistic/padding-line-between-statements': off,
	'@stylistic/quote-props': [error, 'as-needed'],
	'@stylistic/semi': [error, never],
	'@stylistic/space-before-blocks': [error, always],
	'@stylistic/space-infix-ops': error,
	'@stylistic/type-annotation-spacing': error,
}

/*
 * TypeScript-specific ESLint rules
 * https://typescript-eslint.io/rules/
 */
const tsEslint = {
	'@typescript-eslint/array-type': error,
	'@typescript-eslint/consistent-indexed-object-style': error,
	'@typescript-eslint/consistent-type-assertions': error,
	'@typescript-eslint/consistent-type-definitions': error,
	'@typescript-eslint/consistent-type-exports': error,
	'@typescript-eslint/consistent-type-imports': error,
	'@typescript-eslint/dot-notation': error,
	'@typescript-eslint/naming-convention': [
		error,
		{ format: [camelCase], selector: 'default' },
		{ format: [camelCase, pascalCase], selector: 'import' },
		{ format: [camelCase], selector: 'variable' },
		{ format: [pascalCase], selector: 'typeLike' },
		{ format: [pascalCase], selector: 'enumMember' },
	],
	'@typescript-eslint/no-explicit-any': 'warn',
	'@typescript-eslint/no-extraneous-class': off,
	'@typescript-eslint/no-unnecessary-condition': off,

	// Better React/Next.js support
	'@typescript-eslint/no-unsafe-argument': warn,
	'@typescript-eslint/no-unsafe-assignment': off,
	'@typescript-eslint/no-unsafe-call': off,
	'@typescript-eslint/no-unsafe-member-access': off,
	'@typescript-eslint/no-unsafe-return': warn,
	'@typescript-eslint/restrict-template-expressions': off,
	'@typescript-eslint/unbound-method': off,
	complexity: [error, { max: maxComplexity }],
	'dot-notation': off,
	'eol-last': [error, always],
	'import/first': error,
	'import/named': error,
	'import/newline-after-import': [error, { count: newlineCount }],
	'import/no-absolute-path': error,
	'import/no-cycle': error,
	'import/no-duplicates': error,
	'import/no-empty-named-blocks': error,
	'import/no-relative-packages': error,
	'import/no-self-import': error,
	'import/no-unresolved': error,
	'import/no-unused-modules': error,
	'import/no-useless-path-segments': error,
	'import/prefer-default-export': off,
	'max-classes-per-file': [error, { ignoreExpressions: true, max: maxClasses }],
	'max-lines': [error, { max: maxLinesPerFile, skipBlankLines: true, skipComments: true }],
	'max-lines-per-function': [error, maxLinesPerFunction],
	'newline-before-return': error,
	'no-inline-comments': error,
	'no-magic-numbers': [
		warn,
		{
			enforceConst: true,
			ignore: [0, 1, -1],
			ignoreArrayIndexes: true,
			ignoreDefaultValues: true,
		},
	],
	'no-mixed-spaces-and-tabs': error,
	'no-multiple-empty-lines': [error, { max: maxConsecutiveEmptyLines }],
	'no-restricted-imports': off,
	'no-unsafe-member-access': off,
	'object-curly-newline': off,
	'spaced-comment': [error, always, { block: { balanced: true } }],
}

/*
 * Rules to allow CommonJS
 */
const commonjsPreventRules = {
	'@typescript-eslint/no-require-imports': off,
	'import/no-amd': off,
	'import/no-commonjs': off,
	'import/no-default-export': off,
}

/*
 * Rules to disable due to clashes
 */
const rulesToDisable = {
	'perfectionist/sort-imports': off,
}

const rules = {
	...commonjsPreventRules,
	...prettier,
	...jsDoc,
	...stylisticTs,
	...tsEslint,
	...rulesToDisable,
}

module.exports = {
	commonjsPreventRules,
	jsDoc,
	prettier,
	rules,
	stylisticTs,
	tsEslint,
}
