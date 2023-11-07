import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { IJwtToken, ErrorResponse } from "./interfaces";
import { freshToken } from "./utils";
import { get as getUser } from "./api/user/user.service";
import { User } from "./api/user/user.model";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization?.split(" ")[1];

  if (!authToken) {
    return res.sendStatus(401);
  }

  let token: IJwtToken;

  try {
    token = jwt.verify(authToken, process.env.JWT_SECRET!) as IJwtToken;
  } catch (err) {
    return res.status(403);
  }

  const newToken = freshToken(token.id, token.email);

  res.locals.jwtPayload = token; // needed for other middlewares
  res.setHeader("authorization", newToken);
  next();
}

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const jwtPayload: IJwtToken = res.locals.jwtPayload;

    let user: Omit<User, "id"> | null = null;
    try {
      user = await getUser(jwtPayload.id);
    } catch (id) {
      res.status(401).send();
    }

    if (user && roles.indexOf(user.role) > -1) {
      next();
    } else {
      res.status(401).send();
    }
  };
};

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
}
