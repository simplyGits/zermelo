/**
 * @module utils/fetch
 * @private
 */

import AuthError from '../authError.js'

export function mustBeOk (res) {
	if (!res.ok) {
		const message = `server responsed with an error status code (${res.status})`
		throw res.status === 401 ? new AuthError(message) : new Error(message)
	}
	return res
}
