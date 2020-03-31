const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const app = express()

new ApolloServer({
	typeDefs: gql`
    type Query {
      user: Status!
    }
    type Status {
      isAuthorized: Boolean
    }
	`,
	resolvers: {
		Query: {
			user: () => ({ isAuthorized: false }),
		},
	},
})
.applyMiddleware({ app, path: '/api/graphql', cors: false })

app.listen(5000)
