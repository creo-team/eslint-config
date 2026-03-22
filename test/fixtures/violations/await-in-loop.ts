/**
 * Fixture that triggers no-await-in-loop (warn).
 * Sequential awaits in a loop should usually be Promise.all().
 *
 * @param ids - Item IDs to process.
 * @returns Processed items.
 */
export async function processSequentially(ids: string[]): Promise<string[]> {
	const results: string[] = []
	for (const id of ids) {
		const result = await Promise.resolve(id)
		results.push(result)
	}

	return results
}
