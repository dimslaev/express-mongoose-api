import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const getToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const getUserWithoutPassword = (user: User): Omit<User, "password"> => {
  // eslint-disable-next-line
  const { password, ...rest } = user;
  return rest;
};
