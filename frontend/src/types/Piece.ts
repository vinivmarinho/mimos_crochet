export type Piece = {
    piece_id: number;
    name: string;
    price: number;
    weight: number;
    width: number;
    height: number;
    color: string;
    availability_status: "available" | "made_to_order"
    image_url: string
};