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
const getUserInfo = require('./helpers/user-info')

configEnv({ path: `${__dirname}/.env` })

connectToDb(process.env.ATLAS_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
}).catch(console.log)

const app = express()
const isProductionEnv = process.env.NODE_ENV === 'production'

app.use(cors({
	origin: !isProductionEnv,
	credentials: true
}))

const maxAge = 14 * 864e5  // 14 days

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	store: new MongoDBStore({
		uri: process.env.ATLAS_URI,
		maxAge
	}),
	cookie: { maxAge /*secure: isProductionEnv*/ },
}))

app.use(passport.initialize())
app.use(passport.session())

const context = ({ req, res }) => (
	buildContext({ req, res, User, getUserInfo })
)
new ApolloServer({ typeDefs, resolvers, context })
	.applyMiddleware({ app: app, path: '/api', cors: false })

app.listen(process.env.PORT)
