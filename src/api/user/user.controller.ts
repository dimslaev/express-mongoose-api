import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import { getUserWithoutPassword } from "../../utils";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.getAll();
    res.json(result.map(getUserWithoutPassword));
  } catch (err) {
    next(err);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.get(req.params.id);
    res.json(getUserWithoutPassword(result));
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.create(req.body);
    res.status(201).json(getUserWithoutPassword(result));
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.update(req.body);
    res.json(getUserWithoutPassword(result));
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.json(await userService.remove(req.params.id));
  } catch (err) {
    next(err);
  }
};
