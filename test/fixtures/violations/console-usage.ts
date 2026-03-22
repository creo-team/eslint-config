/**
 * Fixture that triggers no-console (warn).
 * Leftover console statements should be removed or replaced with a proper logger.
 *
 * @param name - Name to greet.
 * @returns Greeting string.
 */
export function greetWithLog(name: string): string {
	const greeting = `hello ${name}`
	console.log(greeting)

	return greeting
}
