const Mongoose = require('mongoose')


const CustomerSchema = new Mongoose.Schema({
    username:String,
    email: String,
    city:String,
    state:String,
    country:String,
    pincode:Number,
    amount: Number, 
    date:Date
})
const customerData = Mongoose.model("customer", CustomerSchema)

module.exports = customerData