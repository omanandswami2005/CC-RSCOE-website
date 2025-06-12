import ApiError from "../utils/ApiError";
import { config } from "dotenv";
import { logError } from "../utils/logger"; // Import logger
config();
import { fromNodeHeaders } from "better-auth/node";
import auth from "../lib/auth"; // Your Better Auth instance
import { Request, Response, NextFunction } from "express";

/**
 * Authentication middleware function.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to call.
 * @return void
 */
async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (session) {
    // console.log(session);
    (req as any).user = session.user;
    next();
  } else {
    logError("No session found");
    next(new ApiError(401, "Unauthorized"));
  }
}

export default authMiddleware;
