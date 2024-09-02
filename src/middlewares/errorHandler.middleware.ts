import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/errors/CustomError";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("[ErrorRequestHandler] " + error);
  if (error instanceof CustomError) {
    return res.status(error.StatusCode).json(error.serialize());
  }
  return res.status(400).json({ messager: "Something bad happend." });
};
