const { gql } = require('apollo-server-express')

const challengeTypeDefs = gql`
  extend type Query {
    challenges: Challenges!
  }

  extend type Mutation {
    challengeAdd(challenge: ChallengeInput!): Challenges!
    challengeEdit(id: String!, challenge: ChallengeInput!): Challenges!
    challengeDelete(id: String!): Challenges!
    challengeStart(id: String!): Challenges!
    challengeComplete(id: String!): Challenges!
  }

  type Challenge {
    _id: String!
    name: String!
    difficulty: Difficulty!
    startDate: Float!
    endDate: Float!
  }

  type Challenges {
    challenges: SortedChallenges
  }
  
  type SortedChallenges {
    ongoing: [Challenge!]!
    upcoming: [Challenge!]!
    completed: [Challenge!]!
  }

  input ChallengeInput {
    name: String!
    difficulty: Difficulty = Easy
    startDate: Float = 0
    endDate: Float = 0
  }

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
`

module.exports = challengeTypeDefs
