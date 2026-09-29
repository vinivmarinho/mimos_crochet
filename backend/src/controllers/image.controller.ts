import { type Request, type Response} from "express";

// Criar controller responsável por receber o file vindo de "uploadImage" (frontend), subir para o cloudinary e retornar para "uploadImage" (frontend) a URL da imagem
async function uploadImage(req: Request, res: Response) {
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            message: "Nenhuma imagem foi enviada"
        });
    }
    console.log(file.originalname);
    console.log(file.mimetype);
    console.log(file.size);
    console.log(file.buffer);
}

export { uploadImage };