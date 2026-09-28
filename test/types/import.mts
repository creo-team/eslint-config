import { defineConfig } from 'eslint/config'

import config, { createConfig } from '@creo-team/eslint-config'
import { error, namingConvention, off, warn } from '@creo-team/eslint-config/constants'

export default defineConfig([
	...config,
	...createConfig({ projectService: true }),
	{
		rules: {
			'@typescript-eslint/naming-convention': [error, ...namingConvention.default],
			'no-console': warn,
			'no-magic-numbers': off,
		},
	},
])
