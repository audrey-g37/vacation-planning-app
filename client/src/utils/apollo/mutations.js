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

export const ADD_TRIP_ATTENDEE = gql`
	mutation addTripAttendee(
		$status: String
		$attendeeUserID: ID!
		$tripID: ID!
		$editTripDetails: Boolean
		$addTask: String
		$editTask: String
		$addBudget: String
		$editBudget: String
		$addAttendee: String
		$editAttendee: String
	) {
		addTripAttendee(
			status: $status
			attendeeUserID: $attendeeUserID
			tripID: $tripID
			editTripDetails: $editTripDetails
			addTask: $addTask
			editTask: $editTask
			addBudget: $addBudget
			editBudget: $editBudget
			addAttendee: $addAttendee
			editAttendee: $editAttendee
		) {
			status
			attendeeUserID
			tripID
			tripPermissions {
				editTripDetails
				addTask
				editTask
				addBudget
				editBudget
				addAttendee
				editAttendee
			}
		}
	}
`;

export const ADD_FRIEND_REQUEST = gql`
	mutation addFriendRequest(
		$status: String
		$requestedByUserID: ID!
		$pendingApprovalUserID: ID
		$pendingApprovalUserEmail: String
		$dateReviewed: String
	) {
		addFriendRequest(
			status: $status
			requestedByUserID: $requestedByUserID
			pendingApprovalUserID: $pendingApprovalUserID
			pendingApprovalUserEmail: $pendingApprovalUserEmail
			dateReviewed: $dateReviewed
		) {
			_id
			requestedByUserID
			pendingApprovalUserID
			pendingApprovalUserEmail
			dateReviewed
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
		$name: String
		$street1: String
		$street2: String
		$city: String
		$state: String
		$country: String
		$zipCode: String
		$startDate: String
		$endDate: String
		$confirmationNumber: String
		$contactPhoneNumber: String
		$contactEmailAddress: String
		$additionalDetails: String
		$title: String!
		$textDetails: String
		$adultQuantity: Int
		$childrenQuantity: Int
		$completionOrder: Int
		$dueDate: String
		$status: String
		$assignedToUserID: ID
		$tripID: ID!
	) {
		addTask(
			name: $name
			street1: $street1
			street2: $street2
			city: $city
			state: $state
			country: $country
			zipCode: $zipCode
			startDate: $startDate
			endDate: $endDate
			confirmationNumber: $confirmationNumber
			contactPhoneNumber: $contactPhoneNumber
			contactEmailAddress: $contactEmailAddress
			additionalDetails: $additionalDetails
			title: $title
			textDetails: $textDetails
			adultQuantity: $adultQuantity
			childrenQuantity: $childrenQuantity
			completionOrder: $completionOrder
			dueDate: $dueDate
			status: $status
			assignedToUserID: $assignedToUserID
			tripID: $tripID
		) {
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
				_id
			}
			tripID {
				_id
			}
		}
	}
`;

export const ADD_BUDGET = gql`
	mutation addBudget(
		$title: String!
		$maxAmount: Float
		$actualAmount: Float
		$purchaseDate: String
		$purchasedByUserID: ID
		$splitByUserIDs: [ID]
		$tripID: ID!
		$taskID: ID
	) {
		addBudget(
			title: $title
			maxAmount: $maxAmount
			actualAmount: $actualAmount
			purchaseDate: $purchaseDate
			purchasedByUserID: $purchasedByUserID
			splitByUserIDs: $splitByUserIDs
			tripID: $tripID
			taskID: $taskID
		) {
			_id
			title
			maxAmount
			actualAmount
			purchaseDate
			purchasedByUserID {
				_id
			}
			splitByUserIDs
			tripID {
				_id
			}
			taskID {
				_id
			}
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

export const UPDATE_TRIP_ATTENDEE = gql`
	mutation updateTripAttendee(
		$queryID: ID!
		$status: String
		$editTripDetails: Boolean
		$addTask: String
		$editTask: String
		$addBudget: String
		$editBudget: String
		$addAttendee: String
		$editAttendee: String
	) {
		updateTripAttendee(
			queryID: $queryID
			status: $status
			editTripDetails: $editTripDetails
			addTask: $addTask
			editTask: $editTask
			addBudget: $addBudget
			editBudget: $editBudget
			addAttendee: $addAttendee
			editAttendee: $editAttendee
		) {
			status
			attendeeUserID
			tripID
			tripPermissions {
				editTripDetails
				addTask
				editTask
				addBudget
				editBudget
				addAttendee
				editAttendee
			}
		}
	}
`;

export const UPDATE_FRIEND_REQUEST = gql`
	mutation updateFriendRequest(
		$queryID: ID!
		$status: String
		$pendingApprovalUserID: ID
		$pendingApprovalUserEmail: String
		$dateReviewed: String
	) {
		updateFriendRequest(
			queryID: $queryID
			status: $status
			pendingApprovalUserID: $pendingApprovalUserID
			pendingApprovalUserEmail: $pendingApprovalUserEmail
			dateReviewed: $dateReviewed
		) {
			_id
			requestedByUserID
			pendingApprovalUserID
			pendingApprovalUserEmail
			dateReviewed
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
		$name: String
		$street1: String
		$street2: String
		$city: String
		$state: String
		$country: String
		$zipCode: String
		$startDate: String
		$endDate: String
		$confirmationNumber: String
		$contactPhoneNumber: String
		$contactEmailAddress: String
		$additionalDetails: String
		$title: String
		$textDetails: String
		$adultQuantity: Int
		$childrenQuantity: Int
		$completionOrder: Int
		$dueDate: String
		$status: String
		$assignedToUserID: ID
		$tripID: ID
	) {
		updateTask(
			queryID: $queryID
			name: $name
			street1: $street1
			street2: $street2
			city: $city
			state: $state
			country: $country
			zipCode: $zipCode
			startDate: $startDate
			endDate: $endDate
			confirmationNumber: $confirmationNumber
			contactPhoneNumber: $contactPhoneNumber
			contactEmailAddress: $contactEmailAddress
			additionalDetails: $additionalDetails
			title: $title
			textDetails: $textDetails
			adultQuantity: $adultQuantity
			childrenQuantity: $childrenQuantity
			completionOrder: $completionOrder
			dueDate: $dueDate
			status: $status
			assignedToUserID: $assignedToUserID
			tripID: $tripID
		) {
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
				_id
			}
			tripID {
				_id
			}
		}
	}
`;

export const UPDATE_BUDGET = gql`
	mutation updateBudget(
		$queryID: ID!
		$title: String
		$maxAmount: Float
		$actualAmount: Float
		$purchaseDate: String
		$purchasedByUserID: ID
		$splitByUserIDs: [ID]
		$tripID: ID
		$taskID: ID
	) {
		updateBudget(
			queryID: $queryID
			title: $title
			maxAmount: $maxAmount
			actualAmount: $actualAmount
			purchaseDate: $purchaseDate
			purchasedByUserID: $purchasedByUserID
			splitByUserIDs: $splitByUserIDs
			tripID: $tripID
			taskID: $taskID
		) {
			_id
			title
			maxAmount
			actualAmount
			purchaseDate
			purchasedByUserID {
				_id
			}
			splitByUserIDs
			tripID {
				_id
			}
			taskID {
				_id
			}
		}
	}
`;

// DELETE MUTATIONS
export const REMOVE_TRIP = gql`
	mutation removeTrip($tripId: ID!) {
		removeTrip(tripId: $tripId) {
			_id
		}
	}
`;

export const REMOVE_TASK = gql`
	mutation removeTask($tripId: ID!, $taskId: ID!) {
		removeTask(tripId: $tripId, taskId: $taskId) {
			_id
		}
	}
`;

export const REMOVE_BUDGET = gql`
	mutation removeBudget($tripId: ID!, $budgetId: ID!) {
		removeBudget(tripId: $tripId, budgetId: $budgetId) {
			_id
		}
	}
`;
