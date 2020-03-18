const challenge = {
  Query: {
    challenges: (_, __, context) => {
      let update = false
      const user = context.getUser()

      user.challenges = user.challenges.map(c => {
        const progress = c.progress
        const now = new Date().getTime()

        c.progress = now < c.startDate ? "Upcoming"
          : now > c.endDate ? "Completed" : "Ongoing"

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
    challengeEdit: (_, { id, challenge }, context) => {
      const user = context.getUser()
      const c = user.challenges.find(c => c._id.toString() === id)

      c.name = challenge.name || c.name
      c.difficulty = challenge.difficulty || c.difficulty

      c.startDate = new Date().getTime() + (challenge.delay || 0) * 36e5
      c.endDate = c.startDate + (challenge.duration || 0) * 36e5

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
  },
}

module.exports = challenge
