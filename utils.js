const { existsSync } = require('fs')
const { dirname, join } = require('path')

/**
 * Logs messages to the console if ESLINT_DEBUG environment variable is set.
 *
 * @param message - The debug message to log.
 */
function debug(message) {
	if (process.env.ESLINT_DEBUG) {
		// eslint-disable-next-line no-console -- intentional debug logger
		console.debug(`[Eslint]: ${message}`)
	}
}

/**
 * Finds the appropriate TypeScript configuration file starting from a directory
 * and searching upward, with support for a fallback and environment variable overrides.
 *
 * @param targetFile - The main file to locate (default: 'tsconfig.eslint.json', can be overridden via `ESLINT_TSCONFIG`).
 * @param fallbackFile - The fallback file to use if the target is not found (default: 'tsconfig.json', can be overridden via `ESLINT_FALLBACK_TSCONFIG`).
 * @param startDir - The directory to start the search (default: process.cwd(), can be overridden via `ESLINT_START_DIR`).
 * @returns The path to the found configuration file or the fallback file.
 */
function getTsConfigFile(
	targetFile = process.env.ESLINT_TSCONFIG ?? 'tsconfig.eslint.json',
	fallbackFile = process.env.ESLINT_FALLBACK_TSCONFIG ?? 'tsconfig.json',
	startDir = process.env.ESLINT_START_DIR ?? process.cwd(),
) {
	let currentDir = startDir

	debug(`Starting search for [${targetFile}] from directory [${currentDir}]`)

	while (currentDir) {
		const targetPath = join(currentDir, targetFile)

		debug(`Checking if [${targetPath}] exists...`)

		if (existsSync(targetPath)) {
			debug(`Found [${targetFile}] at [${targetPath}]`)

			return targetPath
		}

		const parentDir = dirname(currentDir)
		if (currentDir === parentDir) {
			debug(`Reached the root directory without finding [${targetFile}]`)
			break
		}

		currentDir = parentDir
	}

	const fallbackPath = join(startDir, fallbackFile)
	debug(`Using fallback file [${fallbackFile}] at [${fallbackPath}]`)

	return fallbackPath
}

module.exports = {
	debug,
	getTsConfigFile,
}
