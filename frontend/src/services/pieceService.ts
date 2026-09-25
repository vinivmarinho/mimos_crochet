import uploadImage from "./uploadImage";

// Função irá receber os dados do form de cadastro de peças e passar chamar a função "uploadImage"
export default async function createPiece(formData: FormData) {
    const name = formData.get("name");
    const price = formData.get("price");
    const weight = formData.get("weight");
    const width = formData.get("width");
    const height = formData.get("height");
    const color = formData.get("color");
    const availability_status = formData.get("availabilityStatus");
    const image = formData.get("image");

    let imageUrl: string | null = null;
    if (image instanceof File && image.size > 0) {
        // TODO: Receber ele da função "uploadImage" (frontend)
        imageUrl = await uploadImage(image)
    }
    console.log({
        name,
        price,
        weight,
        width,
        height,
        color,
        availability_status,
    })
};