const lodash = require('lodash')
const authResolvers = require('./auth')
const challengeResolvers = require('./challenge')

const resolvers = lodash.merge(
	{},
	authResolvers,
	challengeResolvers,
)

module.exports = resolvers
