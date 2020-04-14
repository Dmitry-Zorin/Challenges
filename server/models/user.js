const { Schema, model } = require('mongoose')

const challengeSchema = new Schema({
	name: { type: String, required: true },
	difficulty: { type: String, required: true },
	startDate: Number,
	endDate: Number,
}, {
	timestamps: true,
})

const challengesSchema = new Schema({
	ongoing: { type: [challengeSchema], required: true },
	upcoming: { type: [challengeSchema], required: true },
	completed: { type: [challengeSchema], required: true },
}, {
	timestamps: true,
})

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	challenges: { type: challengesSchema, required: true },
}, {
	timestamps: true,
})

module.exports = model('User', userSchema)
