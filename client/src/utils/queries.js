import { gql } from "@apollo/client";

export const QUERY_USER = gql`
query ($username: String!) {
  user (username: $username) {
	_id
    username
    password
  }
}
`;

export const QUERY_USERS = gql`
query {
  users {
    _id
    username
    password
  }
}
`;

export const QUERY_TRIP = gql`
query ($tripId: ID!) {
  trip (tripId: $tripId) {
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
query task ($taskId: ID!){
  task (taskId:$taskId) {
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
