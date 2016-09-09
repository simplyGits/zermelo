/**
 * @private
 */
class School {
	/**
	 * @param {Object} raw
	 */
	constructor(raw) {
		/**
		 * @type Number
		 * @readonly
		 */
		this.id = raw.id
		/**
		 * @type String
		 * @readonly
		 */
		this.name = raw.name
	}
}

export default School
