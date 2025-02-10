import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token || !(typeof token === "string")) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    req.userId = decoded.userId as string;
    next();
  } catch (error: any) {
    if (error.name === "UnauthoriezError") {
      res.status(401).send({ message: "Access denied. Invalid token:", error });
    } else {
      res.status(401).send({ message: "Error while verifying token:", error });
    }
  }
};

export default authMiddleware;
