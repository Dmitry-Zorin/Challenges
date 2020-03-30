const connectToDb = require('./db')
const express = require('serverless-express/express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('./auth')
const { ApolloServer } = require('apollo-server-express')
const { buildContext } = require('graphql-passport')
const User = require('./models/user.model')
const cors = require('cors')
const path = require('path')

require('dotenv').config({
	path: '.env.' + process.env.NODE_ENV,
})

connectToDb()

const app = express()
const isProductionEnv = process.env.NODE_ENV === 'production'

if (isProductionEnv) {
	app.use(express.static(path.join(__dirname, '../build')))
	app.get('/', (req, res) =>
		res.sendFile(path.join(__dirname, 'build', 'index.html')),
	)
}
else {
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
	typeDefs: require('./typeDefs/all'),
	resolvers: require('./resolvers/all'),
	context: ({ req, res }) =>
		buildContext({ req, res, User }),
})
	.applyMiddleware({ app, cors: false })

const port = process.env.PORT

module.exports = app

app.listen(port, () =>
	console.log(`Server is running on port: ${port}`),
)
