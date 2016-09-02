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
		this.id = raw.id
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
		 * @property subjects
		 * @type String[]
		 * @final
		 */
		this.subjects = raw.subjects
		/**
		 * @property teachers
		 * @type String[]
		 * @final
		 */
		this.teachers = raw.teachers
		/**
		 * @property groups
		 * @type String[]
		 * @final
		 */
		this.groups = raw.groups
		/**
		 * @property locations
		 * @type String[]
		 * @final
		 */
		this.locations = raw.locations
		/**
		 * @property locationsOfBranch
		 * @type String[]
		 * @final
		 */
		this.locationsOfBranch = raw.locationsOfBranch
		/**
		 * @property groupsInDepartments
		 * @type String[]
		 * @final
		 */
		this.groupsInDepartments = raw.groupsInDepartments
		/**
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
		 * @property isValid
		 * @type Boolean
		 * @final
		 */
		this.isValid = raw.valid
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
		 * @property changeDescription
		 * @type String
		 * @final
		 */
		this.changeDescription = raw.changeDescription
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
		 * @property branch
		 * @type String
		 * @final
		 */
		this.branch = raw.branch
		/**
		 * @property branchOfSchool
		 * @type Number
		 * @final
		 */
		this.branchOfSchool = raw.branchOfSchool
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
		 * @property isHidden
		 * @type Boolean
		 * @final
		 */
		this.isHidden = raw.hidden
		/**
		 * @property appointmentInstance
		 * @type Number
		 * @final
		 */
		this.appointmentInstance = raw.appointmentInstance
		/**
		 * @property isNew
		 * @type Boolean
		 * @final
		 */
		this.isNew = raw.new
	}
}
