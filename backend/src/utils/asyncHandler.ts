// JS version of asyncHandler
// const asyncHandlerRaw = (func) => {
//   return async () => {
//     try {
//       await func();
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

import type { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

const asyncHandler = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error: ApiError | any) {
      next(error);
    }
  };
};

const asyncHandlerUsingPromises = (func: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler, asyncHandlerUsingPromises };
