const { config: configEnv } = require('dotenv')
const { connect: connectToDb } = require('mongoose')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('./middleware/passport')
const { buildContext } = require('graphql-passport')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const User = require('./models/user')
const getUserInfo = require('./helpers/userInfo')
const { day } = require('./settings.json')

configEnv({ path: `${__dirname}/.env` })

connectToDb(process.env.ATLAS_URI).catch(console.log)

const app = express()
const isProductionEnv = process.env.NODE_ENV === 'production'

app.use(
	cors({
		origin: !isProductionEnv,
		credentials: true,
	}),
)

const maxAge = 14 * day

app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
		store: new MongoDBStore({
			uri: process.env.ATLAS_URI,
			collection: 'sessions',
			expires: maxAge,
		}),
		cookie: { maxAge },
	}),
)

app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => {
		return buildContext({ req, res, User, getUserInfo })
	},
})

server.start().then(() => {
	server.applyMiddleware({ app: app, path: '/api', cors: false })
	app.listen(process.env.PORT)
})
