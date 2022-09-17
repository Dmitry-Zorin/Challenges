const glob = require('glob')
const { merge } = require('lodash')

const resolvers = glob
	.sync(__dirname + '/*/resolvers.js')
	.map((f) => require(`./${f.match(/[^/]+\/[^/]+$/)}`))

module.exports = merge(...resolvers)
