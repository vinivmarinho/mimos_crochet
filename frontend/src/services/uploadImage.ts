export default async function uploadImage(image: File ) {
    try {
        // Cria um formData para enviar o arquivo como multipart/form-data
        // nota: multipart/form-data é o formato usado pela requisição HTTP para transportar dados de formulário que podem incluir arquivos
        const formData = new FormData();
        // Adiciona o arquivo ao formData no campo "image"
        formData.append("image", image); 

        const response = await fetch(`${import.meta.env.VITE_RENDER_API}/images/upload`,
            {
                method: "POST",
                body: formData
            }
            );
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error||"Erro ao enviar a imagem");
            };
            
            const data = await response.json();
            return data;
        } catch(error) {
            console.error("Erro no upload:", error);
            throw error
        }
}