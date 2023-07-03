const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		email: String!
		firstName: String!
		lastName: String!
		authId: String!
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

	type Task {
		_id: ID!
		title: String!
		details: String
		dueDate: String
		status: String
		assignee: String
		tripID: ID!
	}

	type Budget {
		_id: ID!
		title: String!
		minAmount: Int
		maxAmount: Int
		actualAmount: Int
		purchaseDate: String
		purchasedBy: String
		tripID: ID!
		taskID: [ID]
	}

	type Query {
		user(queryID: ID, authId: String): User
		trip(queryID: ID!): Trip
		task(queryID: ID!): Task
		budget(queryID: ID!): Budget
		users: [User]!
		trips(filterObj: String): [Trip]!
		tasks: [Task]!
		budgets: [Budget]!
	}

	type Mutation {
		addUser(firstName: String!, lastName: String!, email: String!, authId: String!): User
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
			title: String!
			details: String
			dueDate: String
			status: String
			assignee: String
			tripID: ID!
		): Task
		addBudget(
			title: String!
			minAmount: Int
			maxAmount: Int
			actualAmount: Int
			purchaseDate: String
			purchasedBy: String
			tripID: ID!
			taskID: ID
		): Budget
		updateUser(queryID: ID!, email: String, firstName: String, lastName: String): User
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
			title: String
			details: String
			dueDate: String
			status: String
			assignee: String
		): Task
		updateBudget(
			queryID: ID!
			title: String
			minAmount: Int
			maxAmount: Int
			actualAmount: Int
			purchaseDate: String
			purchasedBy: String
			taskID: ID
		): Budget
		removeTrip(queryID: ID!): Trip
		removeTask(queryID: ID!): Task
		removeBudget(queryID: ID!): Budget
	}
`;

module.exports = typeDefs;
