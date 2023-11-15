import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JwtToken } from "./interfaces";
import { getToken } from "./utils";
import { get as getUser } from "./api/user/user.service";
import { User } from "@prisma/client";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization?.split(" ")[1];

  if (!authToken) {
    return res.sendStatus(401);
  }

  let token: JwtToken;

  try {
    token = jwt.verify(authToken, process.env.JWT_SECRET!) as JwtToken;
  } catch (err) {
    return res.status(403);
  }

  const newToken = getToken(token.id, token.email);

  res.locals.jwtPayload = token; // needed for other middlewares
  res.setHeader("authorization", newToken);
  next();
}

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const jwtPayload: JwtToken = res.locals.jwtPayload;

    let user: User | null = null;
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
