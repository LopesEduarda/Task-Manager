import styled from "styled-components";

type ContainerProps = {
  done: boolean;
  isEditing: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 8px;
  color: #fff;
  flex-wrap: nowrap;

  input[type="checkbox"] {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .text-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  strong {
    font-size: 18px;
    text-decoration: ${({ done }) => (done ? 'line-through' : 'none')};
  }

  p {
    font-size: 14px;
    color: #aaa;
    margin: 5px 0 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: normal;
  }

  /* Nova estilização para alinhar Data + Status */
  .task-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 100px;
    margin-right: 10px;
  }

  .task-meta small {
    font-size: 12px;
    color: #ccc;
  }

  .icons {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-end;
    min-width: 50px;
    flex-shrink: 0;
  }

  .edit-icon, .delete-icon {
    cursor: pointer;
    font-size: 18px;
  }

  .edit-icon {
    color: #f0c040;
  }

  .delete-icon {
    color: #e74c3c;
  }

  .edit-icon:hover {
    color: #d4a017;
  }

  .delete-icon:hover {
    color: #c0392b;
  }

  input[type="text"], textarea {
    background: transparent;
    border: 1px solid #bbb;
    color: white;
    font-size: 14px;
    padding: 5px;
    border-radius: 5px;
    width: 100%;
    margin-top: 5px;
  }

  textarea {
    height: ${({ isEditing }) => (isEditing ? '40px' : 'auto')};
  }
`;



export const ConfirmBox = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  p {
    font-size: 16px;
    text-align: center;
  }

  /* Alinha os botões lado a lado */
  .buttons {
    display: flex;
    justify-content: center;
    gap: 15px; /* Espaço entre os botões */
  }

  button {
    padding: 8px 15px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
    min-width: 60px; /* Mantém tamanho igual */
  }

  button:first-child {
    background: #e74c3c;
    color: white;
  }

  button:last-child {
    background: gray;
    color: white;
  }
`;

export const ConfirmModal = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  .buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }

  button {
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  button:first-child {
    background: #e74c3c;
    color: white;
  }

  button:last-child {
    background: #95a5a6;
    color: black;
  }
`;
