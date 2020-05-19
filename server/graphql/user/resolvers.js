const resolvers = {
	Query: {
		user: (_, __, context) => getUser(context),
	},
	Mutation: {
		signUp: (_, { username, password }, context) => (
			!(username && password) ? { user: null }
				: context.User.findOne({ username })
					.then(async user => {
						if (user) return { user: null }
						
						await new context.User({
							username,
							password,
							challenges: {},
							settings: {}
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
		settingsEdit: (_, { settings }, context) => {
			const user = context.getUser()
			user.settings = Object.assign(user.settings, settings)
			
			return user.save()
				.then(() => ({ settings: user.settings }))
				.catch(console.log)
		},
	},
}

const authenticate = ({ username, password }, context) => (
	context.authenticate('graphql-local', { username, password })
		.then(async ({ user }) => {
			if (user) await context.login(user)
			console.log(getUser(context))
			return getUser(context)
		})
)

const getUser = (context) => ({
	user: context.getUserInfo(context.getUser()),
})

module.exports = resolvers
