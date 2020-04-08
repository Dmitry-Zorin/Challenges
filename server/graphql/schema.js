const glob = require('glob')
const { gql } = require('apollo-server-express')

const defaultSchema = gql`
  type Query { _: Boolean }
  type Mutation { _: Boolean }
`

const schemas = glob.sync(__dirname + '/*/schema.js')
  .map(f => require(`.${f.match(/\/[^/]+\/[^/.]+(?=.js)/)}`))

const schema = [defaultSchema, require('./auth/schema'), require('./challenge/schema'), ...schemas]

module.exports = schema
