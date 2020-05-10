import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "types/user";

type AccessTokenData = {
  /**
   * Unique id of the signed-in user.
   */
  id: string;

  /**
   * Username of the signed-in user.
   */
  userName: string;

  /**
   * Email address of the signed-in user.
   */
  email: string;
}

export default class TokenService {
  
}



/**
 * Middleware for authenticating the access token.
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (error, user) => {
        if (error) {
          return res.status(403).send("Invalid access token");
        }

        (req as any).user = user;
        next();
      }
    );
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

export const generateAccessToken = (data: AccessTokenData): string => {
  return jwt.sign(
    data,
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );
}

export const generateRefreshToken = (data: AccessTokenData): string => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET as string)
}
