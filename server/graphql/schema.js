const glob = require('glob')
const { gql } = require('apollo-server-express')

const defaultSchema = gql`
  type Query { _: Boolean }
  type Mutation { _: Boolean }
`

const schemas = glob.sync(__dirname + '/*/schema.js')
	.map(f => require(`../graphql/${f.match(/\/[^/]+\/[^/.]+(?=.js)/)}`))

const schema = [defaultSchema, ...schemas]

module.exports = schema
