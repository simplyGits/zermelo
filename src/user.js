/**
 * @private
 */
class User {
	/**
	 * @param {Object} raw
	 */
	constructor(raw) {
		/**
		 * @type String
		 * @readonly
		 */
		this.id = raw.code
		/**
		 * @type String[]
		 * @readonly
		 */
		this.roles = raw.roles
		/**
		 * @type String
		 * @readonly
		 */
		this.firstName = raw.firstName
		/**
		 * @type String
		 * @readonly
		 */
		this.prefix = raw.prefix
		/**
		 * @type String
		 * @readonly
		 */
		this.lastName = raw.lastName

		/**
		 * @type String
		 * @readonly
		 */
		this.email = raw.email
		/**
		 * @type String
		 * @readonly
		 */
		this.username = raw.username
		/**
		 * @type String
		 * @readonly
		 */
		this.password = raw.password

		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isApplicationManager = raw.isApplicationManager
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isSchoolScheduler = raw.isSchoolScheduler
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isSchoolLeader = raw.isSchoolLeader
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isStudentAdministrator = raw.isStudentAdministrator
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isBranchLeader = raw.isBranchLeader
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isTeamLeader = raw.isTeamLeader
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isMentor = raw.isMentor
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isParentTeacherNightScheduler = raw.isParentTeacherNightScheduler
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isDean = raw.isDean
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isStudent = raw.isStudent
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isEmployee = raw.isEmployee
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isFamilyMember = raw.isFamilyMember
	}
}

export default User
