const app = require('../_utilities/app')

const port = process.env.PORT

app.listen(port, () =>
	console.log(`Server is running on port: ${port}`),
)
