import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  email: string;
  isAdmin?: boolean;
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  
  if (!token) {
    res.status(401).json({ message: "Unauthorized: Invalid token format" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

export const adminMiddleware: RequestHandler = (req, res, next) => {
  const user = (req as any).user;
  
  if (!user || !user.isAdmin) {
    res.status(403).json({ message: "Access denied. Admin privileges required." });
    return;
  }
  
  next();
};