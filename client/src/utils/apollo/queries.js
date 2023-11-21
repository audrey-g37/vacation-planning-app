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

export const QUERY_TRIP_ATTENDEES = gql`
	query ($attendeeUserID: ID, $tripID: ID) {
		tripAttendees(attendeeUserID: $attendeeUserID, tripID: $tripID) {
			_id
			status
			tripPermissions {
				editTripDetails
				addTask
				editTask
				addBudget
				editBudget
				addAttendee
				editAttendee
			}
			attendeeUserID
			tripID
		}
	}
`;

export const QUERY_TRIP_ATTENDEES_BY_TRIP_ID = gql`
	query ($tripID: ID) {
		tripAttendeesByTripID(tripID: $tripID) {
			_id
			status
			tripPermissions {
				editTripDetails
				addTask
				editTask
				addBudget
				editBudget
				addAttendee
				editAttendee
			}
			attendeeUserID {
				_id
				email
				firstName
				lastName
			}
			tripID
		}
	}
`;
export const QUERY_TRIP_ATTENDEES_BY_ATTENDEE_ID = gql`
	query ($attendeeUserID: ID) {
		tripAttendeesByAttendeeID(attendeeUserID: $attendeeUserID) {
			_id
			status
			tripPermissions {
				editTripDetails
				addTask
				editTask
				addBudget
				editBudget
				addAttendee
				editAttendee
			}
			attendeeUserID
			tripID {
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
			status
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
export const QUERY_FRIEND_REQUESTS_MATCH = gql`
	query ($requestedByUserID: ID, $pendingApprovalUserID: ID, $pendingApprovalUserEmail: String) {
		friendRequestsMatch(
			requestedByUserID: $requestedByUserID
			pendingApprovalUserID: $pendingApprovalUserID
			pendingApprovalUserEmail: $pendingApprovalUserEmail
		) {
			_id
			status
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
			textDetails
			adultQuantity
			childrenQuantity
			details {
				name
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
				confirmationNumber
				contactPhoneNumber
				contactEmailAddress
				additionalDetails
			}
			completionOrder
			dueDate
			status
			assignedToUserID {
				firstName
				lastName
				email
			}
			tripID {
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
	}
`;

export const QUERY_TASKS = gql`
	query tasks($tripID: ID, $userID: ID) {
		tasks(tripID: $tripID, userID: $userID) {
			_id
			title
			textDetails
			adultQuantity
			childrenQuantity
			details {
				name
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
				confirmationNumber
				contactPhoneNumber
				contactEmailAddress
				additionalDetails
			}
			completionOrder
			dueDate
			status
			assignedToUserID {
				firstName
				lastName
				email
			}
			tripID {
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
	}
`;

export const QUERY_BUDGET = gql`
	query ($queryID: ID!) {
		budget(queryID: $queryID) {
			_id
			title
			maxAmount
			actualAmount
			purchaseDate
			purchasedByUserID {
				firstName
				lastName
				email
			}
			splitByUserIDs
			tripID
			taskID
		}
	}
`;

export const QUERY_BUDGETS = gql`
	query budgets($tripID: ID, $userID: ID) {
		budgets(tripID: $tripID, userID: $userID) {
			_id
			title
			maxAmount
			actualAmount
			purchaseDate
			purchasedByUserID {
				firstName
				lastName
				email
			}
			tripID {
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
			splitByUserIDs
			taskID {
				_id
				title
				textDetails
				adultQuantity
				childrenQuantity
				details {
					name
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
					confirmationNumber
					contactPhoneNumber
					contactEmailAddress
					additionalDetails
				}
				completionOrder
				dueDate
				status
			}
		}
	}
`;
