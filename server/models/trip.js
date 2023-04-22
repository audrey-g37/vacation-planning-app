const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
	street1: {
		type: String
	},
	street2: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	country: {
		type: String
	},
	zipCode: {
		type: String
	}
});

const tripSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String
		},
		address: addressSchema,
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

const Trip = model('Trip', tripSchema);

module.exports = Trip;
