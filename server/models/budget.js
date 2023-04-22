const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const budgetSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		value: {
			type: Number
		},
		purchaseDate: {
			type: Date,
			get: (timestamp) => dateFormat(timestamp)
		},
		purchasedBy: {
			type: String
		},
		tripID: {
			type: Schema.Types.ObjectId,
			ref: 'Trip',
			required: true
		},
		taskID: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Task'
			}
		]
	},
	{
		toJSON: {
			virtuals: true
		},
		timestamps: true
	}
);

const Budget = model('Budget', budgetSchema);

module.exports = Budget;
