const Mongoose = require('mongoose')

const AdminSignupSchema = new Mongoose.Schema({
    username: String,
    email: String,
    password: String
})
const AdminData = Mongoose.model("admin_signup", AdminSignupSchema)

module.exports = AdminData
