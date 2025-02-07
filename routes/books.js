const express = require("express");
const router = express.Router();

// Books Example
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
];

// Books in JSON
router.get("/", (req, res) => {
  res.json(books);
});

// Get book by ID
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("Book not found.");
  }
  res.json(book);
});

router.post("/", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).send("Title and author is required!");
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

router.put("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("Book not found.");
  }
  const { title, author } = req.body;
  book.title = title;
  book.author = title;
  res.json(book);
});

router.delete("/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    res.send("Book not found!");
  }

  books.slice(bookIndex, 1);
  res.status(204).send();
});

module.exports = router;
