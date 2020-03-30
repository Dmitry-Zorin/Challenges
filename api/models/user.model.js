const mongoose = require('mongoose')
const Schema = mongoose.Schema

const challengeSchema = new Schema({
	name: { type: String, required: true },
	difficulty: { type: String, required: true },
	progress: { type: String, required: true },
	startDate: { type: Number, required: true },
	endDate: { type: Number, required: true },
}, {
	timestamps: true,
})

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: { type: String, required: true },
	challenges: { type: [challengeSchema], required: true },
}, {
	timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User
