import * as util from './util.js'

/**
 * @class Announcement
 * @constructor
 * @private
 * @param {Object} raw
 */
export default class Announcement {
	constructor(raw) {
		/**
		 * @property id
		 * @type String
		 * @final
		 */
		this.id = raw.id
		/**
		 * @property start
		 * @type Date
		 * @final
		 */
		this.start = util.parseDate(raw.start)
		/**
		 * @property end
		 * @type Date
		 * @final
		 */
		this.end = util.parseDate(raw.end)
		/**
		 * @property title
		 * @type String
		 * @final
		 */
		this.title = raw.title
		/**
		 * @property text
		 * @type String
		 * @final
		 */
		this.text = raw.text
	}
}
