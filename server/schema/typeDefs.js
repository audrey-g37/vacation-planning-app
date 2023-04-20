const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		email: String!
		firstName: String!
		lastName: String!
		authId: String!
	}

	type Trip {
		_id: ID!
		title: String!
		location: String!
		startDate: String!
		endDate: String!
		description: String
		userID: ID!
	}

	type Task {
		_id: ID!
		title: String!
		details: String
		dueDate: String!
		status: Boolean!
		assignee: String!
		tripId: ID!
	}

	type Budget {
		_id: ID!
		title: String!
		value: Int!
		purchaseDate: String!
		purchasedBy: String!
		tripId: ID!
	}

	type Query {
		user(ID: ID!): User
		users: [User]!
		trip(tripId: ID!, userId: ID!): Trip
		trips(userId: ID!): [Trip]!
		task(taskId: ID!): Task
		tasks(tripId: ID!): [Task]!
		budget(budgetId: ID!): Budget
		budgets(tripId: ID!): [Budget]!
	}

	type Mutation {
		addUser(firstName: String!, lastName: String!, email: String!, authId: String!): User
		addTrip(
			userId: ID!
			title: String!
			description: String
			location: String!
			startDate: String!
			endDate: String!
		): Trip
		addTask(
			tripId: ID!
			title: String!
			details: String
			dueDate: String!
			status: Boolean!
			assignee: String!
		): Task
		addBudget(
			tripId: ID!
			title: String!
			value: Int!
			purchaseDate: String!
			purchasedBy: String!
		): Budget
		updateUser(_id: ID!, email: String, firstName: String, lastName: String): Trip
		updateTrip(
			tripId: ID!
			title: String
			description: String
			location: String
			startDate: String
			endDate: String
		): Trip
		updateTask(
			taskId: ID!
			title: String
			details: String
			dueDate: String
			status: Boolean
			assignee: String
		): Task
		updateBudget(
			budgetId: ID!
			title: String
			value: Int
			purchaseDate: String
			purchasedBy: String
		): Budget
		removeTrip(tripId: ID!): Trip
		removeTask(taskId: ID!): Task
		removeBudget(budgetId: ID!): Budget
	}
`;

module.exports = typeDefs;
