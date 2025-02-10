import express, { Request, Response } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { User } from "../models/User";

const router = express.Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.send(`Welcome ${user.username}`);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while accessing to the private:", error });
    return;
  }
});

router.get("/test", authMiddleware, async (req: Request, res: Response) => {
  try {
    res.send("This is the test page");
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while accessing to the private:", error });
    return;
  }
});

export { router as privateRoutes };
