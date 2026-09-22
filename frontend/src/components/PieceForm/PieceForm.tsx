import "./pieceForm.css";
type PieceFormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
};

function PieceForm({ setShowForm }: PieceFormProps) {
  return (
    <div 
      className="piece-form-overlay"
      // Se usuário clicar no overlay (fora do form), muda o estado que controla a aparição do formulário
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setShowForm(false)
        }
      }}
    >
      <form className="piece-form">

        <button
          type="button"
          className="piece-form-close"
          onClick={() => setShowForm(false)}
        > X
        </button>

        <h2>Cadastrar peça</h2>

        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nome da peça"
        />

        <label htmlFor="price">Preço</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Preço"
        />

        <label htmlFor="weight">Peso (g)</label>
        <input
          type="number"
          id="weight"
          name="weight"
          placeholder="Peso da peça"
        />

        <label htmlFor="width">Largura (cm)</label>
        <input
          type="number"
          id="width"
          name="width"
          placeholder="Largura"
        />

        <label htmlFor="height">Altura (cm)</label>
        <input
          type="number"
          id="height"
          name="height"
          placeholder="Altura"
        />

        <label htmlFor="color">Cor</label>
        <input
          type="text"
          id="color"
          name="color"
          placeholder="Cor da peça"
        />

        <label htmlFor="availabilityStatus">Disponibilidade</label>
        <select
          id="availabilityStatus"
          name="availabilityStatus"
        >
          <option value="available">Pronta entrega</option>
          <option value="made_to_order">Sob encomenda</option>
        </select>

        <label htmlFor="image">Imagem</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
        />

        <button type="submit" className="submit-button">
          Cadastrar peça
        </button>
      </form>
    </div>
  );
};


export default PieceForm;