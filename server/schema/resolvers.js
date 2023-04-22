const { Budget, Task, Trip, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
	Query: {
		user: async (parent, { queryID, authId }) => {
			let userToReturn;
			if (queryID) {
				userToReturn = await User.findById(queryID);
			} else if (authId) {
				userToReturn = await User.findOne({ authId: authId });
			}
			return userToReturn
				? userToReturn
				: new AuthenticationError('You need to be logged in!');
		},
		users: async (parent, body, context) => {
			return await User.find({ ...body }).populate('trip');
		},
		trip: async (parent, { queryID }, context) => {
			return await Trip.findById(queryID).populate('tasks', 'budget');
		},
		trips: async (parent, body, context) => {
			return await Trip.find({ ...body }).populate('tasks', 'budget');
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
			const dataToSend = { ...body };
			const user = await User.create(dataToSend);
			return user;
		},
		addTrip: async (parent, body, context) => {
			const { street1, street2, city, state, country, zipCode } = body;
			const dataToSend = {
				...body,
				address: { street1, street2, city, state, country, zipCode }
			};
			const newData = await Trip.create(dataToSend);
			return newData;
		},
		addTask: async (parent, body, context) => {
			const dataToSend = { ...body };
			const newData = await Task.create(dataToSend);
			return newData;
		},
		addBudget: async (parent, body, context) => {
			const dataToSend = { ...body };
			const newData = await Budget.create(dataToSend);
			return newData;
		},
		updateUser: async (parent, body, context) => {
			const { queryID } = body;
			const user = await User.findByIdAndUpdate(queryID, { ...body }, { new: true });
			return user;
		},
		updateTrip: async (parent, body, context) => {
			const { queryID } = body;
			const updatedData = await Trip.findByIdAndUpdate(queryID, { ...body }, { new: true });
			return updatedData;
		},
		updateTask: async (parent, body, context) => {
			const { queryID } = body;
			const updatedData = await Task.findByIdAndUpdate(queryID, { ...body }, { new: true });
			return updatedData;
		},
		updateBudget: async (parent, body, context) => {
			const { queryID } = body;
			const updatedData = await Budget.findByIdAndUpdate(queryID, { ...body }, { new: true });
			return updatedData;
		},
		removeTrip: async (parent, { queryID }, context) => {
			await Trip.findByIdAndDelete(queryID);
		},
		removeTask: async (parent, { queryID }, context) => {
			await Task.findByIdAndDelete(queryID);
		},
		removeBudget: async (parent, { queryID }, context) => {
			await Budget.findByIdAndDelete(queryID);
		}
	}
};

module.exports = resolvers;
