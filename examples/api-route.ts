/**
 * Minimal API route / request handler example (Node/TS). No framework.
 */

export interface RequestContext {
	method: string
	url: string
}

const statusOk = 200
const statusBadRequest = 400

/**
 * Handles a health check request.
 *
 * @param ctx - Request context (method, url).
 * @returns Response status code.
 */
export function handleHealth(ctx: RequestContext): number {
	if (ctx.method !== 'GET') {
		return statusBadRequest
	}

	return statusOk
}
