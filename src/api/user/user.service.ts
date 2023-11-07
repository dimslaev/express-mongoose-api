import User, { TUser } from "./user.model";
import * as bcrypt from "bcryptjs";

async function getAll(withPassword = false) {
  return User.find().select(withPassword ? {} : "-password");
}

async function get(_id: string, withPassword = false) {
  return User.findOne({ _id }).select(withPassword ? {} : "-password");
}

async function find(email: string, withPassword = false) {
  return User.findOne({ email }).select(withPassword ? {} : "-password");
}

async function create(data: TUser) {
  return new User({
    ...data,
    password: bcrypt.hashSync(data.password, 8),
  }).save();
}

async function update(id: string, data: TUser, withPassword = false) {
  return User.findOneAndUpdate({ _id: id }, data, {
    returnDocument: "after",
  }).select(withPassword ? {} : "-password");
}

async function remove(id: string, withPassword = false) {
  return User.findByIdAndDelete(id).select(withPassword ? {} : "-password");
}

export { getAll, get, find, create, update, remove };
