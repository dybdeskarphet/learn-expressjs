const express = require("express"),
  bookRoutes = require("./routes/books.js");

const app = express();

// Middleware
app.use(express.json());

// Books
app.use("/books", bookRoutes);

// root

app.get("/", (req, res) => {
  res.send("This is a Library API");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
