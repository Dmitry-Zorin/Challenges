const mongoose = require('mongoose')

mongoose.connect(process.env.ATLAS_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})
	.catch(err => console.log(err))

mongoose.connection.once('open', () => {
	console.log('MongoDB database connection established successfully')
})
