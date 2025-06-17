import { Request, Response, NextFunction } from "express";
import { IError } from "@/types";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // Handle custom errors
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      success: false,
      error: err.message,
      code: err.code,
    });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: err.message,
    });
  }

  // Default server error
  return res.status(500).json({
    success: false,
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

export class CustomError extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.status = status;
    if (code !== undefined) {
      this.code = code;
    }
    this.name = "CustomError";
  }
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(
    `Not found - ${req.originalUrl}`,
    404,
    "NOT_FOUND"
  );
  next(error);
}; 