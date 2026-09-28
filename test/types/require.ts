import type { Linter } from 'eslint'

import config = require('@creo-team/eslint-config')
import constants = require('@creo-team/eslint-config/constants')

const overrides: Linter.Config = { rules: { 'no-console': constants.warn } }

export const configs = [...config, ...config.createConfig({ ignores: ['build/**'], projectService: true }), overrides]
