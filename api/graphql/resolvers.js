const glob = require('glob')
const { merge } = require('lodash')

const resolverFiles = glob.sync(__dirname + '/*/resolvers.js')
const resolvers = merge(...resolverFiles.map(require))

module.exports = resolvers
