import { createUser } from "../controllers/user.controller.js";
import Router from "express";
import { validateUser } from "../middlewares/validateUser.middleware.js";
const router = Router();

router.post("/", validateUser, createUser);

export default router;
