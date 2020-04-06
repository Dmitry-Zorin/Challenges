const { connect: connectToDb } = require('mongoose')
const { buildContext } = require('graphql-passport')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const User = require('./models/user')
const getUserInfo = require('./src/user-info')
const app = require('./src/app')

connectToDb(process.env.ATLAS_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
}).catch(console.log)

const context = ({ req, res }) => (
	buildContext({ req, res, User, getUserInfo })
)
new ApolloServer({ typeDefs, resolvers, context })
	.applyMiddleware({ app, path: '/api', cors: false })

app.listen(process.env.PORT)
