import express, { Request, Response } from "express";
import { IBook, Book } from "../models/Book";
import { connectDB } from "../db";
import path from "path";
import NodeCache from "node-cache";

const router = express.Router();
connectDB(path.basename(__filename));
const bookCache = new NodeCache({ stdTTL: 100 });

// Books in JSON
router.get("/", async (req: Request, res: Response) => {
  const pageOptions = {
    page: parseInt(req.query.page as string, 10) || 1,
    limit: parseInt(req.query.limit as string, 10) || 10,
  };

  const cacheKey = `data-page-${pageOptions.page}`;
  const cachedData = bookCache.get(cacheKey);

  if (cachedData) {
    res.json({ cached: true, data: cachedData });
  } else {
    try {
      const books = await Book.find()
        .skip(pageOptions.limit * (pageOptions.page - 1))
        .limit(pageOptions.limit);

      bookCache.set(cacheKey, books);
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Error getting the book list", error });
    }
  }
});

// Get book by ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);
    book ? res.json(book) : res.status(404).json({ message: "Book not found" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error getting the book by ID", error });
    return;
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      res.status(400).json("Title and author is required!");
    }

    const newBook = new Book({ title, author });
    await newBook.save();
    res.status(201).json(newBook);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error adding book to the DB", error });
    return;
  }
});

// TODO: Update the only given fields instead of needing to update all fields
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
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

    updatedBook
      ? res.json(updatedBook)
      : res.status(404).json({ message: "Book not found" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Cannot update the book by ID", error });
    return;
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    deletedBook
      ? res.json(deletedBook)
      : res.status(404).json({ message: "Book not found" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Cannot delete the book by ID", error });
    return;
  }
});

export { router as bookRoutes };
