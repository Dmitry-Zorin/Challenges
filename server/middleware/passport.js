const passport = require('passport')
const { GraphQLLocalStrategy } = require('graphql-passport')
const User = require('../models/user')

passport.use(
	new GraphQLLocalStrategy((username, password, done) => {
		User.findOne({ username }, (err, user) => {
			done(err, user && user.password === password && user)
		})
	}),
)

passport.serializeUser(({ _id }, done) => {
	done(null, _id)
})

passport.deserializeUser((_id, done) => {
	User.findOne({ _id }, done)
})

module.exports = passport
