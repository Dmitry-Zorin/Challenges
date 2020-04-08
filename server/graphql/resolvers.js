const glob = require('glob')
const { merge } = require('lodash')

const resolvers = glob.sync(__dirname + '/*/resolvers.js')
	.map(f => require(`.${f.match(/\/[^/]+\/[^/.]+(?=.js)/)}`))

module.exports = merge(...resolvers, require('./auth/resolvers'))
