import { uploadImage } from "../controllers/image.controller.js";
import Router from "express";

const router = Router();

router.post("/upload", uploadImage)

export default router