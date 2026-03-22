/**
 * Fixture that triggers no-promise-executor-return.
 * Returning a value from a Promise executor is always a bug — the return value is ignored.
 *
 * @returns A promise.
 */
export function badPromise(): Promise<number> {
	const value = 42

	return new Promise((resolve) => {
		resolve(value)

		return value
	})
}
