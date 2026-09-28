import type { Linter } from 'eslint'

import config, { createConfig } from '@creo-team/eslint-config'
import { error, namingConvention, warn } from '@creo-team/eslint-config/constants'

const overrides: Linter.Config = {
	rules: { '@typescript-eslint/naming-convention': [error, ...namingConvention.default], 'no-console': warn },
}

export const configs = [...config, ...createConfig(), overrides]
