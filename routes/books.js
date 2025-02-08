const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const connectDB = require("../db");

connectDB();

// Books in JSON
router.get("/", async (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 1,
    limit: parseInt(req.query.limit, 10) || 1,
  };

  try {
    const books = await Book.find()
      .skip(pageOptions.limit * (pageOptions.page - 1))
      .limit(pageOptions.limit);

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error getting the book list", error });
  }
});

// Get book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    return book
      ? res.json(book)
      : res.status(404).json({ message: "Book not found" });
  } catch (error) {
    res.status(500).json({ message: "Error getting the book by ID", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      res.status(400).json("Title and author is required!");
    }

    const newBook = new Book({ title, author });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error adding book to the DB", error });
  }
});

// TODO: Update the only given fields instead of needing to update all fields
router.put("/:id", async (req, res) => {
  try {
    const { title, author } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
      },
      { new: true, runValidators: true },
    );

    return updatedBook
      ? res.json(updatedBook)
      : res.status(404).json({ message: "Book not found" });
  } catch (error) {
    res.status(500).json({ message: "Cannot update the book by ID", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    return deletedBook
      ? res.json(deletedBook)
      : res.status(404).json({ message: "Book not found" });
  } catch (error) {
    res.status(500).json({ message: "Cannot delete the book by ID", error });
  }
});

module.exports = router;
