import { createPiece, getPieces, deletePiece } from "../controllers/piece.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", createPiece);
router.get("/", getPieces);
router.delete("/:pieceId", deletePiece);


export default router;