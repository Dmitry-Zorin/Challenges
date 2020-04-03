const authenticate = ({ username, password }, context) => (
	context.authenticate('graphql-local', { username, password })
		.then(async ({ user }) => {
			await context.login(user)
			return { username: user.username }
		})
)

const authResolvers = {
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
					return { username: '' }
				})
		),
		logout: (_, __, context) => {
			context.logout()
			return { username: 'out' }
		},
	},
}

module.exports = authResolvers
