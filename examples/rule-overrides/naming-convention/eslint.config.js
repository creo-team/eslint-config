/**
 * Example: override naming convention to allow UPPER_SNAKE for constants.
 * Uses constants from @creo-team/eslint-config/constants — no magic strings.
 */
const { createConfig } = require('@creo-team/eslint-config')
const { error, FilesPattern, namingConvention } = require('@creo-team/eslint-config/constants')

const base = createConfig({ ignores: ['node_modules/**'] })

module.exports = [
  ...base,
  {
    files: FilesPattern.TsAndTsx,
    rules: {
      '@typescript-eslint/naming-convention': [error, ...namingConvention.withUpperCaseVariables],
    },
  },
]
