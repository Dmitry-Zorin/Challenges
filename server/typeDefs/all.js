const { gql } = require('apollo-server-express')
const auth = require('./auth')
const challenge = require('./challenge')

const all = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`

module.exports = [all, auth, challenge]
