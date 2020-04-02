const mongoose = require('mongoose')

mongoose.connect(process.env.ATLAS_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
}).catch(console.log)
