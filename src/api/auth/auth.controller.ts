import { Request, Response } from "express";
import { User } from "@prisma/client";
import * as userService from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { getToken } from "../../utils";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send();
  }

  let user: User | null = null;
  try {
    user = await userService.find(email);
  } catch (err) {
    console.log(err);
    return res.status(401).send();
  }

  const passwordsMatch = await bcrypt.compare(password, user?.password || "");

  if (!passwordsMatch) {
    return res.status(401).send();
  }

  res.setHeader("authorization", getToken(user?.id || "", email));
  res.status(200).send();
};

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send();
  }

  let user: User | null = null;
  try {
    user = await userService.create({ email, password, role: "USER" });
  } catch (err) {
    return res.status(500).send();
  }

  res.setHeader("authorization", getToken(user?.id || "", email));
  res.status(201).send();
};

export const changePassword = async (req: Request, res: Response) => {
  const { id, password } = req.body;

  if (!(id && password)) {
    return res.status(400).send();
  }

  let user: User | null = null;
  try {
    user = await userService.get(id);
  } catch (err) {
    return res.status(401).send();
  }

  try {
    await userService.update(req.body);
  } catch (err) {
    return res.status(500).send();
  }

  res.setHeader("authorization", getToken(id, user?.email || ""));
  res.status(200).send();
};
