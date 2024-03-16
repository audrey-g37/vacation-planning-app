const { Schema, model } = require('mongoose');

const BudgetSchema = new Schema(
	{
		title: {
			type: String,
			required: true
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
		purchasedByUserID: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		splitByUserIDs: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		tripID: {
			type: Schema.Types.ObjectId,
			ref: 'Trip',
			required: true
		},
		taskID: {
			type: Schema.Types.ObjectId,
			ref: 'Task'
		}
	},
	{
		toJSON: {
			virtuals: true
		},
		timestamps: true
	}
);

const Budget = model('Budget', BudgetSchema);

module.exports = Budget;
