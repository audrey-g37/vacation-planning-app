import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TRIP = gql`
 muation addTrip($title: String!, $description: String, $location: String!, $startDate: String!, $endDate: String!){
     addTrip(title: $title, description: $description, location, $location, startDate: $startDate, endDate: $endDate){
         _id
         title
         description
         location
         startDate
         endDate
     }
 }
`;

export const ADD_TASK = gql`
  mutation addTask(
    $title: String!
    $details: String
    $dueDate: String!
    $status: Boolean!
    $assignee: String!
  ) {
    addTask(
      title: $title
      details: $details
      dueDate: $dueDate
      status: $status
      assignee: $assignee
    ) {
      _id
      title
      details
      status
      assignee
    }
  }
`;

export const ADD_BUDGET = gql`
  mutation addBudget(
    $title: String!
    $value: Int!
    $purchaseDate: String!
    $purchasedBy: String!
  ) {
    addBudget(
      title: $title
      details: $details
      purcahseDate: $purchaseDate
      purchasedBy: $purchasedBy
    )
  }
`;
