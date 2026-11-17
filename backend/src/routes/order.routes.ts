import Router from "express";
import { createOrder, deleteOrder, getOrders, updateOrder } from "../controllers/order.controller.js";
const router = Router();

router.post("/", createOrder);
router.delete("/:id", deleteOrder);
router.get("/", getOrders);
router.patch("/:orderId", updateOrder);
export default router;