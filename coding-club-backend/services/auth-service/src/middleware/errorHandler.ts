// middlewares/errorHandler.ts
import { logError } from '../utils/logger';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

interface MongoError extends Error {
  code?: number;
  keyPattern?: Record<string, any>;
}

interface CustomError extends Error {
  status?: number;
}

/**
 * Middleware function to handle errors.
 *
 * @param err - The error object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
const errorHandler: ErrorRequestHandler = (
  err: CustomError | MongoError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logError(
    `${(err as CustomError).status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  // logError(err.stack || 'No stack trace available');

  // Check for duplicate key error (MongoDB)
  if ((err as MongoError).code && (err as MongoError).code === 11000) {
    const mongoErr = err as MongoError;
    const field = Object.keys(mongoErr.keyPattern || {})[0];
    const errorMessage = `${field} already exists`;

    res.status(400).json({
      success: false,
      error: errorMessage,
    });
    return;
  }

  res.status((err as CustomError).status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
};

export default errorHandler;