import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
    (req as any).user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}