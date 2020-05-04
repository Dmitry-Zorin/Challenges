const { challengeGroups } = require('../../settings.json')

// TODO: Validate input

const resolvers = {
	Mutation: {
		challengeAdd: (...args) => (
			getUpdatedChallenges(args, ({ challenges }, { challenge }) => {
				addChallenge(challenges, challenge)
			})
		),
		challengeStart: (...args) => (
			getUpdatedChallenges(args, (user, { id }) => {
				const { challenges } = user
				const challenge = findChallenge(challenges.upcoming, id)
				const now = new Date().getTime()
				
				deleteChallenge(user, id, ['upcoming'])
				challenges.ongoing.push(
					Object.assign(challenge, {
						startDate: now,
						endDate: now + challenge.endDate - challenge.startDate,
					}),
				)
			})
		),
		challengeComplete: (...args) => (
			getUpdatedChallenges(args, (user, { id }) => {
				const { challenges } = user
				const ongoing = findChallenge(challenges.ongoing, id)
				const challenge = ongoing || findChallenge(challenges.upcoming, id)
				const now = new Date().getTime()
				
				deleteChallenge(user, id, [ongoing ? 'ongoing' : 'upcoming'])
				challenges.completed.push(
					Object.assign(challenge, {
						startDate: Math.min(challenge.startDate, now),
						endDate: now,
					}),
				)
			})
		),
		challengeDelete: (...args) => (
			getUpdatedChallenges(args, (user, { id }) => {
				deleteChallenge(user, id)
			})
		),
		challengeEdit: (...args) => (
			getUpdatedChallenges(args, (user, { id, challenge }) => {
				deleteChallenge(user, id)
				addChallenge(user.challenges, challenge)
			})
		),
	},
}

const addChallenge = (challenges, { name, difficulty, duration, delay }) => {
	const now = new Date().getTime()
	challenges[delay ? 'upcoming' : 'ongoing'].push({
		difficulty,
		name: name.slice(0, 250),
		startDate: now + delay,
		endDate: now + delay + duration,
	})
}

const deleteChallenge = (user, id, groups = challengeGroups) => {
	for (const g of groups) {
		user.challenges[g] = user.challenges[g]
			.filter(c => c._id.toString() !== id)
	}
}

const findChallenge = (group, id) => (
	group.find(c => c._id.toString() === id)
)

const getUpdatedChallenges = ([obj, args, context], update) => {
	const user = context.getUser()
	let challenges = null
	
	try {
		if (update) {
			update(user, args)
			user.save().catch(err => console.log(err))
		}
		challenges = context.getUserInfo(user).challenges
	}
	catch (err) {
		console.log(err)
	}
	return { challenges }
}

module.exports = resolvers
