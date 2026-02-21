/**
 * Minimal vanilla TypeScript example (no React). Use named constants for literals.
 */
const defaultGreeting = 'hello'

/**
 * Returns a greeting string.
 *
 * @param name - Optional name to include.
 * @returns Greeting message.
 */
export function greet(name?: string): string {
	if (name) {
		return `${defaultGreeting}, ${name}`
	}

	return defaultGreeting
}
