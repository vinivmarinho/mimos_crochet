import type { Order } from "../types/Order";

const API_URL = `${import.meta.env.VITE_RENDER_API}/orders`;

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(API_URL,
    { 
      credentials: "include" 
    });
  
  if (!response.ok) {
    throw new Error("Não foi possível carregar os pedidos"
  )};
  const data = await response.json();
  return data.data;
}

export async function createOrder(order: Omit<Order, "order_id">): Promise<void> {
  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error("Não foi possível cadastrar o pedido"
  )};
}

export async function updateOrder(orderId: number, order: Partial<Order>): Promise<void> {
  const response = await fetch(`${API_URL}/${orderId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error("Não foi possível atualizar o pedido"
  )};
}

export async function deleteOrder(orderId: number): Promise<void> {
  const response = await fetch(`${API_URL}/${orderId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Não foi possível excluir o pedido"
  )};
}
