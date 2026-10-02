import uploadImage from "./uploadImage";
export default async function createPiece(formData: FormData) {
    const name = formData.get("name");
    const price = formData.get("price");
    const weight = formData.get("weight");
    const width = formData.get("width");
    const height = formData.get("height");
    const color = formData.get("color");
    const availability_status = formData.get("availabilityStatus");
    const imageField = formData.get("image");

    let image_url: string | null = null;
    if (imageField instanceof File && imageField.size > 0) {
        const image = await uploadImage(imageField);
        image_url = image.url;
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
                image_url
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

