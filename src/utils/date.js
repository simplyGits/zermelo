/**
 * @module utils/date
 * @private
 */

/**
 * @param {Number} n
 * @return {Date}
 */
export function parseDate (n) {
	return new Date(n * 1000)
}

/**
 * @param {Date} date
 * @return {Date}
 */
export function date (date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * @param {Date} date
 * @return {Number}
 */
export function urlDate (date) {
	return Math.floor(date.getTime() / 1000)
}
