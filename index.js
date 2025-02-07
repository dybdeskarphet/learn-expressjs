const express = require("express");
const app = express();
const connectDB = require("./db.js");
const bookRoutes = require("./routes/books.js");

connectDB();


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
