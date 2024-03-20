import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const getToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const comparePassword = (password: string, compare: string) => {
  return bcrypt.compare(password, compare);
};

export const omitPassword = (user: User): Omit<User, "password"> => {
  // eslint-disable-next-line
  const { password, ...rest } = user;
  return rest;
};
