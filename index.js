const express = require("express");
const app = express();

let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
];

// Middleware
app.use(express.json());

// Homepage
app.get("/", (req, res) => {
  res.send("Hey, this is a library API, use the endpoints.");
});

// Books in JSON
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Get book by ID
app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("Book not found.");
  }
  res.json(book);
});

app.post("/api/books", (req, res) => {
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

app.put("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("Book not found.");
  }
  const { title, author } = req.body;
  book.title = title;
  book.author = title;
  res.json(book);
});

app.delete("/api/books/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    res.send("Book not found!");
  }

  books.slice(bookIndex, 1);
  res.status(204).send();
});

const port = 3000;

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
