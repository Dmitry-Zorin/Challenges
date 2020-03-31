require('dotenv').config({
	path: __dirname + '/../.env.' + process.env.NODE_ENV,
})
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const passport = require('../_utilities/auth')
const { buildContext } = require('graphql-passport')
const typeDefs = require('../_utilities/typeDefs/all')
const resolvers = require('../_utilities/resolvers/all')
const User = require('../_utilities/models/user.model')

const app = express()

app.use(passport.initialize())

new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) =>
		buildContext({ req, res, User }),
})
	.applyMiddleware({ app, path: '/api/graphql', cors: false })

app.listen(5000)
