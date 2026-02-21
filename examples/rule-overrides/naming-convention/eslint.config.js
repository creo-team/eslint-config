/**
 * Example: override naming convention to allow UPPER_SNAKE for constants.
 */
const { createConfig } = require('@creo-team/eslint-config')

const base = createConfig({ ignores: ['node_modules/**'] })

module.exports = [
  ...base,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        { format: ['camelCase'], selector: 'default' },
        { format: ['camelCase', 'PascalCase'], selector: 'import' },
        { format: ['camelCase', 'PascalCase', 'UPPER_CASE'], selector: 'variable' },
        { format: ['PascalCase'], selector: 'typeLike' },
        { format: ['PascalCase'], selector: 'enumMember' },
      ],
    },
  },
]
