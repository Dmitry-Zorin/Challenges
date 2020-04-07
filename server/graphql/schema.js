const glob = require('glob')
const { gql } = require('apollo-server-express')

const defaultSchema = gql`
  type Query { _: Boolean }
  type Mutation { _: Boolean }
`

const schemaFiles = glob.sync(__dirname + '/*/schema.js')
const schema = [defaultSchema, ...schemaFiles.map(require)]

module.exports = schema
