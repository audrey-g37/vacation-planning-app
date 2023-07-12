const { Budget, Task, Trip, User, FriendRequest } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
	Query: {
		user: async (parent, { queryID, authId, email }) => {
			let userToReturn;
			if (queryID) {
				userToReturn = await User.findById(queryID);
			} else {
				userToReturn = await User.findOne(authId ? { authId: authId } : { email: email });
			}
			return userToReturn;
		},
		users: async (parent, body, context) => {
			return await User.find({ ...body });
		},
		friendRequests: async (parent, body, context) => {
			return await FriendRequest.find({ ...body })
				.populate('requestedByUserID')
				.populate('pendingApprovalUserID');
		},
		trip: async (parent, { queryID }, context) => {
			return await Trip.findById(queryID);
		},
		trips: async (parent, body, context) => {
			return await Trip.find({ ...body });
		},
		task: async (parent, { queryID }, context) => {
			return await Task.findById(queryID);
		},
		tasks: async (parent, body, context) => {
			return await Task.find({ ...body });
		},
		budget: async (parent, { queryID }, context) => {
			return await Budget.findById(queryID);
		},
		budgets: async (parent, body, context) => {
			return await Budget.find({ ...body });
		}
	},
	Mutation: {
		addUser: async (parent, body, context) => {
			let dataToSend = { ...body };
			const user = await User.create(dataToSend);
			return user;
		},
		addTrip: async (parent, body, context) => {
			const { street1, street2, city, state, country, zipCode } = body;
			let dataToSend = {
				...body,
				address: {
					street1: street1,
					street2: street2,
					city: city,
					state: state,
					country: country,
					zipCode: zipCode
				}
			};
			const newData = await Trip.create(dataToSend);
			return newData;
		},
		addTask: async (parent, body, context) => {
			let dataToSend = { ...body };
			const newData = await Task.create(dataToSend);
			return newData;
		},
		addBudget: async (parent, body, context) => {
			let dataToSend = { ...body };
			const newData = await Budget.create(dataToSend);
			return newData;
		},
		updateUser: async (parent, body, context) => {
			const { queryID } = body;
			let dataToSend = { ...body };
			const user = await User.findByIdAndUpdate(queryID, dataToSend, { new: true });
			return user;
		},
		updateFriendRequest: async (parent, body, context) => {
			const { queryID } = body;
			let dataToSend = { ...body };
			const friendRequest = await FriendRequest.findByIdAndUpdate(queryID, dataToSend, {
				new: true
			});
			return friendRequest;
		},
		updateTrip: async (parent, body, context) => {
			const { queryID } = body;
			const { street1, street2, city, state, country, zipCode } = body;
			let dataToSend = {
				...body,
				address: {
					street1: street1,
					street2: street2,
					city: city,
					state: state,
					country: country,
					zipCode: zipCode
				}
			};
			const updatedData = await Trip.findByIdAndUpdate(queryID, dataToSend, { new: true });
			return updatedData;
		},
		updateTask: async (parent, body, context) => {
			const { queryID } = body;
			let dataToSend = { ...body };
			const updatedData = await Task.findByIdAndUpdate(queryID, dataToSend, { new: true });
			return updatedData;
		},
		updateBudget: async (parent, body, context) => {
			const { queryID } = body;
			let dataToSend = { ...body };
			delete dataToSend.taskID;
			if (body.taskID) {
				dataToSend = { ...dataToSend, $addToSet: { taskID: body.taskID } };
			}
			const updatedData = await Budget.findByIdAndUpdate(queryID, dataToSend, { new: true });
			return updatedData;
		},
		removeTrip: async (parent, { queryID }, context) => {
			return await Trip.findByIdAndDelete(queryID);
		},
		removeTask: async (parent, { queryID }, context) => {
			return await Task.findByIdAndDelete(queryID);
		},
		removeBudget: async (parent, { queryID }, context) => {
			return await Budget.findByIdAndDelete(queryID);
		}
	}
};

module.exports = resolvers;
