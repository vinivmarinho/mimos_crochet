import "./admin.css";
import "../pages.css";
import PieceForm from "../../components/PieceForm/PieceForm";
import { getPieces } from "../../services/pieceService";
import { useState, useEffect } from "react";
import { type Piece } from "../../types/Piece";
export default function Admin() {
    const [showForm, setShowForm] = useState(false);
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [totalPieces, setTotalPieces] = useState(0);
    const [availablePieces, setAvailablePieces] = useState(0);
    const [madeToOrderPieces, setMadeToOrderPieces] = useState(0);
    const [selectedImage, setSelectedImage] = useState("");

    // Sempre que o componente for montado, esse useEffect é chamado
    async function loadPieces() {
        const response = await getPieces();
         // Transformo os dados recebidos da API em um array
            const piecesData = response.data;
            console.log(piecesData); 
            setTotalPieces(piecesData.length);
            piecesData.map((piece: Piece) => {
                if (piece.availability_status = "available") {
                    setAvailablePieces(availablePieces + 1);
                } else if (piece.availability_status = "made to order") {
                    setMadeToOrderPieces(madeToOrderPieces + 1);
                }
            })
            setPieces(piecesData);
    }
    useEffect(() => {
        loadPieces();
    }, []) 

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
                            {totalPieces}
                        </strong>
                    </div>


                    <div className="stat-card">
                        <span className="stat-label">
                            Disponíveis
                        </span>

                        <strong className="stat-value">
                            {availablePieces}
                        </strong>
                    </div>


                    <div className="stat-card">
                        <span className="stat-label">
                            Sob encomenda
                        </span>

                        <strong className="stat-value">
                            {madeToOrderPieces}
                        </strong>
                    </div>


                    <div className="stat-card">
                        <span className="stat-label">
                            Pedidos
                        </span>

                        <strong className="stat-value">
                            Em andamento
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
            
                        {pieces.map((piece) => (
                            
                        <article className="piece-card" key={piece.piece_id}>

                            <div className="piece-card-header">

                                <div className="piece-info">

                                    <div className="piece-image-container">
                                        <img className="piece-image" src={piece.image_url} alt="Imagem" onClick={() => setSelectedImage(piece.image_url)} />
                                        
                                    </div>

                                    <div className="piece-name">
                                        {piece.name}
                                    </div>

                                </div>

                                <span className="status available">
                                    {piece.availability_status}
                                </span>

                            </div>


                            <div className="piece-card-details">

                                <div className="piece-detail">

                                    <span>
                                        Preço
                                    </span>

                                    <strong>
                                        R$ {Number((piece.price)).toFixed(0)}
                                    </strong>

                                </div>


                                <div className="piece-detail">

                                    <span>
                                        Peso
                                    </span>

                                    <strong>
                                        {Number(piece.weight).toFixed(0)} g
                                    </strong>

                                </div>


                                <div className="piece-detail">

                                    <span>
                                        Dimensões
                                    </span>

                                    <strong>
                                        {piece.width} × {Number(piece.height).toFixed(0)} cm
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
                        ))}

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
                                {pieces.map((piece) => (
                                    <tr>
                                    <td>
                                        <div className="piece-info">
                                            <div className="piece-image-container">
                                                <img className="piece-image" src={piece.image_url} alt="Imagem" onClick={() => setSelectedImage(piece.image_url)} />
                                            </div>
                                            <span>
                                                {piece.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        R$ {piece.price}
                                    </td>
                                    <td>
                                        {piece.weight} g
                                    </td>
                                    <td>

                                        <span className="status available">
                                            {piece.availability_status}
                                        </span>
                                    </td>
                                    <td>
                                        {piece.width} × {piece.height} cm
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                
                {showForm && (
                    <PieceForm setShowForm={setShowForm} onSuccess={loadPieces} />
                )}
                
                {/* Renderizando o modal*/}
                 {selectedImage && (
                        <div
                            className="image-modal"
                            onClick={() => setSelectedImage("")}
                        >
                            <button
                            className="close-modal"
                            onClick={() => setSelectedImage("")}
                            >X</button>

                            <img src={selectedImage} alt="Imagem ampliada" className="enlarged-image"
                            onClick={(event) => event.stopPropagation()}
                            />
                        </div>
                    )}
            </main>
        </div>
    );
}