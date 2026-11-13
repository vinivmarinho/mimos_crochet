import uploadImage from "./uploadImage";
export async function createPiece(formData: FormData) {
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
            credentials: "include",
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
            throw new Error("Não foi possível cadastrar a peça");
        };
        return true;
    } catch(error) {
        return false;
    }
};

export async function getPieces() {
    try {
        const response = await fetch(`${import.meta.env.VITE_RENDER_API}/pieces`);
        const data = await response.json();
        return(data);
    } catch(error) {
        return false;
    }
};

export async function deletePiece(pieceId : number) {
    const response = await fetch(`${import.meta.env.VITE_RENDER_API}/pieces/${pieceId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Não foi possível excluir a peça");
    }

    return response.json();
} 

export async function updatePiece(pieceId: number, formData: FormData) {
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

    const response = await fetch(`${import.meta.env.VITE_RENDER_API}/pieces/${pieceId}`, {
        method: "PATCH",
        credentials: "include",
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
        const error = await response.json();
        console.log(error);
        throw new Error("Não foi possível editar a peça");
    }
    return response.json();
}