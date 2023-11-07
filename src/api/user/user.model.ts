import mongoose from "mongoose";

export type UserRole = "admin" | "default";

export type User = {
  _id?: string;
  email: string;
  password: string;
  role: UserRole;
};

export const UserSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model<User>("User", UserSchema);
