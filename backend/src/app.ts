import express from "express";
import type { Request, Response, NextFunction } from "express";
import { globalErrorHandler } from "./utils/errorHandler";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware for parsing json
app.use(
  express.json({
    limit: "16kb",
  })
);

// middleware for parsing urlencoded bodies
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// middleware for serving static files
app.use(express.static("public"));

// middleware for enabling cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// middleware for parsing cookies
app.use(cookieParser());

//routes import

import userRouter from "./routes/user.routes";
import { ApiError } from "./utils/ApiError";

//routes declaration

app.use("/api/v1/users", userRouter);

// fallback route for invalid routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  throw new ApiError(404, `Can't find ${req.originalUrl} on this server`);
});

// global error handler
app.use(globalErrorHandler);

export { app };
