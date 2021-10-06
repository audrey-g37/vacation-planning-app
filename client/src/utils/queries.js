import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      trip {
        _id
        title
        location
        startDate
        endDate
        description
        tasks {
          _id
          title
          details
          dueDate
          status
          assignee
        }
        budget {
          _id
          title
          value
          purchaseDate
          purchasedBy
        }
      }
    }
  }
`;
export const QUERY_TRIP = gql`
  query getTrip {
    trip {
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
  query getTask($taskId: ID!) {
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
  query getTasks {
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
  query getBudgets {
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
  query getBudget($budgetId: ID!) {
    budget(budgetId: $budgetId) {
      _id
      title
      value
      purchaseDate
      purchasedBy
    }
  }
`;
