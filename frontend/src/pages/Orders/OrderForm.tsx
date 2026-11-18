import "./orderForm.css";
import type { Order } from "../../types/Order";
import { toast } from "react-toastify";
import { createOrder, updateOrder } from "../../services/orderService";

type OrderFormProps = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    setOrderToUpdate: React.Dispatch<React.SetStateAction<Order | null>>;
    orderToUpdate: Order | null;
    onSuccess: () => Promise<void>
}
export default function OrderForm({setShowForm, setOrderToUpdate, orderToUpdate, onSuccess}: OrderFormProps) {

    // ===========================================
    // Gerencia a criação e atualização de pedido
    // ===========================================
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const order = {
            client_name: String(form.get("client_name")),
            product_name: String(form.get("product_name")),
            product_color: String(form.get("product_color")),
            total_price: Number(form.get("total_price")),
            down_payment: Number(form.get("down_payment")),
            order_date: String(form.get("order_date")),
            delivery_date: String(form.get("delivery_date")),
            payment_method: String(form.get("payment_method")) as Order["payment_method"],
            status: String(form.get("status")) as Order["status"],
        };
        try {
        if (orderToUpdate) {
            await updateOrder(orderToUpdate.order_id, order);
        } else {
            await createOrder(order);
        }
        toast.success(orderToUpdate ? "Pedido atualizado com sucesso" : "Pedido cadastrado com sucesso");
        await onSuccess();
        setShowForm(false);
        setOrderToUpdate(null);
        } catch (error) {
        toast.error("Não foi possível salvar o pedido");
        }
    }

    return (
        <div
            className="order-form-overlay"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    setShowForm(false);
                    setOrderToUpdate(null);
                }
            }}
        >
            <form className="order-form" onSubmit={handleSubmit}>
                <button
                    type="button"
                    className="order-form-close"
                    onClick={() => {
                        setShowForm(false);
                        setOrderToUpdate(null);
                    }}
                >
                    ×
                </button>

                <h2>
                    {orderToUpdate ? "Editar pedido" : "Novo pedido"}
                </h2>

                <div className="order-form-grid">
                    <label>
                        Nome do cliente
                        <input
                            name="client_name"
                            defaultValue={orderToUpdate?.client_name ?? ""}
                            required
                        />
                    </label>

                    <label>
                        Produto
                        <input
                            name="product_name"
                            defaultValue={orderToUpdate?.product_name ?? ""}
                            required
                        />
                    </label>

                    <label>
                        Cor do produto
                        <input
                            name="product_color"
                            defaultValue={orderToUpdate?.product_color ?? ""}
                            required
                        />
                    </label>

                    <label>
                        Valor total
                        <input
                            name="total_price"
                            type="number"
                            min="0.01"
                            step="0.01"
                            defaultValue={orderToUpdate?.total_price ?? ""}
                            required
                        />
                    </label>

                    <label>
                        Valor de entrada
                        <input
                            name="down_payment"
                            type="number"
                            min="0"
                            step="0.01"
                            defaultValue={orderToUpdate?.down_payment ?? 0}
                            required
                        />
                    </label>

                    <label>
                        Data do pedido
                        <input
                            name="order_date"
                            type="date"
                            defaultValue={orderToUpdate?.order_date?.slice(0, 10) ?? ""}
                            required
                        />
                    </label>

                    <label>
                        Data de entrega
                        <input
                            name="delivery_date"
                            type="date"
                            defaultValue={orderToUpdate?.delivery_date?.slice(0, 10) ?? ""}
                            required
                        />
                    </label>

                    <label>
                        Pagamento
                        <select
                            name="payment_method"
                            defaultValue={orderToUpdate?.payment_method ?? "pix"}
                        >
                            <option value="cash">Dinheiro</option>
                            <option value="pix">Pix</option>
                            <option value="credit_card">Cartão de crédito</option>
                            <option value="debit_card">Cartão de débito</option>
                        </select>
                    </label>

                    <label>
                        Status
                        <select
                            name="status"
                            defaultValue={orderToUpdate?.status ?? "in_production"}
                        >
                            <option value="in_production">Em produção</option>
                            <option value="ready">Pronto</option>
                            <option value="delivered">Entregue</option>
                        </select>
                    </label>
                </div>

                <button type="submit" className="submit-button">
                    {orderToUpdate ? "Salvar alterações" : "Cadastrar pedido"}
                </button>
            </form>
        </div>
    );
}
