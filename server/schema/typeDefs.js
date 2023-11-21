const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		email: String!
		firstName: String!
		lastName: String!
		authId: String!
	}

	type AttendeePermissions {
		editTripDetails: Boolean
		addTask: String
		editTask: String
		addBudget: String
		editBudget: String
		addAttendee: String
		editAttendee: String
	}

	type TripAttendee {
		_id: ID!
		status: String
		tripPermissions: AttendeePermissions
		attendeeUserID: ID!
		tripID: ID!
	}

	type PopulateTripOnTripAttendee {
		_id: ID!
		status: String
		tripPermissions: AttendeePermissions
		attendeeUserID: ID!
		tripID: Trip!
	}

	type PopulateAttendeeOnTripAttendee {
		_id: ID!
		status: String
		tripPermissions: AttendeePermissions
		attendeeUserID: User!
		tripID: ID!
	}

	type FriendRequest {
		_id: ID!
		status: String
		requestedByUserID: ID!
		pendingApprovalUserID: ID
		pendingApprovalUserEmail: String
		dateReviewed: String
	}

	type PopulateFriendRequest {
		_id: ID!
		status: String
		requestedByUserID: User!
		pendingApprovalUserID: User
		pendingApprovalUserEmail: String
		dateReviewed: String
	}

	type Address {
		street1: String
		street2: String
		city: String
		state: String
		country: String
		zipCode: String
	}

	type Trip {
		_id: ID!
		title: String!
		description: String
		address: Address
		startDate: String
		endDate: String
		userID: ID!
	}

	type TaskSubFields {
		_id: ID!
		name: String
		address: Address
		startDate: String
		endDate: String
		confirmationNumber: String
		contactPhoneNumber: String
		contactEmailAddress: String
		additionalDetails: String
	}

	type Task {
		_id: ID!
		title: String!
		textDetails: String
		adultQuantity: Int
		childrenQuantity: Int
		details: TaskSubFields
		completionOrder: Int
		dueDate: String
		status: String
		assignedToUserID: ID
		tripID: ID!
	}

	type Budget {
		_id: ID!
		title: String!
		maxAmount: Int
		actualAmount: Int
		purchaseDate: String
		purchasedByUserID: ID!
		splitByUserIDs: [ID]
		tripID: ID!
		taskID: ID
	}

	type Query {
		user(queryID: ID, authId: String, email: String): User
		tripAttendees(attendeeUserID: ID, tripID: ID): [TripAttendee]
		tripAttendeesByTripID(tripID: ID): [PopulateAttendeeOnTripAttendee]
		tripAttendeesByAttendeeID(attendeeUserID: ID): [PopulateTripOnTripAttendee]
		trip(queryID: ID!): Trip
		task(queryID: ID!): Task
		budget(queryID: ID!): Budget
		users: [User]!
		friendRequests(
			requestedByUserID: ID
			pendingApprovalUserID: ID
			pendingApprovalUserEmail: String
		): [PopulateFriendRequest]!
		friendRequestsMatch(
			requestedByUserID: ID
			pendingApprovalUserID: ID
			pendingApprovalUserEmail: String
		): [PopulateFriendRequest]!
		trips(userID: ID!): [Trip]!
		tasks: [Task]!
		budgets: [Budget]!
	}

	type Mutation {
		addUser(firstName: String!, lastName: String!, email: String!, authId: String!): User
		addTripAttendee(
			status: String
			attendeeUserID: ID!
			tripID: ID!
			editTripDetails: Boolean
			addTask: String
			editTask: String
			addBudget: String
			editBudget: String
			addAttendee: String
			editAttendee: String
		): TripAttendee
		addFriendRequest(
			status: String
			requestedByUserID: ID!
			pendingApprovalUserID: ID
			pendingApprovalUserEmail: String
			dateReviewed: String
		): FriendRequest
		addTrip(
			title: String!
			description: String
			street1: String
			street2: String
			city: String
			state: String
			country: String
			zipCode: String
			startDate: String
			endDate: String
			userID: ID!
		): Trip
		addTask(
			name: String
			street1: String
			street2: String
			city: String
			state: String
			country: String
			zipCode: String
			startDate: String
			endDate: String
			confirmationNumber: String
			contactPhoneNumber: String
			contactEmailAddress: String
			additionalDetails: String
			title: String!
			textDetails: String
			adultQuantity: Int
			childrenQuantity: Int
			completionOrder: Int
			dueDate: String
			status: String
			assignedToUserID: ID
			tripID: ID!
		): Task
		addBudget(
			title: String!
			maxAmount: Int
			actualAmount: Int
			purchaseDate: String
			purchasedByUserID: ID!
			splitByUserIDs: [ID]
			tripID: ID!
			taskID: ID
		): Budget
		updateUser(queryID: ID!, email: String, firstName: String, lastName: String): User
		updateTripAttendee(
			queryID: ID!
			status: String
			editTripDetails: Boolean
			addTask: String
			editTask: String
			addBudget: String
			editBudget: String
			addAttendee: String
			editAttendee: String
		): TripAttendee
		updateFriendRequest(
			queryID: ID!
			status: String
			pendingApprovalUserID: ID
			pendingApprovalUserEmail: String
			dateReviewed: String
		): FriendRequest
		updateTrip(
			queryID: ID!
			title: String
			description: String
			street1: String
			street2: String
			city: String
			state: String
			country: String
			zipCode: String
			startDate: String
			endDate: String
		): Trip
		updateTask(
			queryID: ID!
			name: String
			street1: String
			street2: String
			city: String
			state: String
			country: String
			zipCode: String
			startDate: String
			endDate: String
			confirmationNumber: String
			contactPhoneNumber: String
			contactEmailAddress: String
			additionalDetails: String
			title: String
			textDetails: String
			adultQuantity: Int
			childrenQuantity: Int
			completionOrder: Int
			dueDate: String
			status: String
			assignedToUserID: ID
			tripID: ID
		): Task
		updateBudget(
			queryID: ID!
			title: String
			maxAmount: Int
			actualAmount: Int
			purchaseDate: String
			purchasedByUserID: ID
			splitByUserIDs: [ID]
			tripID: ID
			taskID: ID
		): Budget
		removeTrip(queryID: ID!): Trip
		removeTask(queryID: ID!): Task
		removeBudget(queryID: ID!): Budget
	}
`;

module.exports = typeDefs;
