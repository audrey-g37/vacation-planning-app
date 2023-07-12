import { gql } from '@apollo/client';

export const QUERY_USER = gql`
	query ($queryID: ID, $authId: String, $email: String) {
		user(queryID: $queryID, authId: $authId, email: $email) {
			_id
			email
			firstName
			lastName
		}
	}
`;

export const QUERY_FRIEND_REQUESTS = gql`
	query ($requestedByUserID: ID, $pendingApprovalUserID: ID, $pendingApprovalUserEmail: String) {
		friendRequests(
			requestedByUserID: $requestedByUserID
			pendingApprovalUserID: $pendingApprovalUserID
			pendingApprovalUserEmail: $pendingApprovalUserEmail
		) {
			_id
			requestedByUserID {
				_id
				email
				firstName
				lastName
			}
			pendingApprovalUserID {
				_id
				email
				firstName
				lastName
			}
			pendingApprovalUserEmail
			dateReviewed
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

export const QUERY_TRIPS = gql`
	query ($userID: ID!) {
		trips(userID: $userID) {
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
