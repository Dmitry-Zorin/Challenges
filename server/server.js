const connectToDb = require("./db")
const express = require("express")
const session = require("express-session")
const passport = require("./auth")
const { ApolloServer } = require("apollo-server-express")
const { buildContext } = require("graphql-passport")
const User = require("./models/user.model")
const MongoDBStore = require("connect-mongodb-session")(session)
const cors = require('cors')

require("dotenv").config()

connectToDb()

const app = express()

app.use(cors({
  origin:"http://localhost:8000",
  credentials: true,
}))
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  store: new MongoDBStore({
    uri: process.env.ATLAS_URI,
    collection: "sessions",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  //cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())

new ApolloServer({
  typeDefs: require("./schema"),
  resolvers: require("./resolvers"),
  context: ({ req, res }) =>
    buildContext({ req, res, User }),
}).applyMiddleware({ app, path: "/graphql", cors: false })

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
