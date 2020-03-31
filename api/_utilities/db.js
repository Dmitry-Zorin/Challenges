const mongoose = require('mongoose')

mongoose.connect(process.env.ATLAS_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})
	.catch(err => console.log(err))

const db = mongoose.connection

exports.db = db
