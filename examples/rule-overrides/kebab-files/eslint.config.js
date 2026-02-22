/**
 * Example: enforce kebab-case for .ts/.tsx filenames.
 * Uses constants from @creo-team/eslint-config/constants — no magic strings.
 */
const { createConfig } = require('@creo-team/eslint-config')
const { error, FilenameCase, FilesPattern } = require('@creo-team/eslint-config/constants')
const unicorn = require('eslint-plugin-unicorn')

const base = createConfig({ ignores: ['node_modules/**'] })

module.exports = [
  ...base,
  {
    files: FilesPattern.TsAndTsx,
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': [error, { case: FilenameCase.KebabCase }],
    },
  },
]
