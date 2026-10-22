import { useEffect, useState } from "react";
import "./catalog.css";
import { type Piece } from "../../types/Piece.ts";
import { getPieces } from "../../services/pieceService.ts";

// ===========================================
// Types
// ===========================================

type Filter = "all" | "available" | "made_to_order";

const filters: { label: string; value: Filter }[] = [
  { label: "Todas", value: "all" },
  { label: "Pronta entrega", value: "available" },
  { label: "Sob encomenda", value: "made_to_order" },
];

export default function CatalogPage() {


  // ===========================================
  // Estados
  // ===========================================

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const [pieces, setPieces] = useState<Piece[]>([]);

  // Imagem
  const [selectedImage, setSelectedImage] = useState("");

  // ===========================================
  // Data fetching
  // ===========================================
  async function loadPieces() {
    // Transformo os dados recebidos da API em um array
    const response = await getPieces();
    const piecesData = response.data;
    setPieces(piecesData);
  };
  useEffect(() => {
    loadPieces()
  }, [])


  // ===========================================
  // Lógica de filtros
  // ===========================================
  const filteredPieces = pieces.filter((piece) => {
    const matchesName = piece.name.toLowerCase().startsWith(search.trim().toLowerCase());

    const matchesStatus = filter === "all" || piece.availability_status === filter;

    return matchesName && matchesStatus;
  }) 
  
  // ===========================================
  // Renderização
  // ===========================================

  return (
    // ===========================================
    // Header
    // ===========================================

    <main className="catalog-page">
      <header className="catalog-header">
        <div className="catalog-logo">
          <img src="./logo.jpeg" alt="Logo do mimos" className="catalog-image" />
          <span>
            <strong>mimos crochet</strong>
            <small>feito à mão, com carinho</small>
          </span>
        </div>


        {/* ===========================================
             Nav menu
             ===========================================
        */}

        <nav className="catalog-nav">
          <a href="#inicio">Início</a>
          <a href="#pecas">Peças</a>
          <a href="#sobre">Sobre</a>
          <a className="contact-link" href="#"> {/* TODO: Add link do wpp*/}
            Fale conosco
          </a>
        </nav>
      </header>


      {/* ===========================================
          Seção de Introdução 
          ===========================================
      */}
      <section className="catalog-intro" id="inicio">
        <div className="intro-content">
          <span className="label">PEÇAS FEITAS À MÃO</span>
          <h1>Feito à mão, com carinho.</h1>
          <p>
            Peças únicas em crochê para acompanhar
            seus momentos especiais.
          </p>
          <a className="intro-button" href="#pecas">
            Explorar peças <span>→</span>
          </a>
        </div>

        <div className="intro-decoration">
          <span>✿</span>
          <span>♡</span>
          <span>✽</span>
        </div>
      </section>



      {/* ===========================================
          Header do Catálogo de peças
          ===========================================
      */}

      <section className="catalog-products" id="pecas">
        <div className="section-heading">
          <div>
            <span className="label">NOSSO CATÁLOGO</span>
            <h2>Nossas peças</h2>
            <p>Encontre algo especial feito para você.</p>
          </div>

          <span className="piece-count">
            {filteredPieces.length}{" "}
            {filteredPieces.length === 1 ? "peça" : "peças"}
          </span>
        </div>


        {/* ===========================================
            ToolBar
            ===========================================
        */}

        <div className="catalog-controls">
          <label className="search-field">
            <span >🔍</span>
            <input
              type="search"
              placeholder="Buscar uma peça..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <div className="filter-buttons">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                className={
                  filter === item.value ? "filter active" : "filter"
                }
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===========================================
             Catálogo de peças
             ===========================================
        */}
        {filteredPieces.length > 0 ? (
          <div className="pieces-grid">
            {filteredPieces.map((piece) => (
              <article className="catalog-piece-card" key={piece.piece_id}>
                <div className="catalog-piece-image">
                  <img
                    src={piece.image_url}
                    alt={piece.name}
                    className="piece-image"
                    onClick={() => setSelectedImage(piece.image_url)}
                  />
                  <span
                    className={`availability ${piece.availability_status === "available" ? "available": "made_to_order"}`}
                  >
                    {piece.availability_status === "available"
                      ? "Pronta entrega"
                      : "Sob encomenda"}
                  </span>
                </div>

                <div className="piece-info">
                  <h3>{piece.name}</h3>
                  <strong>{Number(piece.price).toFixed(2)}</strong>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-catalog">
            <span>♡</span>
            <h3>Nenhuma peça encontrada</h3>
            <p>Tente outro nome ou escolha um filtro diferente.</p>
            <button
              type="button"
              className="filter"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>

        
      {/* ===========================================
          Modal da imagem selecionada
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



      {/* ===========================================
          Footer
          ===========================================
      */}


      <footer className="catalog-footer" id="sobre">
        <img src="./logo.jpeg" alt="" className="catalog-footer-image" />
        <h2>Um mimo feito para você.</h2>
        <p>
          Cada peça tem seu encanto. Encontre a sua favorita.
        </p>
        <small>© Mimos Crochet · Feito à mão com carinho</small>
      </footer>
    </main>
  );
}
