'use strict'

import { expect } from 'chai'
import * as zermelo from '../src/zermelo'
import * as util from '../src/util.js'

let credentials = {}
try {
	credentials = require('./credentials.json')
} catch (e) { // For Travis CI we use environment variables.
	credentials.schoolid = process.env.TEST_SCHOOLID
	credentials.sessionInfo = {
		access_token: process.env.TEST_ACCESS_TOKEN,
		token_type: 'bearer',
		expires_in: 57600,
	}
}
if (!credentials.schoolid || !credentials.sessionInfo) {
	throw new Error('No login information found.')
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
	})

	describe('user info', function () {
		it('should fetch the user info', function () {
			return z.userInfo().then(r => {
				expect(r).to.be.an.instanceof(zermelo.User)
			})
		})
	})
})
