/**
 * @private
 */
export default class SessionInfo {
	/**
	 * @param {Object} raw
	 */
	constructor(raw) {
		const d = new Date()
		d.setSeconds(d.getSeconds() + raw.expires_in)

		/**
		 * @type Date
		 * @readonly
		 */
		this.expireDate = d
		/**
		 * @type String
		 * @readonly
		 */
		this.accessToken = raw.access_token
	}
}
