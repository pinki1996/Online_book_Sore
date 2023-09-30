const Mongoose = require('mongoose')

const BookSchema = new Mongoose.Schema({
    bookId:Number,
    bookName: String,
    bookImage: String,
    bookAuthor: String,
    bookDesc:String,
    bookPrice:Number
})
const BookModel = Mongoose.model("book_details", BookSchema)

module.exports = BookModel