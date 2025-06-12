// utils/asyncHandler.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Async handler middleware to handle asynchronous functions.
 *
 * @param fn - The asynchronous function to execute.
 * @returns A middleware function with error handling for async operations.
 */
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;