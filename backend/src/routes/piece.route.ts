import { createPiece, getPieces, deletePiece, updatePiece } from "../controllers/piece.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { Router } from "express";

const router = Router();

router.post("/",createPiece);
router.get("/", getPieces);
router.delete("/:pieceId", deletePiece);
router.patch("/:pieceId", updatePiece);

export default router;