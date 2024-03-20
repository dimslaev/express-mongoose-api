import prisma from "../../prisma";
import { User } from "@prisma/client";
import * as bcrypt from "bcryptjs";

export const getAll = (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const get = (id: string): Promise<User> => {
  return prisma.user.findUniqueOrThrow({ where: { id } });
};

export const find = (email: string): Promise<User> => {
  return prisma.user.findUniqueOrThrow({ where: { email } });
};

export const create = (data: Omit<User, "id">): Promise<User> => {
  return prisma.user.create({
    data: {
      ...data,
      password: bcrypt.hashSync(data.password, 8),
    },
  });
};

export const update = ({ id, ...data }: User): Promise<User> => {
  return prisma.user.update({ where: { id }, data });
};

export const remove = (id: string): Promise<User> => {
  return prisma.user.delete({ where: { id } });
};
