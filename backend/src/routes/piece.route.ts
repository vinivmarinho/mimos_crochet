import { createPiece, getPieces } from "../controllers/piece.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", createPiece);
router.get("/", getPieces);


export default router;