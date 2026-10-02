import uploadImage from "./uploadImage";
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
        imageUrl = await uploadImage(image);
        console.log(imageUrl);
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_RENDER_API}/pieces` , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                price,
                weight,
                width,
                height,
                color,
                availability_status,
                imageUrl
            })     
        });

        if (!response.ok) {
            throw new Error("Não foi possível cadastrar a peça. Caiu no erro do Piece Service");
        };
        return true;
    } catch(error) {
        return false;
    }
};