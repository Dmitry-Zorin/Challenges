const { config: configEnv } = require('dotenv')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('./middleware/passport')

configEnv({ path: __dirname + '/.env' })

const app = express()
const envIsProduction = process.env.NODE_ENV === 'production'

app.use(cors({ origin: !envIsProduction, credentials: true }))

const maxAge = 14 * 864e5  // 14 days

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	store: new MongoDBStore({ uri: process.env.ATLAS_URI, maxAge }),
	cookie: { maxAge /*secure: envIsProduction*/ },
}))

app.use(passport.initialize())
app.use(passport.session())

module.exports = app
