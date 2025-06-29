import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction
) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);

  if (err instanceof CustomError) {
    return res.status(err.status).json({
      success: false,
      error: err.message,
      code: err.code,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: err.message,
    });
  }

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