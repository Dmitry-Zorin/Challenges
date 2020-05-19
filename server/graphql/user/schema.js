const { gql } = require('apollo-server-express')

const schema = gql`
  extend type Query {
    user: UserPayload!
  }

  extend type Mutation {
    signUp(username: String!, password: String!): UserPayload!
    login(username: String!, password: String!): UserPayload!
    logout: UserPayload!
    settingsEdit(settings: SettingsInput!): SettingsPayload!
  }

  type UserPayload {
    user: User
  }

  type User {
    username: String!
    password: String!
    challenges: SortedChallenges!
    settings: Settings!
  }

  type SettingsPayload {
    settings: Settings
  }

  type Settings {
    theme: String!
  }

  input SettingsInput {
    theme: String = "light"
  }
`

module.exports = schema
