/**
 * @extends Error
 * @private
 */
class AuthError extends Error {
	/**
	 * @param {String} message
	 */
	constructor(message) {
		super(message)
	}
}

export default AuthError
