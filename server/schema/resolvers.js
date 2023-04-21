const { Budget, Task, Trip, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
	Query: {
		user: async (parent, { ID, authId }) => {
			let userToReturn;
			if (ID) {
				userToReturn = await User.findById(ID);
			} else if (authId) {
				userToReturn = await User.findOne({ authId: authId });
			}
			return userToReturn
				? userToReturn
				: new AuthenticationError('You need to be logged in!');
		},
		// users: async (parent, args, context) => {
		//   if (context.user) {
		//     return await User.find({}).populate("trip");
		//   }
		//   throw new AuthenticationError("You need to be logged in!");
		// },
		trip: async (parent, { userId, tripId }, context) => {
			if (context.user) {
				return await Trip.findOne({ _id: tripId, userId: userId }).populate(
					'tasks',
					'budget'
				);
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		trips: async (parent, { userId }, context) => {
			if (context.user) {
				return await Trip.find({ userId: userId }).populate('tasks', 'budget');
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		task: async (parent, { taskId }, context) => {
			if (
				context.user
				// (context.const[(state, dispatch)] = useReducer(
				//   reducer,
				//   initialState,
				//   init
				// ))
			) {
				return await Task.findOne({ _id: taskId });
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		tasks: async (parent, { tripId }, context) => {
			if (context.user) {
				return await Task.find({ tripId: tripId });
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		budget: async (parent, { budgetId }, context) => {
			if (context.user) {
				return await Budget.findOne({ _id: budgetId });
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		budgets: async (parent, { tripId }, context) => {
			if (context.user) {
				return await Budget.find({ tripId: tripId });
			}
			throw new AuthenticationError('You need to be logged in!');
		}
	},
	Mutation: {
		addUser: async (parent, { email, firstName, lastName, authId }, context) => {
			const userData = { email, firstName, lastName, authId };
			console.log({ userData });
			const user = await User.create(userData);
			return user;
		},
		addTrip: async (
			parent,
			{ userId, title, description, location, startDate, endDate },
			context
		) => {
			const tripData = { title, description, location, startDate, endDate, userId };
			const newData = await Trip.create(tripData);
			return newData;
		},
		addTask: async (parent, { tripId, title, details, dueDate, status, assignee }, context) => {
			const taskData = { tripId, title, details, dueDate, status, assignee };
			const newData = await Task.create(taskData);
			return newData;
		},
		addBudget: async (parent, { tripId, title, value, purchaseDate, purchasedBy }, context) => {
			const budgetData = { tripId, title, value, purchaseDate, purchasedBy };
			const newData = await Budget.create(budgetData);
			return newData;
		},
		updateUser: async (parent, body, context) => {
			const user = await User.findByIdAndUpdate(ID, { ...body }, { new: true });
			return user;
		},
		updateTrip: async (
			parent,
			{ userId, tripId, title, description, location, startDate, endDate },
			context
		) => {
			const tripData = {
				title: title,
				description: description,
				location: location,
				startDate: startDate,
				endDate: endDate
			};
			const updatedData = await Trip.findByIdAndUpdate(tripId, tripData, {
				new: true
			});
			return updatedData;
		},
		updateTask: async (
			parent,
			{ tripId, taskId, title, details, dueDate, status, assignee },
			context
		) => {
			const taskData = {
				title: title,
				details: details,
				dueDate: dueDate,
				status: status,
				assignee: assignee
			};
			const updatedData = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
			return updatedData;
		},
		updateBudget: async (
			parent,
			{ tripId, budgetId, title, value, purchaseDate, purchasedBy },
			context
		) => {
			const budgetData = {
				title: title,
				value: value,
				purchaseDate: purchaseDate,
				purchasedBy: purchasedBy
			};
			const updatedData = await Budget.findByIdAndUpdate(budgetId, budgetData, {
				new: true
			});
			return updatedData;
		},
		removeTrip: async (parent, { tripId }, context) => {
			await Trip.findByIdAndDelete(tripId);
		},
		removeTask: async (parent, { taskId }, context) => {
			await Task.findByIdAndDelete(taskId);
		},
		removeBudget: async (parent, { budgetId }, context) => {
			await Budget.findByIdAndDelete(budgetId);
		}
	}
};

module.exports = resolvers;
