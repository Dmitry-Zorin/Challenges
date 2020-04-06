const { Schema, model } = require('mongoose')

const challengeSchema = new Schema({
	name: { type: String, required: true },
	difficulty: { type: String, required: true },
	startDate: { type: Number, required: true },
	endDate: { type: Number, required: true },
}, {
	timestamps: true,
})

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	challenges: { type: [challengeSchema], required: true },
}, {
	timestamps: true,
})

module.exports = model('User', userSchema)
