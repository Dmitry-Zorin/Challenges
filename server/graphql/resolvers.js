const glob = require('glob')
const { merge } = require('lodash')

const resolvers = glob.sync(__dirname + '/*/resolvers.js')
	.map(f => require(`../graphql/${f.match(/\/[^/]+\/[^/.]+(?=.js)/)}`))

module.exports = merge(...resolvers)
