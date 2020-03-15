const resolvers = {
  Query: {
    user: (_, __, context) => {
      return { authorized: !!context.getUser() }
    },
    challenges: (_, __, context) => {
      let update = false
      const user = context.getUser()

      user.challenges = user.challenges.map(c => {
        const progress = c.progress
        const now = new Date().getTime()

        if (now > c.startDate)
          c.progress = "Ongoing"

        if (now > c.endDate)
          c.progress = "Completed"

        if (progress !== c.progress)
          update = true

        return c
      })

      if (update) user.save()
        .catch(err => console.log(err))

      return user.challenges
    },
  },
  Mutation: {
    challengeAdd: (_, { challenge: c }, context) => {
      c.name = c.name || "Challenge from " + new Date().toString()
        .split(" ").slice(1, 5).join(" ").slice(0, -3)
      c.progress = c.delay ? "Upcoming" : c.duration ? "Ongoing" : "Completed"
      c.startDate = new Date().getTime() + (c.delay || 0) * 36e5
      c.endDate = c.startDate + (c.duration || 0) * 36e5

      delete c.delay
      delete c.duration

      const user = context.getUser()
      user.challenges.push(c)

      return user.save()
        .then(() => c)
        .catch(err => console.log(err))
    },
    challengeDelete: (_, { id }, context) => {
      const user = context.getUser()
      user.challenges = user.challenges
        .filter(c => c._id.toString() !== id)

      return user.save()
        .then(() => "Deleted!")
        .catch(err => console.log(err))
    },
    challengeStart: (_, { id }, context) => {
      const user = context.getUser()
      const c = user.challenges.find(c => c._id.toString() === id)
      const time = new Date().getTime()

      c.endDate -= c.startDate - time
      c.startDate = time

      return user.save()
        .then(() => "Started!")
        .catch(err => console.log(err))
    },
    challengeComplete: (_, { id }, context) => {
      const user = context.getUser()
      const c = user.challenges.find(c => c._id.toString() === id)

      c.endDate = new Date().getTime()

      return user.save()
        .then(() => "Completed!")
        .catch(err => console.log(err))
    },
    challengeEdit: (_, { id, name }, context) => {
      const user = context.getUser()
      const c = user.challenges.find(c => c._id.toString() === id)

      c.name = name

      return user.save()
        .then(() => c)
        .catch(err => console.log(err))
    },
    signUp: (_, { username, password }, context) => {
      return context.User.findOne({ username }).then(user =>
        user ? null : new context.User({ username, password }).save()
          .then(() => context.authenticate("graphql-local", { username, password })
            .then(({ user }) => context.login(user)
              .then(() => ({ username: user.username }))))
          .catch(err => console.log(err)),
      )
    },
    login: (_, { username, password }, context) => {
      return context.authenticate("graphql-local", { username, password })
        .then(({ user }) => context.login(user)
          .then(() => ({ username: user.username })))
        .catch(err => {
          console.log(err)
          return { username: "" }
        })
    },
    logout: (_, __, context) => {
      context.logout()
      return { username: "out" }
    },
  },
}

module.exports = resolvers
