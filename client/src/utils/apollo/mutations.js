import { gql } from '@apollo/client';

// CREATE MUTATIONS
export const ADD_USER = gql`
	mutation addUser($email: String!, $firstName: String!, $lastName: String!, $authId: String!) {
		addUser(email: $email, firstName: $firstName, lastName: $lastName, authId: $authId) {
			_id
			authId
			email
			firstName
			lastName
		}
	}
`;

export const ADD_TRIP = gql`
	mutation addTrip(
		$title: String!
		$description: String
		$street1: String
		$street2: String
		$city: String
		$state: String
		$country: String
		$zipCode: String
		$startDate: String
		$endDate: String
		$userID: ID!
	) {
		addTrip(
			title: $title
			description: $description
			street1: $street1
			street2: $street2
			city: $city
			state: $state
			country: $country
			zipCode: $zipCode
			startDate: $startDate
			endDate: $endDate
			userID: $userID
		) {
			_id
			title
			description
			address {
				street1
				street2
				city
				state
				country
				zipCode
			}
			startDate
			endDate
		}
	}
`;

export const ADD_TASK = gql`
	mutation addTask(
		$title: String!
		$details: String
		$dueDate: String
		$status: String
		$assignee: String
		$tripID: ID!
	) {
		addTask(
			title: $title
			details: $details
			dueDate: $dueDate
			status: $status
			assignee: $assignee
			tripID: $tripID
		) {
			_id
			title
			details
			dueDate
			status
			assignee
		}
	}
`;

export const ADD_BUDGET = gql`
	mutation addBudget(
		$title: String!
		$minAmount: Int
		$maxAmount: Int
		$actualAmount: Int
		$purchaseDate: String
		$purchasedBy: String
		$tripID: ID!
		$taskID: ID
	) {
		addBudget(
			title: $title
			minAmount: $minAmount
			maxAmount: $maxAmount
			actualAmount: $actualAmount
			purchaseDate: $purchaseDate
			purchasedBy: $purchasedBy
			tripID: $tripID
			taskID: $taskID
		) {
			_id
			title
			minAmount
			maxAmount
			actualAmount
			purchaseDate
			purchasedBy
			taskID
		}
	}
`;

// UPDATE MUTATIONS
export const UPDATE_USER = gql`
	mutation updateUser($queryID: ID!, $email: String, $firstName: String, $lastName: String) {
		updateUser(queryID: $queryID, email: $email, firstName: $firstName, lastName: $lastName) {
			email
			firstName
			lastName
		}
	}
`;

export const UPDATE_TRIP = gql`
	mutation updateTrip(
		$queryID: ID!
		$title: String
		$description: String
		$street1: String
		$street2: String
		$city: String
		$state: String
		$country: String
		$zipCode: String
		$startDate: String
		$endDate: String
	) {
		updateTrip(
			queryID: $queryID
			title: $title
			description: $description
			street1: $street1
			street2: $street2
			city: $city
			state: $state
			country: $country
			zipCode: $zipCode
			startDate: $startDate
			endDate: $endDate
		) {
			_id
			title
			description
			address {
				street1
				street2
				city
				state
				country
				zipCode
			}
			startDate
			endDate
		}
	}
`;

export const UPDATE_TASK = gql`
	mutation updateTask(
		$queryID: ID!
		$title: String
		$details: String
		$dueDate: String
		$status: String
		$assignee: String
	) {
		updateTask(
			queryID: $queryID
			title: $title
			details: $details
			dueDate: $dueDate
			status: $status
			assignee: $assignee
		) {
			_id
			title
			details
			dueDate
			status
			assignee
		}
	}
`;

export const UPDATE_BUDGET = gql`
	mutation updateBudget(
		$queryID: ID!
		$title: String
		$minAmount: Int
		$maxAmount: Int
		$actualAmount: Int
		$purchaseDate: String
		$purchasedBy: String
		$taskID: ID
	) {
		updateBudget(
			queryID: $queryID
			title: $title
			minAmount: $minAmount
			maxAmount: $maxAmount
			actualAmount: $actualAmount
			purchaseDate: $purchaseDate
			purchasedBy: $purchasedBy
			taskID: $taskID
		) {
			_id
			title
			minAmount
			maxAmount
			actualAmount
			purchaseDate
			purchasedBy
			taskID
		}
	}
`;

// DELETE MUTATIONS
export const REMOVE_TRIP = gql`
	mutation removeTrip($tripId: ID!) {
		removeTrip(tripId: $tripId) {
		}
	}
`;

export const REMOVE_TASK = gql`
	mutation removeTask($tripId: ID!, $taskId: ID!) {
		removeTask(tripId: $tripId, taskId: $taskId) {
		}
	}
`;

export const REMOVE_BUDGET = gql`
	mutation removeBudget($tripId: ID!, $budgetId: ID!) {
		removeBudget(tripId: $tripId, budgetId: $budgetId) {
		}
	}
`;
