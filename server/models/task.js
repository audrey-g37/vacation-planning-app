const { Schema, model } = require('mongoose');
const AddressSchema = require('./Address');

const TaskSubFields = new Schema(
	{
		name: {
			// e.g. hotel name or restaurant name
			type: String
		},
		address: AddressSchema,
		startDate: {
			type: Date
		},
		endDate: {
			type: Date
		},
		confirmationNumber: {
			type: String
		},
		contactPhoneNumber: {
			type: String
		},
		contactEmailAddress: {
			type: String
		},
		additionalDetails: {
			type: String
		}
	},
	{
		toJSON: {
			virtuals: true
		},
		timestamps: true
	}
);

const TaskSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		textDetails: {
			type: String
		},
		// 18 and up
		adultQuantity: {
			type: Number
		},
		// under age 18
		childrenQuantity: {
			type: Number,
			default: 0
		},
		details: TaskSubFields,
		completionOrder: {
			type: Number
		},
		dueDate: {
			type: Date
		},
		status: {
			type: String,
			default: 'Not Started'
		},
		assignedToAttendeeID: {
			type: Schema.Types.ObjectId,
			ref: 'TripAttendee'
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

const Task = model('Task', TaskSchema);

module.exports = Task;
