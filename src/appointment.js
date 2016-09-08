import * as util from './util.js'

/**
 * @private
 */
class Appointment {
	/**
	 * @param {Object} raw
	 */
	constructor(raw) {
		/**
		 * @type Number
		 * @readonly
		 */
		this.id = raw.appointmentInstance
		/**
		 * @type Number
		 * @readonly
		 */
		this.versionId = raw.id

		/**
		 * @type Date
		 * @readonly
		 */
		this.start = util.parseDate(raw.start)
		/**
		 * @type String
		 * @readonly
		 */
		this.end = util.parseDate(raw.end)
		/**
		 * @type Number
		 * @readonly
		 */
		this.beginBySchoolHour = raw.startTimeSlot
		/**
		 * @type Number
		 * @readonly
		 */
		this.endBySchoolHour = raw.endTimeSlot

		/**
		 * @type String[]
		 * @readonly
		 */
		this.subjects = raw.subjects
		/**
		 * One of: 'unknown', 'lesson', 'exam', 'activity', 'choice', 'talk',
		 * 'other'
		 * @type String
		 * @readonly
		 */
		this.type = raw.type
		/**
		 * @type String
		 * @readonly
		 */
		this.remark = raw.remark

		/**
		 * @type String[]
		 * @readonly
		 */
		this.locations = raw.locations

		/**
		 * @type String[]
		 * @readonly
		 */
		this.teachers = raw.teachers
		/**
		 * @type String[]
		 * @readonly
		 */
		this.students = raw.students || []
		/**
		 * @type String[]
		 * @readonly
		 */
		this.groups = raw.groups

		/**
		 * @type Date
		 * @readonly
		 */
		this.created = util.parseDate(raw.created)
		/**
		 * @type Date
		 * @readonly
		 */
		this.lastModified = util.parseDate(raw.lastModified)

		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isLatest = raw.valid
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isHidden = raw.hidden
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isBase = raw.base
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isCancelled = raw.cancelled
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isModified = raw.modified
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isMoved = raw.moved
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isNew = raw.new
		/**
		 * @type String
		 * @readonly
		 */
		this.changeDescription = raw.changeDescription

		/**
		 * @type Number
		 * @readonly
		 */
		this.branchId = raw.branchOfSchool
		/**
		 * @type String
		 * @readonly
		 */
		this.branchStr = raw.branch
	}
}

export default Appointment
