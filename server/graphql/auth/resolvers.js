const resolvers = {
	Query: {
		user: (_, __, context) => getUser(context),
	},
	Mutation: {
		signUp: (_, { username, password }, context) => (
			!username || !password ? { user: null }
				: context.User.findOne({ username })
					.then(async user => {
						// User already exists
						if (user) return { user: null }
						
						await new context.User({
							username, password, challenges: {},
						}).save()
						
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
			return getUser(context)
		},
	},
}

const getUser = (context) => ({
	user: context.getUserInfo(context.getUser()),
})

const authenticate = ({ username, password }, context) => (
	context.authenticate('graphql-local', { username, password })
		.then(async ({ user }) => {
			if (user) await context.login(user)
			return getUser(context)
		})
)

module.exports = resolvers
