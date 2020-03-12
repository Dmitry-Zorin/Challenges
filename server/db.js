const mongoose = require("mongoose")

require("dotenv").config()

const connectToDb = () => {
  mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.once("open", () => {
    console.log("MongoDB database connection established successfully")
  })
}

module.exports = connectToDb