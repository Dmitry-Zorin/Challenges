const { config: configEnv } = require('dotenv')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('./passport')

configEnv({ path: __dirname + '/../.env' })

const app = express()

const envIsProduction = process.env.NODE_ENV === 'production'

app.use(cors({
	origin: !envIsProduction,
	credentials: true,
}))

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
		//secure: envIsProduction,
	},
}))

app.use(passport.initialize())
app.use(passport.session())

module.exports = app
