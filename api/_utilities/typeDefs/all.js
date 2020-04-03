const { gql } = require('apollo-server-express')
const authTypeDefs = require('./auth')
const challengeTypeDefs = require('./challenge')

const allTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`

module.exports = [allTypeDefs, authTypeDefs, challengeTypeDefs]
