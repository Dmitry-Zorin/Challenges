const { gql } = require('apollo-server-express')

const schema = gql`
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
		startDate: Float
		endDate: Float
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
		name: String = "Unnamed challenge"
		difficulty: Difficulty = Easy
		duration: Float
		delay: Float
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

module.exports = schema
