import type { Linter } from 'eslint'

import config = require('@creo-team/eslint-config')
import constants = require('@creo-team/eslint-config/constants')

export const configs: Linter.Config[] = [
	...config,
	...config.createConfig({ ignores: ['build/**'], projectService: true }),
	{ rules: { 'no-console': constants.warn } },
]
