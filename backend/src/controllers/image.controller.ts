import { type Request, type Response} from "express";
import cloudinary from "../config/cloudinary.js";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
// Nota: O método "upload_stream()" é uma função utilizada para enviar arquivos para a nuvem diretamente como um fluxo de dados (stream)
async function uploadImage(req: Request, res: Response) {
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            message: "Nenhuma imagem foi enviada"
        });
    }

    try {
        // "upload_stream()" utiliza um callback para retornar o resultado
        // Crio uma Promise para poder aguardar o resultado com "await" e tratar possíveis erros com try/catch 
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        
            cloudinary.uploader.upload_stream(

                (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {

                if (error) {
                    reject(error);
                    return;
                }

                if (!result) {
                    reject(new Error("O Cloudinary não retornou um resultado"));
                    return;
                }
                resolve(result);

            }).end(file.buffer) // Envia os dados da imagem para o Cloudinary
        });

        console.log(result);

        return res.status(200).json({
            url: result.secure_url
        });

    } catch(error) {
        console.error("Erro no Cloudinary:", error);

        return res.status(500).json({
            message: "Erro ao enviar imagem para o Cloudinary"
        })
    }
}

export { uploadImage };
