const auth = {
  Query: {
    user: (_, __, context) => {
      return { isAuthorized: !!context.getUser() }
    }
  },
  Mutation: {
    signUp: (_, { username, password }, context) => {
      return context.User.findOne({ username }).then(user =>
        user ? null : new context.User({ username, password }).save()
          .then(
            () => context.authenticate('graphql-local', { username, password })
              .then(({ user }) => context.login(user)
                .then(() => ({ username: user.username }))))
          .catch(err => console.log(err))
      )
    },
    login: (_, { username, password }, context) => {
      return context.authenticate('graphql-local', { username, password })
        .then(({ user }) => context.login(user)
          .then(() => ({ username: user.username })))
        .catch(err => {
          console.log(err)
          return { username: '' }
        })
    },
    logout: (_, __, context) => {
      context.logout()
      return { username: 'out' }
    }
  }
}

module.exports = auth
