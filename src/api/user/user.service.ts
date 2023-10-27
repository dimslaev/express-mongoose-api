import User, { TUser } from "./user.model";

async function getAll() {
  return User.find().select("-password");
}

async function get(id: string) {
  return User.findOne({ _id: id }).select("-password");
}

async function create(data: TUser) {
  return new User(data).save();
}

async function update(id: string, data: TUser) {
  console.log(data);
  return User.findOneAndUpdate({ _id: id }, data, {
    returnDocument: "after",
  }).select("-password");
}

async function remove(id: string) {
  return User.findByIdAndDelete(id);
}

export { getAll, get, create, update, remove };
