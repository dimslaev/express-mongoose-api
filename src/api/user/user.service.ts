import { User, UserModel } from "./user.model";
import * as bcrypt from "bcryptjs";

async function getAll(withPassword = false) {
  return UserModel.find().select(withPassword ? {} : "-password");
}

async function get(_id: string, withPassword = false) {
  return UserModel.findOne({ _id }).select(withPassword ? {} : "-password");
}

async function find(email: string, withPassword = false) {
  return UserModel.findOne({ email }).select(withPassword ? {} : "-password");
}

async function create(data: User) {
  return new UserModel({
    ...data,
    password: bcrypt.hashSync(data.password, 8),
  }).save();
}

async function update(id: string, data: User, withPassword = false) {
  return UserModel.findOneAndUpdate({ _id: id }, data, {
    returnDocument: "after",
  }).select(withPassword ? {} : "-password");
}

async function remove(id: string, withPassword = false) {
  return UserModel.findByIdAndDelete(id).select(
    withPassword ? {} : "-password",
  );
}

export { getAll, get, find, create, update, remove };
