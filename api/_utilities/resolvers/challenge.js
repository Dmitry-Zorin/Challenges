const getProgress = c => {
	const now = new Date().getTime()
	return (
		now < c.startDate ? 'Upcoming'
			: now > c.endDate ? 'Completed'
			: 'Ongoing'
	)
}

const findChallenge = (user, id) => (
	user.challenges.find(c => c._id.toString() === id)
)

const challenge = {
	Query: {
		challenges: (_, __, context) => {
			const user = context.getUser()

			if (
				user.challenges.some(c => (
					c.progress !== (c.progress = getProgress(c))
				))
			) user.save().catch(console.log)

			return user.challenges
		},
	},
	Mutation: {
		challengeAdd: (_, { challenge: c }, context) => {
			const user = context.getUser()
			user.challenges.push({ ...c, progress: getProgress(c) })

			return user.save()
				.then(() => c)
				.catch(console.log)
		},
		challengeEdit: (_, { id, challenge }, context) => {
			const user = context.getUser()
			const c = Object.assign(
				findChallenge(user, id),
				{
					...challenge,
					progress: getProgress(challenge),
				},
			)
			return user.save()
				.then(() => c)
				.catch(console.log)
		},
		challengeDelete: (_, { id }, context) => {
			const user = context.getUser()
			user.challenges = user.challenges
				.filter(c => c._id.toString() !== id)

			return user.save()
				.then(() => 'Deleted!')
				.catch(console.log)
		},
		challengeStart: (_, { id }, context) => {
			const user = context.getUser()
			const c = findChallenge(user, id)
			const now = new Date().getTime()

			c.endDate -= c.startDate - now
			c.startDate = now

			return user.save()
				.then(() => 'Started!')
				.catch(console.log)
		},
		challengeComplete: (_, { id }, context) => {
			const user = context.getUser()
			findChallenge(user, id).endDate = new Date().getTime()

			return user.save()
				.then(() => 'Completed!')
				.catch(console.log)
		},
	},
}

module.exports = challenge
