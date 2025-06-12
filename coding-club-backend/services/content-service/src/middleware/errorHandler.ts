import { ErrorRequestHandler } from "express";
import { logError } from "../utils/logger";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logError(`❌ Error: ${err.message}`);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;