// NOT IN USE

const { Schema, model } = require('mongoose');

const FriendRequestSchema = new Schema(
	{
		// options are: Pending, Approved, Denied
		status: {
			type: String,
			default: 'Pending'
		},
		requestedByUserID: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		// if the user has an account, id here - otherwise, email in pendingApprovalUserEmail
		pendingApprovalUserID: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		// if the user doesn't exist, still create the request and populate the pendingApprovalUserID when the register
		pendingApprovalUserEmail: {
			type: String,
			match: [/.+@.+\..+/, 'Must match an email address!']
		},
		dateReviewed: {
			type: Date,
			default: ''
		}
	},
	{
		toJSON: {
			virtuals: true
		},
		timestamps: true
	}
);

const FriendRequest = model('FriendRequest', FriendRequestSchema);

module.exports = FriendRequest;
