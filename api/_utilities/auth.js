const passport = require('passport')
const { GraphQLLocalStrategy } = require('graphql-passport')
const User = require('./models/user.model')

passport.use(new GraphQLLocalStrategy((username, password, done) => (
	User.findOne({ username: username })
		.then(user => done(null, user && user.password === password && user))
		.catch(console.log)
)))

passport.serializeUser((user, done) => {
	done(null, user._id)
})

passport.deserializeUser((id, done) => {
	User.findOne({ _id: id }, done)
		.catch(console.log)
})

module.exports = passport
