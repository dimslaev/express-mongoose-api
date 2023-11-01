import { Request, Response, NextFunction } from "express";
import IJwtToken from "../interfaces/JwtToken";
import { get as getUser } from "../api/user/user.service";
import { TUser } from "../api/user/user.model";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const jwtPayload: IJwtToken = res.locals.jwtPayload;

    let user: Omit<TUser, "id"> | null = null;
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
