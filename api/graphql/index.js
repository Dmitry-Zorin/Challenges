const app = require('../_utilities/app')

const port = process.env.PORT

const server = app.listen(() =>
	console.log(`Server is running on port: ${port}`),
)

module.exports = server
