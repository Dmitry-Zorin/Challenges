const authenticate = ({ username, password }, context) => (
	context.authenticate('graphql-local', { username, password })
		.then(async ({ user }) => {
			if (user) await context.login(user)
			return { user: user || null }
		})
)

const authResolvers = {
	Query: {
		user: (_, __, context) => (
			{ user: context.getUser() || null }
		),
	},
	Mutation: {
		signUp: (_, { username, password }, context) => (
			context.User.findOne({ username })
				.then(async user => {
					if (user) return { user: null }

					await new context.User({ username, password }).save()
					return authenticate({ username, password }, context)
				})
				.catch(console.log)
		),
		login: (_, { username, password }, context) => (
			authenticate({ username, password }, context)
				.catch(console.log)
		),
		logout: (_, __, context) => {
			context.logout()
			return { user: null }
		},
	},
}

module.exports = authResolvers
