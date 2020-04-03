const { gql } = require('apollo-server-express')

const authTypeDefs = gql`
  extend type Mutation {
    signUp(username: String!, password: String!): AuthPayload
    login(username: String!, password: String!): AuthPayload
    logout: AuthPayload
  }

  type AuthPayload {
    username: String
  }
`

module.exports = authTypeDefs
