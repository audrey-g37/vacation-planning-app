import { gql } from '@apollo/client';

export const QUERY_USER = gql`
	query ($queryID: ID, $authId: String) {
		user(queryID: $queryID, authId: $authId) {
			_id
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
	query ($queryID: ID!) {
		trip(queryID: $queryID) {
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
	query {
		trips {
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
	query ($queryID: ID!) {
		task(queryID: $queryID) {
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
	query {
		tasks {
			_id
			title
			details
			dueDate
			status
			assignee
		}
	}
`;

export const QUERY_BUDGET = gql`
	query ($queryID: ID!) {
		budget(queryID: $queryID) {
			_id
			title
			value
			purchaseDate
			purchasedBy
		}
	}
`;

export const QUERY_BUDGETS = gql`
	query {
		budgets {
			_id
			title
			value
			purchaseDate
			purchasedBy
		}
	}
`;
