const { gql } = require('apollo-server-express')

const authTypeDefs = gql`
  extend type Query {
    user: AuthPayload!
  }
  
  extend type Mutation {
    signUp(username: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    logout: AuthPayload!
  }

  type AuthPayload {
    user: User
  }
  
  type User {
    username: String
    password: String
    challenges: [Challenge!]
  }
`

module.exports = authTypeDefs
