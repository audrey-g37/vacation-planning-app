const {gql} = require ("apollo-server-express");



const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    password: String!
    trip:[Trip]
}

type Trip {
    _id: ID!
    title: String!
    location: String!
    startDate: Date!
    endDate: Date!
    description: String
}

type Task{
_id:ID!
title: String!
details: String
dueDate: Date!
status: Boolean!
assignee: String!
}

type Budget {
    _id:ID!
    name: String!
    value: Number!
    purchaseDate: Date!
    purchasedBy: String!
    trip: [Trip]!
}

type Auth {
    token: String!
    user: User
}

type Query {
    user:[User]!
    trip:[Trip]
    task:[Task]
    budget: [Budget]
}

type Mutation {

    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth

    addTrip(title: String!, description: String, location: String!, startDate: Date!, endDate: Date!, userId: ID!): Trip
    addTask(title: String!, details: String, dueDate: Date!, status: Boolean!, assignee: String!, tripId: ID!): Task
    addBudget(title: String!, value: Number!, purchaseDate: Date!, purchasedBy: Date!, tripId: ID!): Budget
    
    editTrip(title: String!, description: String, location: String!, startDate: Date!, endDate: Date!):
    editTask(title: String!, details: String, dueDate: Date!, status: Boolean!, assignee: String!):
    editBudget(title: String!, value: Number!, purchaseDate: Date!, purchasedBy: Date!):
    
    removeTrip(title: String!, description: String, location: String!, startDate: Date!, endDate: Date!):
    removeTask(title: String!, details: String, dueDate: Date!, status: Boolean!, assignee: String!):
    removeBudget(title: String!, value: Number!, purchaseDate: Date!, purchasedBy: Date!):
    

}








`

module.exports = typeDefs;