const express = require("express"),
  bookRoutes = require("./routes/books.js");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Books
app.use("/books", bookRoutes);

// root

app.get("/", (req, res) => {
  res.send("This is a Library API");
});

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
