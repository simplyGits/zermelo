import fetch from 'node-fetch'
import FormData from 'form-data'
import _ from 'lodash'
import Announcement from './announcement.js'
import Appointment from './appointment.js'
import User from './user.js'
import * as util from './util.js'

/**
 * @class Zermelo
 * @constructor
 * @param {String} apiUrl
 * @param {Object} sessionInfo
 * 	@param {Number} sessionInfo.expires_in
 * 	@param {String} sessionInfo.access_token
 */
class Zermelo {
	constructor(apiUrl, sessionInfo) {
		this.apiUrl = apiUrl

		const d = new Date()
		d.setSeconds(d.getSeconds() + sessionInfo.expires_in)
		this.expireDate = d

		this.accessToken = sessionInfo.access_token
	}

	_url(slug) {
		const c = /\?/.test(slug) ? '&' : '?'
		return `${this.apiUrl}/${slug}${c}access_token=${this.accessToken}`
	}

	/**
	 * @method announcements
	 * @param {Object} [options={}]
	 * 	@param {Boolean} [options.current=true]
	 * 	@param {Date} [options.from]
	 * 	@param {Date} [options.to]
	 * @return {Promise<Announcement[]>}
	 */
	announcements({ current = true, from, to } = {}) {
		let slug = ''
		if (from != null && to != null) {
			slug += `&start=${util.urlDate(from)}&end=${util.urlDate(to)}`
		} else if (current) {
			slug += '&current=true'
		}

		const url = this._url(`announcements?user=~me${slug}`)
		return fetch(url)
		.then(res => res.json())
		.then(res => res.response.data)
		.then(items => items.map(a => new Announcement(a)))
		.then(items => _.sortBy(items, 'start'))
	}

	/**
	 * @method appointments
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
		.then(res => res.json())
		.then(res => res.response.data)
		.then(items => items.map(i => new Appointment(i)))
		.then(items => _.sortBy(items, 'start'))
	}

	/**
	 * @method userInfo
	 * @return {Promise<User>}
	 */
	userInfo() {
		return fetch(this._url('users/~me'))
		.then(res => res.json())
		.then(res => res.response.data[0])
		.then(res => Object.setPrototypeOf(res, User.prototype))
	}
}

function getApiUrl (schoolid) {
	return `https://${schoolid}.zportal.nl/api/v3`
}

/**
 * @method loginBySessionInfo
 * @param {String} schoolid
 * @param {Object} sessionInfo
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
 * @return {Promise<Object>}
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
	.catch(() => {
		throw new Error('invalid authcode')
	})
	.then(r => r.json())
}

export const VERSION = __VERSION__

export {
	Announcement,
	Appointment,
	User,
	Zermelo,
}
