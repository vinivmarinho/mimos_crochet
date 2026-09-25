// multer é uma biblioteca focada no gerenciamento e upload de arquivos em requisições HTTP do tipo "multipart/form-data"

import multer from "multer";

// "upload" é uma instância que será usada como middleware para receber o "multipart/form-data" e disponibilizar o arquivo para o
const upload = multer({
    // Configura o multer para armazenar o arquivo recebido temporariamente na memória do servidor
    storage: multer.memoryStorage()
});

export default upload;