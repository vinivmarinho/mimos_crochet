import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./orders.css";
import "../pages.css";
import "../Admin/admin.css";
import type { Order } from "../../types/Order";
import { deleteOrder, getOrders } from "../../services/orderService";
import OrderForm from "./OrderForm";

// ===========================================
// Valores de status e tipos de pagamento
// ===========================================
const statusLabels = {
in_production: "Em produção",
ready: "Pronto",
delivered: "Entregue",
};

const paymentLabels = {
cash: "Dinheiro",
pix: "Pix",
credit_card: "Cartão de crédito",
debit_card: "Cartão de débito",
};

const money = (value: number) =>
Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Orders() {
    // ===========================================
    // Estados
    // ===========================================
    const [orders, setOrders] = useState<Order[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showForm, setShowForm] = useState(false);
    const [orderToUpdate, setOrderToUpdate] = useState<Order | null>(null);
    const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
  
    // ===========================================
    // Data fetching
    // ===========================================
    async function loadOrders() {
        try {
        setOrders(await getOrders());
        } catch (error) {
        toast.error("Não foi possível carregar os pedidos");
        } finally {
        setLoading(false);
        }
    };
    useEffect(() => {
        loadOrders(); 
        }, []);
    
    // ===========================================
    // Lógica da barra de pesquisa
    // ===========================================  
    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.client_name.toLowerCase().startsWith(search.trim().toLowerCase()) ||
        order.product_name.toLowerCase().startsWith(search.trim().toLowerCase());
        return matchesSearch && (statusFilter === "all" || order.status === statusFilter);
    });

    // ===========================================
    // Informações do dashboard
    // ===========================================
    const total = orders.reduce((sum, order) => sum + Number(order.total_price), 0);
    const received = orders.reduce((sum, order) => sum + Number(order.down_payment), 0);
    const inProduction = orders.filter((order) => order.status === "in_production").length;
    const delivered = orders.filter((order) => order.status === "delivered").length;

    
    // ===========================================
    // Gerencia a remoção de pedido
    // ===========================================
    async function handleDelete() {
    if (!orderToDelete) return;
    try {
        await deleteOrder(orderToDelete.order_id);
        await loadOrders();
        setOrderToDelete(null);
        toast.success("Pedido removido com sucesso");
    } catch (error) {
        toast.error("Não foi possível remover o pedido");
    }
    };

    // ===========================================
    // Renderização
    // ===========================================
    return (
    <div className="page">
        {/* ===========================================
            Sidebar
            ===========================================
        */}
        <aside className="sidebar">
        <div className="sidebar-logo"><img src="/logo.jpeg" alt="Mimos Crochê" className="admin-logo" /></div>
        <nav className="sidebar-nav">
            <Link to="/admin" className="nav-item">Dashboard</Link>
            <Link to="/catalog" className="nav-item">Peças</Link>
            <Link to="/pedidos" className="nav-item active">Pedidos</Link>
            <a href="#" className="nav-item">Configurações</a>
        </nav>
        <div className="sidebar-footer"><button className="logout-button">Sair</button></div>
        </aside>
        
        {/* ===========================================
            Div principal
            ===========================================
        */}
        <main className="main-content">
        <header className="admin-header">
            <div><h2>Pedidos</h2><p>Acompanhe suas encomendas e pagamentos</p></div>
            <div className="admin-user"><span>Admin</span></div>
        </header>
        
        {/* ===========================================
            Resumo dos pedidos
            ===========================================
        */}
        <section className="overview">
            <div className="stat-card">
                <span className="stat-label">Total em pedidos</span><strong className="stat-value stat-value-small">{money(total)}</strong>
            </div>
            <div className="stat-card">
                <span className="stat-label">Entradas recebidas</span><strong className="stat-value stat-value-small">{money(received)}</strong>
            </div>
            <div className="stat-card">
                <span className="stat-label">Em produção</span><strong className="stat-value">{inProduction}</strong>
            </div>
            <div className="stat-card">
                <span className="stat-label">Entregues</span><strong className="stat-value">{delivered}</strong>
            </div>
        </section>
        
        {/* ===========================================
            Seção de pedidos
            ===========================================
        */}
        <section className="orders-section">
            <div className="section-header">
            <div><h3>Lista de pedidos</h3><p>{filteredOrders.length} pedido(s) encontrado(s)</p></div>
            <button className="add-piece-button" onClick={() => { setOrderToUpdate(null); setShowForm(true); }}>+ Novo pedido</button>
            </div>
            
            {/* ===========================================
                Pesquisa e filtro de pedidos
                ===========================================
            */}
            <div className="orders-toolbar">
            <div className="search-bar-div">
                <button className="search-icon" type="button">🔍</button>
                <input className="search-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cliente ou produto..." />
                {search && <button className="x-icon" type="button" onClick={() => setSearch("")}>✕</button>}
            </div>
            <select className="filter-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">Todos os status</option>
                <option value="in_production">Em produção</option>
                <option value="ready">Pronto</option>
                <option value="delivered">Entregue</option>
            </select>
            </div>
            
            {/* ===========================================
                Renderização dos pedidos
                ===========================================
            */}
            {loading ? <p className="empty-orders">Carregando pedidos...</p> : filteredOrders.length === 0 ? (
            <p className="empty-orders">Nenhum pedido encontrado.</p>
            ) : (
            <>
                {/* ===========================================
                    Cards (Mobile)
                    ===========================================
                */}
                <div className="orders-cards">
                {filteredOrders.map((order) => (
                    <article className="order-card" key={order.order_id}>
                    <div className="order-card-header">
                        <div><span className="order-number">Pedido #{order.order_id}</span><h4>{order.client_name}</h4></div>
                        <span className={`order-status status-${order.status}`}>{statusLabels[order.status]}</span>
                    </div>

                    <div className="order-product">
                        <span>{order.product_name}</span><small>Cor: {order.product_color}</small>
                    </div>
                    
                    <div className="order-card-details">
                        <div><span>Total</span><strong>{money(order.total_price)}</strong></div>
                        <div><span>Valor de entrada</span><strong>{money(order.down_payment)}</strong></div>
                        <div><span>Entrega</span><strong>{new Date(`${order.delivery_date}T00:00:00`).toLocaleDateString("pt-BR")}</strong></div>
                        <div><span>Pagamento</span><strong>{paymentLabels[order.payment_method]}</strong></div>
                    </div>
                    <div className="order-card-actions">
                        <button onClick={() => { setOrderToUpdate(order); setShowForm(true); }}>Editar</button>
                        <button onClick={() => setOrderToDelete(order)}>Excluir</button>
                    </div>
                    </article>
                ))}
                </div>

                {/* ===========================================
                    Table (Desktop)
                    ===========================================
                */}
                <div className="table-container">
                <table className="pieces-table orders-table">
                    <thead><tr><th>Pedido</th><th>Cliente</th><th>Produto</th><th>Total</th><th>Valor de entrada</th><th>Entrega</th><th>Pagamento</th><th>Status</th><th>Ações</th></tr></thead>
                    <tbody>{filteredOrders.map((order) => (
                    <tr key={order.order_id}>
                        <td>#{order.order_id}</td><td>{order.client_name}</td><td><strong>{order.product_name}</strong><small>Cor: {order.product_color}</small></td>
                        <td>{money(order.total_price)}</td><td>{money(order.down_payment)}</td>
                        <td>{new Date(`${order.delivery_date}T00:00:00`).toLocaleDateString("pt-BR")}</td>
                        <td>{paymentLabels[order.payment_method]}</td>
                        <td><span className={`order-status status-${order.status}`}>{statusLabels[order.status]}</span></td>
                        <td><div className="table-actions"><button onClick={() => { setOrderToUpdate(order); setShowForm(true); }}>Editar</button><button onClick={() => setOrderToDelete(order)}>Excluir</button></div></td>
                    </tr>
                    ))}</tbody>
                </table>
                </div>
            </>
            )}
        </section>
        </main>
        
        {/* ===========================================
            Renderização do Formulário 
            ===========================================
        */}
        {showForm && (
            <OrderForm setShowForm={setShowForm} setOrderToUpdate={setOrderToDelete} orderToUpdate={orderToUpdate} onSuccess={loadOrders}/>
        )}

        {orderToDelete && (
        <div className="delete-modal-backdrop" onClick={() => setOrderToDelete(null)}>
            <div className="delete-modal" onClick={(event) => event.stopPropagation()}>
            <button className="close-modal" onClick={() => setOrderToDelete(null)}>×</button>
            <div className="delete-modal-icon">×</div><h3>Excluir pedido</h3>
            <p>Deseja excluir o pedido de <strong>{orderToDelete.client_name}</strong>?</p>
            <div className="delete-modal-actions"><button className="cancel-delete-button" onClick={() => setOrderToDelete(null)}>Cancelar</button><button className="confirm-delete-button" onClick={handleDelete}>Excluir</button></div>
            </div>
        </div>
        )}
    </div>
    );
    }
