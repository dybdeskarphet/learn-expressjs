import express, { Request, Response } from "express";
import { IUser, User } from "../models/User";
import { connectDB } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

const router = express.Router();
dotenv.config();
connectDB(path.basename(__filename));

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(201).json({
      message:
        "This is the auth part of the API, please use the register and login routes",
    });
  } catch (error) {
    res.status(500).json({ message: "Error using the auth route", error });
  }
});

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error registering a user", error });
    return;
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
    );

    res.json({ token });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error logging in as a user", error });
    return;
  }
});

export { router as authRoutes };
