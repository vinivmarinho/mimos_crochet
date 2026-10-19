import "./admin.css";
import "../pages.css";
import PieceForm from "../../components/PieceForm/PieceForm";
import { getPieces } from "../../services/pieceService";
import { useState, useEffect } from "react";
import { type Piece } from "../../types/Piece";
export default function Admin() {
    // ===========================================
    // Estados
    // ===========================================

    // Peças
    const [pieces, setPieces] = useState<Piece[]>([]);

    // Estatísticas do Dashboard
    const [totalPieces, setTotalPieces] = useState(0);
    const [availablePieces, setAvailablePieces] = useState(0);
    const [madeToOrderPieces, setMadeToOrderPieces] = useState(0);
    
    // Formulário
    const [showForm, setShowForm] = useState(false);
    // Filtro de status
    const [selectedStatus, setSelectedStatus] = useState("all");
    // Barra de pesquisa
    const [searchedInput, setSearchedInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    // Imagem 
    const [selectedImage, setSelectedImage] = useState("");
    

    // ===========================================
    // Data fetching
    // ===========================================
    async function loadPieces() {
        const response = await getPieces();
         // Transformo os dados recebidos da API em um array
            const piecesData = response.data;
            setTotalPieces(piecesData.length);
            piecesData.map((piece: Piece) => {
                if (piece.availability_status === "available") {
                    setAvailablePieces(availablePieces + 1);
                } else if (piece.availability_status === "made to order") {
                    setMadeToOrderPieces(madeToOrderPieces + 1);
                }
            })
            setPieces(piecesData);
    }
    useEffect(() => {
        loadPieces();
    }, []) 

    // ===========================================
    // Lógica da barra de pesquisa
    // ===========================================

    // Filtra peças por valor do filtro de status e pelo nome na searchBar
    const filteredPieces = pieces.filter((piece) => {
        const matchesName = piece.name.toLowerCase().startsWith(searchedInput.trim().toLowerCase());

        const matchesStatus = selectedStatus === "all" || piece.availability_status === selectedStatus;

        return matchesName && matchesStatus;
    })
    

    // ===========================================
    // Renderização
    // ===========================================
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

                {/* ===========================================
                    Header
                    ===========================================
                */}

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


                {/* ===========================================
                    Estatísticas
                    ===========================================
                */}

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


                {/* ===========================================
                    Header da toolBar
                    ===========================================
                */}

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


                    {/* ===========================================
                        ToolBar
                        ===========================================
                    */}

                    <div className="pieces-toolbar">

                        <div className="search-bar-div">
                            <button className="search-icon">🔍</button>
                            <input
                                type="text"
                                placeholder="Buscar peça..."
                                className="search-input"
                                value={searchedInput}
                                onChange={(event) => {
                                    setSearchedInput(event.target.value);
                                    setShowSuggestions(true);
                                }}
                            />
                            <button className="x-icon" onClick={() => { 
                                setSearchedInput("")}}>
                                    ❌
                            </button>
                            {showSuggestions && searchedInput.length > 0 && (
                                <div className="search-suggestions">
                                    {filteredPieces.length > 0 ? (
                                        filteredPieces.map((piece) => (
                                            <div key={piece.piece_id} onClick={() => {
                                                setSearchedInput(piece.name); 
                                                setShowSuggestions(false)}}>
                                                {piece.name}
                                            </div>
                                        ))
                                    ): <p>Nenhuma peça encontrada</p>}
                                </div>
                            )}
                        </div>
                        
                        <div className="filter-div">
                            <select 
                            className="filter-select"
                            value={selectedStatus}
                            onChange={(event) => setSelectedStatus(event.target.value)}
                            >
                                <option value="all">
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
                    </div>

                    

                    {/* ===========================================
                        Mobile - Cards
                        ===========================================
                    */}

                    <div className="pieces-cards">
                        
                        {filteredPieces.map((piece) => (
                            
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
                                        {piece.availability_status == "available" ? "Disponível" : "Sob encomenda"}
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
                    
                   

                    {/* ===========================================
                        Desktop - Table
                        ===========================================
                    */}

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
                                {filteredPieces.map((piece) => (
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
                                        {piece.availability_status == "available" ? "Disponível" : "Sob encomenda"}
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

                {/* ===========================================
                    Formulário de cadastro de peça
                    ===========================================
                */}
                {showForm && (
                    <PieceForm setShowForm={setShowForm} onSuccess={loadPieces} />
                )}
                
                {/* ===========================================
                    Renderização do Modal
                    ===========================================
                */}
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