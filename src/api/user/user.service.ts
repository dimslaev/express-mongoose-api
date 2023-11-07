import * as bcrypt from "bcryptjs";
import { User, UserModel } from "./user.model";

export const getAll = async (withPassword = false) => {
  return UserModel.find().select(withPassword ? {} : "-password");
};

export const get = async (_id: string, withPassword = false) => {
  return UserModel.findOne({ _id }).select(withPassword ? {} : "-password");
};

export const find = async (email: string, withPassword = false) => {
  return UserModel.findOne({ email }).select(withPassword ? {} : "-password");
};

export const create = async (data: User) => {
  return new UserModel({
    ...data,
    password: bcrypt.hashSync(data.password, 8),
  }).save();
};

export const update = async (id: string, data: User, withPassword = false) => {
  return UserModel.findOneAndUpdate({ _id: id }, data, {
    returnDocument: "after",
  }).select(withPassword ? {} : "-password");
};

export const remove = async (id: string, withPassword = false) => {
  return UserModel.findByIdAndDelete(id).select(
    withPassword ? {} : "-password",
  );
};
