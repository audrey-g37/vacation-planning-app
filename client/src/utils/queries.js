import { gql } from '@apollo/client';

export const QUERY_USER = gql`
	query ($ID: String, $authId: String) {
		user(_id: $ID, authId: $authId) {
			email
			firstName
			lastName
		}
	}
`;

export const QUERY_USERS = gql`
	query {
		users {
			_id
			email
			firstName
			lastName
		}
	}
`;

export const QUERY_TRIP = gql`
	query ($tripId: ID!, $userId: ID!) {
		trip(tripId: $tripId, userId: $userId) {
			_id
			title
			location
			startDate
			endDate
			description
			tasks {
				_id
			}
			budget {
				_id
			}
		}
	}
`;

export const QUERY_TRIPS = gql`
	query ($userId: ID!) {
		trips(userId: $userId) {
			_id
			title
			location
			startDate
			endDate
			description
		}
	}
`;

export const QUERY_TASK = gql`
	query ($taskId: ID!) {
		task(taskId: $taskId) {
			_id
			title
			details
			dueDate
			status
			assignee
		}
	}
`;

export const QUERY_TASKS = gql`
	query ($tripId: ID!) {
		tasks(tripId: $tripId) {
			_id
			title
			details
			dueDate
			status
			assignee
		}
	}
`;

export const QUERY_BUDGETS = gql`
	query ($tripId: ID!) {
		budgets(tripId: $tripId) {
			_id
			title
			value
			purchaseDate
			purchasedBy
		}
	}
`;
export const QUERY_BUDGET = gql`
	query ($budgetId: ID!) {
		budget(budgetId: $budgetId) {
			_id
			title
			value
			purchaseDate
			purchasedBy
		}
	}
`;
