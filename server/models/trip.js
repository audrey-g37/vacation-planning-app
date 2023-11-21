const { Schema, model } = require('mongoose');

const Address = require('./Address');

const TripSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String
		},
		address: Address,
		startDate: {
			type: Date
		},
		endDate: {
			type: Date
		},
		userID: {
			type: Schema.Types.ObjectId,
			ref: 'User',
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

const Trip = model('Trip', TripSchema);

module.exports = Trip;
