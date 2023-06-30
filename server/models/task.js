const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		details: {
			type: String
		},
		dueDate: {
			type: Date
		},
		status: {
			type: String,
			default: 'Not Started'
		},
		assignee: {
			type: String
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

const Task = model('Task', taskSchema);

module.exports = Task;
