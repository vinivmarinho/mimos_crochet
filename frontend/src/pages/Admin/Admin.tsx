import "./admin.css";
import "../pages.css";
import PieceForm from "../../components/PieceForm/PieceForm";
import { useState } from "react";
export default function Admin() {
    const [showForm, setShowForm] = useState(false);
    
    return (
        <div className="page">

            <aside className="sidebar">

                <div className="sidebar-logo">
                    <img src="./logo.jpeg" alt="" className="admin-logo" />
                </div>

                <nav className="sidebar-nav">

                    <a href="#" className="nav-item active">
                        Dashboard
                    </a>

                    <a href="#" className="nav-item">
                        Peças
                    </a>

                    <a href="#" className="nav-item">
                        Pedidos
                    </a>

                    <a href="#" className="nav-item">
                        Configurações
                    </a>

                </nav>

                <div className="sidebar-footer">

                    <button className="logout-button">
                        Sair
                    </button>

                </div>

            </aside>


            <main className="main-content">

                {/* HEADER */}

                <header className="admin-header">

                    <div>
                        <h2>Dashboard</h2>

                        <p>
                            Visão geral do sistema
                        </p>
                    </div>

                    <div className="admin-user">
                        <span>Admin</span>
                    </div>

                </header>


                {/* STATISTICS */}

                <section className="overview">

                    <div className="stat-card">
                        <span className="stat-label">
                            Total de peças
                        </span>

                        <strong className="stat-value">
                            24
                        </strong>
                    </div>


                    <div className="stat-card">
                        <span className="stat-label">
                            Disponíveis
                        </span>

                        <strong className="stat-value">
                            15
                        </strong>
                    </div>


                    <div className="stat-card">
                        <span className="stat-label">
                            Sob encomenda
                        </span>

                        <strong className="stat-value">
                            9
                        </strong>
                    </div>


                    <div className="stat-card">
                        <span className="stat-label">
                            Pedidos
                        </span>

                        <strong className="stat-value">
                            12
                        </strong>
                    </div>

                </section>


                {/* PIECES */}

                <section className="pieces-section">

                    <div className="section-header">

                        <div>
                            <h3>Peças</h3>

                            <p>
                                Gerencie as peças cadastradas.
                            </p>
                        </div>

                        <button className="add-piece-button" onClick={() => setShowForm(true)}>
                            + Adicionar peça
                        </button>

                    </div>


                    {/* TOOLBAR */}

                    <div className="pieces-toolbar">

                        <input
                            type="text"
                            placeholder="Buscar peça..."
                            className="search-input"
                        />

                        <select className="filter-select">

                            <option value="">
                                Todos
                            </option>

                            <option value="available">
                                Disponíveis
                            </option>

                            <option value="made-to-order">
                                Sob encomenda
                            </option>

                        </select>

                    </div>


                    {/* MOBILE — CARDS */}

                    <div className="pieces-cards">


                        {/* CARD 1 */}

                        <article className="piece-card">

                            <div className="piece-card-header">

                                <div className="piece-info">

                                    <div className="piece-image">
                                        IMG
                                    </div>

                                    <div className="piece-name">
                                        Bolsa de crochê
                                    </div>

                                </div>

                                <span className="status available">
                                    Disponível
                                </span>

                            </div>


                            <div className="piece-card-details">

                                <div className="piece-detail">

                                    <span>
                                        Preço
                                    </span>

                                    <strong>
                                        R$ 120,00
                                    </strong>

                                </div>


                                <div className="piece-detail">

                                    <span>
                                        Peso
                                    </span>

                                    <strong>
                                        350 g
                                    </strong>

                                </div>


                                <div className="piece-detail">

                                    <span>
                                        Dimensões
                                    </span>

                                    <strong>
                                        30 × 20 cm
                                    </strong>

                                </div>

                            </div>


                            <div className="piece-card-actions">

                                <button>
                                    Editar
                                </button>

                                <button>
                                    Excluir
                                </button>

                            </div>

                        </article>


                        {/* CARD 2 */}

                        <article className="piece-card">

                            <div className="piece-card-header">

                                <div className="piece-info">

                                    <div className="piece-image">
                                        IMG
                                    </div>

                                    <div className="piece-name">
                                        Amigurumi
                                    </div>

                                </div>

                                <span className="status made-to-order">
                                    Sob encomenda
                                </span>

                            </div>


                            <div className="piece-card-details">

                                <div className="piece-detail">

                                    <span>
                                        Preço
                                    </span>

                                    <strong>
                                        R$ 80,00
                                    </strong>

                                </div>


                                <div className="piece-detail">

                                    <span>
                                        Peso
                                    </span>

                                    <strong>
                                        180 g
                                    </strong>

                                </div>


                                <div className="piece-detail">

                                    <span>
                                        Dimensões
                                    </span>

                                    <strong>
                                        15 × 15 cm
                                    </strong>

                                </div>

                            </div>


                            <div className="piece-card-actions">

                                <button>
                                    Editar
                                </button>

                                <button>
                                    Excluir
                                </button>

                            </div>

                        </article>

                    </div>


                    {/* DESKTOP — TABLE */}

                    <div className="table-container">
                        <table className="pieces-table">
                            <thead>
                                <tr>
                                    <th>
                                        Peça
                                    </th>
                                    <th>
                                        Preço
                                    </th>
                                    <th>
                                        Peso
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        Dimensões
                                    </th>
                                    <th>
                                        Ações
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        <div className="piece-info">
                                            <div className="piece-image">
                                                IMG
                                            </div>
                                            <span>
                                                Bolsa de crochê
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        R$ 120,00
                                    </td>
                                    <td>
                                        350 g
                                    </td>
                                    <td>

                                        <span className="status available">
                                            Disponível
                                        </span>
                                    </td>
                                    <td>
                                        30 × 20 cm
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button>
                                                Editar
                                            </button>

                                            <button>
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="piece-info">
                                            <div className="piece-image">
                                                IMG
                                            </div>
                                            <span>
                                                Amigurumi
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        R$ 80,00
                                    </td>
                                    <td>
                                        180 g
                                    </td>
                                    <td>
                                        <span className="status made-to-order">
                                            Sob encomenda
                                        </span>
                                    </td>
                                    <td>
                                        15 × 15 cm
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button>
                                                Editar
                                            </button>
                                            <button>
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                {showForm && (
                    <PieceForm setShowForm={setShowForm} />
                )}
            </main>
        </div>
    );
}