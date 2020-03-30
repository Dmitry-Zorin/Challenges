const lodash = require('lodash')
const auth = require('./auth')
const challenge = require('./challenge')

module.exports = lodash.merge({}, auth, challenge)
