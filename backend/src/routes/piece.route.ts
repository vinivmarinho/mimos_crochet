import { createPiece, getPieces, deletePiece, updatePiece } from "../controllers/piece.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { Router } from "express";

const router = Router();

router.post("/", authenticateToken, isAdmin, createPiece);
router.get("/", getPieces);
router.delete("/:pieceId", authenticateToken, isAdmin, deletePiece);
router.patch("/:pieceId", authenticateToken, isAdmin, updatePiece);

export default router;