const { User, TripAttendee, Trip, FriendRequest, Budget, Task } = require('../models');

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
		tripAttendees: async (parent, { attendeeUserID, tripID }, context) => {
			if (attendeeUserID) {
				return TripAttendee.find({ attendeeUserID: attendeeUserID });
			} else if (tripID) {
				return TripAttendee.find({ tripID: tripID });
			}
		},
		tripAttendeesByTripID: async (parent, { tripID }, context) => {
			return TripAttendee.find({ tripID: tripID }).populate('attendeeUserID');
		},
		tripAttendeesByAttendeeID: async (parent, { attendeeUserID }, context) => {
			return TripAttendee.find({ attendeeUserID: attendeeUserID }).populate('tripID');
		},
		friendRequestsMatch: async (parent, body, context) => {
			let possibleMatches = [];
			for (const [key, value] of Object.entries(body)) {
				possibleMatches.push({ [key]: value });
			}
			return await FriendRequest.find({ $and: possibleMatches })
				.populate('requestedByUserID')
				.populate('pendingApprovalUserID');
		},
		friendRequests: async (parent, body, context) => {
			let possibleMatches = [];
			for (const [key, value] of Object.entries(body)) {
				possibleMatches.push({ [key]: value });
			}
			return await FriendRequest.find({ $or: possibleMatches })
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
		addTripAttendee: async (parent, body, context) => {
			const {
				editTripDetails,
				addTask,
				editTask,
				addBudget,
				editBudget,
				addAttendee,
				editAttendee
			} = body;
			let dataToSend = {
				...body,
				tripPermissions: {
					editTripDetails: editTripDetails,
					addTask: addTask,
					editTask: editTask,
					addBudget: addBudget,
					editBudget: editBudget,
					addAttendee: addAttendee,
					editAttendee: editAttendee
				}
			};
			const tripAttendee = await TripAttendee.create(dataToSend);
			return tripAttendee;
		},
		addFriendRequest: async (parent, body, context) => {
			let dataToSend = { ...body };
			const friendRequest = await FriendRequest.create(dataToSend);
			return friendRequest;
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
			const {
				street1,
				street2,
				city,
				state,
				country,
				zipCode,
				name,
				startDate,
				endDate,
				confirmationNumber,
				contactPhoneNumber,
				contactEmailAddress,
				additionalDetails
			} = body;
			let dataToSend = {
				...body,
				details: {
					name: name,
					address: {
						street1: street1,
						street2: street2,
						city: city,
						state: state,
						country: country,
						zipCode: zipCode
					},
					startDate: startDate,
					endDate: endDate,
					confirmationNumber: confirmationNumber,
					contactPhoneNumber: contactPhoneNumber,
					contactEmailAddress: contactEmailAddress,
					additionalDetails: additionalDetails
				}
			};
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
		updateTripAttendee: async (parent, body, context) => {
			const { queryID } = body;
			const {
				editTripDetails,
				addTask,
				editTask,
				addBudget,
				editBudget,
				addAttendee,
				editAttendee
			} = body;
			let dataToSend = {
				...body,
				tripPermissions: {
					editTripDetails: editTripDetails,
					addTask: addTask,
					editTask: editTask,
					addBudget: addBudget,
					editBudget: editBudget,
					addAttendee: addAttendee,
					editAttendee: editAttendee
				}
			};
			const tripAttendee = await TripAttendee.findByIdAndUpdate(queryID, dataToSend, {
				new: true
			});
			return tripAttendee;
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
			const {
				street1,
				street2,
				city,
				state,
				country,
				zipCode,
				name,
				startDate,
				endDate,
				confirmationNumber,
				contactPhoneNumber,
				contactEmailAddress,
				additionalDetails
			} = body;
			let dataToSend = {
				...body,
				details: {
					name: name,
					address: {
						street1: street1,
						street2: street2,
						city: city,
						state: state,
						country: country,
						zipCode: zipCode
					},
					startDate: startDate,
					endDate: endDate,
					confirmationNumber: confirmationNumber,
					contactPhoneNumber: contactPhoneNumber,
					contactEmailAddress: contactEmailAddress,
					additionalDetails: additionalDetails
				}
			};
			const updatedData = await Task.findByIdAndUpdate(queryID, dataToSend, { new: true });
			return updatedData;
		},
		updateBudget: async (parent, body, context) => {
			const { queryID, splitByUserIDs } = body;
			delete body.splitByUserIDs;
			let dataToSend = { ...body };
			const updatedData = await Budget.findByIdAndUpdate(
				queryID,
				{
					...dataToSend,
					$addToSet: { splitByUserIDs: { $each: [...splitByUserIDs] } }
				},
				{ new: true }
			);
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
