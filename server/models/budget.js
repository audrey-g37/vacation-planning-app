const { Schema, model } = require('mongoose');

const budgetSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		minAmount: {
			type: Number
		},
		maxAmount: {
			type: Number
		},
		actualAmount: {
			type: Number
		},
		purchaseDate: {
			type: Date
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
