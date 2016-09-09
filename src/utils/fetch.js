/**
 * @module utils/fetch
 * @private
 */

export function mustBeOk (res) {
	if (!res.ok) {
		throw new Error(`server responsed with an error status code (${res.status})`)
	}
	return res
}
