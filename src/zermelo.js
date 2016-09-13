/**
 * @module zermelo
 */

import fetch from 'node-fetch'
import FormData from 'form-data'
import _ from 'lodash'
import Announcement from './announcement.js'
import Appointment from './appointment.js'
import School from './school.js'
import SessionInfo from './sessionInfo.js'
import User from './user.js'
import * as util from './util.js'

/**
 * @private
 */
class Zermelo {
	/**
	 * @param {String} apiUrl
	 * @param {SessionInfo} sessionInfo
	 */
	constructor(apiUrl, sessionInfo) {
		/**
		 * @type String
		 * @readonly
		 * @private
		 */
		this._apiUrl = apiUrl
		/**
		 * @type SessionInfo
		 * @readonly
		 */
		this.sessionInfo = sessionInfo
	}

	/**
	 * Builds an url with `this._apiUrl` and the current's session accessToken,
	 * while adding `slug`.
	 * @private
	 * @param {String} slug
	 * @return {String}
	 */
	_url(slug) {
		const c = /\?/.test(slug) ? '&' : '?'
		return `${this._apiUrl}/${slug}${c}access_token=${this.sessionInfo.accessToken}`
	}

	/**
	 * @param {Object} [options={}]
	 * 	@param {Boolean} [options.current=true]
	 * 	@param {Date} [options.from]
	 * 	@param {Date} [options.to]
	 * @return {Promise<Announcement[]>}
	 */
	announcements({ current = true, from, to } = {}) {
		let slug = ''
		if (from != null && to != null) {
			if (!util.isValidDate(from) || !util.isValidDate(to)) {
				return Promise.reject(new Error('from and to must be valid dates'))
			}

			slug += `&start=${util.urlDate(from)}&end=${util.urlDate(to)}`
		} else if (current) {
			slug += '&current=true'
		}

		const url = this._url(`announcements?user=~me${slug}`)
		return fetch(url)
		.then(util.mustBeOk)
		.then(res => res.json())
		.then(res => res.response.data)
		.then(items => items.map(a => new Announcement(a)))
		.then(items => _.sortBy(items, 'start'))
	}

	/**
	 * @param {Date} from Time will be ignored.
	 * @param {Date} [to] Time will be ignored. If not given, from+1day will be used.
	 * @param {Object} [options={}]
	 * 	@param {Boolean} [options.onlyBase=false] If true only base
	 * 	apopointments are given.
	 * 	@param {Boolean} [options.latest] If true only the latest appointments
	 * 	are given, if false only the non-latest appointments are given, and when
	 * 	undefined this option is ignored.
	 * 	@param {Boolean} [options.cancelled] If true only cancelled appointments
	 * 	are given, if false only non-cancelled appointments are given, and when
	 * 	undefined this option is ignored.
	 * 	@param {Boolean} [options.includeHidden=false] Whether or not to include
	 * 	hidden appointments.
	 * 	@param {Date} [options.modifiedSince] When this is not undefined,
	 * 	`options.latest` will be set to undefined.
	 * @return {Promise<Appointment[]>}
	 */
	appointments() {
		let [ from, to ] = _(arguments).filter(_.isDate).sortBy().value()
		if (to == null) {
			to = new Date(from)
			to.setDate(to.getDate() + 1)
		}

		if (!util.isValidDate(from) || !util.isValidDate(to)) {
			return Promise.reject(new Error('from and to must be valid dates'))
		}

		const options = _.find(arguments, _.isPlainObject) || {}
		let {
			onlyBase = false,
			latest,
			cancelled,
			includeHidden = false,
			modifiedSince,
		} = options

		let url = `appointments?user=~me&start=${util.urlDate(from)}&end=${util.urlDate(to)}`

		if (modifiedSince != null) {
			url += `&modifiedSince=${util.urlDate(modifiedSince)}`
			latest = false
		}

		if (onlyBase != null) {
			url += `&base=${onlyBase}`
		}
		if (latest != null) {
			url += `&valid=${latest}`
		}
		if (cancelled != null) {
			url += `&cancelled=${cancelled}`
		}
		if (includeHidden != null) {
			url += `&includeHidden=${includeHidden}`
		}

		return fetch(this._url(url))
		.then(util.mustBeOk)
		.then(res => res.json())
		.then(res => res.response.data)
		.then(items => items.map(i => new Appointment(i)))
		.then(items => _.sortBy(items, 'start'))
	}

	/**
	 * @return {Promise<User>}
	 */
	userInfo() {
		return fetch(this._url('users/~me'))
		.then(util.mustBeOk)
		.then(res => res.json())
		.then(res => res.response.data[0])
		.then(res => new User(res))
	}

	/**
	 * @return {Promise<School>}
	 */
	school() {
		return fetch(this._url('schools'))
		.then(util.mustBeOk)
		.then(res => res.json())
		.then(res => res.response.data[0])
		.then(res => new School(res))
	}
}

function getApiUrl (schoolid) {
	return `https://${schoolid}.zportal.nl/api/v3`
}

/**
 * @method loginBySessionInfo
 * @param {String} schoolid
 * @param {SessionInfo} sessionInfo
 * @return {Zermelo}
 */
export function loginBySessionInfo (schoolid, sessionInfo) {
	const apiUrl = getApiUrl(schoolid)
	return new Zermelo(apiUrl, sessionInfo)
}

/**
 * @method createSession
 * @param {String} schoolid
 * @param {String} authcode
 * @return {Promise<SessionInfo>}
 */
export function createSession (schoolid, authcode) {
	const apiUrl = getApiUrl(schoolid)
	const url = `${apiUrl}/oauth/token`
	authcode = authcode.replace(/[^0-9]/g, '')

	const form = new FormData()
	form.append('grant_type', 'authorization_code')
	form.append('code', authcode)

	return fetch(url, {
		method: 'POST',
		body: form,
	})
	.then(util.mustBeOk)
	.then(r => r.json())
	.then(r => new SessionInfo(r))
	.catch(() => {
		throw new Error('invalid authcode')
	})
}

/**
 * The version of the library.
 * @type String
 * @readonly
 */
export const VERSION = __VERSION__

export {
	Announcement,
	Appointment,
	School,
	SessionInfo,
	User,
	Zermelo,
}
