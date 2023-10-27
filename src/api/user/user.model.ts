import mongoose from "mongoose";

export type TUserRole = "admin" | "default";

export type TUser = {
	email: string;
	password: string;
	role: TUserRole;
};

export type TUserDoc = mongoose.Document & TUser;

export const UserSchema = new mongoose.Schema<TUser>({
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

export default mongoose.model<TUser>("User", UserSchema);
