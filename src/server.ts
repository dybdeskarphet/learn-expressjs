import express, { Express, Request, Response } from "express";
import { bookRoutes } from "./routes/books";
import { authRoutes } from "./routes/auth";
import { privateRoutes } from "./routes/private";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";

dotenv.config();

const app: Express = express();

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// Middleware
app.use(limiter);
app.use(express.json());

// Add routes
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/private", privateRoutes);

// Root
app.get("/", (req: Request, res: Response) => {
  res.send("This is a Library API");
});

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
