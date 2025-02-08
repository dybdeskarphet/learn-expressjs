const mg = require("mongoose");

const bookSchema = new mg.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

const Book = mg.model("Book", bookSchema);

module.exports = Book;
