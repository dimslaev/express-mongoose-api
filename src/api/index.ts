import express from "express";
import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route";

const api = express.Router();

api.use("/user", userRoutes);
api.use("/auth", authRoutes);

export { api };
