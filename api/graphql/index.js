const app = require('../_utilities/app')
const { db } = require('../_utilities/db')

const port = process.env.PORT

const server = db.once('open', () => {
	console.log('MongoDB database connection established successfully')
	app.listen(port, () =>
		console.log(`Server is running on port: ${port}`),
	)
})

module.exports = server
