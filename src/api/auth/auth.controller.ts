import { Request, Response } from "express";
import User, { TUserDoc } from "../user/user.model";
import {
  get as getUser,
  create as createUser,
  update as updateUser,
} from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { getToken } from "../../utils";

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send();
  }

  let user: TUserDoc | null = null;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return res.status(401).send();
  }

  const passwordsMatch = await bcrypt.compare(password, user?.password || "");

  if (!passwordsMatch) {
    return res.status(401).send();
  }

  const token = getToken(user?._id || "", email);
  res.setHeader("authorization", token);
  res.status(200).send();
}

async function signup(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send();
  }

  let user: TUserDoc | null = null;
  try {
    user = await createUser({ email, password, role: "default" });
  } catch (err) {
    return res.status(500).send();
  }

  const token = getToken(user?._id || "", email);
  res.setHeader("authorization", token);
  res.status(201).send();
}

async function changePassword(req: Request, res: Response) {
  const { id, password } = req.body;

  if (!(id && password)) {
    return res.status(400).send();
  }

  let user: TUserDoc | null = null;
  try {
    user = await getUser(id);
  } catch (err) {
    return res.status(401).send();
  }

  try {
    await updateUser(id, {
      email: user?.email || "",
      role: user?.role || "default",
      password,
    });
  } catch (err) {
    return res.status(500).send();
  }

  const token = getToken(id, user?.email || "");
  res.setHeader("authorization", token);
  res.status(200).send();
}

export { login, signup, changePassword };
