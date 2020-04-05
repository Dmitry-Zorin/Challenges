const { gql } = require('apollo-server-express')
const authTypeDefs = require('./auth')
const challengeTypeDefs = require('./challenge')

const typeDefs = [
	gql`
    type Query { _: Boolean }
    type Mutation { _: Boolean }
	`,
	authTypeDefs,
	challengeTypeDefs,
]

module.exports = typeDefs
