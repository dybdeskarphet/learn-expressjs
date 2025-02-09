import express, { Express, Request, Response } from "express";
import { bookRoutes } from "./routes/books";
import { authRoutes } from "./routes/auth";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());

// Books
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);

// Root
app.get("/", (req: Request, res: Response) => {
  res.send("This is a Library API");
});

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
