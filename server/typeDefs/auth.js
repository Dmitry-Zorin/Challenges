const { gql } = require("apollo-server-express")

const auth = gql`
  extend type Query {
    user: Status!
  }
  
  extend type Mutation {
    signUp(username: String!, password: String!): AuthPayload
    login(username: String!, password: String!): AuthPayload
    logout: AuthPayload
  }
  
  type Status {
    authorized: Boolean
  }
  
  type AuthPayload {
    username: String
  }
`

module.exports = auth
