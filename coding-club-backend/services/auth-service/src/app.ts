import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import requestLogger from "./middleware/requestLogger";
import errorHandler from "./middleware/errorHandler";
import config from "./config/env";
import auth from "./lib/auth";
import { toNodeHandler } from "better-auth/node";

const app = express();

app.use(requestLogger);

app.use(
  cors({
    origin: config.CLIENT_URL, // Allow requests from your frontend
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
    credentials: true,
  })
);
/**
 * Better Auth route handler for /api/auth/*.
 */
app.all("/api/auth/*", (req: Request, res: Response, next: NextFunction) => {
  try {
    toNodeHandler(auth)(req, res);
  } catch (error) {
    console.error("Better Auth Handler Error:", error);
    res.status(500).json({
      error: "Authentication service error",
      message:
        process.env.NODE_ENV === "development"
          ? (typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error))
          : "Internal server error",
    });
  }
});


// app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Healthy" });
});

// app.use(errorHandler);

export default app;
