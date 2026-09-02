import { createUser, login, getCurrentUser } from "../controllers/user.controller.js";
import Router from "express";
import { validateUser } from "../middlewares/validateUser.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = Router();

router.post("/", validateUser, createUser);
router.post("/login", login);
router.get("/me", authenticateToken, isAdmin, getCurrentUser);

export default router;
