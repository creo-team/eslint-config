/**
 * Correct async patterns that satisfy v3.0.0 rules.
 * Demonstrates: Promise.all (not await-in-loop), no console, no promise-executor-return.
 */

interface Item {
	id: string
	name: string
}

/**
 * Processes items concurrently with Promise.all (not sequentially in a loop).
 *
 * @param ids - Item IDs to fetch.
 * @returns Resolved items.
 */
export async function getItems(ids: string[]): Promise<Item[]> {
	return Promise.all(ids.map((id) => Promise.resolve({ id, name: `item-${id}` })))
}

const timeoutMs = 1000

/**
 * Wraps a promise with a timeout. Uses Promise constructor correctly (no return from executor).
 *
 * @param promise - The promise to wrap.
 * @returns The resolved value or rejects on timeout.
 */
export function withTimeout<T>(promise: Promise<T>): Promise<T> {
	return Promise.race([
		promise,
		new Promise<never>((_resolve, reject) => {
			setTimeout(() => {
				reject(new Error('timeout'))
			}, timeoutMs)
		}),
	])
}
