/**
 * ESLint rule severity levels and common option values.
 * Import from `@creo-team/eslint-config/constants` for consistent rule overrides.
 *
 * @example
 * const { off, warn, error } = require('@creo-team/eslint-config/constants')
 * module.exports = [
 *   { rules: { 'no-console': warn, 'jsdoc/require-jsdoc': off } }
 * ]
 */

// ============================================================================
// Rule severity levels
// ============================================================================

const off = 'off'
const warn = 'warn'
const error = 'error'

// ============================================================================
// Common option values (for rules that accept 'always' | 'never' | etc.)
// ============================================================================

const always = 'always'
const never = 'never'
const none = 'none'
const all = 'all'

module.exports = {
	all,
	always,
	error,
	never,
	none,
	off,
	warn,
}
