const mongoose = require("mongoose")
const Schema = mongoose.Schema

const challengeSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  progress: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
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

const User = mongoose.model("User", userSchema)

module.exports = User
