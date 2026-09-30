// multer é uma biblioteca utilizada para processar requisições "multipart/form-data", geralmente usadas para envio de arquivos

import multer from "multer";

// Cria uma instância do multer
const upload = multer({
    // memoryStorage faz o Multer manter temporariamente o arquivo recebido na memória (RAM) do servidor
    // Disponibiliza seus dados através de req.file.buffer
    storage: multer.memoryStorage()
});

export { upload };