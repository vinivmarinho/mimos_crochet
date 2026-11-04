import { createPiece, updatePiece } from "../../services/pieceService";
import type { Piece } from "../../types/Piece";
import "./pieceForm.css";
import { toast } from "react-toastify";

type PieceFormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => Promise<void>;
  pieceToUpdate?: Piece | null;
  setPieceToUpdate: React.Dispatch<React.SetStateAction<Piece | null>>;
};

function PieceForm({ setShowForm, onSuccess, pieceToUpdate, setPieceToUpdate }: PieceFormProps) {
  
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      if (pieceToUpdate) {
        await updatePiece(pieceToUpdate.piece_id, formData)
        toast.success("Peça editada com sucesso", {
            className: "toast success-toast"
          });

      } else {
          await createPiece(formData);
          toast.success("Peça cadastrada com sucesso", {
            className: "toast success-toast"
          });
      }
      
      // Aguarda o carregamento das peças no componente "Admin"
      await onSuccess();

    } catch(error) {
      toast.error("Não foi possível realizar a ação peça", {
        className: "toast error-toast"
      })
    } finally {
      setShowForm(false);
    }
  }
  return (
    <div
      className="piece-form-overlay"
      // Se usuário clicar no overlay (fora do form), muda o estado que controla a aparição do formulário
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setShowForm(false);
          if (pieceToUpdate) {
            setPieceToUpdate(null)
          }
        }
      }}
    >
      <form className="piece-form" onSubmit={handleSubmit}>

        <button
          type="button"
          className="piece-form-close"
          onClick={() => {
            setShowForm(false);
            setPieceToUpdate(null);
          }}
        > X
        </button>

        <h2>{pieceToUpdate == null ? "Cadastrar Peça" : "Editar Peça"}</h2>

        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={pieceToUpdate?.name ?? ""}
          placeholder="Nome da peça"
          required
        />

        <label htmlFor="price">Preço</label>
        <input
          type="number"
          id="price"
          name="price"
          defaultValue={pieceToUpdate?.price ?? ""}
          placeholder="Preço"
          required
        />

        <label htmlFor="weight">Peso (g)</label>
        <input
          type="number"
          id="weight"
          name="weight"
          defaultValue={pieceToUpdate?.weight ?? ""}
          placeholder="Peso da peça"
          required
        />

        <label htmlFor="width">Largura (cm)</label>
        <input
          type="number"
          id="width"
          name="width"
          defaultValue={pieceToUpdate?.width?? ""}
          placeholder="Largura"
          required
        />

        <label htmlFor="height">Altura (cm)</label>
        <input
          type="number"
          id="height"
          name="height"
          defaultValue={pieceToUpdate?.height ?? ""}
          placeholder="Altura"
          required
        />

        <label htmlFor="color">Cor</label>
        <input
          type="text"
          id="color"
          name="color"
          defaultValue={pieceToUpdate?.color ?? ""}
          placeholder="Cor da peça"
          required
        />

        <label htmlFor="availabilityStatus">Disponibilidade</label>
        <select
          id="availabilityStatus"
          name="availabilityStatus"
          defaultValue={pieceToUpdate?.availability_status ?? ""}
          required
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