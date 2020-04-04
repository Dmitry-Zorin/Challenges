const authenticate = ({ username, password }, context) => (
	context.authenticate('graphql-local', { username, password })
		.then(async ({ user }) => {
			await context.login(user)
			return { user }
		})
)

const authResolvers = {
	Query: {
		user: (_, __, context) => (
			{ user: context.getUser() }
		),
	},
	Mutation: {
		signUp: (_, { username, password }, context) => (
			context.User.findOne({ username })
				.then(async user => {
					if (user) return null

					await new context.User({ username, password }).save()
					return authenticate({ username, password }, context)
				})
				.catch(console.log)
		),
		login: (_, { username, password }, context) => (
			authenticate({ username, password }, context)
				.catch(err => {
					console.log(err)
					return { user: {} }
				})
		),
		logout: (_, __, context) => {
			context.logout()
			return { user: {} }
		},
	},
}

module.exports = authResolvers
