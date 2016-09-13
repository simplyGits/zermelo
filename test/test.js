'use strict'

import { expect } from 'chai'
import * as zermelo from '../src/zermelo'
import * as util from '../src/util.js'

let info
try {
	info = require('./credentials.json')
} catch (e) { // For Travis CI we use environment variables.
	info = {
		schoolid: process.env.TEST_SCHOOLID,
		accessToken: process.env.TEST_ACCESS_TOKEN,
	}
}

if (!info.schoolid || !info.accessToken) {
	throw new Error('No login information found.')
}
const credentials = {
	schoolid: info.schoolid,
	sessionInfo: new zermelo.SessionInfo({
		access_token: info.accessToken,
		token_type: 'bearer',
		expires_in: 57600,
	}),
}

describe('Zermelo', function () {
	let z
	this.timeout(7000)

	before(function () {
		z = zermelo.loginBySessionInfo(
			credentials.schoolid,
			credentials.sessionInfo
		)
	})

	it('should expose a correct object', function () {
		expect(z).to.be.an.instanceof(zermelo.Zermelo)
		expect(z.sessionInfo).to.be.an.instanceof(zermelo.SessionInfo)
	})

	describe('announcement', function () {
		it('should fetch announcements', function () {
			return z.announcements({
				current: true,
			}).then(r => {
				expect(r).to.be.a('array')

				for (const announcement of r) {
					expect(announcement).to.be.an.instanceof(zermelo.Announcement)
				}
			})
		})
	})

	describe('appointment', function () {
		it('should fetch appointments', function () {
			const d = util.date(new Date)
			return z.appointments(d).then(r => {
				expect(r).to.be.a('array')

				for (const appointment of r) {
					expect(appointment).to.be.an.instanceof(zermelo.Appointment)
				}
			})
		})

		it('should fetch only cancelled appointments correctly', function () {
			const d = util.date(new Date)
			return z.appointments(d, {
				cancelled: true,
			}).then(r => {
				for (const appointment of r) {
					expect(appointment.isCancelled).to.be.true
				}
			})
		})
	})

	describe('user info', function () {
		it('should fetch the user info', function () {
			return z.userInfo().then(r => {
				expect(r).to.be.an.instanceof(zermelo.User)
			})
		})
	})

	describe('school', function () {
		it('should fetch the user\'s school', function () {
			return z.school().then(r => {
				expect(r).to.be.an.instanceof(zermelo.School)
			})
		})
	})
})

describe('util', function () {
	describe('dates', function () {
		it('should be able to get the date of a Date object', function () {
			const a = new Date(2016, 4, 20, 13, 37, 69)
			const b = new Date(2016, 4, 20)
			expect(util.date(a).getTime()).to.equal(b.getTime())
		})

		it('should correctly convert a date to unix timestamps', function () {
			const t = 1461276000
			const d = new Date(t * 1000)
			expect(util.urlDate(d)).to.equal(t)
		})

		it('should parse unix timestamps correctly', function () {
			const t = 1461276000000
			const d = new Date(t)

			const parsed = util.parseDate(t / 1000)

			expect(parsed).to.be.a('Date')
			expect(parsed.getTime()).to.equal(d.getTime())
		})

		it ('should correctly check if dates are valid', function () {
			const cases = [
				[ 'kaas', false ],
				[ '1337', true ],
				[ 1337, true ],
			]
			for (const [ key, val ] of cases) {
				const d = new Date(key)
				expect(util.isValidDate(d)).to.equal(val)
			}
		})
	})
})
