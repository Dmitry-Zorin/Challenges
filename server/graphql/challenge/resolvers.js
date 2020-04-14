const { challengeGroups } = require('../../../src/data/settings.json')

// TODO: Validate input

const resolvers = {
	Query: {
		challenges: (...args) => getUpdatedChallenges(args),
	},
	Mutation: {
		challengeAdd: (...args) => (
			getUpdatedChallenges(args, (user, { challenge }) => {
				addChallenge(user, challenge)
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
						endDate: now + challenge.endDate - challenge.startDate,
						startDate: now,
					}),
				)
			})
		),
		challengeComplete: (...args) => (
			getUpdatedChallenges(args, (user, { id }) => {
				const { challenges } = user
				const ongoing = findChallenge(challenges.ongoing, id)
				const challenge = ongoing || findChallenge(challenges.upcoming, id)
				
				deleteChallenge(user, id, [ongoing ? 'ongoing' : 'upcoming'])
				challenges.completed.push(
					Object.assign(challenge, {
						endDate: new Date().getTime(),
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
				addChallenge(user, challenge)
			})
		),
	},
}

const addChallenge = (user, challenge) => {
	const { challenges } = user
	let { name, difficulty, duration, delay } = challenge
	const now = new Date().getTime()
	
	name = name.slice(0, 250)
	challenges[delay ? 'upcoming' : 'ongoing'].push({
		name, difficulty,
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
