import express from "express";
import * as usersController from "./user.controller";

const router = express.Router();

router.get("/", usersController.getAll);

router.get("/:id", usersController.get);

router.post("/", usersController.create);

router.put("/:id", usersController.update);

router.delete("/:id", usersController.remove);

export default router;
