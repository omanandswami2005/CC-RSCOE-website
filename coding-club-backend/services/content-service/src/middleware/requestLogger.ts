import { Request, Response, NextFunction } from "express";
import { logInfo } from "../utils/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logInfo(`📡 [${req.method}] ${req.originalUrl}`);
  next();
};

export default requestLogger;