import fetch from 'node-fetch'
import FormData from 'form-data'
import _ from 'lodash'
import Appointment from './appointment.js'
import User from './user.js'

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
	 * @method appointments
	 * @param {Date} from
	 * @param {Date} [to=from]
	 * @return {Promise<Appointment[]>}
	 */
	appointments() {
		let [ from, to ] = _(arguments).filter(_.isDate).sortBy().value()
		if (to == null) {
			to = new Date(from)
			to.setDate(to.getDate() + 1)
		}

		const urlDate = d => Math.floor(d.getTime() / 1000)

		const url = this._url(`appointments?user=~me&start=${urlDate(from)}&end=${urlDate(to)}`)
		return fetch(url)
		.then(res => res.json())
		.then(res => res.response.data)
		.then(items => items.map(i => new Appointment(i)))
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
 * @method loginByAuthCode
 * @param {String} schoolid
 * @param {String} authcode
 * @return {Promise<Zermelo>}
 */
export function loginByAuthCode(schoolid, authcode) {
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
	.then(r => r.json())
	.catch(() => {
		return new Error('invalid authcode')
	})
	.then(r => new Zermelo(apiUrl, r))
}

export const VERSION = __VERSION__

export {
	Appointment,
	User,
	Zermelo,
}
