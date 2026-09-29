import { uploadImage } from "../controllers/image.controller.js";
import { upload } from "../middlewares/upload.js";

import Router from "express";

const router = Router();

// .single("image") cria um middleware que recebe um único arquivo do campo "image" enviado pelo frontend através do formData
router.post("/upload", upload.single("image"), uploadImage)

export default router