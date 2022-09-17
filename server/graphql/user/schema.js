const { gql } = require('apollo-server-express')

const schema = gql`
	extend type Query {
		user: UserPayload!
	}

	extend type Mutation {
		signUp(username: String!, password: String!): UserPayload!
		login(username: String!, password: String!): UserPayload!
		logout: UserPayload!
	}

	type UserPayload {
		user: User
	}

	type User {
		username: String!
		password: String!
		challenges: SortedChallenges!
	}
`

module.exports = schema
