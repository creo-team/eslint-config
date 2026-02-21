'use strict'

// ============================================================================
// Structure presets for eslint-plugin-project-structure (optional peer dep)
// Use createConfig({ structure: { workspaces, appStructure } }) to lock in layout.
// ============================================================================

/**
 * Builds root structure for monorepo with locked-in workspace dirs.
 * @param {string[]} workspaces - Top-level dirs (e.g. ['nextjs', 'aws/infra', 'shared']).
 * @returns {object} Structure config for createFolderStructure.
 */
function createMonorepoStructure(workspaces) {
	const children = [...workspaces.map((w) => ({ children: [], name: w })), { children: [], name: '*' }, { name: '*' }]

	return { structure: children }
}

/**
 * App structure presets for different project types.
 * @type {Record<string, object>}
 */
const appStructurePresets = {
	express: {
		structure: [
			{
				children: [
					{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'routes' },
					{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'controllers' },
					{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'services' },
					{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'utils' },
					{ children: [], name: 'middleware' },
					{ children: [], name: '*' },
					{ name: '*' },
				],
				name: 'src',
			},
			{ children: [], name: '*' },
			{ name: '*' },
		],
	},
	nextjs: {
		structure: [
			{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'app' },
			{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'components' },
			{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'lib' },
			{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'utils' },
			{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'hooks' },
			{ children: [], name: 'styles' },
			{ children: [], name: 'public' },
			{ children: [], name: '*' },
			{ name: '*' },
		],
	},
	nextjsAppRouter: {
		structure: [
			{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'app' },
			{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'components' },
			{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'lib' },
			{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'utils' },
			{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'hooks' },
			{ children: [], name: 'settings' },
			{ children: [], name: 'styles' },
			{ children: [], name: 'public' },
			{ children: [], name: '*' },
			{ name: '*' },
		],
	},
	react: {
		structure: [
			{
				children: [
					{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'components' },
					{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'lib' },
					{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'utils' },
					{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'hooks' },
					{ children: [], name: 'styles' },
					{ children: [], name: '*' },
					{ name: '*' },
				],
				name: 'src',
			},
			{ children: [], name: 'public' },
			{ children: [], name: '*' },
			{ name: '*' },
		],
	},
	src: {
		structure: [
			{
				children: [
					{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'components' },
					{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'lib' },
					{ children: [{ children: [], name: '*' }, { name: '*' }], name: 'utils' },
					{ children: [], name: 'settings' },
					{ children: [], name: '*' },
					{ name: '*' },
				],
				name: 'src',
			},
			{ children: [], name: '*' },
			{ name: '*' },
		],
	},
}

/**
 * Builds full structure config for project-structure plugin.
 * @param {object} options - Structure options.
 * @param {string[]} [options.workspaces] - Monorepo workspace dirs (e.g. ['nextjs', 'aws/infra', 'shared']).
 * @param {string|string[]|object} [options.appStructure] - App preset ('nextjs'|'react'|'express'|'src') or custom dirs.
 * @param {string} [options.appPath] - Which workspace gets app structure (e.g. 'nextjs'); default first workspace.
 * @returns {object|null} Config for project-structure/folder-structure rule, or null.
 */
function buildStructureConfig(options = {}) {
	const { appPath, appStructure, workspaces } = options

	if (workspaces && workspaces.length > 0) {
		const appStruct = appStructure ? createAppStructure(appStructure) : null
		const targetApp = appPath ?? (appStruct ? workspaces[0] : null)

		const structure = workspaces.map((w) => {
			const useAppStruct = appStruct && w === targetApp

			return {
				children: useAppStruct ? appStruct.structure : [],
				name: w,
			}
		})
		structure.push({ children: [], name: '*' })
		structure.push({ name: '*' })

		return { structure }
	}

	if (appStructure) return createAppStructure(appStructure)

	return null
}

/**
 * Builds app structure from preset name or custom dirs.
 * @param {string | string[] | object} presetOrDirs - Preset name ('nextjs'|'react'|'express'|'src'), array of dir names, or custom structure.
 * @returns {object|null} Structure config or null if not applicable.
 */
function createAppStructure(presetOrDirs) {
	if (!presetOrDirs) return null
	if (typeof presetOrDirs === 'string') {
		const preset = appStructurePresets[presetOrDirs]
		if (!preset) return null

		return preset
	}
	if (Array.isArray(presetOrDirs)) {
		const children = [
			...presetOrDirs.map((d) => ({ children: [{ children: [], name: '*' }, { name: '*' }], name: d })),
			{ children: [], name: '*' },
			{ name: '*' },
		]

		return { structure: children }
	}

	return presetOrDirs
}

module.exports = {
	appStructurePresets,
	buildStructureConfig,
	createAppStructure,
	createMonorepoStructure,
}
