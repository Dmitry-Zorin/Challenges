const settings = require('../../settings.json')

const resolvers = {
	Mutation: {
		challengeAdd: (...args) => {
			return getUpdatedChallenges(args, (user, { challenge }) => {
				addChallenge(user, challenge)
			})
		},
		challengeStart: (...args) => {
			return getUpdatedChallenges(args, (user, { id }) => {
				const { challenges } = user
				const challenge = challenges.upcoming.id(id)
				console.log(challenges.upcoming, challenge, id)
				const now = new Date().getTime()

				deleteChallenge(user, id, ['upcoming'])
				challenges.ongoing.push(
					Object.assign(challenge, {
						startDate: now,
						endDate: now + challenge.endDate - challenge.startDate,
					}),
				)
			})
		},
		challengeComplete: (...args) => {
			return getUpdatedChallenges(args, (user, { id }) => {
				const { challenges } = user
				const ongoing = challenges.ongoing.id(id)
				const challenge = ongoing || challenges.upcoming.id(id)
				const now = new Date().getTime()

				deleteChallenge(user, id, [ongoing ? 'ongoing' : 'upcoming'])
				challenges.completed.push(
					Object.assign(challenge, {
						startDate: Math.min(challenge.startDate, now),
						endDate: now,
					}),
				)
			})
		},
		challengeDelete: (...args) => {
			return getUpdatedChallenges(args, (user, { id }) => {
				deleteChallenge(user, id)
			})
		},
		challengeEdit: (...args) => {
			return getUpdatedChallenges(args, (user, { id, challenge }) => {
				deleteChallenge(user, id)
				addChallenge(user, challenge)
			})
		},
	},
}

const addChallenge = (user, { name, difficulty, duration, delay }) => {
	const now = new Date().getTime()
	const group = user.challenges[delay ? 'upcoming' : 'ongoing']
	group.push({
		difficulty,
		name: name.slice(0, 250),
		startDate: now + delay,
		endDate: now + delay + duration,
	})
}

const deleteChallenge = (user, id, groups = settings.challengeGroups) => {
	for (const g of groups) {
		user.challenges[g].id(id)?.remove()
	}
}

const getUpdatedChallenges = async ([, args, context], update) => {
	const user = context.getUser()
	let challenges = null

	try {
		if (update) {
			update(user, args)
			await user.save()
		}
		challenges = context.getUserInfo(user).challenges
	} catch (err) {
		console.log(err)
	}

	return { challenges }
}

module.exports = resolvers
