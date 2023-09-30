const Mongoose = require('mongoose')


const SignupSchema = new Mongoose.Schema({
    username:{ type:String, required:true},
    email: { type:String, required:true},
    password: String,
    confirmPassword: String
})
const SignupData = Mongoose.model("signup", SignupSchema)

module.exports = SignupData