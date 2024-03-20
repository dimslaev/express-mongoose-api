import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import { omitPassword } from "../../utils";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.getAll();
    res.json(result.map(omitPassword));
  } catch (err) {
    next(err);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.get(req.params.id);
    res.json(omitPassword(result));
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
    res.status(201).json(omitPassword(result));
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
    res.json(omitPassword(result));
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
    await userService.remove(req.params.id);
    res.json({});
  } catch (err) {
    next(err);
  }
};
