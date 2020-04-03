const setProgress = challenge => {
	const now = new Date().getTime()
	challenge.progress = (
		now < challenge.startDate ? 'Upcoming'
			: now > challenge.endDate ? 'Completed'
			: 'Ongoing'
	)
}

const findChallenge = (user, id) => (
	user.challenges.find(c => c._id.toString() === id)
)

const challengeResolvers = {
	Query: {
		challenges: (_, __, context) => {
			const user = context.getUser()
			if (!user) return {}

			user.challenges.forEach(setProgress)
			user.save().catch(console.log)
			return { challenges: user.challenges }
		},
	},
	Mutation: {
		challengeAdd: (_, { challenge }, context) => {
			const user = context.getUser()
			setProgress(challenge)
			user.challenges.push(challenge)
			user.save().catch(console.log)
			return { challenges: user.challenges }
		},
		challengeEdit: (_, { id, challenge }, context) => {
			const user = context.getUser()
			setProgress(challenge)
			Object.assign(findChallenge(user, id), challenge)
			user.save().catch(console.log)
			return { challenges: user.challenges }
		},
		challengeDelete: (_, { id }, context) => {
			const user = context.getUser()
			user.challenges = user.challenges.filter(c => c._id.toString() !== id)
			user.save().catch(console.log)
			return { challenges: user.challenges }
		},
		challengeStart: (_, { id }, context) => {
			const user = context.getUser()
			const c = findChallenge(user, id)
			const now = new Date().getTime()

			c.endDate -= c.startDate - now
			c.startDate = now
			setProgress(c)

			user.save().catch(console.log)
			return { challenges: user.challenges }
		},
		challengeComplete: (_, { id }, context) => {
			const user = context.getUser()
			const c = findChallenge(user, id)

			c.endDate = new Date().getTime()
			setProgress(c)

			user.save().catch(console.log)
			return { challenges: user.challenges }
		},
	},
}

module.exports = challengeResolvers
