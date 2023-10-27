import { NextFunction, Request, Response } from "express";

import ErrorResponse from "./interfaces/ErrorResponse";

export function errorHandler(
  err: Error,
  // eslint-disable-next-line
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line
  next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
}
