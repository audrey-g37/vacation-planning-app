const { Schema, model } = require('mongoose');

const AttendeePermissionsSchema = new Schema({
	editTripDetails: {
		type: Boolean
	},
	// options for all strings are: None, Own, or Any (own = items they are responsible for)
	addTask: {
		type: String
	},
	editTask: {
		type: String
	},
	addBudget: {
		type: String
	},
	editBudget: {
		type: String
	},
	addAttendee: {
		type: String
	},
	editAttendee: {
		type: String
	}
});

const TripAttendeeSchema = new Schema(
	{
		status: {
			// options are: Invited, Attending, Not Attending, Maybe, Removed
			type: String
		},
		tripPermissions: AttendeePermissionsSchema,
		attendeeUserID: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		tripID: {
			type: Schema.Types.ObjectId,
			ref: 'Trip',
			required: true
		}
	},
	{
		toJSON: {
			virtuals: true
		},
		timestamps: true
	}
);

const TripAttendee = model('TripAttendee', TripAttendeeSchema);

module.exports = TripAttendee;
