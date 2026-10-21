import { useMemo, useState } from "react";
import "./catalog.css";
import { type Piece } from "../../types/Piece.ts"
// ===========================================
// Types
// ===========================================
type Availability = "available" | "made_to_order";

type Piece = {
  piece_id: number;
  name: string;
  price: number;
  image_url: string;
  availability_status: Availability;
};

type Filter = "all" | Availability;

const mockPieces: Piece[] = [
  {
    piece_id: 1,
    name: "Bolsa Aurora",
    price: 89.9,
    image_url:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700",
    availability_status: "available",
  },
  {
    piece_id: 2,
    name: "Buquê de Flores",
    price: 45,
    image_url:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=700",
    availability_status: "made_to_order",
  },
  {
    piece_id: 3,
    name: "Ursinho Amigurumi",
    price: 65,
    image_url:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=700",
    availability_status: "available",
  },
  {
    piece_id: 4,
    name: "Porta-copos Floral",
    price: 25,
    image_url:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=700",
    availability_status: "made_to_order",
  },

  {
    piece_id: 5,
    name: "Bolsa Aurora",
    price: 89.9,
    image_url:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700",
    availability_status: "available",
  },

  {
    piece_id: 6,
    name: "Bolsa Aurora",
    price: 89.9,
    image_url:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700",
    availability_status: "available",
  },
];

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

  // ===========================================
  // Lógica de filtros
  // ===========================================

  const filteredPieces = useMemo(() => {
    return mockPieces.filter((piece) => {
      const matchesName = piece.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesAvailability =
        filter === "all" ||
        piece.availability_status === filter;

      return matchesName && matchesAvailability;
    });
  }, [search, filter]);

  function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

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
                  />
                  <span
                    className={`availability ${piece.availability_status
                      }`}
                  >
                    {piece.availability_status === "available"
                      ? "Pronta entrega"
                      : "Sob encomenda"}
                  </span>
                </div>

                <div className="piece-info">
                  <h3>{piece.name}</h3>
                  <strong>{formatPrice(piece.price)}</strong>
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
