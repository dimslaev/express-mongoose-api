import express from "express";
import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;
