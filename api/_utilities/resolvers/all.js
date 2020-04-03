const lodash = require('lodash')
const authResolvers = require('./auth')
const challengeResolvers = require('./challenge')

module.exports = lodash.merge({}, authResolvers, challengeResolvers)
