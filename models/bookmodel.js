 const { name } = require("ejs");
const mongoose = require("mongoose")



 const bookModel = new mongoose.Schema({
    poster: String,
    name: String,
    author: String,
    isbn: String,
    price: Number,
    description: String,
 });

 const bookCollection = mongoose.model("book", bookModel);

 module.exports = bookCollection