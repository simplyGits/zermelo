import * as util from './util.js'

/**
 * @private
 */
class Announcement {
	/**
	 * @param {Object} raw
	 */
	constructor(raw) {
		/**
		 * @type String
		 * @readonly
		 */
		this.id = raw.id
		/**
		 * @type Date
		 * @readonly
		 */
		this.start = util.parseDate(raw.start)
		/**
		 * @type Date
		 * @readonly
		 */
		this.end = util.parseDate(raw.end)
		/**
		 * @type String
		 * @readonly
		 */
		this.title = raw.title
		/**
		 * @type String
		 * @readonly
		 */
		this.content = raw.text
	}
}

export default Announcement
