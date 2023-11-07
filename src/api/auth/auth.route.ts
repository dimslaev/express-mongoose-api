import express from "express";
import * as authController from "./auth.controller";
import { checkAuth } from "../../middlewares";

const router = express.Router();

router.post("/login", authController.login);

router.post("/signup", authController.signup);

router.post("/change-password", checkAuth, authController.changePassword);

export default router;
