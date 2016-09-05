import * as util from './util.js'

/**
 * @class Appointment
 * @constructor
 * @private
 * @param {Object} raw
 */
export default class Appointment {
	constructor(raw) {
		/**
		 * @property id
		 * @type Number
		 * @final
		 */
		this.id = raw.appointmentInstance
		/**
		 * @property versionId
		 * @type Number
		 * @final
		 */
		this.versionId = raw.id

		/**
		 * @property start
		 * @type Date
		 * @final
		 */
		this.start = util.parseDate(raw.start)
		/**
		 * @property end
		 * @type String
		 * @final
		 */
		this.end = util.parseDate(raw.end)
		/**
		 * @property beginBySchoolHour
		 * @type Number
		 * @final
		 */
		this.beginBySchoolHour = raw.startTimeSlot
		/**
		 * @property endBySchoolHour
		 * @type Number
		 * @final
		 */
		this.endBySchoolHour = raw.endTimeSlot

		/**
		 * @property subjects
		 * @type String[]
		 * @final
		 */
		this.subjects = raw.subjects
		/**
		 * One of: 'unknown', 'lesson', 'exam', 'activity', 'choice', 'talk',
		 * 'other'
		 * @property type
		 * @type String
		 * @final
		 */
		this.type = raw.type
		/**
		 * @property remark
		 * @type String
		 * @final
		 */
		this.remark = raw.remark

		/**
		 * @property locations
		 * @type String[]
		 * @final
		 */
		this.locations = raw.locations

		/**
		 * @property teachers
		 * @type String[]
		 * @final
		 */
		this.teachers = raw.teachers
		/**
		 * @property students
		 * @type String[]
		 * @final
		 */
		this.students = raw.students || []
		/**
		 * @property groups
		 * @type String[]
		 * @final
		 */
		this.groups = raw.groups

		/**
		 * @property created
		 * @type Date
		 * @final
		 */
		this.created = util.parseDate(raw.created)
		/**
		 * @property lastModified
		 * @type Date
		 * @final
		 */
		this.lastModified = util.parseDate(raw.lastModified)

		/**
		 * @property isLatest
		 * @type Boolean
		 * @final
		 */
		this.isLatest = raw.valid
		/**
		 * @property isHidden
		 * @type Boolean
		 * @final
		 */
		this.isHidden = raw.hidden
		/**
		 * @property isBase
		 * @type Boolean
		 * @final
		 */
		this.isBase = raw.base
		/**
		 * @property isCancelled
		 * @type Boolean
		 * @final
		 */
		this.isCancelled = raw.cancelled
		/**
		 * @property isModified
		 * @type Boolean
		 * @final
		 */
		this.isModified = raw.modified
		/**
		 * @property isMoved
		 * @type Boolean
		 * @final
		 */
		this.isMoved = raw.moved
		/**
		 * @property isNew
		 * @type Boolean
		 * @final
		 */
		this.isNew = raw.new
		/**
		 * @property changeDescription
		 * @type String
		 * @final
		 */
		this.changeDescription = raw.changeDescription

		/**
		 * @property branchId
		 * @type Number
		 * @final
		 */
		this.branchId = raw.branchOfSchool
		/**
		 * @property branchStr
		 * @type String
		 * @final
		 */
		this.branchStr = raw.branch
	}
}
