const connectToDb = require('../_utilities/db')
const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('../_utilities/auth')
const { ApolloServer } = require('apollo-server-express')
const { buildContext } = require('graphql-passport')
const typeDefs = require('../_utilities/typeDefs/all')
const resolvers = require('../_utilities/resolvers/all')
const User = require('../_utilities/models/user.model')
const cors = require('cors')

require('dotenv').config({
	path: '.env.' + process.env.NODE_ENV,
})

connectToDb()

const app = express()
const isProductionEnv = process.env.NODE_ENV === 'production'

if (!isProductionEnv) {
	app.use(cors({
		origin: [process.env.UI_SERVER],
		credentials: true,
	}))
}

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	store: new MongoDBStore({
		uri: process.env.ATLAS_URI,
		collection: 'sessions',
	}),
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7,
		secure: isProductionEnv,
	},
}))

app.use(passport.initialize())
app.use(passport.session())

new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) =>
		buildContext({ req, res, User }),
})
	.applyMiddleware({ app, path: '/', cors: false })

const port = process.env.PORT

app.listen(port, () =>
	console.log(`Server is running on port: ${port}`),
)