const { gql } = require('apollo-server-express')

const challenge = gql`
    extend type Query {
        challenges: [Challenge]!
    }

    extend type Mutation {
        challengeAdd(challenge: ChallengeInput!): Challenge
        challengeEdit(id: String!, challenge: ChallengeInput!): Challenge
        challengeDelete(id: String!): String
        challengeStart(id: String!): String
        challengeComplete(id: String!): String
    }

    type Challenge {
        _id: String!
        name: String!
        difficulty: Difficulty!
        progress: Progress!
        startDate: Float!
        endDate: Float!
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

module.exports = challenge
