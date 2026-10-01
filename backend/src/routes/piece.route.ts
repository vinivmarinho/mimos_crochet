import { createPiece } from "../controllers/piece.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", createPiece);

export default router;