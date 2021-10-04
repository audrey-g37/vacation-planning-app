const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
    trip: [Trip]
  }

  type Trip {
    _id: ID!
    title: String!
    location: String!
    startDate: String!
    endDate: String!
    description: String
  }

  type Task {
    _id: ID!
    title: String!
    details: String
    dueDate: String!
    status: Boolean!
    assignee: String!
  }

  type Budget {
    _id: ID!
    title: String!
    value: Int!
    purchaseDate: String!
    purchasedBy: String!
    trip: [Trip]!
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    user: [User]!
    trip: [Trip]
    task: [Task]
    budget: [Budget]
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth

    addTrip(
      title: String!
      description: String
      location: String!
      startDate: String!
      endDate: String!
      userId: ID!
    ): Trip
    addTask(
      title: String!
      details: String
      dueDate: String!
      status: Boolean!
      assignee: String!
      tripId: ID!
    ): Task
    addBudget(
      title: String!
      value: Int!
      purchaseDate: String!
      purchasedBy: String!
      tripId: ID!
    ): Budget
  }
`;

module.exports = typeDefs;
