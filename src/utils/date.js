/**
 * @method parseDate
 * @param {Number} n
 * @return {Date}
 */
export function parseDate (n) {
	return new Date(n * 1000)
}

/**
 * @method date
 * @param {Date} date
 * @return {Date}
 */
export function date (date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}
