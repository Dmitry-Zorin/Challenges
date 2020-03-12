const passport = require("passport")
const { GraphQLLocalStrategy } = require("graphql-passport")
const User = require("./models/user.model")

passport.use(new GraphQLLocalStrategy((username, password, done) =>
  User.findOne({ username: username })
    .then(user => user && user.password === password
      ? done(null, user) : done(null))
    .catch(err => console.log(err))))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    done(err, user)
  })
})

module.exports = passport