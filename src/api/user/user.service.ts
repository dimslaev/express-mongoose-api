import User, { TUser } from "./user.model";
import * as bcrypt from "bcryptjs";

async function getAll() {
  return User.find().select("-password");
}

async function get(id: string) {
  return User.findOne({ _id: id }).select("-password");
}

async function search(email: string) {
  return User.findOne({ email }).select("-password");
}

async function create(data: TUser) {
  return new User({
    ...data,
    password: bcrypt.hashSync(data.password, 8),
  }).save();
}

async function update(id: string, data: TUser) {
  return User.findOneAndUpdate({ _id: id }, data, {
    returnDocument: "after",
  }).select("-password");
}

async function remove(id: string) {
  return User.findByIdAndDelete(id);
}

export { getAll, get, search, create, update, remove };
