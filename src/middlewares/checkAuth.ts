import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import IJwtToken from "../interfaces/JwtToken";
import { getToken } from "../utils";

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

  const newToken = getToken(token.id, token.email);

  res.locals.jwtPayload = token; // needed for other middlewares
  res.setHeader("authorization", newToken);
  next();
}
