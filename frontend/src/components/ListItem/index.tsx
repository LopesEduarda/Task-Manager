// import { useState } from "react";
// import * as C from "./styles";
// import { Item } from "../../types/Item";
// import { FaEdit, FaTrash } from "react-icons/fa";

// interface Props {
//   item: Item;
//   onChange: (id: number, done: boolean) => void;
//   onEdit: (id: number, titulo: string, descricao: string) => void;
//   onDelete: (id: number) => void;
// }

// export const ListItem = ({ item, onChange, onEdit, onDelete }: Props) => {
//   const [isChecked, setIsChecked] = useState(item.concluida);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(item.titulo);
//   const [editedDescription, setEditedDescription] = useState(item.descricao);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//     onChange(item.id, !isChecked);
//   };

//   const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     if (e.key === "Enter") {
//       await onEdit(item.id, editedTitle, editedDescription);
//       setIsEditing(false);
//     }
//   };

//   return (
//     <C.Container done={isChecked} isEditing={isEditing}>
//       <input type="checkbox" checked={!!isChecked} onChange={handleCheckboxChange} />

//       <div className="text-content">
//         {isEditing ? (
//           <>
//             <input
//               type="text"
//               value={editedTitle}
//               onChange={(e) => setEditedTitle(e.target.value)}
//               onKeyUp={handleKeyUp}
//               autoFocus
//             />
//             <textarea
//               value={editedDescription}
//               onChange={(e) => setEditedDescription(e.target.value)}
//               onKeyUp={handleKeyUp}
//             />
//           </>
//         ) : (
//           <>
//             <strong>{item.titulo}</strong>
//             <p>{item.descricao}</p>
//           </>
//         )}
//       </div>

//       <div className="icons">
//         <FaEdit className="edit-icon" onClick={() => setIsEditing(true)} />
//         <FaTrash className="delete-icon" onClick={() => setShowConfirm(true)} />
//       </div>

//       {showConfirm && (
//         <C.ConfirmModal>
//           <p>Gostaria de deletar a tarefa?</p>
//           <div className="buttons">
//             <button onClick={() => onDelete(item.id)}>Sim</button>
//             <button onClick={() => setShowConfirm(false)}>Não</button>
//           </div>
//         </C.ConfirmModal>
//       )}
//     </C.Container>
//   );
// };


import { useState } from "react";
import * as C from "./styles";
import { Item } from "../../types/Item";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";

interface Props {
  item: Item;
  onChange: (id: number, done: boolean, completedAt: string | null) => void;
  onEdit: (id: number, titulo: string, descricao: string) => void;
  onDelete: (id: number) => void;
}

export const ListItem = ({ item, onChange, onEdit, onDelete }: Props) => {
  const [isChecked, setIsChecked] = useState(item.concluida);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.titulo);
  const [editedDescription, setEditedDescription] = useState(item.descricao);
  const [showConfirm, setShowConfirm] = useState(false);
  const [completionDate, setCompletionDate] = useState<string | null>(
    item.dataConclusao ? item.dataConclusao : null
  );

  const handleCheckboxChange = () => {
    const newStatus = !isChecked;
    const newCompletionDate = newStatus ? new Date().toISOString() : null;

    setIsChecked(newStatus);
    setCompletionDate(newCompletionDate);

    onChange(item.id, newStatus, newCompletionDate); // Enviar para o backend
  };

  const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      await onEdit(item.id, editedTitle, editedDescription);
      setIsEditing(false);
    }
  };

  return (
    <C.Container done={isChecked} isEditing={isEditing}>
      <input type="checkbox" checked={!!isChecked} onChange={handleCheckboxChange} />

      <div className="text-content">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyUp={handleKeyUp}
              autoFocus
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onKeyUp={handleKeyUp}
            />
          </>
        ) : (
          <>
            <strong>{item.titulo}</strong>
            <p>{item.descricao}</p>
          </>
        )}
      </div>

      {/* Data de criação e conclusão */}
      <div className="task-meta">
        <small>📅 Criado em: {formatDate(item.dataCriacao)}</small>
        {completionDate && <small>✅ Concluído em: {formatDate(completionDate)}</small>}
        <small>
          🏁 Status: {isChecked ? "✅ Concluído" : "⏳ Pendente"}
        </small>
      </div>

      <div className="icons">
        <FaEdit className="edit-icon" onClick={() => setIsEditing(true)} />
        <FaTrash className="delete-icon" onClick={() => setShowConfirm(true)} />
      </div>

      {showConfirm && (
        <C.ConfirmModal>
          <p>Gostaria de deletar a tarefa?</p>
          <div className="buttons">
            <button onClick={() => onDelete(item.id)}>Sim</button>
            <button onClick={() => setShowConfirm(false)}>Não</button>
          </div>
        </C.ConfirmModal>
      )}
    </C.Container>
  );
};
