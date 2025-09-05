import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User, type IUser } from "../model/user.model";
dotenv.config();

interface AuthRequest extends Request {
  user?: any; // you can replace `any` with a proper User type
}
interface JwtPayload {
  id?: string; // match what you put when signing the token
  iat?: number;
  exp?: number;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const payload = decoded as JwtPayload;
    const user: IUser | null = await User.findById(payload.id).select(
      "-password"
    );
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in auth middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    sameSite: "strict",
    secure: true,
  });
  res.status(200).json({ success: true, message: "user logout successfully" });
};
