const { gql } = require("apollo-server-express")

const schema = gql`
  enum Difficulty {
    Easy
    Medium
    Hard
  }
  
  enum Progress {
    Ongoing
    Upcoming
    Completed
  }
  
  type Status {
    authorized: Boolean
  }
  
  type User {
    username: String!
    password: String!
    challenges: [Challenge]!
  }
  
  type Challenge {
    _id: String!
    username: String!
    name: String!
    difficulty: Difficulty!
    progress: Progress!
    startDate: Float!
    endDate: Float!
  }
  
  input ChallengeInput {
    username: String!
    name: String
    difficulty: Difficulty = Easy
    duration: Float = 0
    delay: Float = 0
  }
  
  type AuthPayload {
    username: String
  }
  
  type Query {
    user: Status!
    challenges: [Challenge]!
  }
  
  type Mutation {
    challengeAdd(challenge: ChallengeInput!): Challenge
    challengeDelete(id: String!): String
    challengeStart(id: String!): String
    challengeComplete(id: String!): String
    challengeEdit(id: String!, name: String!): Challenge
    signUp(username: String!, password: String!): AuthPayload
    login(username: String!, password: String!): AuthPayload
    logout: AuthPayload
  }  
`

module.exports = schema
