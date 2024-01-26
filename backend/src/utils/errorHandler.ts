import type { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError";

interface CustomError extends Error {
  statusCode: number;
}

const globalErrorHandler = (
  err: CustomError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Global error handler");

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err,
    });
  }

  res.status(500).json({
    statusCode: 500,
    message: err?.message || "Internal server error",
    success: false,
    data: null,
    stack: err?.stack || "",
  });
};

export { globalErrorHandler };
