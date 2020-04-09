// TODO: Check input data

const resolvers = {
	Query: {
		challenges: (...args) => getUpdatedChallenges(args),
	},
	Mutation: {
		challengeAdd: (...args) => (
			getUpdatedChallenges(args, (user, { challenge }) => {
				challenge.name = challenge.name.slice(0, 250)
				user.challenges.push(challenge)
			})
		),
		challengeEdit: (...args) => (
			getUpdatedChallenges(args, (user, { id, challenge }) => {
				Object.assign(findChallenge(user, id), challenge)
			})
		),
		challengeDelete: (...args) => (
			getUpdatedChallenges(args, (user, { id }) => {
				user.challenges = user.challenges.filter(c => c._id.toString() !== id)
			})
		),
		challengeStart: (...args) => (
			getUpdatedChallenges(args, (user, { id }) => {
				const c = findChallenge(user, id)
				const now = new Date().getTime()
				
				c.endDate -= c.startDate - now
				c.startDate = now
			})
		),
		challengeComplete: (...args) => (
			getUpdatedChallenges(args, (user, { id }) => {
				const c = findChallenge(user, id)
				c.startDate = c.endDate = new Date().getTime()
			})
		),
	},
}

const getUpdatedChallenges = ([obj, args, context], update) => {
	const user = context.getUser()
	let challenges = null
	
	if (user) {
		if (update) {
			try {
				update(user, args)
				user.save()
			}
			catch (err) {
				console.log(err)
			}
		}
		challenges = context.getUserInfo(user).challenges
	}
	return { challenges }
}

const findChallenge = (user, id) => (
	user.challenges.find(c => c._id.toString() === id)
)

module.exports = resolvers
