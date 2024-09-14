import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/errors/CustomError";
import logger from "../configs/logger.config";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("[ErrorRequestHandler] " + err);
  if (err instanceof CustomError) {
    return res.status(err.StatusCode).json({
      status: "Error",
      message: err.message,
      error: err,
    });
  }

  return res.status(400).json({
    status: "Error",
    message: "Something bad happend.",
    error: err,
  });
};
