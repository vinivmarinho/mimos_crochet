export type Order = {
    order_id: number;
    client_name: string;
    product_name: string;
    product_color: string;
    total_price: number;
    down_payment: number;
    order_date: string;
    delivery_date: string;
    payment_method: "cash" | "pix" | "credit_card" | "debit_card";
    status: "in_production" | "ready" | "delivered";
};
