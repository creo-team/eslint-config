// Uses parent repo's built config (run from eslint-config root: npm run build && npm test)
const { createConfig } = require('../../../dist/eslint.config.js')

module.exports = createConfig({
	ignores: ['node_modules/**'],
	projectService: true,
})
