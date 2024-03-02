const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, 'Must match an email address!']
		},
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		authId: {
			type: String,
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

const User = model('User', UserSchema);

module.exports = User;
