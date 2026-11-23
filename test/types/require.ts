import type { Linter } from 'eslint'

import config = require('@creo-team/eslint-config')
import constants = require('@creo-team/eslint-config/constants')

export const configs: Linter.Config[] = [
	...config,
	...config.createConfig({ ignores: ['build/**'], projectService: true }),
	...config.createConfig({
		structure: { appPath: 'nextjs', appStructure: 'nextjs', workspaces: ['nextjs', 'aws/infra', 'shared'] },
		tsconfig: 'tsconfig.app.json',
	}),
	{ rules: { 'no-console': constants.warn } },
]

// @ts-expect-error a misspelled option must not compile
config.createConfig({ projectServices: true })
