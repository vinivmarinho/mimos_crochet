import { createUser } from "../controllers/user.controller.js";
import Router from "express";
const router = Router();

router.post("/", createUser);

export default router;
