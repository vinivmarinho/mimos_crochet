// multer é uma biblioteca utilizada para processar requisições "multipart/form-data", geralmente usadas para envio de arquivos

import multer from "multer";

// Cria uma instância do multer
// O memoryStorage faz com que o arquivo recebido seja armazenado temporariamente na memória do servidor (Buffer), em vez de ser salvo com um arquivo no disco
const upload = multer({
    // Configura o multer para armazenar o arquivo recebido temporariamente na memória do servidor
    storage: multer.memoryStorage()
});

export { upload };