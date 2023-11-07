import { Request, Response } from "express";
import { TUser } from "../user/user.model";
import * as userService from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { freshToken } from "../../utils";

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send();
  }

  let user: TUser | null = null;
  try {
    user = await userService.find(email, true);
  } catch (err) {
    return res.status(401).send();
  }

  const passwordsMatch = await bcrypt.compare(password, user?.password || "");

  if (!passwordsMatch) {
    return res.status(401).send();
  }

  res.setHeader("authorization", freshToken(user?._id || "", email));
  res.status(200).send();
}

async function signup(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send();
  }

  let user: TUser | null = null;
  try {
    user = await userService.create({ email, password, role: "default" });
  } catch (err) {
    return res.status(500).send();
  }

  res.setHeader("authorization", freshToken(user?._id || "", email));
  res.status(201).send();
}

async function changePassword(req: Request, res: Response) {
  const { id, password } = req.body;

  if (!(id && password)) {
    return res.status(400).send();
  }

  let user: TUser | null = null;
  try {
    user = await userService.get(id);
  } catch (err) {
    return res.status(401).send();
  }

  try {
    await userService.update(id, {
      email: user?.email || "",
      role: user?.role || "default",
      password,
    });
  } catch (err) {
    return res.status(500).send();
  }

  res.setHeader("authorization", freshToken(id, user?.email || ""));
  res.status(200).send();
}

export { login, signup, changePassword };
