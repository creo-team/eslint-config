const { all, always, error, namingConvention, never, off, warn } = require('./constants.js')

const maxClasses = 1
const maxComplexity = 15
const maxLinesPerFile = 400
const maxLinesPerFunction = 200
const printWidth = 120
const tabWidth = 4
const newlineCount = 1

/*
 * JSDoc rules.
 * Require JSDoc on function declarations, class expressions, and methods.
 * Arrow functions are exempt — React components and inline callbacks don't need JSDoc.
 * https://github.com/gajus/eslint-plugin-jsdoc/tree/main/docs/rules
 */
const jsDoc = {
	'jsdoc/require-description-complete-sentence': error,
	'jsdoc/require-hyphen-before-param-description': error,
	'jsdoc/require-jsdoc': [
		error,
		{
			require: {
				ArrowFunctionExpression: false,
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
 * Prettier handles all formatting via prettier/prettier rule.
 * These rules disable ESLint/stylistic rules that conflict with Prettier.
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
 * Stylistic rules that Prettier does NOT handle.
 * Blank-line enforcement and class member structure.
 * All spacing/formatting rules are handled by Prettier — do not add them here.
 * https://eslint.style/packages/default
 */
const stylisticTs = {
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
}

/*
 * TypeScript, import, and code-quality rules.
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
	'@typescript-eslint/naming-convention': [error, ...namingConvention.default],
	'@typescript-eslint/no-explicit-any': warn,
	'@typescript-eslint/no-extraneous-class': off,
	'@typescript-eslint/no-misused-spread': off,
	'@typescript-eslint/no-unnecessary-condition': warn,

	'@typescript-eslint/no-unsafe-argument': warn,
	'@typescript-eslint/no-unsafe-assignment': off,
	'@typescript-eslint/no-unsafe-call': off,
	'@typescript-eslint/no-unsafe-member-access': off,
	'@typescript-eslint/no-unsafe-return': warn,
	'@typescript-eslint/restrict-template-expressions': off,
	'@typescript-eslint/unbound-method': off,
	complexity: [error, { max: maxComplexity }],
	'dot-notation': off,
	'import-x/first': error,
	'import-x/named': error,
	'import-x/newline-after-import': [error, { count: newlineCount }],
	'import-x/no-absolute-path': error,
	'import-x/no-cycle': error,
	'import-x/no-duplicates': error,
	'import-x/no-empty-named-blocks': error,
	'import-x/no-relative-packages': error,
	'import-x/no-self-import': error,
	'import-x/no-unresolved': error,
	'import-x/no-unused-modules': off, // Disabled — ESLint 10 removed FileEnumerator API (import-x tracking workaround)
	'import-x/no-useless-path-segments': error,
	'import-x/prefer-default-export': off,
	'max-classes-per-file': [error, { ignoreExpressions: true, max: maxClasses }],
	'max-lines': [error, { max: maxLinesPerFile, skipBlankLines: true, skipComments: true }],
	'max-lines-per-function': [error, maxLinesPerFunction],
	'newline-before-return': error,
	'no-await-in-loop': warn,
	'no-console': warn,
	'no-magic-numbers': [
		warn,
		{
			enforceConst: true,
			ignore: [0, 1, -1],
			ignoreArrayIndexes: true,
			ignoreDefaultValues: true,
		},
	],
	'no-promise-executor-return': error,
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
	'import-x/no-amd': off,
	'import-x/no-commonjs': off,
	'import-x/no-default-export': off,
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
