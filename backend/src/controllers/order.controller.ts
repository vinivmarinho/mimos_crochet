import { type Request, type Response } from "express";
import pool from "../config/database.js";

async function createOrder(req: Request, res: Response) {
    try {
        const { client_name, product_name, product_color, total_price, down_payment, order_date, delivery_date, payment_method, status } = req.body

        await pool.query('INSERT INTO orders (client_name, product_name, product_color, total_price, down_payment, order_date, delivery_date, payment_method, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [client_name, product_name, product_color, total_price, down_payment, order_date, delivery_date, payment_method, status] )
        return res.status(200).json({
            message: "Pedido cadastrado com sucesso"
        })
    } catch(error) {
        return res.status(500).json({
            message: "Não foi possível cadastrar o produto"
        })
    }
}

async function deleteOrder(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM orders WHERE order_id = $1 RETURNING *', [id]);
        const order = result.rows[0];
        if (!order) {
            return res.status(404).json({
                message: "Pedido não encontrado"
            })
        }
        return res.status(200).json({
            message: "Pedido removido com sucesso!",
        })
    } catch(error) {
        return res.status(500).json({
            message: "Erro ao remover a peça"
        })
    }
}

async function getOrders(req: Request, res: Response) {
    try {
        const result = await pool.query(`SELECT * FROM orders`);
        const orders = result.rows;
        return res.status(200).json({
            data: orders
        })
    } catch(error) {
        return res.status(500).json({
            message: "Não foi possível encontrar os pedidos"
        })
    }
}

async function updateOrder(req: Request, res: Response) {
    try {
        const { orderId } = req.params;
        const orderToUpdate = (await pool.query('SELECT * FROM orders WHERE order_id = $1', [orderId])).rows[0];
        console.log(orderId);
        if (!orderToUpdate) {
            return res.status(404).json({
                message: "Pedido não foi encontrado"
            })
        }
        const updatedOrder = {
            client_name: req.body.client_name ?? orderToUpdate.client_name,
            product_name: req.body.product_name ?? orderToUpdate.product_name,
            product_color: req.body.product_color ?? orderToUpdate.product_color,
            total_price: req.body.total_price ?? orderToUpdate.total_price,
            down_payment: req.body.down_payment ?? orderToUpdate.down_payment,
            order_date: req.body.order_date ?? orderToUpdate.order_date,
            delivery_date: req.body.delivery_date ?? orderToUpdate.delivery_date,
            payment_method: req.body.payment_method ?? orderToUpdate.payment_method,
            status: req.body.status ?? orderToUpdate.status,
        }
        await pool.query(`
            UPDATE orders SET
                client_name = $1,
                product_name = $2, 
                product_color = $3, 
                total_price = $4, 
                down_payment = $5, 
                order_date = $6, 
                delivery_date = $7, 
                payment_method = $8, 
                status = $9
            WHERE order_id = $10`, [
            updatedOrder.client_name,
            updatedOrder.product_name,
            updatedOrder.product_color,
            updatedOrder.total_price,
            updatedOrder.down_payment,
            updatedOrder.order_date,
            updatedOrder.delivery_date,
            updatedOrder.payment_method,
            updatedOrder.status,
            orderId
            ])
        return res.status(200).json({
            message: "Pedido atualizado com sucesso!",
            order: updatedOrder
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Não foi possível atualizar o pedido",
             error: error instanceof Error ? error.message : error
        })
    }
}
export { createOrder, deleteOrder, getOrders, updateOrder};